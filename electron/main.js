const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    /*
      以前项目运行的仅仅是一个固定的html文件，现在要结合react,所以此处加载的是一个运行地址；
      此处可以通过环境去配置具体加载什么页面；
      加载这个地址，必须要让这个地址的项目运行起来，否则桌面端会出现白屏。
    */

    // mainWindow.loadFile('public/index.html')    【废弃不用】
    mainWindow.loadURL('http://localhost:3000/')

    // 打开调试控制台
    mainWindow.webContents.openDevTools();
}



app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

