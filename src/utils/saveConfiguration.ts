import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import type { Configuration } from 'types';

const configFilePath = path.join(app.getPath('userData'), 'config.json');

export const saveConfig = (configuration: Configuration) => {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(configuration));
  } catch (error) {
    console.error('Something went wrong saving configuration', { error });
  }
};

export const readConfig = (): Configuration => {
  try {
    const configuration = fs.readFileSync(configFilePath, 'utf-8');

    return JSON.parse(configuration);
  } catch (error) {
    console.error('Something went wrong reading configuration', { error });

    return {
      theme: {
        darkMode: false,
        lightMode: true,
      },
    };
  }
};
