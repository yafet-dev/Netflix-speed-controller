// Adds speed controls to Netflix player
function setPlaybackSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = speed;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "setSpeed") {
    setPlaybackSpeed(message.speed);
  }
});
