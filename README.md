# XRadio
A cross-platform radio desktop app for Windows 10+, Linux and macOS.

## Requirements
- on Linux, either libayatana-appindicator or libappindicator3-1 might be needed to make Neutralino work correctly

Tested and working on Windows 10 and Ubuntu 22.10.

## To-do
- add neutralino storage instead of browser localstorage (https://stackoverflow.com/questions/65095952/neutralinojs-storage)

- use the state instead of the localstorage for the favorites, and save them to localstorage only when the tab is closed (to have less computations and better performance with a long favorites list), like following:

```js
await Neutralino.events.on(`windowClose`, () => {
  // Save the favorites list to the storage
  // Call Neutralino.app.exit() to exit
});
```

- check if Node is installed on the system when launching the app

## Building

### Requirements
- NodeJS v18+. It's required for the extension to work (the dns lookup required by the radio API)
- Neutralino CLI

### Steps
- clone this repository
- run the command `neu update` in the root folder to download neutralino's binaries
- move in the `xradio-vue` folder and install dependencies with `npm i`
- build the frontend with `npm run build`
- move back to the root folder and then to the extensions -> dnslookup folder
- if you don't have pkg installed, install it with `npm i -g pkg`
- install dependencies with `npm i`
- build the extension with `pkg .`
- go back to the root folder and build the app with `neu build` (or `neu build --release` if you also want to generate the zip file)

If you don't want to build the extension because you want to use the app on a computer with node installed and prefer to keep the overall size of the app lower, you have to go in the `neutralino.config.json` and change:

```json
"extensions": [
  {
    "id": "js.neutralino.dnslookup",
    "commandLinux": "${NL_PATH}/extensions/dnslookup/dnslookup-linux",
    "commandDarwin": "${NL_PATH}/extensions/dnslookup/dnslookup-macos",
    "commandWindows": "${NL_PATH}/extensions/dnslookup/dnslookup-win.exe"
  }
],
```

into

```json
"extensions": [
  {
    "id": "js.neutralino.dnslookup",
    "commandLinux": "node ${NL_PATH}/extensions/dnslookup/main.js --linux",
    "commandDarwin": "node ${NL_PATH}/extensions/dnslookup/main.js --darwin",
    "commandWindows": "node ${NL_PATH}/extensions/dnslookup/main.js --windows"
  }
],
```

Then you can skip the pkg part in the building steps.

## Notes
- It can also work on Windows 7, 8 and 8.1 if you install WebView2 from https://developer.microsoft.com/it-it/microsoft-edge/webview2/ and download the Evergreen Standalone Installer
- If the rendering seems broken on Windows 10+, you probably don't have WebView2 installed and it's using IE11. In that case, follow the link above
- If you want to build it to use your favorite browser instead of being in a standalone window, simply change
```json
"defaultMode": "window"
```
to
```json
"defaultMode": "browser"
```
in `neutralino.config.json` and rebuild the project
