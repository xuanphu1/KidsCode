var fs = require('fs');
const {app,BrowserWindow} = require('electron');
const appMenu = require('./appmenu.js');
const server = require('./servermgr.js');
const projectLocator = require('./projectlocator.js');
const createWindow = require('./helpers/window');

const packageData = require('fs-jetpack').cwd(app.getAppPath()).read('package.json', 'json');
// Global reference of the window object must be maintain, or the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var splashWindow = null;

// Set up the app data directory within the Ardublockly root directory
(function setAppData() {
	var appDataPath = projectLocator.getExecDirJetpack().cwd('appdata');
	app.setPath('appData', appDataPath.path());
	app.setPath('userData', appDataPath.path());
	app.setPath('cache', appDataPath.path('GenCache'));
	app.setPath('userCache', appDataPath.path('AppCache'));
	app.setPath('temp', appDataPath.path('temp'));
})();

// Ensure this is a single instance application
// const shouldQuit = app.makeSingleInstance(function (cmdLine, workingDirectory) {
// 	// User tried to run a second instance, focus existing window.
// 	if (mainWindow) {
// 		if (mainWindow.isMinimized()) mainWindow.restore();
// 		mainWindow.focus();
// 	}
// });
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
 
})

// Electron application entry point
app.on('ready', function () {
	// if (shouldQuit) {
	// 	app.quit();
	// 	return;
	// }

	createSplashWindow();
	server.startServer();
	let config =JSON.parse(fs.readFileSync(projectLocator.getProjectRootPath() + '\\ServerCompilerSettings.json', { encoding: 'utf8', flag: 'r' }));
	let codeType = fs.readFileSync(projectLocator.getProjectRootPath() + '\\codeType.txt', { encoding: 'utf8', flag: 'r' });
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
		'webPreferences': {
			'nodeIntegration': false,
			'webSecurity': true,
			'allowDisplayingInsecureContent': false,
			'allowRunningInsecureContent': false,
			'java': false,
			'webgl': false,
			'webaudio': true,
			'plugins': false,
			'experimentalFeatures': false,
			'experimentalCanvasFeatures': false,
			'overlayScrollbars': true,
			'textAreasAreResizable': false,
			'directWrite': true
		}
	});

	//if (packageData.env.name === 'development') {
		appMenu.setArdublocklyMenu(true, config, codeType);
	//} else {
		//appMenu.setArdublocklyMenu(true, config, codeType);
	//}

	mainWindow.webContents.on('did-fail-load',
		function (event, errorCode, errorDescription) {
			setTimeout(function () {
				mainWindow.webContents.reload();
			}, 350);
		}
	);

	mainWindow.webContents.on('did-finish-load', function () {
		if (splashWindow !== null) {
			splashWindow.close();
			splashWindow = null;
		}
		mainWindow.show();
	});

	mainWindow.on('close', function () {
		mainWindow = null;
	});

	// Set the download directory to the home folder
	// mainWindow.webContents.session.setDownloadPath(
	// 	process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);
	// fs.readFile('ServerCompilerSettings.ini', 'utf8', function(err, data) {
	//     let board;
	//     if(data.indexOf("arduino_board = Nano 328")!=-1) board='Nano 328';
	//     if(data.indexOf("arduino_board = Uno")!=-1) board='Uno';
	//     if(data.indexOf("arduino_board = Mega")!=-1) board='Mega';
	//   if(data.indexOf("arduino_board = ESP8266 WeMos D1")!=-1) board='ESP8266 WeMos D1';
	if (codeType.indexOf("python") > -1) {
		mainWindow.loadURL('http://localhost:1000/kidscode/index.html?lang=vi&code=python');
	}
	else {
		mainWindow.loadURL('http://localhost:1000/kidscode/index.html?lang=vi&board=Arduino Uno&name=kcbot')
	}

	// })



	//mainWindow.loadURL('https://www.kidscode.edu.vn/');

	// mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', function () {
	app.quit();
});

function createSplashWindow() {
	if (splashWindow === null) {
		var projectJetPath = projectLocator.getProjectRootJetpack();
		var imagePath = 'file://' + projectJetPath.path(
			'ardublockly', 'img', 'ardublockly_splash.png');
		splashWindow = new BrowserWindow({
			width: 450,
			height: 300,
			frame: false,
			show: true,
			transparent: true,
			images: true,
			center: true,
			'alwaysOnTop': true,
			'skipTaskbar': true,
			'useContentSize': true
		});
		splashWindow.loadURL(imagePath);
	}
}


