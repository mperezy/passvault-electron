import fs from 'fs-extra';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Compiler } from 'webpack';

const outputPath = path.resolve(__dirname, '.webpack/renderer/');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  {
    apply: (compiler: Compiler) => {
      compiler.hooks.afterEmit.tap('CopyWebpackPlugin', () => {
        // Get the list of image files in the source directory
        const files = fs.readdirSync(path.resolve(__dirname, 'src/images'));

        // Filter the files by extension
        const imageFiles = files.filter((file) => imageExtensions.includes(path.extname(file)));

        // Copy the filtered image files to the output directory
        imageFiles.forEach((file) => {
          fs.copySync(
            path.resolve(__dirname, 'src/images', file),
            path.resolve(outputPath, 'images', file),
          );
        });
      });
    },
  },
];
