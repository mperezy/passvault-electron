import { ipcRenderer } from 'electron';
import Status from './events';
import { enableDarkMode, disableDarkMode, setFetchMethod } from './utils/darkreader';

console.log('👋 This message is being logged by "popupPreload.ts", included via webpack');

ipcRenderer.on(Status.TOGGLE_DARK_MODE, (_, args) => {
  const { isEnabled } = args;
  setFetchMethod(window);

  if (isEnabled) enableDarkMode();
  else disableDarkMode();
});