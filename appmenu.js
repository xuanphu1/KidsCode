/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Generates the application menu bar.
 */
const electron = require('electron');
var path = require('path');
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;
const dialog = electron.dialog;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
var fs = require('fs');
const server = require('./servermgr.js');
const projectLocator = require('./projectlocator.js');
const sudo = require('sudo-prompt'); // Thêm dòng này ở đầu file JS
var nano = false;
var uno = false;
var mega = false;
var esp = false;
var esp32 = false;
var cod_type, config_temp;


module.exports.setArdublocklyMenu = function (devMode, config, codeType) {
    config_temp = config;
    cod_type = codeType;
    setMenu(devMode, getBoardData(), config, codeType);
};
var setMenu = function (devMode, getBoard, config, codeType) {
    if (config.arduino_board=="Uno") uno = true;
    if (config.arduino_board == "ESP32 DevKit V1" ) {esp32 = true;
    console.log("Config board sucessfull");
    }
    if (typeof (devMode) === 'undefined') devMode = false;
    var ardublocklyMenu = [];
    if (process.platform == 'darwin') {
        ardublocklyMenu.push(getMacMenuData());
    }
    ardublocklyMenu.push(getFileMenuData());
    ardublocklyMenu.push(getEditMenuData());
    ardublocklyMenu.push(getConnectData());
    ardublocklyMenu.push(getBoard);
    ardublocklyMenu.push(getToolData());
    ardublocklyMenu.push(getLanguageData());
    ardublocklyMenu.push(getExamplesMenuData());
    ardublocklyMenu.push(openGpt());
    ardublocklyMenu.push(selectCode(codeType));
    if (process.platform == 'darwin') {
        ardublocklyMenu.push(getWindowMenuData());
    }
    ardublocklyMenu.push(getHelpMenuData());
    if (devMode) {
        ardublocklyMenu.push(getDevMenuData());
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(ardublocklyMenu));
}
var selectCode = function (codeType) {
    return {
        label: 'Ngôn ngữ lập trình',
        submenu: [
            {
                label: 'Code C/C++',
                type: 'radio',
                checked: codeType.indexOf("arduino") > -1 ? true : false,
                click: () => {
                    let url = "http://localhost:1010/kidscode/index.html?lang=vi&code=arduino&board=Uno&name=kcbot,mbot,a4kids,iot4kids,Airsense";
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'window.location.href="' + url + '"', true);
                    fs.writeFileSync(projectLocator.getProjectRootPath() + "//codeType.txt", "arduino");

                }
            },
            {
                label: 'Code Python',
                type: 'radio',
                checked: codeType.indexOf("python") > -1 ? true : false,
                click: () => {

                    let url = "http://localhost:1010/kidscode/index.html?lang=vi&code=python";
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'window.location.href="' + url + '"', true);
                    fs.writeFileSync(projectLocator.getProjectRootPath() + "//codeType.txt", "python");

                }
            }
        ]
    };
}
var getMacMenuData = function () {
    return {
        label: 'Ardublockly',
        submenu: [
            {
                label: 'About',
                click: functionNotImplemented
            }, {
                type: 'separator'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide Ardublockly',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function () {
                    app.quit();
                }
            }
        ]
    };
};
var filename = "";
var getFileMenuData = function () {
    var fileMenu = {
        label: 'Tệp',
        submenu: [
            {
                label: 'Tạo mới nhất',
                accelerator: 'CmdOrCtrl+N',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.reload()');
                    filename = "";
                }
            }, {
                label: 'Mở tệp',
                accelerator: 'CmdOrCtrl+O',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadUserXmlFile()', true);
                }
            }, {
                label: 'Lưu',
                accelerator: 'CmdOrCtrl+S',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.continuossaveXmlFile()', (result) => {
                            let data = JSON.parse(result);
                            if (data.path == null && filename == "") {
                                let options = {
                                    defaultPath: "./" + data.name,
                                    title: "Lưu thiết kế",
                                    buttonLabel: "Lưu",
                                    filters: [
                                        { name: 'XML', extensions: ['xml'] },
                                        { name: 'All Files', extensions: ['*'] }
                                    ]
                                }
                                filename = dialog.showSaveDialog(options);
                                if (filename == null) return;
                            }
                            else {
                                filename = data.path ? data.path : filename;
                                dialog.showMessageBox({
                                    type: 'info',
                                    title: 'Thông báo',
                                    buttons: ['ok',],
                                    message: 'Đã lưu thiết kế!'
                                });
                            }
                            fs.writeFile(filename, data.content, (err) => { })
                        });
                }
            }, {
                label: 'Lưu mới',
                accelerator: 'Shift+CmdOrCtrl+S',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.saveXmlFile()');
                }
            },
            {
                label: 'Lưu tệp Hex',
                accelerator: 'CmdOrCtrl+K',
                click: function () {
                    // BrowserWindow.getFocusedWindow().webContents
                    //     .executeJavaScript('Ardublockly.continuossaveXmlFile()',(result)=>{
                    let pathRoot = path.join(__dirname, '..', '..');
                    let pathHex = path.join(pathRoot, 'storyHex', 'ArdublocklySketch.ino.hex');
                    try {
                        if (fs.existsSync(pathHex)) {
                            let options = {
                                defaultPath: pathRoot,
                                title: "Lưu file hex",
                                buttonLabel: "Lưu",
                                filters: [
                                    { name: 'Hex', extensions: ['hex'] },
                                    { name: 'All Files', extensions: ['*'] }
                                ]
                            }
                            let filePath = dialog.showSaveDialog(options);
                            if (filename == null) return;
                            let readStream = fs.createReadStream(pathHex);
                            readStream.pipe(fs.createWriteStream(filePath));
                            // fs.copyFileSync(pathHex.replace('\'','/'), filePath, (er) => {
                            //     dialog.showMessageBox({
                            //         type: 'info',
                            //         title: 'Thông báo',
                            //         buttons: ['ok',],
                            //         message: er
                            //     });
                            //     //if (err) throw err;
                            //    // console.log('source.txt was copied to destination.txt');
                            // });

                        }
                        else {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Thông báo',
                                buttons: ['ok',],
                                message: 'Chưa có file Hex !'
                            });

                        }
                    } catch (err) {

                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Thông báo',
                            buttons: ['ok',],
                            message: 'Lỗi lưu file!'
                        });
                    }
                    // });
                }
            }
        ]
    };

    // On MacOS the Quit option is in the app menu, so only add it if not mac
    if (process.platform != 'darwin') {
        fileMenu.submenu.push(
            {
                type: 'separator'
            }, {
            label: 'Thoát',
            accelerator: 'CmdOrCtrl+Q',
            click: function () {
                app.quit();
            }
        }
        );
    }

    return fileMenu;
};

