// Config file for running Rollup in "normal" mode (non-watch)

import gitRev from 'git-rev-sync'
import pkg from '../package.json'
import rollupGitVersion from 'rollup-plugin-git-version'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

let { version } = pkg;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
  release = true;
} else {
  release = false;
  const branch = gitRev.branch();
  const rev = gitRev.short();
  version += '+' + branch + '.' + rev;
}

const outro = `
var oldGVIZ = window.gViz;
  exports.noConflict = function() {
    window.gViz = oldGVIZ;
    return this;
  }

// Always export us to window global (see #2364)
window.gViz = exports;`;

export default {
  input: 'src/gViz.js',
  output: {
      file: pkg.main,
      format: 'umd',
      name: 'gViz',
      outro: outro,
  },
  plugins: [
    release ? json() : rollupGitVersion(),
    commonjs(),
    resolve(),
  ],
};
