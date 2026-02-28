import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
  resolve: {
    alias: {
      '@ds': path.resolve(__dirname, 'src/design-system'),
      '@modules': path.resolve(__dirname, 'src/modules'),
    },
  },
  server: {
    port: 3000,
  },
});
