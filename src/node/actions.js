const os = require("node:os");

function platformSelect(platformMap) {
  return platformMap[os.platform()];
}

async function openApp(id) {
  const open = await import("open");
  const idMap = {
    firefox: {
      openid: open.apps.firefox,
      arguments: ["--kiosk"],
    },
  };
  const app = idMap[id];
  if (app) {
    open.openApp(app.openid, { arguments: app.arguments });
  } else {
    throw new Error(`No app found for id: ${id}`);
  }
}

module.exports = {
  openApp,
};