var show = true;
var showgame = false;
var getEditMenuData = function () {
    var editMenud = {
        label: 'Chỉnh sửa',
        submenu: [
            {
                label: 'Quay lại',
                accelerator: 'CmdOrCtrl+Z',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.workspace.undo(false)');
                }
            }, {
                label: 'Tiến lên',
                accelerator: 'CmdOrCtrl+Y',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.workspace.undo(true)');
                }
            }, {
                type: 'separator'
            }, {
                label: 'Cắt',
                accelerator: 'CmdOrCtrl+X',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyCut()');
                }
            }, {
                label: 'Sao chép',
                accelerator: 'CmdOrCtrl+C',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyCopy()');
                }
            }, {
                label: 'Dán',
                accelerator: 'CmdOrCtrl+V',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyPaste()');
                }
            }, {
                label: 'Xóa tất cả',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.discardAllBlocks()');
                }
            },
            {
                label: 'Xóa bộ nhớ đệm',
                accelerator: 'Ctrl+Shift+C',
                // enabled: false
                click: function () {
                    const win = BrowserWindow.getAllWindows()[0];
                    const ses = win.webContents.session;
                    ses.clearCache(() => {
                        BrowserWindow.getFocusedWindow().webContents
                            .executeJavaScript('location.reload()');
                    });
                }

            },
            {
                label: 'Cài đặt',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.openSettings()');
                }
            },
            {
                type: 'separator'
            },
            {
                label: "Nút IDE mặc định",
                submenu: [
                    {
                        label: "Xác minh",
                        click: function () {
                            BrowserWindow.getFocusedWindow().webContents
                                .executeJavaScript('Ardublockly.changeIdeButtons("verify")')
                        }
                    }, {
                        label: "Tải chương trình",
                        click: function () {
                            BrowserWindow.getFocusedWindow().webContents
                                .executeJavaScript('Ardublockly.changeIdeButtons("upload")')
                        }
                    }, {
                        label: "Mở IDE",
                        click: function () {
                            BrowserWindow.getFocusedWindow().webContents
                                .executeJavaScript('Ardublockly.changeIdeButtons("open")');
                        },
                    }
                ]
            },
            {
                label: "Ẩn mã nguồn",
                type: 'checkbox',
                checked: false,
                accelerator: 'Ctrl+H',
                click: function () {
                    show = !show;
                    if (show == false)
                        BrowserWindow.getFocusedWindow().webContents
                            .executeJavaScript('Ardublockly.hideCode()')
                    else
                        BrowserWindow.getFocusedWindow().webContents
                            .executeJavaScript('Ardublockly.showCode()')
                }
            }, {
                label: 'Phóng to/Thu nhỏ (Ctrl+Lăn chuột)',
                //accelerator: 'Ctrl + "Ư"',
                enabled: false
            }, {
                label: 'Dịch trái/phải(Shift+Lăn chuột)',
                enabled: false
            },
            {
                type: 'separator'
            }
            // ,{
            //     label: 'Phát triển tư duy máy tính',
            //     accelerator: 'Ctrl+M',
            //     type:'checkbox',
            //     checked:false,
            //     click: function() {
            //             showgame=!showgame;
            //             if(showgame){
            //                 BrowserWindow.getFocusedWindow().webContents
            //             .executeJavaScript('window.location="http://localhost:1010/games/game.html"');
            //             }
            //             else{
            //                 BrowserWindow.getFocusedWindow().webContents
            //             .executeJavaScript('window.location=\'http://localhost:1010/kidscode/index.html?lang=vi&board={"kcbot":'+kcbot+',"arduino4kid":'+arduino4kid+',"iot4kid":'+iot4kid+'}\' ');
            //         }
            //     }
            // }
        ]
    };

    // On MacOS Preferences is in the app menu, so only add it if not mac
    // if (process.platform != 'darwin') {
    //     editMenud.submenu.push(
    //         {
    //             type: 'separator'
    //         }, {
    //             label: 'Preferences',
    //             accelerator: 'CmdOrCtrl+,',
    //             click: function() {
    //                 BrowserWindow.getFocusedWindow().webContents
    //                     .executeJavaScript('Ardublockly.openSettings()');
    //             }
    //         }
    //     );
    // }

    return editMenud;
};

