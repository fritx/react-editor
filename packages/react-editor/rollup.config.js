import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

let outputOptions = {
  exports: 'named',
  sourcemap: true,
};

export default {
  input: 'src/index.tsx',
  output: [
    {
      ...outputOptions,
      file: pkg.module,
      format: 'es',
    },
    {
      ...outputOptions,
      file: pkg.main,
      format: 'umd',
      name: 'ReactEditor',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
  ],
};
