// src/web/status.js
const widgetHtml = `
    <div class="widget">
        <span class="info">
          <i class="fas fa-clock"></i>
          <p id="time"></p>
        </span>
        <span class="info">
          <i class="fas fa-calendar"></i>
          <p id="date"></p>
        </span>
        <span class="info">
          <i class="fas fa-user"></i>
          <p id="user"></p>
        </span>
        <span class="info">
          <i class="fas fa-microchip"></i>
          <p id="cpu"></p>
        </span>
        <span class="info">
          <i class="fas fa-tv"></i>
          <p id="gpu"></p>
        </span>
        <span class="info">
          <i class="fab fa-windows"></i>
          <p id="os"></p>
        </span>
    </div>
`;

async function handleStaticInfo() {
  const staticInfo = await window.statusApi.staticInfo();
  document.getElementById("user").innerText = staticInfo.user;
  document.getElementById("gpu").innerText = staticInfo.gpu;
  document.getElementById("cpu").innerText = staticInfo.cpu;
  document.getElementById("os").innerText = staticInfo.os;
}

function handleDynamicInfo() {
  setInterval(async () => {
    const dynamicInfo = await window.statusApi.dynamicInfo();
    document.getElementById("time").innerText = dynamicInfo.time;
    document.getElementById("date").innerText = dynamicInfo.date;
  }, 1000);
}

window.addEventListener("DOMContentLoaded", async () => {
  const widget = document.createElement("div");
  widget.innerHTML = widgetHtml;
  document.body.appendChild(widget);
  handleStaticInfo();
  handleDynamicInfo();
});
