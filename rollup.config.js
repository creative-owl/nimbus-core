import resolve from '@rollup/plugin-node-resolve'

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
    ],
    external: [/^@babel\/runtime\//],
  },
]
