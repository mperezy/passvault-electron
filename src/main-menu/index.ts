import type { BrowserWindow } from 'electron';
import { Menu, app } from 'electron';
import Status from 'ipc-events';
import { saveConfig } from 'utils/saveConfiguration';
import type { AppObject } from 'types';
import dictionary from 'main-menu/dictionary';

const changeTheme = (window: BrowserWindow, isEnabled: boolean) => {
  window.webContents.send(Status.TOGGLE_DARK_MODE, { isEnabled });
};

export default (window: BrowserWindow, locale: string, appObject: AppObject) => {
  const wording = dictionary[locale];
  const template: Electron.MenuItemConstructorOptions[] = [
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
                saveConfig( { theme: { darkMode: true, lightMode: false } });
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
            }
          ]
        },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd + Q' : 'Ctrl + Q',
          click: () => app.quit(),
        }
      ]
    }];

  return Menu.buildFromTemplate(template);
};
