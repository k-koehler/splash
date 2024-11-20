const os = require("os");

function getTime() {
  return new Date().toLocaleTimeString();
}

function whoAmI() {
  return os.userInfo().username;
}

module.exports = {
  getTime,
  whoAmI,
};
