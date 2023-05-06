const { app, BrowserWindow, ipcMain, } = require('electron')
const path = require('path')

// 定义程序窗口
let mainWin
// 创建程序窗口
const createWindow = () => {
    mainWin = new BrowserWindow({
        width: 1200,
        height: 900,
        // alwaysOnTop: true,
        x: 1600,
        y: 100,
        // transparent: true,
        backgroundColor: '#C4E1C5',
        // frame: false,
        resizable: true,
        icon: path.join(__dirname, '../public/albumLogo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    mainWin.loadURL('http://127.0.0.1:6012/')
    // mainWin.webContents.toggleDevTools()
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

// 程序窗口最小化
ipcMain.on('min-window', () => mainWin.minimize())
// 切换窗口最大化
ipcMain.on('max-window', () => {
    if (mainWin.isMaximized()) mainWin.unmaximize()
    else mainWin.maximize()
})

// 确认关闭程序窗口
let confirmCloseWindow
// 确认是否关闭程序窗口
ipcMain.on('close-window', () => {
    // 计算父窗口位置，使得子窗口出现在父窗口正中央
    let parent_x = mainWin.getPosition()[0]
    let parent_y = mainWin.getPosition()[1]
    let parent_size_x = mainWin.getSize()[0]
    let parent_size_y = mainWin.getSize()[1]
    let settings_size_x = 400
    let settings_size_y = 200
    let settings_new_x = parent_x + (parent_size_x - settings_size_x) / 2
    let settings_new_y = parent_y + (parent_size_y - settings_size_y) / 2

    const _x = parseInt(settings_new_x)
    const _y = parseInt(settings_new_y)

    confirmCloseWindow = new BrowserWindow({
        width: 400,
        height: 200,
        x: _x,
        y: _y,
        parent: mainWin,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    confirmCloseWindow.loadFile(path.join(__dirname, 'close.html'))
})

// 取消退出程序
ipcMain.on('cancel-close', () => confirmCloseWindow.close())
// 确认退出程序
ipcMain.on('confirm-close', () => app.quit())