var getExamplesMenuData = function () {
    return {
        label: 'Ví dụ',
        submenu: [
            {
                label: 'Kéo thả - C/C++',
                submenu: [
                    {
                        label: 'Arduino',
                        submenu: [
                            {
                                label: 'Nháy đèn',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'blink.xml");');
                                }
                            }, {
                                label: 'In chữ cổng nối tiếp',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'serial_print_ascii.xml");');
                                }
                            }, {
                                label: 'Trò chơi vòng lặp liên tiếp',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'serial_repeat_game.xml");');
                                }
                            }, {
                                label: 'Điều khiển servo',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'servo_knob.xml");');
                                }
                            }, {
                                label: 'Điều khiển động cơ bước',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'stepper_knob.xml");');
                                }
                            }]
                    }, {
                        label: 'KC-Bot',
                        submenu: [
                            {
                                label: 'Điều khiển đèn LED',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'den_led_KC.xml");');
                                }
                            },
                            {
                                label: 'Tránh vật cản',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'ultrasonic.xml");');
                                }
                            }
                            , {
                                label: 'Đọc giá trị cảm biến hồng ngoại',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'lay_line.xml");');
                                }
                            }
                            , {
                                label: 'Dò theo vạch',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'do_line.xml");');
                                }
                            }
                            , {
                                label: 'Tự động lấy thông số và dò theo vạch',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'auto_do_line.xml");');
                                }
                            }
                            , {
                                label: 'Điều khiển qua bluetooth',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Bluetooth_controller.xml");');
                                }
                            }]
                    },
                    {
                        label: 'Arduino Robot',
                        submenu: [
                            {
                                label: 'Đi theo hình vuông',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'hinh_vuong.xml");');
                                }
                            },
                            {
                                label: 'Điều khiển đèn LED',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'den_led.xml");');
                                }
                            }
                            , {
                                label: 'Đọc khoảng cách',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'doc_khoang_cach.xml");');
                                }
                            }
                            , {
                                label: 'Cảnh báo va chạm bằng cảm biến siêu âm',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'den_led_coi_sieu_am.xml");');
                                }
                            }
                            , {
                                label: 'Tránh vật cản',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Tranh_vat_can_arduino.xml");');
                                }
                            }
                            , {
                                label: 'Đọc giá trị cảm biến hồng ngoại',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Lay_line_arduino.xml");');
                                }
                            }
                            , {
                                label: 'Dò theo vạch',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Do_line_arduino.xml");');
                                }
                            }
                            , {
                                label: 'Điều khiển qua bluetooth',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Bluetooth_arduino.xml");');
                                }
                            }]
                    }]
            },
            {
                label: 'Kéo thả - Python',
                submenu: [
                    {
                        label: 'KC-Bot 2',
                        submenu: [
                            {
                                label: 'Điều khiển đèn LED',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'dieu_khien_den_led_python.xml");');
                                }
                            },
                            {
                                label: 'Tránh vật cản',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'Tranh_vat_can_python.xml");');
                                }
                            }
                            , {
                                label: 'Đọc giá trị cảm biến hồng ngoại',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'doc_gia_tri_cam_bien_hong_ngoai_python.xml");');
                                }
                            }
                            , {
                                label: 'Dò theo vạch',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'do_line_python.xml");');
                                }
                            }
                            , {
                                label: 'Điều khiển qua bluetooth',
                                click: function () {
                                    BrowserWindow.getFocusedWindow().webContents
                                        .executeJavaScript(
                                            'Ardublockly.loadServerXmlFile("../examples/' +
                                            'dien_khien_bang_bluetooth_python.xml");');
                                }
                            }]
                    },
                ]
            }

        ]
    };
};
/*var getExamplesMenuData = function () {
    return {
        label: 'Machine Learning',
        submenu: [
                        {
                label: 'Nhận diện hình ảnh',
                click: function () {
                    shell.openExternal(
                        'https://teachablemachine.withgoogle.com/train/image');
                }
            },
                
        ]
    };
};
*/
var getLanguageData = function () {
    return {
        label: 'Ngôn ngữ',
        submenu: [
            {
                label: 'Tiếng Việt',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.changeLanguage("vi")');
                }
            }, {
                label: 'Tiếng Anh',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.changeLanguage("en")');
                }
            }
        ]
    };
};

