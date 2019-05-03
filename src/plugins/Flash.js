const { app } = require('electron');
const flashTrust = require('nw-flash-trust');
const path = require('path');

const appName = "aqlite";

app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'));

const flashPath = path.join(app.getPath('userData'), 'Pepper Data', 'Shockwave Flash', 'WritableRoot');
const trustManager = flashTrust.initSync(appName, flashPath);

trustManager.add(path.join(__dirname, '..', 'public', 'flash', 'aqlite', 'aqlite.swf'));
trustManager.add(path.join(__dirname, '..', 'public', 'flash', 'aqlite', 'loader.swf'));