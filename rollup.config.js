import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
import packageJson from './package.json';

const IS_DEV = process.env.NODE_ENV === 'development';
const MAIN_DIR = path.parse(packageJson.main).dir;
const MODULE_DIR = path.parse(packageJson.module).dir;
const TSCONFIG = IS_DEV ? './tsconfig.development.json' : './tsconfig.json';

const EXTERNAL = new Set([
  ...Object.keys(packageJson.dependencies || Object.create(null)),
  ...Object.keys(packageJson.peerDependencies || Object.create(null)),
]);

export default [
  {
    cache: true,
    external(id) {
      if (EXTERNAL.has(id)) {
        return true;
      }

      for (const pkg of EXTERNAL) {
        if (id.startsWith(`${pkg}/`)) {
          return true;
        }
      }

      return false;
    },
    input: 'src/index.ts',
    output: [
      {
        chunkFileNames: '[name]-[hash].cjs',
        dir: MAIN_DIR,
        entryFileNames: '[name].cjs',
        exports: 'named',
        format: 'cjs',
        sourcemap: IS_DEV,
      },
      {
        chunkFileNames: '[name]-[hash].mjs',
        dir: MODULE_DIR,
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: IS_DEV,
      },
    ],
    plugins: [
      postcss({
        autoModules: true,
        extract: false,
        minimize: !IS_DEV,
        use: ['sass'],
      }),
      nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: true,
      }),
      commonjs({
        extensions: ['.js', '.jsx'],
      }),
      typescript2({
        check: !IS_DEV,
        tsconfig: TSCONFIG,
        useTsconfigDeclarationDir: true,
      }),
    ],
    treeshake: !IS_DEV,
    watch: {
      exclude: 'node_modules/**',
    },
  },
];
