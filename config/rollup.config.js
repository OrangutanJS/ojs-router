import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    cleanup({
      comments: 'none'
    }),
  ],
  output: {
    file: 'npm/oRouter.development.js',
    format: 'cjs'
  },
}