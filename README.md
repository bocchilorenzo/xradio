# XRadio
A cross-platform radio desktop app for Windows 10+, Linux and macOS.

## Requirements
- NodeJS v14+. It's required for the extension to work (the dns lookup required by the radio API)
- on Linux, either libayatana-appindicator or libappindicator3-1 might be needed to make Neutralino work correctly

Tested and working on Windows 10 with NodeJS v16 and Ubuntu 22.10 with NodeJS v18.

## To-do
- add neutralino storage instead of browser localstorage (https://stackoverflow.com/questions/65095952/neutralinojs-storage)

- use the state instead of the localstorage for the favorites, and save them to localstorage only when the tab is closed (to have less computations and better performance with a long favorites list), like following:
```
await Neutralino.events.on(`windowClose`, () => {
  // Save the favorites list to the storage
  // Call Neutralino.app.exit() to exit
});
```

- check if Node is installed on the system when launching the app

## Building

### Requirements
- NodeJS
- Neutralino CLI

### Steps
- clone this repository
- run the command "neu update" in the root folder to download neutralino's binaries
- move in the "xradio-vue" folder and install dependencies with "npm i"
- build the frontend with "npm run build"
- move back to the root folder and then to the extensions -> dnslookup folder
- install dependencies with "npm i" and then move back to the root
- build the app with "neu build" (or "neu build --release" if you also want to generate the zip file)

## Notes
- It can also work on Windows 7, 8 and 8.1 if you install WebView2 from https://developer.microsoft.com/it-it/microsoft-edge/webview2/ and download the Evergreen Standalone Installer
- If the rendering seems broken on Windows 10+, you probably don't have WebView2 installed and it's using IE11. In that case, follow the link above
- If you want to build it to use your favorite browser instead of being in a standalone window, simply change "defaultMode": "window" to "defaultMode": "browser" in neutralino.config.json and rebuild the project
