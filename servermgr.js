/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Manages the Ardublockly server.
 */
var express = require('express')
var fs = require('fs')
var app = express();
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport')
const { __arduino_types, __ide_load_options } = require('./actions.js');
app.use(bodyParser.json({ extended: true }));
const childProcess = require('child_process');
const projectLocator = require('./projectlocator.js');



module.exports.startServer = function () {
  let config = getConfig();
  app.get("/")
  app.get("/kidscode", (req, res) => {

    res.redirect('/ardublockly/index.html')
  })
  app.get("/kidscode/:id", (req, res) => {
    res.sendFile(projectLocator.getProjectRootPath() + '/ardublockly/' + req.params.id)
  })
  app.get("/kidscode/:id1/:id2", (req, res) => {
    res.sendFile(projectLocator.getProjectRootPath() + '/ardublockly/' + req.params.id1 + '/' + req.params.id2)
  })
  app.get("/kidscode/:id1/:id2/:id3", (req, res) => {
    res.sendFile(projectLocator.getProjectRootPath() + '/ardublockly/' + req.params.id1 + '/' + req.params.id2 + '/' + req.params.id3)
  })
  app.get("/blockly/*", ({ url }, res) => {
    res.sendFile(projectLocator.getProjectRootPath() + url)
  })
  app.get("/blocks/*", ({ url }, res) => {
    console.log(url);
    res.sendFile(projectLocator.getProjectRootPath() + url)
  })
  app.get("/examples/:id", (req, res) => {

    res.sendFile(projectLocator.getProjectRootPath() + '/examples/' + req.params.id)
  })
  app.get("/docs",(req,res)=>{
    res.redirect('/docs/Home/index.html');
  })
  app.get("/docs/:path",(req,res)=>{
    let file_path=res.params.path;
    //if(projectLocator.getProjectRootPath()+"") 
    res.redirect(`/docs/${file_path}/index.html`)
    return res.sendFile(projectLocator.getProjectRootPath() +'/docs/'+file_path)
  })
  app.get("/closure-library/*", ({ url }, res) => {

    res.sendFile(projectLocator.getProjectRootPath() + url)
  })
  app.get("/settings", async (req, res) => {

    let response_dict = {
      'response_type': 'settings',
      'response_state': 'full_response',
      'success': true,
      'settings_type': 'all',
      'settings': [
        {
          'settings_type': 'compiler',
          'selected': config.arduino_exec_path
        },
        {
          'settings_type': 'sketch',
          'selected': config.sketch_directory
        },
        {
          'settings_type': 'board',
          'options': Object.keys(__arduino_types).map((k) => { return { "display_text": k, "value": k } }),
          'selected': config.arduino_board
        },
        {
          'settings_type': 'serial',
          'options': await getComList(),
          'selected': config.arduino_serial_port
        },
        {
          'settings_type': 'ide',
          'options': Object.keys(__ide_load_options).map((k) => { return { "display_text": __ide_load_options[k], "value": k } }),
          'selected': config.ide_load
        }
      ]
    }
    await res.json(response_dict);
  })

  app.get("/settings/:name", async (req, res) => {
    let success = true;
    let name = req.params.name;
    let response_dict = {
      'response_type': 'settings',
      'response_state': 'full_response',
      'settings_type': name
    };
    if (name == 'compiler') {
      response_dict.selected = config.arduino_exec_path;

    }
    else if (name == 'sketch') {
      response_dict.selected = config.sketch_directory;

    }
    else if (name == 'board') {
      response_dict.selected = config.arduino_board;
      response_dict.options = Object.keys(__arduino_types).map((k) => { return { "display_text": k, "value": k } });
    }
    else if (name == 'serial') {
      let com_list = await getComList();
      //  response_dict.selected =com_list.findIndex(e=>e.display_text=config.arduino_serial_port);
      response_dict.selected = config.arduino_serial_port;
      response_dict.options = com_list;

    }
    else if (name == 'ide') {
      response_dict.selected = config.ide_load;
      response_dict.options = Object.keys(__ide_load_options).map((k) => { return { "display_text": __ide_load_options[k], "value": k } });
    }
    else {
      success = false
      response_dict.settings_type = 'invalid';
      response_dict.errors = [{
        'id': 61,
        'description': 'Unexpected setting type requested.'
      }]
    }
    response_dict.success = success;
    await res.json(response_dict);
  })
  app.put("/settings", (req, res) => {
    res.json({
      'response_type': 'settings',
      'response_state': 'full_response',
      'success': false,
      'settings_type': 'all',
      'errors': [{
        'id': 62,
        'description': 'Settings have to be individually updated.'
      }]
    }
    )

  })
  app.put("/settings/:name", (req, res) => {
    // """Handle the POST setting requests.

    // Error codes:
    // 63 - Unexpected setting type to update.
    // 64 - Unable to parse sent JSON.
    // 65 - JSON received does not have 'new_value' key.
    // 66 - Invalid value.
    // 67 - New value could not be set.

    // :param name: Setting value to retrieve.
    // :return: JSON string with the formed response.
    // """
    let name = req.params.name;
    response_dict = {
      'response_type': 'settings',
      'response_state': 'full_response',
      'settings_type': name
    };
    let new_value;
    try {
      new_value = req.body.new_value;
    }
    catch (e) {
      Object.assign(response_dict, {
        'success': false,
        'errors': [{
          'id': 65,
          'description': 'JSON received does not have \'new_value\' key.'
        }]
      })
    }
    if (!new_value) {
      Object.assign(response_dict, {
        'success': False,
        'errors': [{
          'id': 66,
          'description': 'Invalid value.'
        }]
      })
    }
    else {
      let option;
      let set_value;
      if (name == "compiler") {
        config.arduino_exec_path = new_value;
        set_value = setConfig(config);

      }
      else if (name == "sketch") {
        config.sketch_directory = new_value;
        set_value = setConfig(config);
      }
      else if (name == "board") {
        config.arduino_board = new_value;
        option = Object.keys(__arduino_types).map((k) => { return { "display_text": k, "value": k } });
        set_value = setConfig(config);
      }
      else if (name == "serial") {
        config.arduino_serial_port = new_value;
        option = getComList();
        set_value = setConfig(config);
      }
      else if (name == "ide") {
        config.ide_load = new_value
        options = Object.keys(__ide_load_options).map((k) => { return { "display_text": __ide_load_options[k], "value": k } });
        set_value = setConfig(config);
      }
      else {
        Object.assign({
          'success': false,
          'settings_type': 'invalid',
          'errors': [{
            'id': 63,
            'description': 'Unexpected setting type to update.'
          }]
        })

      }
      if (set_value) {
        Object.assign(response_dict, {
          'success': true,
          'selected': set_value
        })
        if (option)
          response_dict.option = option;
      }
      else {
        Object.assign(response_dict, {
          'success': false,
          'errors': [{
            'id': 67,
            'description': 'New value could not be set.'
          }]
        })

      }


    }
    res.json(response_dict);
  })
  app.post("/code", (req, res) => {
    console.log(req.body)
    // """Handle sent Arduino Sketch code.

    // Error codes:
    // 0  - No error
    // 1  - Build or Upload failed.
    // 2  - Sketch not found.
    // 3  - Invalid command line argument
    // 4  - Preference passed to 'get-pref' flag does not exist
    // 5  - Not Clear, but Arduino IDE sometimes errors with this.
    // 50 - Unexpected error code from Arduino IDE
    // 51 - Could not create sketch file
    // 52 - Invalid path to internally created sketch file
    // 53 - Compiler directory not configured in the Settings
    // 54 - Launch IDE option not configured in the Settings
    // 55 - Serial Port configured in Settings not accessible.
    // 56 - Arduino Board not configured in the Settings.
    // 52 - Unexpected server error.
    // 64 - Unable to parse sent JSON.
    // """
    let success = false;
    let ide_mode = 'unknown';
    let std_out, err_out = '';
    let exit_code = 52;
    let sketch_code;
    let code_type;
    let response_dict = {
      'response_type': 'ide_output',
      'response_state': 'full_response'
    };
    try {
      sketch_code = req.body.sketch_code;
      code_type = req.body.code_type;
    }
    catch (e) {
      exit_code = 64
      err_out = 'Unable to parse sent JSON.'
    }
    try {
      let result = arduino_ide_send_code(sketch_code, code_type);
      success = result.success;
      exit_code = result.exit_code;
      ide_mode = result.ide_mode;
      std_out = result.std_out;
      err_out = result.err_out;
    }
    catch (e) {
      exit_code = 52
      err_out += 'Unexpected server error.'
    }
    if (!success) {
      Object.assign(response_dict, {
        'errors': [{
          'id': exit_code,
          'description': 'More info available in the \'ide_data\' value.'
        }]
      })
    }
    else {
      Object.assign(response_dict, {
        'success': success,
        'ide_mode': ide_mode,
        'ide_data': {
          'std_output': std_out,
          'err_output': err_out,
          'exit_code': exit_code
        }
      })
    }

    res.json(response_dict)
  })

  //   app.get('*', ({ url }, res) => {
  //     console.log(url)
  //     let filePath
  //     console.log(getExtension(url));
  //     if(url.indexOf("?v=4.7.0")>-1) url=url.replace("?v=4.7.0","");
  //     if (['js', 'css', 'png', 'jpg','ttf','woff','woff2','svg','TTF','wav','mp3','0'].includes(getExtension(url))) {
  //     if(url.indexOf('/blockly/')>-1||url.indexOf('/closure-library/')>-1){
  //         filePath = projectLocator.getProjectRootPath()  + url
  //     }
  //     else{
  //         filePath = projectLocator.getProjectRootPath() + '/ardublockly/' + url 
  //     }

  //     } else {
  //       filePath = projectLocator.getProjectRootPath() + '/ardublockly/index.html'
  //     }
  //     res.sendFile(filePath)
  //   });     
  const port = 1000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
};
const getConfig = function () {
  let config = fs.readFileSync("./ServerCompilerSettings.json", "utf-8");
  return JSON.parse(config);
}

