import { version } from '../package.json';
import shared from './shared/shared';
import visualizations from './visualizations/visualizations';

/** @namespace */
const gViz = {
  shared,
  visualizations,
  NAME: 'gViz',
  VERSION: version,
};

export default gViz;
