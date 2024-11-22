const { contextBridge } = require("electron");
try {
  contextBridge.exposeInMainWorld("statusApi", require("./src/node/status"));
  contextBridge.exposeInMainWorld("actionsApi", require("./src/node/actions"));
} catch (e) {
  console.error(e);
}
