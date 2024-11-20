const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("statusApi", require("./src/node/status"));
