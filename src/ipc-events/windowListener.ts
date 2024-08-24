import { BrowserWindow } from 'electron';
import Status from 'ipc-events';
import type { AppObject } from 'types';

export default ({
  window,
  appObject,
  preloadEntry,
}: {
  window: BrowserWindow;
  appObject: AppObject;
  preloadEntry: string;
}) => {
  window.webContents.on('did-create-window', (createdWindow, createdWindowDetails) => {
    createdWindow.destroy();

    const { url } = createdWindowDetails;
    const popupWindow = new BrowserWindow({
      height: 950,
      width: 1300,
      minHeight: 500,
      minWidth: 800,
      webPreferences: {
        nodeIntegration: true,
        preload: preloadEntry,
      },
    });

    popupWindow.setMenu(null);
    popupWindow.webContents.send(Status.TOGGLE_DARK_MODE, {
      isEnabled: appObject.isDarkModeEnabled,
    });

    popupWindow.loadURL(url).then(() => {
      popupWindow.show();
      appObject.popupWindows.push(popupWindow);
    });
  });

  window.on('closed', () => {
    const { popupWindows } = appObject;

    if (popupWindows && popupWindows.length > 0) {
      popupWindows.forEach((popWindow) => popWindow.destroy());
    }
  });
};
