// electron 主进程文件
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true, // 可以在渲染进程中使用nodejs的api 为了安全，默认是false
            contextIsolation: false, // 关闭渲染进程的沙箱
            webSecurity: false, // 关闭浏览器同源策略
        }
    })

    // 获取进程中传递的参数
    if (process.argv[2]) {
        win.loadURL(process.argv[2])  // 开发环境
    } else {
        win.loadFile('index.html')  // 生产环境
    }
})