var openGpt = function(){
    return {
        label : 'GPT',
        click : function(){

                const { PythonShell } = require('python-shell');

                // Create a new PythonShell instance
                let pyshell = new PythonShell('gpt.py');

                // Received message
                pyshell.on('message', function (message) {
                console.log('Received message from GPT Server:', message);
                });

                // Handle errors 
                pyshell.on('error', function (err) {
                console.error('Error while running GPT:', err);
                });

                pyshell.end(function (err, code, signal) {
                if (err) {
                    console.error('Error:', err);
                } else {
                    console.log('Successfully');
                }
                });

        }
    };
};



var getBoardData = function () {
    // Lấy giá trị arduino_board từ config_temp
    const currentBoard = config_temp.arduino_board || 'Arduino Uno'; // Mặc định là Arduino Uno nếu không có giá trị

    return {
        label: 'Thiết bị',
        submenu: [
            {
                label: 'Arduino Uno',
                type: "radio",
                checked: currentBoard === 'Arduino Uno', // Đồng bộ với config
                click: function () {
                    let newMenu = getBoardData();
                    newMenu.submenu[0].checked = true;
                    newMenu.submenu[1].checked = false;
                    setMenu(false, newMenu, config_temp, cod_type);

                    // Cập nhật giao diện
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            "Ardublockly.changeBoard({name:'kcbot',board:'Arduino Uno'})"
                        );

                    // Gửi request đến servermgr.js để cập nhật config
                    fetch('http://127.0.0.1:1000/settings/board', { // Sửa cổng từ 8000 thành 1000 và localhost thành 127.0.0.1
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ new_value: 'Arduino Uno' }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log('Board updated to Arduino Uno in config');
                            config_temp.arduino_board = 'Arduino Uno'; // Cập nhật config_temp
                        } else {
                            console.error('Failed to update board:', data.errors);
                        }
                    })
                    .catch(error => {
                        console.error('Error updating board:', error);
                    });
                }
            }, 
            {
                label: 'ESP32',
                type: "radio",
                checked: currentBoard === 'ESP32', // Đồng bộ với config
                click: function(){
                    let newMenu = getBoardData();
                    newMenu.submenu[0].checked = false;
                    newMenu.submenu[1].checked = true;
                    setMenu(false, newMenu, config_temp, cod_type);

                    // Cập nhật giao diện
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    if (focusedWindow) {
                        focusedWindow.webContents.executeJavaScript(
                            "Ardublockly.changeBoard({name:'Airsense',board:'ESP32'})"
                        ).then(result => {
                            console.log("Ardublockly.changeBoard executed successfully");
                        }).catch(error => {
                            console.error("Failed to execute Ardublockly.changeBoard:", error);
                        });

                        // Gửi request đến servermgr.js để cập nhật config
                        fetch('http://127.0.0.1:1000/settings/board', { // Sửa cổng từ 8000 thành 1000 và localhost thành 127.0.0.1
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ new_value: 'ESP32' }),
                        })
                        
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                console.log('Board updated to ESP32 in config');
                                config_temp.arduino_board = 'ESP32'; // Cập nhật config_temp
                            } else {
                                console.error('Failed to update board:', data.errors);
                            }
                        })
                        .catch(error => {
                            console.error('Error updating board:', error);
                        });
                    } else {
                        console.error("No focused window found");
                    }
                }
            },
        ]
    };
};

