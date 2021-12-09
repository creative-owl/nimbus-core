import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: './dist/index.cjs',
        format: 'cjs',
      },
      {
        file: './dist/index.esm',
        format: 'esm',
      },
    ],
    plugins: [
      resolve(),
      terser(),
    ],
    external: [/^@babel\/runtime\//],
  },
]
