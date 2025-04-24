// This helper remembers the size and position of your windows (and restores
// them in that place after app relaunch).
// Can be used for more than one window, just construct many
// instances of it and give each different name.

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const jetpack = require('fs-jetpack');
const path = require("path");

module.exports = function(name, options) {
    // ✳️ Đảm bảo đường dẫn lưu đúng chỗ và luôn là thư mục
    const userDataPath = app.getPath('userData'); // đường dẫn thật
    const userDataDir = jetpack.cwd(userDataPath); // Jetpack sẽ dùng đúng thư mục này

    const stateStoreFile = 'window-state-' + name + '.json';
    const defaultSize = {
        width: options.width,
        height: options.height
    };
    let state = {};
    let win;

    const restore = function () {
        let restoredState = {};
        try {
            restoredState = userDataDir.read(stateStoreFile, 'json');
        } catch (err) {
            // fallback to default
        }
        return Object.assign({}, defaultSize, restoredState);
    };

    const getCurrentPosition = function () {
        const position = win.getPosition();
        const size = win.getSize();
        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };

    const ensureVisibleOnSomeDisplay = function (windowState) {
        const visible = electron.screen.getAllDisplays().some(function (display) {
            return windowState.x >= display.bounds.x &&
                   windowState.y >= display.bounds.y &&
                   windowState.x + windowState.width <= display.bounds.x + display.bounds.width &&
                   windowState.y + windowState.height <= display.bounds.y + display.bounds.height;
        });
        return visible ? windowState : {
            ...defaultSize,
            x: 100,
            y: 100
        };
    };

    const saveState = function () {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }

        try {
            userDataDir.write(stateStoreFile, state, { atomic: true });
        } catch (e) {
            console.error("❌ Failed to save window state:", e);
        }
    };

    state = ensureVisibleOnSomeDisplay(restore());

    win = new BrowserWindow(Object.assign({}, options, state));
    win.on('close', saveState);

    return win;
};
