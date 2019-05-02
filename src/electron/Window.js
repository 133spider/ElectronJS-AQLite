const { BrowserWindow } = require('electron');
const path = require('path');

const defaultProps = {
  width: 960,
  height: 580,
  show: false,
  webPreferences: {
    plugins: true,
  },
  frame: true,
  minHeight: 580,
  minWidth: 960,
  icon: path.join(__dirname, '..', '..', 'public', 'favicon.ico'),
}

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings });
    this.loadFile(file);

    this.once('ready-to-show', () => this.show());
    this.setMenu(null);
  }
}

module.exports = Window
