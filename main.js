const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron');
let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({width: 1600, height: 800})
    mainWindow.loadURL(`file://${__dirname}/plotit.html`)
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
    mainWindow = null
    });
    console.log('in main.js - window created');
    var five = require("johnny-five");
    var board = new five.Board();

    //TODO need to find a way to stop the sensor from continuesly working even when there is no request to measure from the renderer.
    board.on("ready", function() {
        var proximity = new five.Proximity({
            controller: "HCSR04",
            pin: 7,
            freq:1000
        });

        proximity.on("data", function() {
            renderEvent && renderEvent.sender.send('responseForCurrentDistance', this.in);
            renderEvent = null;
        });

    });
    var renderEvent;
    ipcMain.on('requestForCurrentDistance', (event, arg) => {
    console.log('Received from Renderer ' + arg);
    renderEvent = event;
});
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

