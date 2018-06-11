import { version } from '../package.json';
import shared from './shared/shared';
import vis from './visualizations/visualizations';

/** @namespace */
const gViz = {
  shared,
  vis,
  NAME: 'gViz',
  VERSION: version,
};

export default gViz;