function setConfig(new_config) {
  fs.writeFileSync("./ServerCompilerSettings.json", JSON.stringify(new_config), "utf-8");
  return getConfig();
}
async function getComList() {
  let com_list = (await SerialPort.list()).map((c, index) => { return { "value": c.path, "display_text": c.path } });
  return com_list;
}
function arduino_ide_send_code(sketch_code, codeType) {
  let sketch_path = create_sketch_from_string(sketch_code, codeType);
  if (!sketch_path) return false, 'unknown', 'None', 'None', 51;
  if (codeType == "python") {
    return load_upycraft_cli(sketch_path);
  }
  else {
    return load_arduino_cli(sketch_path);
  }

}
function create_sketch_from_string(code_str, codeType) {
  if (codeType == "python") {
    return create_sketch("KidscodeSketch", "KidscodeSketch", code_str, ".py");
  }
  else {
    return create_sketch("KidscodeSketch", "KidscodeSketch", code_str, ".ino");
  }
}
function create_sketch(sketch_dir, sketch_name, sketch_code, extension) {
  let dir = __dirname + "/" + sketch_dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let sketch_path = dir + "/" + sketch_name + extension;
  fs.writeFileSync(sketch_path, sketch_code);
  return sketch_path;
}
function load_arduino_cli(sketch_path) {
  console.log(sketch_path);
  let success = true;
  let ide_mode = 'unknown';
  let std_out, err_out = '';
  let exit_code = 0;
  if (!fs.lstatSync(sketch_path)) {
    err_out = 'Provided sketch path is not a valid file: %s' % sketch_path
    success = false
    exit_code = 52
    return success, ide_mode, std_out, err_out, exit_code
  }
  let config = getConfig();
  if (!config.arduino_exec_path) {
    success = false;
    exit_code = 53;
    err_out = 'Compiler directory not configured in the Settings.';
  }
  else if (!config.ide_load) {
    success = false;
    exit_code = 54;
    err_out = 'Launch IDE option not configured in the Settings.';
  }
  else if (!config.arduino_board && (config.ide_load == "upload" || config.ide_load == "verify")) {
    success = false;
    exit_code = 56;
    err_out = 'Arduino Board not configured in the Settings.';
  }
  else if (!config.arduino_serial_port && config.ide_load == "upload") {
    success = false;
    exit_code = 55;
    err_out = 'Serial Port configured in Settings not accessible.';
  }
  if (success) {
    ide_mode = config.ide_load;
    let cli_command = [];
    cli_command.push(sketch_path);
    if (config.ide_load == "upload") {
      cli_command.push("--upload");
      cli_command.push("--port");
      cli_command.push(config.arduino_serial_port);
      cli_command.push("--board");
      cli_command.push(__arduino_types[config.arduino_board]);
    }
    else if (config.ide_load == "verify") {
      cli_command.push("--board");
      cli_command.push(__arduino_types[config.arduino_board]);
      cli_command.push("--preferences-file");
      cli_command.push('./config.txt');
      cli_command.push("--verify");
    }
    else if (config.ide_load == "open") {
    }
    console.log(cli_command)
    if (config.ide_load == "open") {
      childProcess.spawn(config.arduino_exec_path,cli_command);
      exit_code = 0;
    }
    else {
      //let } {error, stdout, stderr} = childProcess.execSync(cli_command);
      let { status, output, stdout, stderr } = childProcess.spawnSync(config.arduino_exec_path, cli_command, {})
      std_out = stdout.toString();
      err_out = stderr.toString();
      exit_code = status;
      console.log(status + "-----", output.toString())
      if (status != 0 && status != 256) {
        success = false;
        if (status >= 50) {
          err_out = `${err_out} Unexpected Arduino exit error code:${status}`
          status = 50;
        }
      }
    }
  }
  return { success, ide_mode, std_out, err_out, exit_code }

}
function load_upycraft_cli(sketch_path) {
  let success = true;
  let ide_mode = 'unknown';
  let std_out, err_out = '';
  let exit_code = 0;
  if (!fs.lstatSync(sketch_path)) {
    err_out = 'Provided sketch path is not a valid file: %s' % sketch_path
    success = false
    exit_code = 52
    return success, ide_mode, std_out, err_out, exit_code
  }
  let config = getConfig();
  if (!config.arduino_exec_path) {
    success = false;
    exit_code = 53;
    err_out = 'Compiler directory not configured in the Settings.';
  }
  else if (!config.ide_load) {
    success = false;
    exit_code = 54;
    err_out = 'Launch IDE option not configured in the Settings.';
  }
  else if (!config.arduino_board && (config.ide_load == "upload" || config.ide_load == "verify")) {
    success = false;
    exit_code = 56;
    err_out = 'Arduino Board not configured in the Settings.';
  }
  else if (!config.arduino_serial_port && config.ide_load == "upload") {
    success = false;
    exit_code = 55;
    err_out = 'Serial Port configured in Settings not accessible.';
  }
  if (success) {
    ide_mode = config.ide_load;
    let cli_command = [];
    cli_command.push(sketch_path);
    if (config.ide_load == "upload") {
      cli_command.push("--upload");
      cli_command.push("--port");
      cli_command.push(config.arduino_serial_port);
      cli_command.push("--board");
      cli_command.push(__arduino_types[config.arduino_board]);
    }
    else if (config.ide_load == "verify") {
      cli_command.push("--board");
      cli_command.push(__arduino_types[config.arduino_board]);
      cli_command.push("--preferences-file");
      cli_command.push('./config.txt');
      cli_command.push("--verify");
    }
    else if (config.ide_load == "open") {
    }
    console.log(cli_command)
    if (config.ide_load == "open") {
      childProcess.spawn(config.arduino_exec_path,cli_command);
      exit_code = 0;
    }
    else {
      //let } {error, stdout, stderr} = childProcess.execSync(cli_command);
      let { status, output, stdout, stderr } = childProcess.spawnSync(config.arduino_exec_path, cli_command, {})
      std_out = stdout.toString();
      err_out = stderr.toString();
      exit_code = status;
      console.log(status + "-----", output.toString())
      if (status != 0 && status != 256) {
        success = false;
        if (status >= 50) {
          err_out = `${err_out} Unexpected Arduino exit error code:${status}`
          status = 50;
        }
      }
    }
  }
  return { success, ide_mode, std_out, err_out, exit_code }

}

// module.exports.stopServer = function() {
//     if (serverProcess !== null) {
//         // Server executable needs to clean up (kill child), so no SIGKILL
//         serverProcess.kill('SIGTERM');
//         serverProcess = null;
//         winston.info(tagMgr + 'Server stopped.');
//     }
// };

module.exports.restartServer = function () {
  module.exports.stopServer();
  setTimeout(function () {
    module.exports.startServer();
  }, 1000);
};
