import { BrowserWindow } from 'electron';
import { Menu, app } from 'electron';
import Status from 'ipc-events';
import dictionary from 'main-menu/dictionary';
import { saveConfig } from 'utils/saveConfiguration';
import type { AppObject } from 'types';

const changeTheme = (window: BrowserWindow, isEnabled: boolean) => {
  window.webContents.send(Status.TOGGLE_DARK_MODE, { isEnabled });
};

export default (window: BrowserWindow, appObject: AppObject, mainUrl: string) => {
  const locale = app.getLocale();
  const wording = dictionary[locale];
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Passvault',
      submenu: [
        {
          label: wording.app.submenu[0].title,
          accelerator: 'CmdOrCtrl+R',
          click: () =>
            window
              .loadURL(mainUrl)
              .then(() => console.log('**** Passvault URL was loaded as expected.'))
              .catch((error) =>
                console.error('**** Passvault URL was NOT loaded as expected.', { error }),
              ),
        },
        {
          label: wording.app.submenu[1].title,
          accelerator: 'CmdOrCtrl+M',
          click: () => {
            const allWindows = BrowserWindow.getAllWindows();

            allWindows.forEach((window) => {
              if (!window.isMinimized()) {
                window.minimize();
              }
            });
          },
        },
        {
          label: wording.app.submenu[2].title,
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: wording.file.title,
      submenu: [
        {
          label: wording.file.submenu.title,
          submenu: [
            {
              id: 'theme-dark',
              label: wording.file.submenu.options.dark,
              click: () => {
                changeTheme(window, true);
                appObject.isDarkModeEnabled = true;
                saveConfig({ theme: { darkMode: true, lightMode: false } });
              },
            },
            {
              id: 'theme-light',
              label: wording.file.submenu.options.light,
              click: () => {
                changeTheme(window, false);
                appObject.isDarkModeEnabled = false;
                saveConfig({ theme: { darkMode: false, lightMode: true } });
              },
            },
          ],
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(template);
};
