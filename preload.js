// All the Node.js APIs are available in the preload process.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendInfo: (data) => ipcRenderer.send('set-info', data),
  getError: (callback) => ipcRenderer.on('set-error', callback)
});

