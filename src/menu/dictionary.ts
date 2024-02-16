import { MenuItem } from '../types';

export default {
  es: {
    file: {
      title: 'Archivo',
      submenu: {
        title: 'Tema',
        options: {
          dark: 'Oscuro',
          light: 'Claro',
        },
      }
    }
  },
  'en-US': {
    file: {
      title: 'File',
      submenu: {
        title: 'Theme',
        options: {
          dark: 'Dark',
          light: 'Light'
        },
      }
    }
  }
} as { [key: string]: MenuItem };