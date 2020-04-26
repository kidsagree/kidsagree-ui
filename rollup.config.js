// import resolve from 'rollup-plugin-node-resolve'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import url from 'rollup-plugin-url'
import url from '@rollup/plugin-url'
import progress from 'rollup-plugin-progress'
import pkg from './package.json'
import json from '@rollup/plugin-json'

const namedExports = {
    'node_modules/react-is/index.js': [
        'typeOf',
        'isElement',
        'isValidElementType',
    ],
    'node_modules/react/index.js': [
        'Children',
        'Component',
        'PropTypes',
        'createElement',
        'isValidElement',
        'Fragment',
        'useState',
        'useEffect',
        'useContext',
        'useLayoutEffect',
        'useMemo',
        'useRef',
        'useReducer',
        'render',
        'hydrate',
    ],
    'node_modules/react-dom/index.js': ['render', 'hydrate'],
    'node_modules/react-dom/server.js': [
        'renderToString',
        'renderToStaticMarkup',
    ],
    'node_modules/body-parser/index.js': ['json'],
};

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    json(),
    progress(),
    url({
      limit: 5 * 1024, // inline files smaller than 5k
      publicPath: '',
      include: [
        '**/*.svg',
        '**/*.png',
        '**/*.jpg',
        '**/*.gif',
        '**/*.woff',
        '**/*.woff2',
      ],
      emitFiles: true,
    }),
    // babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
    babel({ exclude: 'node_modules/**', plugins: ['@babel/plugin-external-helpers'] }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports,
      }
    ),
  ],
  sourcemap: true,
}
