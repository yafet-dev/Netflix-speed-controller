// Function to set the playback speed
function setPlaybackSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = speed;
    console.log(`Playback speed set to ${speed}`);
  } else {
    console.log("Video element not found");
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "setSpeed") {
    setPlaybackSpeed(message.speed);
    sendResponse({ status: `Speed set to ${message.speed}` });
  }
});
