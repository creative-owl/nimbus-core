import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/index.js',
    output: {
      file: 'index.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      terser(),
    ],
    external: [/^@babel\/runtime\//],
  },
]
