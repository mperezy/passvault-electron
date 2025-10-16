import type { BrowserWindow } from 'electron';
import { Menu } from 'electron';
import { ipcMain } from 'electron';
import Status from 'ipc-events';
import mainMenu from 'main-menu';
import process from 'process';
import type { AppObject, Urls } from 'types';

export default (window: BrowserWindow, appObject: AppObject, urls: Urls) => {
  ipcMain.on(Status.ONLINE_STATUS_CHANGED, (event, data: { onlineStatus: boolean }) => {
    const { onlineStatus } = data;
    const { isAppLoaded, isNoInternetPageShown } = appObject;

    if (!appObject.isProduction) console.log({ onlineStatus, appObject });

    if (!onlineStatus) {
      if (!isNoInternetPageShown) {
        window
          .loadURL(urls.noInternetUrl)
          .then()
          .catch((error) => console.error('Something went wrong', { error }));
        appObject.isNoInternetPageShown = true;
        appObject.isAppLoaded = false;
      }
    } else if (!isAppLoaded) {
      window
        .loadURL(urls.mainUrl)
        .then(() => {
          window.show();
          appObject.isNoInternetPageShown = false;
          appObject.isAppLoaded = true;
        })
        .catch((error) => console.error('Something went wrong', { error }));
    }

    if (appObject.isDarkModeEnabled) {
      window.webContents.send(Status.TOGGLE_DARK_MODE, { isEnabled: appObject.isDarkModeEnabled });
    }
  });

  ipcMain.on(Status.MENU_RELOAD, () => {
    if (process.platform === 'darwin') {
      Menu.setApplicationMenu(mainMenu(window, appObject));
    } else {
      window.setMenu(mainMenu(window, appObject));
    }
  });
};
