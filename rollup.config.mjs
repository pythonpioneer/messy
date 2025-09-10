import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        // banner: '#!/usr/bin/env node',
    },
    plugins: [
        shebang(),
        nodeResolve({ preferBuiltins: true }),
        commonjs(),
        json(),
        typescript({ tsconfig: './tsconfig.json', declaration: false }), // no .d.ts
    ],
    external: [
        'fs',
        'path',
        'os',
        'crypto',
        'child_process',
        'util',
        'stream',
        'readline',
        'events',
        'assert',
        'tty',
        'zlib',
        'url',
        'http',
        'https',
        'net',
        'tls',
        'perf_hooks',
        // leave commander external if you want smaller bundles
        // otherwise Rollup will include it
        'commander',
    ],
};
