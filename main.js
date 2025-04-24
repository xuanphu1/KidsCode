const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const appMenu = require('./appmenu.js');
const { getConfig } = require('./servermgr.js');
const projectLocator = require('./projectlocator.js');
const createWindow = require('./helpers/window');
const YAML = require('yaml');
const os = require('os');

// Biến toàn cục để lưu cấu hình và loại code
let config_temp = { arduino_board: null };

// Xác định đường dẫn động
const userHomeDir = os.homedir(); // Lấy thư mục home của người dùng (C:\Users\ADMIN trên Windows, /home/user trên Linux, /Users/user trên macOS)
const appDataDir = process.env.LOCALAPPDATA || path.join(userHomeDir, 'AppData', 'Local'); // Thư mục AppData\Local trên Windows, hoặc tương đương
const arduinoPath = path.join(appDataDir, 'Arduino15'); // Thư mục Arduino15
const libraryPath = path.join(arduinoPath, 'libraries'); // Thư mục libraries
const configFilePath = path.join(arduinoPath, 'arduino-cli.yaml'); // Đường dẫn đến file arduino-cli.yaml


let mainWindow = null;
let splashWindow = null;
let loadingWindow = null; // Variable to store the dynamic dialog window
let installProcess = null; // Variable to store the board installation process

// Set up the app data directory within the Ardublockly root directory
(function setAppData() {
    const appDataPath = projectLocator.getExecDirJetpack().cwd('appdata');
    app.setPath('appData', appDataPath.path());
    app.setPath('userData', appDataPath.path());
    app.setPath('cache', appDataPath.path('GenCache'));
    app.setPath('userCache', appDataPath.path('AppCache'));
    app.setPath('temp', appDataPath.path('temp'));
})();

