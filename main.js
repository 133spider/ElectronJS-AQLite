'use strict'

const { app } = require('electron')

var flashTrust = require('nw-flash-trust');

const Window = require('./Window')

const path = require('path')

const {shell} = require('electron');

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

var appName = "aqlite"

var flashPath = path.join(app.getPath('userData'), 'Pepper Data', 'Shockwave Flash', 'WritableRoot');

var trustManager = flashTrust.initSync(appName, flashPath);

trustManager.add(path.resolve(__dirname, 'aqlite.swf'));
trustManager.add(path.resolve(__dirname, 'loader.swf'));

let mainWindow


function main() {
  let mainWindow = new Window({
    file:'index.html'
  })
  mainWindow.webContents.on('new-window', (event, url) => {
    // stop Electron from opening another BrowserWindow
    event.preventDefault()
    // open the url in the default system browser
    shell.openExternal(url)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
