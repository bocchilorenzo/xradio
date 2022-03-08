# XRadio
A cross-platform radio desktop app for Windows 10+, Linux and macOS.

## Requirements
- NodeJS (any reasonably recent version should do). It's required for the extension to work (the dns lookup required by the radio api)

## To-do
- update check on startup

- make search back button sticky to top

- slim scrollbars

- add neutralino storage instead of browser localstorage (https://stackoverflow.com/questions/65095952/neutralinojs-storage)

- use the state instead of the localstorage for the favorites, and save them to localstorage only when the tab is closed (to have less computations and better performance with a long favorites list), like following:
```
await Neutralino.events.on(`windowClose`, () => {
  // Save the favorites list to the storage
  // Call Neutralino.app.exit() to exit
});
```

## Building
- first build the frontend in the "XRadio-vue" folder with the command "npm run build"
- install dependencies in the "extensions" folder with "npm i"
- build from the root directory with "neu build" (or "neu build --release" if you also want to generate the zip file)

## Notes
- It can also work on Windows 7, 8 and 8.1 if you install WebView2 from https://developer.microsoft.com/it-it/microsoft-edge/webview2/ and download the Evergreen Standalone Installer
- If the rendering seems broken on Windows 10+, you probably don't have WebView2 installed and it's using IE11. In that case, follow the link above
- If you want to build it to use your favorite browser instead of being in a standalone window, simply change "defaultMode": "window" to "defaultMode": "browser" in neutralino.config.json and rebuild the project