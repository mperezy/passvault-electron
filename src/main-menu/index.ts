import env from 'env';
import { BrowserWindow } from 'electron';
import { Menu, app, ipcMain } from 'electron';
import Status from 'ipc-events';
import dictionary from 'main-menu/dictionary';
import { readConfig, saveConfig } from 'utils/save-configuration';
import type { AppObject } from 'types';

const handleChangeTheme = (window: BrowserWindow, appObject: AppObject, isEnabled: boolean) => {
  const currentConfig = readConfig();

  window.webContents.send(Status.TOGGLE_DARK_MODE, { isEnabled });
  appObject.isDarkModeEnabled = isEnabled;
  saveConfig({ ...currentConfig, theme: { darkMode: isEnabled, lightMode: !isEnabled } });

  ipcMain.emit(Status.MENU_RELOAD);
};

const handleChangeEnvironment = async (window: BrowserWindow, url: string, isProd: boolean) => {
  const currentConfig = readConfig();

  return window
    .loadURL(url)
    .then(() => {
      console.log(`**** Passvault ${isProd ? 'PROD' : 'ET'} URL was loaded as expected.`);
      saveConfig({ ...currentConfig, isUrlProduction: isProd });
      ipcMain.emit(Status.MENU_RELOAD);
    })
    .catch((error) =>
      console.error(`**** Passvault ${isProd ? 'PROD' : 'ET'} URL was NOT loaded as expected.`, {
        error,
      }),
    );
};

export default (window: BrowserWindow, appObject: AppObject) => {
  const currentConfig = readConfig();
  const { theme, isUrlProduction } = currentConfig;
  const { IS_ADMIN, PASSVAULT_URL, ET_PASSVAULT_URL } = env;
  const isAdmin = IS_ADMIN === 'true';

  const mainUrl = isAdmin ? (isUrlProduction ? PASSVAULT_URL : ET_PASSVAULT_URL) : PASSVAULT_URL;

  const locale = app.getLocale();
  const wording = dictionary[locale];
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Passvault',
      submenu: [
        {
          label: 'Environment',
          submenu: [
            {
              label: `Production ${isUrlProduction ? '✅' : ''}`,
              click: () => handleChangeEnvironment(window, PASSVAULT_URL, true),
            },
            {
              label: `ET ${isUrlProduction ? '' : '✅'}`,
              click: () => handleChangeEnvironment(window, ET_PASSVAULT_URL, false),
            },
          ],
        },
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
              label: `${wording.file.submenu.options.dark} ${theme.darkMode ? '✅' : ''}`,
              click: () => handleChangeTheme(window, appObject, true),
            },
            {
              id: 'theme-light',
              label: `${wording.file.submenu.options.light} ${theme.lightMode ? '✅' : ''}`,
              click: () => handleChangeTheme(window, appObject, false),
            },
          ],
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(template);
};
