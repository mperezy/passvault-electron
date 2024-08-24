import type { Configuration } from 'webpack';
import path from 'path';

export const resolver: Configuration = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
