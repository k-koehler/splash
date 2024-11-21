class Theme {
  backgroundVideoSrc;

  constructor({ backgroundVideoSrc }) {
    this.backgroundVideoSrc = backgroundVideoSrc;
  }
}

const mainTheme = new Theme({
  backgroundVideoSrc:
    "https://storage.googleapis.com/splash-theme-assets/Abstract%20Liquid!%20V%20-%204!%201%20Hour%204K%20Relaxing%20Screensaver%20for%20Meditation.%20Amazing%20Fluid!%20Relaxing%20Music.mp4",
});

let theme = mainTheme;

window.addEventListener("DOMContentLoaded", () => {
  const video = document.createElement("video");
  video.src = theme.backgroundVideoSrc;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.classList.add("theme-video-bg");
  document.body.appendChild(video);
});
