import * as d3 from 'd3';
import $ from 'jquery';
import shared from '../../shared/shared';

import initialize from './initialize';
import axis from './axis';
import xScale from './x-scale';
import yScale from './y-scale';
import style from './style';
import create from './create';
import elements from './elements';
import misc from './misc';

// Initialize the visualization class
const lineChart = function () {
  "use strict";

  // Get attributes values
  var _id = `vis-line-graph-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var _var = null;
  var action = 'build';
  var animation = 900;
  var container = null;
  var colors = { main: shared.helpers.colors.main };
  var data = [];
  var height = null;
  var margin = { top: 10, right: 10, bottom: 35, left: 0 };
  var width = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build':      return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize': return true;
      case 'axis':       return data != null && data.data != null && data.data.length > 0;
      case 'create':     return data != null && data.data != null && data.data.length > 0;
      case 'elements':   return data != null && data.data != null && data.data.length > 0;
      case 'misc':       return data != null && data.data != null;
      case 'style':      return true;
      case 'xScale':     return data != null && data.data != null && data.data.length > 0;
      case 'yScale':     return data != null && data.data != null && data.data.length > 0;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('style');
          main('yScale');
          main('xScale');
          main('create');
          main('axis');
          main('elements');
          main('misc');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {};  }
          _var = initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();
          break;

        // Setup style functions
        case 'style':

          // Setting styles
          _var = style()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = create()
            ._var(_var)
            .run();
          break;

        // Setup X scale
        case 'xScale':

          // Creating
          _var = xScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup Y scale
        case 'yScale':

          // Creating
          _var = yScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Running
          _var = axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup elements
        case 'elements':

          // Running
          _var = elements()
            ._var(_var)
            .run();
          break;

        // Show misc
        case 'misc':

          // Running
          _var = misc()
            ._var(_var)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation', 'container', 'colors', 'data', 'height', 'margin', 'width'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Secondary functions
  main.build = function (_) { return main("build"); };

  // Execute the specific called function
  main.run = function (_) { return main(_); };

  return main;
};

export default lineChart;
