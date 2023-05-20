const { app, BrowserWindow, ipcMain } = require('electron')
const puppeteer = require("puppeteer");
const path = require('path')


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');

  // Get info from main app and start puppeteer code
  ipcMain.on("set-info", (event, data)=>{

    (async () => {

      try {
        const browser = await puppeteer.launch({headless : false});
        const page = await browser.newPage()
  
        await page.goto("https://giris.turkiye.gov.tr/Giris/gir"); 
    
        await page.type("#tridField", data.tcno , {delay:50});
        await page.type("#egpField", data.sifre , {delay:50});    
    
        await page.click (".submitButton");

      } catch (e) {
        
        // Send error messages to the render process;
        mainWindow.webContents.send('set-error', e)
      }     
    })();

  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
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


// "start": "electron-forge start",
