const supportedSites = ["www.netflix.com/watch", "www.youtube.com/watch"];

function getTab() {
  return new Promise((res) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) =>
      res(tab)
    );
  });
}

function saveData(key, value) {
  return new Promise((res) => {
    chrome.storage.sync.set({ [key]: value }, res);
  });
}

function getData(key) {
  return new Promise((res) => {
    chrome.storage.sync.get(key, (data) => res(data[key]));
  });
}

function isSupportedSite(url) {
  return supportedSites.some((site) => url.includes(site));
}

async function sendMessage(data) {
  const tab = await getTab();
  if (tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, data, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Content script not found. Injecting content script.");

        // Dynamically inject content script if not found
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });

        // Retry sending the message after injecting
        chrome.tabs.sendMessage(tab.id, data, (retryResponse) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Failed to communicate with content script after injection."
            );
          } else {
            console.log(retryResponse?.status || "Speed updated");
          }
        });
      } else {
        console.log(response?.status || "Speed updated");
      }
    });
  }
}

async function main() {
  const tab = await getTab();
  const isSupported = tab && isSupportedSite(tab.url);

  // Update the UI to show if the site is supported or not
  const supportClass = isSupported ? "check" : "error";
  document.querySelector("#supported").classList.add(supportClass);

  if (!isSupported) {
    document.querySelector("main").classList.add("hide");
    return;
  }

  // Initialize range input and label
  const range = document.querySelector("#plackbackSpeed");
  const label = document.querySelector("#speedLabel");
  let defaultSpeed = (await getData("speed")) || 1;

  // Set the initial values for range input and label
  label.innerText = defaultSpeed;
  range.value = defaultSpeed;

  // Update playback speed when range changes
  range.addEventListener("input", async (e) => {
    const speed = Number(e.target.value);
    label.innerText = speed;
    await saveData("speed", speed);
    await sendMessage({ type: "setSpeed", speed });
  });
}

window.onload = main;
