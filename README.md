# 📺 Netflix Speed Controller

> A simple Chrome extension to control playback speed on Netflix! Skip the slow parts, speed through episodes, or slow down to catch every detail. 🎬

![Netflix Speed Controller Screenshot](./assets/screenshot.png)

## 🚀 Features

- **Quick Speed Adjustment**: Choose from preset speeds (0.5x, 1x, 1.5x, 2x).
- **Easy UI**: Simple, intuitive popup for changing speed on the fly.
- **Seamless Integration**: Works directly on Netflix—just open a video and set your preferred speed.

## 🛠️ Tech Stack

- **JavaScript** for core functionality
- **Chrome Extensions API** for Chrome integration
- **HTML/CSS** (Tailwind CSS optional) for the popup UI

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yafet-dev/Netflix-speed-controller.git
   cd Netflix-speed-controller
   ```

2. **Load the extension in Chrome**:

   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle at the top right)
   - Click on **Load unpacked** and select the `netflix-speed-controller` folder

3. **Start watching on Netflix**:
   - Go to [Netflix](https://www.netflix.com), start a video, and click the extension icon to adjust playback speed.

## 📄 Manifest

The `manifest.json` file configures the extension for Chrome:

```json
{
  "manifest_version": 3,
  "name": "Netflix Speed Controller",
  "version": "1.0",
  "description": "Control playback speed on Netflix",
  "permissions": ["activeTab", "scripting"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["*://*.netflix.com/*"],
      "js": ["content.js"]
    }
  ]
}
```

## 📜 Usage

1. **Open Netflix**: Start any video on Netflix.
2. **Click the Extension Icon**: Adjust the speed using the popup’s buttons.
3. **Choose Your Speed**: Available options include Normal (1x), Slow (0.5x), Fast (1.5x), and Faster (2x).

## 📂 Project Structure

```plaintext
netflix-speed-controller/
├── manifest.json         # Chrome extension configuration
├── content.js            # Injects functionality into Netflix video player
├── popup.html            # UI for the popup
├── popup.js              # Controls for adjusting playback speed
└── styles.css            # (Optional) Tailwind CSS for styling
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](../../issues/).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

🎉 Enjoy faster, more flexible watching with **Netflix Speed Controller**!
