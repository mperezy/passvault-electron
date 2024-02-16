import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
// import {MakerZIP} from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
// import { MakerRpm } from '@electron-forge/maker-rpm';
import MakerDMG from '@electron-forge/maker-dmg';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const APP_NAME = 'passvault';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const APP_NAME_ = APP_NAME.toLowerCase().replaceAll(' ', '-');

const config: ForgeConfig = {
  packagerConfig: {
    icon: './src/images/icon.png',
    executableName: 'Passvault',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: APP_NAME_,
      setupIcon: './src/images/icon.ico'
    }),
    // new MakerZIP({}, ['darwin', 'linux']),
    new MakerDeb({
      options: {
        name: APP_NAME_,
        productName: APP_NAME,
        icon: './src/images/icon.png',

      },
    }),
    new MakerDMG({
      name: APP_NAME_,
      format: 'ULFO',
      icon: './src/images/icon.icns',
    })
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/html/loading.html',
            js: './src/renderer.ts',
            name: 'loading_window',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/html/no-internet.html',
            js: './src/renderer.ts',
            name: 'no_internet_window',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            name: 'popup_window',
            preload: {
              js: './src/popupPreload.ts'
            }
          }
        ],
      },
    }),
  ],
};

export default config;
