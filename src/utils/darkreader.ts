import * as DarkReader from 'darkreader';

const themeConfig: Partial<DarkReader.Theme> = {
  brightness: 100,
  contrast: 90,
  sepia: 10
};

export const enableDarkMode = () => DarkReader.enable(themeConfig);
export const disableDarkMode = () => DarkReader.disable();
export const setFetchMethod = (window: Window) => DarkReader.setFetchMethod(window.fetch);