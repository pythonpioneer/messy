import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-preserve-shebang';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        shebang(), // preserves #!/usr/bin/env node
        nodeResolve({ preferBuiltins: true }), // resolve node modules
        commonjs(), // convert commonjs to esm
        json(), // allow importing JSON
        typescript({ tsconfig: './tsconfig.json', declaration: false }), // no .d.ts
        terser(), // minify
    ],
    external: [
        // only keep Node.js built-ins external, bundle everything else
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
    ],
};
