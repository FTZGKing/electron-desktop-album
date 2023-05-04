const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        // alwaysOnTop: true,
        x: 1600,
        y: 100,
        transparent: true,
        backgroundColor: '#C4E1C5',
        frame: false,
        resizable: true,
        icon: path.join(__dirname, '../public/albumLogo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    win.loadURL('http://127.0.0.1:6012/')
    // mainWindow.webContents.toggleDevTools()

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