var getConnectData = function () {
    return {
        label: 'Kết nối',
        submenu: [
            {
                label: "Cổng nối tiếp",
                accelerator: 'CmdOrCtrl+,',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.openSettingCom()');
                }
            },
            {
                label: 'Cập nhật Firmware',
                click: function () {
                    // BrowserWindow.getFocusedWindow().webContents.executeJavaScript(...);
                }
            },
            {
                label: 'Cài đặt Driver cho Arduino và ESP32',
                click: function () {
                    const exec = require('child_process').execFile;
                    const driverPath = config_temp.driver_ch340_path; // Sử dụng config_temp đã được truyền vào
                    exec(driverPath, function (err, data) {
                        if (err) {
                            console.error("Lỗi cài driver CH340:", err);
                            dialog.showMessageBox({
                                type: 'error',
                                title: 'Lỗi',
                                buttons: ['OK'],
                                message: 'Không thể cài đặt driver CH340. Vui lòng kiểm tra file driver.'
                            });
                        } else {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Thành công',
                                buttons: ['OK'],
                                message: 'Đã khởi chạy cài đặt driver CH340.'
                            });
                        }
                    });
                }
            }
        ]
    };
};



var rgb = false;
var getToolData = function () {
    return {
        label: 'Công cụ',
        submenu: [
            //     {
            // label:"RGB",
            // accelerator: 'CmdOrCtrl+T',
            // type:'checkbox',
            // click: function() {
            //     rgb=!rgb;
            //     if(rgb){
            //         BrowserWindow.getFocusedWindow().webContents
            //         .executeJavaScript('window.location="http://localhost:1010/tools/RGB.html"');
            //     }
            //     else{
            //         BrowserWindow.getFocusedWindow().webContents
            //     .executeJavaScript('window.location=\'http://localhost:1010/kidscode/index.html?lang=vi&board={"kcbot":'+kcbot+',"arduino4kid":'+arduino4kid+',"iot4kid":'+iot4kid+'}\' ');
            // }

            // }},
            {
                label: "Biểu đồ",
                accelerator: 'Shift+T',
                click: function () {
                    var exec = require('child_process').execFile;
                    exec("plot.exe", { cwd: "tools/plotSerial" }, function (err, data) {
                    })
                }
            }//,
            // {
            //     label: "Mô phỏng",
            //     accelerator: 'CmdOrCtrl+M',
            //     click: function () {
            //         var exec = require('child_process').execFile;
            //         exec('simulide.exe',{cwd:"simu/bin"}, function (err, data) {

            //         })
            //     }
            // },
        ]
    };
};

