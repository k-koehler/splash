const moment = require("moment");
const os = require("os");
const si = require("systeminformation");
const bytes = require("bytes");

// user, cpu identifier, gpu identifier, os
async function staticInfo() {
  const cpu = await si.cpu();
  const osInfo = await si.osInfo();
  return {
    user: os.userInfo().username,
    cpu: `${cpu.manufacturer} ${cpu.brand}`,
    gpu: (await si.graphics()).controllers[0].model,
    os: `${osInfo.distro} ${osInfo.release}`,
  };
}

// time, date, uptime, memory usage, cpu usage, gpu memory usage, gpu usage
async function dynamicInfo() {
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  const memory = os.totalmem() - os.freemem();
  const cpu = await si.currentLoad();
  const gpu = await si.graphics();
  return {
    time,
    date,
    memory,
    cpuLoad: cpu.currentload?.toFixed(2),
    gpuMemory: bytes(gpu.controllers[0].memory?.used),
    gpuLoad: gpu.controllers[0].load?.toFixed(2),
  };
}

module.exports = {
  staticInfo,
  dynamicInfo,
};
