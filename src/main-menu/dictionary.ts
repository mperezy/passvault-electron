import type { MenuItem } from 'types';

export default {
  es: {
    app: {
      submenu: [
        {
          title: 'Refrescar',
        },
        {
          title: 'Salir',
        },
      ],
    },
    file: {
      title: 'Archivo',
      submenu: {
        title: 'Tema',
        options: {
          dark: 'Oscuro',
          light: 'Claro',
        },
      },
    },
  },
  'en-US': {
    app: {
      submenu: [
        {
          title: 'Reload',
        },
        {
          title: 'Exit',
        },
      ],
    },
    file: {
      title: 'File',
      submenu: {
        title: 'Theme',
        options: {
          dark: 'Dark',
          light: 'Light',
        },
      },
    },
  },
} as { [key: string]: MenuItem };
