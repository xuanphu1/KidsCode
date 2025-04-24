/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Manages the Ardublockly server.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const { __arduino_types, __ide_load_options } = require('./actions.js');
const childProcess = require('child_process');
const projectLocator = require('./projectlocator.js');

app.use(bodyParser.json({ extended: true }));

module.exports.startServer = function () {
    const config = getConfig();
    app.get('/', (req, res) => {
        res.redirect('/ardublockly/index.html');
    });
    app.get('/kidscode', (req, res) => {
        res.redirect('/ardublockly/index.html');
    });
    app.get('/kidscode/:id', (req, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), 'ardublockly', req.params.id));
    });
    app.get('/kidscode/:id1/:id2', (req, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), 'ardublockly', req.params.id1, req.params.id2));
    });
    app.get('/kidscode/:id1/:id2/:id3', (req, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), 'ardublockly', req.params.id1, req.params.id2, req.params.id3));
    });
    app.get('/blockly/*', ({ url }, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), url));
    });
    app.get('/blocks/*', ({ url }, res) => {
        console.log(url);
        res.sendFile(path.join(projectLocator.getProjectRootPath(), url));
    });
    app.get('/examples/:id', (req, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), 'examples', req.params.id));
    });
    app.get('/docs', (req, res) => {
        res.redirect('/docs/Home/index.html');
    });
    app.get('/docs/:path', (req, res) => {
        const file_path = req.params.path;
        res.sendFile(path.join(projectLocator.getProjectRootPath(), 'docs', file_path, 'index.html'));
    });
    app.get('/closure-library/*', ({ url }, res) => {
        res.sendFile(path.join(projectLocator.getProjectRootPath(), url));
    });
    app.get('/settings', async (req, res) => {
        const response_dict = {
            response_type: 'settings',
            response_state: 'full_response',
            success: true,
            settings_type: 'all',
            settings: [
                { settings_type: 'compiler', selected: config.arduino_exec_path },
                { settings_type: 'sketch', selected: config.sketch_directory },
                {
                    settings_type: 'board',
                    options: Object.keys(__arduino_types).map((k) => ({ display_text: k, value: k })),
                    selected: config.arduino_board
                },
                {
                    settings_type: 'serial',
                    options: await getComList(),
                    selected: config.arduino_serial_port
                },
                {
                    settings_type: 'ide',
                    options: Object.keys(__ide_load_options).map((k) => ({ display_text: __ide_load_options[k], value: k })),
                    selected: config.ide_load
                }
            ]
        };
        res.json(response_dict);
    });

    app.get('/settings/:name', async (req, res) => {
        const name = req.params.name;
        const response_dict = {
            response_type: 'settings',
            response_state: 'full_response',
            settings_type: name
        };
        let success = true;

        if (name === 'compiler') {
            response_dict.selected = config.arduino_exec_path;
        } else if (name === 'sketch') {
            response_dict.selected = config.sketch_directory;
        } else if (name === 'board') {
            response_dict.selected = config.arduino_board;
            response_dict.options = Object.keys(__arduino_types).map((k) => ({ display_text: k, value: k }));
        } else if (name === 'serial') {
            response_dict.selected = config.arduino_serial_port;
            response_dict.options = await getComList();
        } else if (name === 'ide') {
            response_dict.selected = config.ide_load;
            response_dict.options = Object.keys(__ide_load_options).map((k) => ({ display_text: __ide_load_options[k], value: k }));
        } else {
            success = false;
            response_dict.settings_type = 'invalid';
            response_dict.errors = [{ id: 61, description: 'Unexpected setting type requested.' }];
        }
        response_dict.success = success;
        res.json(response_dict);
    });

    app.put('/settings', (req, res) => {
        res.json({
            response_type: 'settings',
            response_state: 'full_response',
            success: false,
            settings_type: 'all',
            errors: [{ id: 62, description: 'Settings have to be individually updated.' }]
        });
    });

    app.put('/settings/:name', (req, res) => {
        const name = req.params.name;
        const response_dict = {
            response_type: 'settings',
            response_state: 'full_response',
            settings_type: name
        };
        let new_value;
        try {
            new_value = req.body.new_value;
        } catch (e) {
            response_dict.success = false;
            response_dict.errors = [{ id: 65, description: "JSON received does not have 'new_value' key." }];
            return res.json(response_dict);
        }
        if (!new_value) {
            response_dict.success = false;
            response_dict.errors = [{ id: 66, description: 'Invalid value.' }];
        } else {
            let option;
            let set_value;
            if (name === 'compiler') {
                config.arduino_exec_path = new_value;
                config.arduino_application_path = new_value.replace(/[^\\/]+$/, 'arduino');
                set_value = setConfig(config);
            } else if (name === 'sketch') {
                config.sketch_directory = new_value;
                set_value = setConfig(config);
            } else if (name === 'board') {
                config.arduino_board = new_value;
                option = Object.keys(__arduino_types).map((k) => ({ display_text: k, value: k }));
                set_value = setConfig(config);
            } else if (name === 'serial') {
                config.arduino_serial_port = new_value;
                option = getComList();
                set_value = setConfig(config);
            } else if (name === 'ide') {
                config.ide_load = new_value;
                option = Object.keys(__ide_load_options).map((k) => ({ display_text: __ide_load_options[k], value: k }));
                set_value = setConfig(config);
            } else {
                response_dict.success = false;
                response_dict.settings_type = 'invalid';
                response_dict.errors = [{ id: 63, description: 'Unexpected setting type to update.' }];
                return res.json(response_dict);
            }
            if (set_value) {
                response_dict.success = true;
                response_dict.selected = set_value;
                if (option) response_dict.option = option;
            } else {
                response_dict.success = false;
                response_dict.errors = [{ id: 67, description: 'New value could not be set.' }];
            }
        }
        res.json(response_dict);
    });

    app.post('/code', (req, res) => {
        let success = false;
        let ide_mode = 'unknown';
        let std_out = '';
        let err_out = '';
        let exit_code = 52;
        let sketch_code;
        let code_type;
        const response_dict = {
            response_type: 'ide_output',
            response_state: 'full_response'
        };
        try {
            sketch_code = req.body.sketch_code;
            code_type = req.body.code_type;
        } catch (e) {
            exit_code = 64;
            err_out = 'Unable to parse sent JSON.';
        }
        try {
            const result = arduino_ide_send_code(sketch_code, code_type);
            success = result.success;
            exit_code = result.exit_code;
            ide_mode = result.ide_mode;
            std_out = result.std_out;
            err_out = result.err_out;
        } catch (e) {
            exit_code = 52;
            err_out += 'Unexpected server error.';
        }
        if (!success) {
            response_dict.errors = [{ id: exit_code, description: 'More info available in the "ide_data" value.' }];
        } else {
            response_dict.success = success;
            response_dict.ide_mode = ide_mode;
            response_dict.ide_data = {
                std_output: std_out,
                err_output: err_out,
                exit_code: exit_code
            };
        }
        res.json(response_dict);
    });

    const port = 1000;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Example app listening on port ${port}`);
    });
};

const isDev = process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);
const configFilePath = isDev
    ? path.join(__dirname, 'ServerCompilerSettings.json')
    : path.join(process.resourcesPath, 'app', 'ServerCompilerSettings.json');

// Biến để lưu trữ config gốc (với đường dẫn tương đối)
let originalConfig = null;

// Danh sách các trường được coi là đường dẫn (nếu không muốn dựa vào từ khóa 'path')
const pathFields = [
    'arduino_exec_path',
    'arduino_application_path',
    'arduino_yaml_path',
    'driver_ch340_path',
    'sketch_directory' // Thêm các trường khác nếu cần
];

// Hàm kiểm tra xem một trường có phải là đường dẫn không
function isPathField(key) {
    // Kiểm tra dựa trên tên trường (có chứa 'path' hoặc nằm trong danh sách pathFields)
    return pathFields.includes(key) || key.toLowerCase().includes('path');
}

// Hàm chuyển đường dẫn tương đối thành tuyệt đối
function toAbsolutePath(relativePath, projectRoot) {
    if (typeof relativePath !== 'string') return relativePath;
    return path.join(projectRoot, relativePath);
}

// Hàm chuyển đường dẫn tuyệt đối trở lại thành tương đối
function toRelativePath(absolutePath, projectRoot) {
    if (typeof absolutePath !== 'string') return absolutePath;
    if (absolutePath.startsWith(projectRoot)) {
        const projectRootLength = projectRoot.length + 1; // +1 để bỏ qua dấu \ hoặc /
        return absolutePath.substring(projectRootLength).replace(/\\/g, '/');
    }
    return absolutePath;
}

function getConfig() {
    const config = fs.readFileSync(configFilePath, 'utf-8');
    const parsedConfig = JSON.parse(config);

    // Lưu bản sao của config gốc (chỉ thực hiện lần đầu tiên)
    if (!originalConfig) {
        originalConfig = JSON.parse(JSON.stringify(parsedConfig)); // Deep copy
    }

    // Sử dụng projectLocator.getProjectRootPath() để lấy thư mục gốc trong chế độ phát triển
    const projectRoot = isDev ? projectLocator.getProjectRootPath() : path.join(process.resourcesPath, 'app');

    // Tự động chuyển các trường đường dẫn từ tương đối thành tuyệt đối
    for (const key in parsedConfig) {
        if (isPathField(key)) {
            parsedConfig[key] = toAbsolutePath(parsedConfig[key], projectRoot);
        }
    }

    return parsedConfig;
}

function setConfig(new_config) {
    // Tạo bản sao của config để ghi vào file
    const configToWrite = JSON.parse(JSON.stringify(new_config));

    // Sử dụng projectLocator.getProjectRootPath() để lấy thư mục gốc
    const projectRoot = isDev ? projectLocator.getProjectRootPath() : path.join(process.resourcesPath, 'app');

    // Tự động chuyển các trường đường dẫn từ tuyệt đối trở lại thành tương đối
    for (const key in configToWrite) {
        if (isPathField(key)) {
            configToWrite[key] = toRelativePath(configToWrite[key], projectRoot);
        }
    }

    // Ghi file với các đường dẫn tương đối
    fs.writeFileSync(configFilePath, JSON.stringify(configToWrite, null, 2), 'utf-8');

    // Cập nhật lại originalConfig
    originalConfig = JSON.parse(JSON.stringify(configToWrite));

    return getConfig();
}



async function getComList() {
    const com_list = (await SerialPort.list()).map((c, index) => ({ value: c.path, display_text: c.path }));
    return com_list;
}

function arduino_ide_send_code(sketch_code, codeType) {
    const sketch_path = create_sketch_from_string(sketch_code, codeType);
    if (!sketch_path) return { success: false, ide_mode: 'unknown', std_out: 'None', err_out: 'None', exit_code: 51 };
    if (codeType === 'python') {
        return load_upycraft_cli(sketch_path);
    } else {
        return load_arduino_cli(sketch_path);
    }
}

function create_sketch_from_string(code_str, codeType) {
    if (codeType === 'python') {
        return create_sketch('KidscodeSketch', 'KidscodeSketch', code_str, '.py');
    } else {
        return create_sketch('KidscodeSketch', 'KidscodeSketch', code_str, '.ino');
    }
}

function create_sketch(sketch_dir, sketch_name, sketch_code, extension) {
    const basePath = process.cwd();
    const dir = path.join(basePath, sketch_dir);

    if (fs.existsSync(dir) && !fs.lstatSync(dir).isDirectory()) {
        throw new Error(`${dir} exists and is not a directory`);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const sketch_path = path.join(dir, sketch_name + extension);
    fs.writeFileSync(sketch_path, sketch_code);
    return sketch_path;
}

function load_arduino_cli(sketch_path) {
    let success = true;
    let ide_mode = 'unknown';
    let std_out = '';
    let err_out = '';
    let exit_code = 0;

    if (!fs.existsSync(sketch_path)) {
        err_out = `Provided sketch path is not a valid file: ${sketch_path}`;
        success = false;
        exit_code = 52;
        return { success, ide_mode, std_out, err_out, exit_code };
    }

    const config = getConfig();
    if (!config.arduino_exec_path) {
        success = false;
        exit_code = 53;
        err_out = 'Compiler directory not configured in the Settings.';
    } else if (!fs.existsSync(config.arduino_exec_path)) {
        success = false;
        exit_code = 53;
        err_out = `Arduino executable not found at: ${config.arduino_exec_path}`;
    } else if (!config.ide_load) {
        success = false;
        exit_code = 54;
        err_out = 'Launch IDE option not configured in the Settings.';
    } else if (!config.arduino_board && (config.ide_load === 'upload' || config.ide_load === 'verify')) {
        success = false;
        exit_code = 56;
        err_out = 'Arduino Board not configured in the Settings.';
    } else if (!config.arduino_serial_port && config.ide_load === 'upload') {
        success = false;
        exit_code = 55;
        err_out = 'Serial Port configured in Settings not accessible.';
    }

    if (success) {
        ide_mode = config.ide_load;
        const cli_command = [];

        if (config.ide_load === 'upload') {
            cli_command.push('compile', '-b', __arduino_types[config.arduino_board], '-p', config.arduino_serial_port, '-u', '-t');
        } else if (config.ide_load === 'verify') {
            cli_command.push('compile', '-b', __arduino_types[config.arduino_board]);
        } else if (config.ide_load === 'open') {
            // No additional commands needed for open
        }

        cli_command.push('--config-file', config.arduino_yaml_path, sketch_path);
        console.log('Command: ', cli_command);
        console.log('Executing arduino_exec_path:', config.arduino_exec_path);

        if (config.ide_load === 'open') {
            console.log('Open IDE');
            childProcess.spawn(config.arduino_application_path, cli_command);
            exit_code = 0;
        } else {
            const cwd = isDev ? path.join(__dirname, '..') : path.join(process.resourcesPath, 'app');
            const { status, stdout, stderr } = childProcess.spawnSync(config.arduino_exec_path, cli_command, { cwd });
            std_out = stdout ? stdout.toString() : '';
            err_out = stderr ? stderr.toString() : '';
            exit_code = status !== null ? status : 1;
            console.log(`Status: ${status}  \n`, std_out);

            if (status !== 0 && status !== 256) {
                success = false;
                if (status >= 50) {
                    err_out = `${err_out} Unexpected Arduino exit error code: ${status}`;
                    exit_code = 50;
                }
            }
        }
    }
    return { success, ide_mode, std_out, err_out, exit_code };
}

module.exports.restartServer = function () {
    module.exports.stopServer();
    setTimeout(() => {
        module.exports.startServer();
    }, 1000);
};

module.exports.stopServer = function () {
    // Implement server stop logic if needed
};

// Export getConfig and setConfig
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;