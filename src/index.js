const { app, shell } = require('electron');
const Window = require('./electron/Window');
const path = require('path');

require('./plugins/Flash');

let mainWindow

function main() {
  mainWindow = new Window({
    file: path.join(__dirname, '..', 'public', 'index.html'),
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  })
}

app.on('ready', main);
app.on('window-all-closed', () => app.quit());
