import * as d3 from "d3";
import $ from "jquery";
import shared from "../../shared/shared";

// Initialize the visualization class
const create = function() {
  "use strict";

  // Get attributes values
  var _var      = undefined;
  var components = {};

  // Main function
  var main = function(step) {
    switch (step) {

      // Build entire visualizations
      case 'run':

        var headerHeight = _var.headerWrapper.node().getBoundingClientRect().height;

        var className = "map-wrapper-" + _var._id;
        _var.mapWrapper = _var.container.d3.selectAll("." + className).data(["map-wrapper"]);
        _var.mapWrapper.exit().remove();
        _var.mapWrapper = _var.mapWrapper.enter().append("div").attr("class", className).merge(_var.mapWrapper);

        _var.mapWrapper
          .style("height", (_var.height - headerHeight) + "px")
          .style("margin-top", _var.margin.top);

        break;

    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','components'].forEach(function(key) {
    // Attach variables to main function
    return main[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};

export default create;