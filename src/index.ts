import { app, BrowserWindow, Menu, globalShortcut } from 'electron';
import * as process from 'process';
import env from '../env.json';
import type { AppObject } from 'types';
import { readConfig } from 'utils/saveConfiguration';
import Status from 'ipc-events';
import ipcMainListener from 'ipc-events/ipcMainListener';
import windowListener from 'ipc-events/windowListener';
import mainMenu from 'main-menu';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
// eslint-disable-next-line
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const LOADING_WINDOW_WEBPACK_ENTRY: string;
declare const NO_INTERNET_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const { PASSVAULT_URL, ENV } = env;
const isProduction = ENV === 'production';

const mainWindowHeight = 1033;
const mainWindowWidth = 633 + (isProduction ? 0 : 770);
const mainWindowMinWidth = 633 + (isProduction ? 0 : 770);
const mainWindowMinHeight = 1033;

const configuration = readConfig();
const { darkMode } = configuration.theme;

const appObject: AppObject = {
  isAppLoaded: false,
  isNoInternetPageShown: false,
  isDarkModeEnabled: darkMode,
  isProduction,
  popupWindows: [],
};

// Handle creating/removing shortcuts on Windows  when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: mainWindowHeight,
    width: mainWindowWidth,
    minHeight: mainWindowMinHeight,
    minWidth: mainWindowMinWidth,
    icon: 'src/images/icon.png',
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow
    .loadURL(LOADING_WINDOW_WEBPACK_ENTRY)
    .then()
    .catch((error) => console.log({ errorOnLoadURL: error }));

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(mainMenu(mainWindow, appObject));
  } else {
    mainWindow.setMenu(mainMenu(mainWindow, appObject));
  }

  if (appObject.isDarkModeEnabled) {
    mainWindow.webContents.send(Status.TOGGLE_DARK_MODE, { isEnabled: true });
  }

  // mainWindow ipc-events
  windowListener({
    window: mainWindow,
    appObject,
    preloadEntry: POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY,
  });

  // IPC Events
  ipcMainListener(mainWindow, appObject, {
    mainUrl: PASSVAULT_URL,
    noInternetUrl: NO_INTERNET_WINDOW_WEBPACK_ENTRY,
  });

  // Open the DevTools.
  if (!appObject.isProduction) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', () => createWindow());

app.whenReady().then(createWindow);

app.on('browser-window-focus', () => globalShortcut.register('Cmd+QOrCtrl+Q', () => app.quit()));

app.on('browser-window-blur', () => globalShortcut.unregisterAll());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their main-menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => app.quit());

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