// Ensure this is a single instance application
app.requestSingleInstanceLock();
app.on('second-instance', (event, argv, cwd) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});
// Function to create a dynamic dialog with a three-dot blinking effect and custom title bar
function createLoadingWindow() {
    if (loadingWindow) return; // Avoid creating multiple windows

    loadingWindow = new BrowserWindow({
        width: 300,
        height: 150,
        frame: false, // No default window frame
        alwaysOnTop: true, // Always display on top
        transparent: true, // Transparent background
        center: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Create HTML content with a title bar and three-dot blinking effect
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    background: transparent;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    color: white;
                }
                .dialog-container {
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 10px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .title-bar {
                    height: 30px;
                    background: #333;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    padding: 0 5px;
                }
                .title-bar button {
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 3px;
                    margin-left: 5px;
                }
                .title-bar button:hover {
                    background: #555;
                }
                .title-bar .close-btn:hover {
                    background: #e81123;
                }
                .content {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .loading-text {
                    font-size: 16px;
                    text-align: center;
                }
                .dots::after {
                    content: '...';
                    display: inline-block;
                    width: 1em;
                    text-align: left;
                    animation: dots 1.5s steps(4, end) infinite;
                }
                @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60% { content: '...'; }
                    80%, 100% { content: ''; }
                }
            </style>
        </head>
        <body>
            <div class="dialog-container">
                <div class="title-bar">
                    <button class="minimize-btn" onclick="minimizeWindow()">−</button>
                    <button class="close-btn" onclick="closeWindow()">×</button>
                </div>
                <div class="content">
                    <div class="loading-text">
                        Installing hardware resources<span class="dots"></span>
                    </div>
                </div>
            </div>
            <script>
                const { ipcRenderer } = require('electron');
                function minimizeWindow() {
                    ipcRenderer.send('minimize-loading-window');
                }
                function closeWindow() {
                    ipcRenderer.send('close-loading-window');
                }
            </script>
        </body>
        </html>
    `;

    // Load the HTML content into the window
    loadingWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    loadingWindow.show(); // Ensure the window is displayed immediately
}

// Handle events from HTML to minimize and close the dynamic dialog
ipcMain.on('minimize-loading-window', () => {
    if (loadingWindow) {
        console.log('Minimizing loading window');
        loadingWindow.minimize();
    }
});

ipcMain.on('close-loading-window', () => {
    console.log('Closing loading window and cancelling installation');
    closeLoadingWindow(true); // Pass true to cancel the installation process
});

// Function to close the dynamic dialog
function closeLoadingWindow(cancelInstallation = false) {
    if (loadingWindow) {
        if (cancelInstallation && installProcess) {
            installProcess.kill(); // Cancel the installation process
            installProcess = null;
            dialog.showMessageBox({
                type: 'info',
                title: 'Notification',
                message: 'The hardware resource installation process has been cancelled.',
                buttons: ['OK']
            });
            app.quit(); // Exit the application after cancelling the installation
        }
        loadingWindow.close();
        loadingWindow = null;
    }
}

// Function to install hardware resources asynchronously
function installResource(execPath, command, callback) {
    installProcess = childProcess.spawn(execPath, command); // Store the process

    let stdout = '';
    let stderr = '';

    installProcess.stdout.on('data', (data) => {
        stdout += data.toString();
    });

    installProcess.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    installProcess.on('error', (error) => {
        callback(error, null, stderr);
    });

    installProcess.on('close', (code) => {
        installProcess = null; // Reset the process variable after completion
        if (code === 0) {
            callback(null, stdout, stderr);
        } else {
            callback(new Error(`Process exited with code ${code}`), stdout, stderr);
        }
    });
}





// Hàm tạo hoặc cập nhật file arduino-cli.yaml
function ensureArduinoCliConfig() {
    const configContent = {
        board_manager: {
            additional_urls: []
        },
        directories: {
            user: arduinoPath,
            libraries: libraryPath
        }
    };

    try {
        // Tạo thư mục Arduino15 nếu chưa tồn tại
        if (!fs.existsSync(arduinoPath)) {
            fs.mkdirSync(arduinoPath, { recursive: true });
            console.log(`Created Arduino15 directory at ${arduinoPath}`);
        }

        // Ghi file arduino-cli.yaml
        fs.writeFileSync(configFilePath, YAML.stringify(configContent), 'utf8');
        console.log(`Created/Updated arduino-cli.yaml at ${configFilePath}`);
    } catch (error) {
        console.error(`Error creating/updating arduino-cli.yaml:`, error);
        throw error;
    }
}


app.on('ready', () => {
    console.log('Electron is ready!');

    // Hàm sửa trực tiếp file ServerCompilerSettings để đặt giá trị arduino_board
    function setDefaultBoard() {
        try {
            // Xác định đường dẫn tùy theo chế độ
            let settingsPath;
            if (app.isPackaged) {
                // Chế độ đóng gói: Sử dụng thư mục appData
                settingsPath = path.join(app.getPath('appData'), 'ServerCompilerSettings.json');
            } else {
                // Chế độ phát triển: Sử dụng đường dẫn cố định
                settingsPath = path.join('D:', 'KidsCode', 'ServerCompilerSettings.json');
            }

            // Đọc file ServerCompilerSettings.json
            let settings = {};
            if (fs.existsSync(settingsPath)) {
                settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
            }

            // Đặt giá trị mặc định cho arduino_board
            settings.arduino_board = 'Arduino Uno';

            // Ghi lại file
            fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
            console.log(`Default board set to Arduino Uno in ServerCompilerSettings at ${settingsPath}`);

            // Cập nhật config_temp
            config_temp.arduino_board = 'Arduino Uno';
        } catch (error) {
            console.error('Error setting default board:', error);
        }
    }

    // Gọi hàm để đặt giá trị mặc định
    setDefaultBoard();

    // Get config from servermgr.js
    let config;
    try {
        config = getConfig();
    } catch (e) {
        console.error('Failed to load config:', e);
        app.quit();
        return;
    }

    // Normalize sketch_directory if it is "./"
    if (config.sketch_directory === './' || config.sketch_directory === '.') {
        config.sketch_directory = app.getAppPath(); // Application root directory
    } else {
        config.sketch_directory = path.join(app.getAppPath(), config.sketch_directory);
    }

    // Ensure arduino_exec_path is valid
    if (!config.arduino_exec_path || !fs.existsSync(config.arduino_exec_path)) {
        console.error('Invalid or missing arduino_exec_path:', config.arduino_exec_path);
        app.quit();
        return;
    }

    // Tạo hoặc cập nhật file arduino-cli.yaml
    try {
        ensureArduinoCliConfig();
    } catch (error) {
        console.error('Failed to ensure arduino-cli.yaml configuration:', error);
        app.quit();
        return;
    }

    // Danh sách các thư viện cần cài đặt
    const librariesToInstall = [
        'Adafruit BME280 Library',
        'PMS Library',
        'MH-Z14A Library',
        'DS3231',
        'PubSubClient'
    ];

    // Hàm kiểm tra và cài đặt một thư viện
    function checkAndInstallLibrary(arduinoExecPath, libraryName, callback) {
        // Sử dụng file cấu hình arduino-cli.yaml
        const commandCheckLibrary = ['lib', 'list', '--config-file', configFilePath];
        const checkProcess = childProcess.spawn(arduinoExecPath, commandCheckLibrary);

        let checkStdout = '';
        let checkStderr = '';

        checkProcess.stdout.on('data', (data) => {
            checkStdout += data.toString();
        });

        checkProcess.stderr.on('data', (data) => {
            checkStderr += data.toString();
        });

        checkProcess.on('error', (error) => {
            console.error(`Error checking library (${libraryName}):`, error);
            callback(error, false);
        });

        checkProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error checking library (${libraryName}):`, checkStderr);
                callback(new Error(checkStderr), false);
                return;
            }

            // Log đầu ra của `arduino-cli lib list`
            console.log(`Output of "arduino-cli lib list" for ${libraryName}:\n${checkStdout}`);

            // Kiểm tra xem thư viện có trong danh sách không
            const outputLines = checkStdout.split('\n');
            let isInstalled = false;

            // Chuẩn hóa tên thư viện để so sánh
            const normalizedLibraryName = libraryName.toLowerCase().replace(/\s/g, ''); // Xóa dấu cách, chuyển về lowercase
            console.log(`Normalized library name for comparison: ${normalizedLibraryName}`);

            // Bỏ qua dòng tiêu đề (header)
            for (let i = 1; i < outputLines.length; i++) {
                const line = outputLines[i].trim();
                if (!line) continue; // Bỏ qua dòng trống

                // Tách dòng dựa trên khoảng cách (các cột cách nhau bởi nhiều dấu cách)
                const columns = line.split(/\s+/);
                if (columns.length < 4) continue; // Đảm bảo dòng có đủ cột (Name, Installed, Available, Location)

                // Lấy tên thư viện: Gộp các phần của tên cho đến trước cột "Installed"
                let installedLibraryName = '';
                for (let j = 0; j < columns.length; j++) {
                    // Cột "Installed" thường là phiên bản (ví dụ: 2.2.4 hoặc 2.8), kiểm tra linh hoạt hơn
                    if (/^\d+\.\d+/.test(columns[j])) { // Chấp nhận cả 2.2.4 và 2.8
                        break; // Dừng khi gặp cột phiên bản (Installed)
                    }
                    installedLibraryName += (installedLibraryName ? ' ' : '') + columns[j];
                }

                if (installedLibraryName) {
                    const normalizedInstalledLibraryName = installedLibraryName.toLowerCase().replace(/\s/g, '');
                    console.log(`Comparing with installed library: ${installedLibraryName} (normalized: ${normalizedInstalledLibraryName})`);

                    if (normalizedInstalledLibraryName === normalizedLibraryName) {
                        isInstalled = true;
                        break;
                    }
                }
            }

            console.log(`Library ${libraryName} ${isInstalled ? 'is already installed' : 'is not installed'} in ${libraryPath}.`);

            if (isInstalled) {
                callback(null, 'Already installed', null);
                return;
            }

            console.log(`Installing library ${libraryName} into ${libraryPath}...`);
            // Sử dụng file cấu hình khi cài đặt
            const commandInstallLibrary = ['lib', 'install', libraryName, '--config-file', configFilePath];
            installResource(arduinoExecPath, commandInstallLibrary, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error installing library (${libraryName}):`, error);
                    callback(error, null, stderr);
                } else if (stderr && stderr.includes('error')) {
                    console.error(`Library (${libraryName}) installation failed:`, stderr);
                    callback(new Error(stderr), null, stderr);
                } else {
                    console.log(`Library (${libraryName}) installed successfully:`, stdout);

                    // Kiểm tra xem thư viện có thực sự được cài đặt vào thư mục không
                    const expectedLibraryPath = path.join(libraryPath, libraryName.replace(/\s/g, '_'));
                    if (fs.existsSync(expectedLibraryPath)) {
                        console.log(`Confirmed: Library ${libraryName} is present at ${expectedLibraryPath}`);
                    } else {
                        console.error(`Error: Library ${libraryName} was not found at ${expectedLibraryPath} after installation.`);
                        callback(new Error(`Library ${libraryName} was not installed correctly.`), null, null);
                        return;
                    }

                    callback(null, stdout, null);
                }
            });
        });
    }

    // Hàm cài đặt tất cả các thư viện
    function installAllLibraries(arduinoExecPath, callback) {
        let index = 0;

        function installNextLibrary() {
            if (index >= librariesToInstall.length) {
                callback(null);
                return;
            }

            const libraryName = librariesToInstall[index];
            checkAndInstallLibrary(arduinoExecPath, libraryName, (error, stdout, stderr) => {
                if (error) {
                    callback(error, stdout, stderr);
                    return;
                }
                index++;
                installNextLibrary();
            });
        }

        console.log('Checking and installing libraries:', librariesToInstall);
        installNextLibrary();
    }

    // Function to check if a core is installed
    function checkCore(arduinoExecPath, coreToInstall, callback) {
        const commandCheckCore = ['core', 'list', '--config-file', configFilePath];
        const checkProcess = childProcess.spawn(arduinoExecPath, commandCheckCore);

        let checkStdout = '';
        let checkStderr = '';

        checkProcess.stdout.on('data', (data) => {
            checkStdout += data.toString();
        });

        checkProcess.stderr.on('data', (data) => {
            checkStderr += data.toString();
        });

        checkProcess.on('error', (error) => {
            console.error(`Error checking hardware resources (${coreToInstall}):`, error);
            callback(error, false);
        });

        checkProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error checking hardware resources (${coreToInstall}):`, checkStderr);
                callback(new Error(checkStderr), false);
                return;
            }

            const output = checkStdout;
            const isInstalled = output.includes(coreToInstall);
            console.log(`Hardware resources ${coreToInstall} ${isInstalled ? 'are already installed' : 'is not installed'}.`);
            callback(null, isInstalled);
        });
    }

    // Function to check and install hardware resources
    function checkAndInstallCore(arduinoExecPath, coreToInstall, callback) {
        checkCore(arduinoExecPath, coreToInstall, (error, isInstalled) => {
            if (error) {
                callback(error, null, null);
                return;
            }

            if (isInstalled) {
                callback(null, 'Already installed', null);
                return;
            }

            console.log(`Hardware resources ${coreToInstall} are not installed. Installing...`);

            const commandInstallCore = ['core', 'install', coreToInstall, '--config-file', configFilePath];
            console.log('Command to install hardware resources:', commandInstallCore);

            installResource(arduinoExecPath, commandInstallCore, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error installing hardware resources (${coreToInstall}):`, error);
                    callback(error, null, null);
                } else if (stderr && stderr.includes('error')) {
                    console.error(`Hardware resources (${coreToInstall}) installation failed:`, stderr);
                    callback(new Error(stderr), null, stderr);
                } else {
                    console.log(`Hardware resources (${coreToInstall}) installed successfully:`, stdout);
                    callback(null, stdout, null);
                }
            });
        });
    }

    // List of cores to install
    const coresToInstall = [
        { id: 'esp32:esp32', name: 'ESP32' },
        { id: 'arduino:avr', name: 'Arduino Uno' }
    ];

    // Check if all cores are installed
    function checkAllCores(arduinoExecPath, callback) {
        let index = 0;
        let allInstalled = true;

        function checkNextCore() {
            if (index >= coresToInstall.length) {
                callback(null, allInstalled);
                return;
            }

            const core = coresToInstall[index];
            checkCore(arduinoExecPath, core.id, (error, isInstalled) => {
                if (error) {
                    callback(error, false);
                    return;
                }

                if (!isInstalled) {
                    allInstalled = false;
                }

                index++;
                checkNextCore();
            });
        }

        checkNextCore();
    }

    // Check and install all cores if necessary
    function installAllCores(arduinoExecPath, callback) {
        let index = 0;

        function installNextCore() {
            if (index >= coresToInstall.length) {
                callback(null); // All core installations completed
                return;
            }

            const core = coresToInstall[index];
            checkAndInstallCore(arduinoExecPath, core.id, (error, stdout, stderr) => {
                if (error) {
                    callback(error, stdout, stderr); // Stop if there is an error
                    return;
                }
                index++;
                installNextCore(); // Proceed to the next core
            });
        }

        installNextCore();
    }

    // Main code
    if (!fs.existsSync(arduinoPath)) {
        try {
            fs.mkdirSync(arduinoPath, { recursive: true });
            console.log('Directory created:', arduinoPath);

            // Show the dynamic dialog
            createLoadingWindow();

            // Install all cores
            installAllCores(config.arduino_exec_path, (error, stdout, stderr) => {
                if (error) {
                    closeLoadingWindow();
                    console.error('Error executing hardware resources installation:', error);
                    dialog.showMessageBox({
                        type: 'error',
                        title: 'Error',
                        message: 'Error installing hardware resources: ' + (error.message || error),
                        buttons: ['OK']
                    });
                    app.quit();
                    return;
                } else if (stderr && stderr.includes('error')) {
                    closeLoadingWindow();
                    console.error('Hardware resources installation failed:', stderr);
                    dialog.showMessageBox({
                        type: 'error',
                        title: 'Error',
                        message: 'Hardware resources installation failed: ' + stderr,
                        buttons: ['OK']
                    });
                    app.quit();
                    return;
                }

                // Install all libraries after cores are installed
                installAllLibraries(config.arduino_exec_path, (libError, libStdout, libStderr) => {
                    // Close the dynamic dialog after libraries are installed
                    closeLoadingWindow();

                    if (libError) {
                        console.error('Error installing libraries:', libError);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Error installing libraries: ' + (libError.message || libError),
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    } else if (libStderr && libStderr.includes('error')) {
                        console.error('Libraries installation failed:', libStderr);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Libraries installation failed: ' + libStderr,
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    }

                    console.log('All hardware resources and libraries have been installed successfully:', stdout);
                    dialog.showMessageBox({
                        type: 'info',
                        title: 'Notification',
                        message: 'Hardware resources and libraries installed successfully!',
                        buttons: ['OK']
                    });

                    // Create the libraries directory if it doesn't exist
                    if (!fs.existsSync(libraryPath)) {
                        fs.mkdirSync(libraryPath, { recursive: true });
                        console.log('Libraries directory created:', libraryPath);
                    }

                    proceedWithStartup(config);
                });
            });
        } catch (e) {
            closeLoadingWindow();
            console.error('Failed to create directory or install hardware resources:', e);
            dialog.showMessageBox({
                type: 'error',
                title: 'Error',
                message: 'Error creating directory or installing hardware resources: ' + e.message,
                buttons: ['OK']
            });
            app.quit();
        }
    } else {
        console.log('Directory already exists:', arduinoPath);

        // First, check if all cores are installed
        checkAllCores(config.arduino_exec_path, (coreError, allCoresInstalled) => {
            if (coreError) {
                console.error('Error checking hardware resources:', coreError);
                dialog.showMessageBox({
                    type: 'error',
                    title: 'Error',
                    message: 'Error checking hardware resources: ' + (coreError.message || coreError),
                    buttons: ['OK']
                });
                app.quit();
                return;
            }

            // Check if the libraries directory exists
            const librariesDirExists = fs.existsSync(libraryPath);
            console.log(`Libraries directory ${librariesDirExists ? 'already exists' : 'does not exist'} at ${libraryPath}.`);

            if (allCoresInstalled && librariesDirExists) {
                // If all cores are installed and libraries directory exists, check libraries
                installAllLibraries(config.arduino_exec_path, (libError, libStdout, libStderr) => {
                    if (libError) {
                        console.error('Error installing libraries:', libError);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Error installing libraries: ' + (libError.message || libError),
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    } else if (libStderr && libStderr.includes('error')) {
                        console.error('Libraries installation failed:', libStderr);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Libraries installation failed: ' + libStderr,
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    }

                    console.log('All hardware resources are already installed and libraries are up to date. Proceeding with startup...');
                    proceedWithStartup(config);
                });
            } else {
                // If any core needs to be installed or libraries directory doesn't exist, show the loading window and proceed with installation
                createLoadingWindow();

                // Install cores if needed
                installAllCores(config.arduino_exec_path, (coreError, coreStdout, coreStderr) => {
                    if (coreError) {
                        closeLoadingWindow();
                        console.error('Error installing hardware resources:', coreError);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Error installing hardware resources: ' + (coreError.message || coreError),
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    } else if (coreStderr && coreStderr.includes('error')) {
                        closeLoadingWindow();
                        console.error('Hardware resources installation failed:', coreStderr);
                        dialog.showMessageBox({
                            type: 'error',
                            title: 'Error',
                            message: 'Hardware resources installation failed: ' + coreStderr,
                            buttons: ['OK']
                        });
                        app.quit();
                        return;
                    }

                    // Install libraries after cores are installed
                    installAllLibraries(config.arduino_exec_path, (libError, libStdout, libStderr) => {
                        // Close the dynamic dialog
                        closeLoadingWindow();

                        if (libError) {
                            console.error('Error installing libraries:', libError);
                            dialog.showMessageBox({
                                type: 'error',
                                title: 'Error',
                                message: 'Error installing libraries: ' + (libError.message || libError),
                                buttons: ['OK']
                            });
                            app.quit();
                            return;
                        } else if (libStderr && libStderr.includes('error')) {
                            console.error('Libraries installation failed:', libStderr);
                            dialog.showMessageBox({
                                type: 'error',
                                title: 'Error',
                                message: 'Libraries installation failed: ' + libStderr,
                                buttons: ['OK']
                            });
                            app.quit();
                            return;
                        }

                        // Create the libraries directory if it doesn't exist
                        if (!fs.existsSync(libraryPath)) {
                            fs.mkdirSync(libraryPath, { recursive: true });
                            console.log('Libraries directory created:', libraryPath);
                        }

                        console.log('All hardware resources and libraries have been installed successfully:', coreStdout);
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Notification',
                            message: 'Hardware resources and libraries installed successfully!',
                            buttons: ['OK']
                        });
                        proceedWithStartup(config);
                    });
                });
            }
        });
    }
});

// Function to continue starting the application after installing cores
function proceedWithStartup(config) {
    //setDefaultBoard();
    createSplashWindow();

    require('./servermgr.js').startServer();

    let codeType;
    try {
        codeType = fs.readFileSync(path.join(projectLocator.getProjectRootPath(), 'codeType.txt'), { encoding: 'utf8', flag: 'r' });
    } catch (e) {
        console.error('Failed to read codeType.txt:', e);
        codeType = 'arduino'; // Fallback to default
    }

    mainWindow = createWindow('main', {
        width: 1300,
        minWidth: 1300,
        height: 900,
        minHeight: 900,
        title: 'Kidscode-Stem',
        transparent: false,
        backgroundColor: '#EEEEEE',
        frame: true,
        show: false,
        center: true,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            allowDisplayingInsecureContent: false,
            allowRunningInsecureContent: false,
            java: false,
            webgl: false,
            webaudio: true,
            plugins: false,
            experimentalFeatures: false,
            experimentalCanvasFeatures: false,
            overlayScrollbars: true,
            textAreasAreResizable: false,
            directWrite: true
        }
    });

    appMenu.setArdublocklyMenu(true, config, codeType);

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        setTimeout(() => {
            mainWindow.webContents.reload();
        }, 350);
    });

    mainWindow.webContents.on('did-finish-load', () => {
        if (splashWindow !== null) {
            splashWindow.close();
            splashWindow = null;
        }
        mainWindow.show();
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });

    if (codeType.includes('python')) {
        mainWindow.loadURL('http://localhost:1000/kidscode/index.html?lang=vi&code=python');
    } else {
        mainWindow.loadURL('http://localhost:1000/kidscode/index.html?lang=vi&board=Arduino Uno&name=kcbot');
    }
}

app.on('window-all-closed', () => {
    app.quit();
});

function createSplashWindow() {
    if (splashWindow === null) {
        const projectJetPath = projectLocator.getProjectRootJetpack();
        const imagePath = 'file://' + projectJetPath.path('ardublockly', 'img', 'ardublockly_splash.png');
        splashWindow = new BrowserWindow({
            width: 450,
            height: 300,
            frame: false,
            show: true,
            transparent: true,
            images: true,
            center: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            useContentSize: true
        });
        splashWindow.loadURL(imagePath);
    }
}