var getProgramMenuData = function () {
    return {
        label: 'Program',
        submenu: [
            {
                label: 'Verify',
                accelerator: 'CmdOrCtrl+R',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendVerify()');
                }
            }, {
                label: 'Open sketch in IDE',
                //accelerator: 'CmdOrCtrl+O',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendOpen()');
                }
            }, {
                label: 'Upload program',
                accelerator: 'CmdOrCtrl+U',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendUpload()');
                }
            }
        ]
    };
};

var getWindowMenuData = function () {
    return {
        label: 'Window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }
        ]
    };
};

var getHelpMenuData = function () {
    return {
        label: 'Trợ giúp',
        submenu: [
            {
                label: 'Robot.edu.vn',
                click: function () {
                    shell.openExternal(
                        'https://robot.edu.vn/');
                }
            }, {
                label: 'Facebook',
                click: function () {
                    shell.openExternal('https://Facebook.com/KidsCanCode01/');
                }
            }, {
                type: 'separator'
            }, {
                label: 'Youtube',
                click: function () {
                    shell.openExternal('https://www.youtube.com/channel/UCH66kz9htA82d5DOo_1O0Jg');
                }
            },
            {
                label: 'Tài liệu hướng dẫn phần mềm',
                click: function () {
                    shell.openExternal(
                        'https://drive.google.com/file/d/1gwQjoqfpba78Az3pPk2ExwHn-Tz79xwM/view');
                }
            },
            {
                label: 'Tài liệu hướng dẫn robot KC-Bot',
                click: function () {
                    shell.openExternal(
                        'https://drive.google.com/file/d/10LBLBorfbJaIQXdKMtWpDvw2BT0d_RKT/view?usp=sharing');
                }
            },
            {
                type: 'separator'
            }, {
                label: 'Tải bản mới nhất',
                click: function () {
                    //shell.openExternal('http://Kidscode.edu.vn');
                    var exec = require('child_process').execFile;
                    exec('./Debug/download', function (err, data) {
                    });
                }
            }, {
                label: 'Báo cáo lỗi',
                click: function () {
                    shell.openExternal('https://Facebook.com/KidsCanCode01/');
                }
            }
        ]
    };
};

var getDevMenuData = function () {
    return {
        label: 'Development',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+F5',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .reloadIgnoringCache();
                }
            }, {
                label: 'Toggle DevTools',
                accelerator: 'F12',
                click: function () {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }, {
                type: 'separator'
            }, {
                label: 'Stop server',
                accelerator: 'Shift+CmdOrCtrl+S',
                click: server.stopServer
            }, {
                label: 'Restart server',
                accelerator: 'Shift+CmdOrCtrl+R',
                click: server.restartServer
            }, {
                type: 'separator'
            }, {
                label: 'Open side menu',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            '$(".button-collapse").sideNav("show")');
                }
            }, {
                label: 'Open extra blocks menu',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.openExtraCategoriesSelect()');
                }
            }, {
                type: 'separator'
            }, {
                label: 'Test menu item',
                click: testFunction
            }
        ]
    };
};

var functionNotImplemented = function () {
    dialog.showMessageBox({
        type: 'info',
        title: 'Dialog',
        buttons: ['ok',],
        message: 'This functionality has not yet been implemented.'
    });
};

var testFunction = function () {
    // Here you can place any test code you'd like to test on a menu click
    functionNotImplemented();
};
