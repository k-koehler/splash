// src/web/status.js
const widgetHtml = `
    <div class="widget">
        <p id="time"></p>
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-user"></i>
          <p id="whoami"></p>
        </span>
    </div>
`;

window.addEventListener("DOMContentLoaded", function () {
  const widget = document.createElement("div");
  widget.innerHTML = widgetHtml;
  document.body.appendChild(widget);
  setInterval(() => {
    document.getElementById("time").textContent =
      new Date().toLocaleTimeString();
  }, 1000);
  document.getElementById("whoami").textContent = window.statusApi.whoAmI();
});
