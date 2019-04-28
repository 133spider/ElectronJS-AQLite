'use strict'

const { BrowserWindow } = require('electron')

// Default window settings.
const defaultProps = {
  width: 960,
  height: 580,
  show: false,
  webPreferences: {
    plugins: true
  },
  frame: true,
  minHeight: 580,
  minWidth: 960,
  icon: 'favicon.ico'
}

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    // load the html and open devtools
    this.loadFile(file)
    //this.webContents.openDevTools()

    // show when ready to prevent flickering
    this.once('ready-to-show', () => {
      this.show()
    })

    this.setMenu(null);
  }
}

module.exports = Window
