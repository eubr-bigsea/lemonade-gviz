import * as d3 from 'd3';
import $ from 'jquery';
import shared from '../../shared/shared';

// Initialize the visualization class
const axis = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;
  var action = 'create';

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          switch (action) {

            case 'create':

              // Create and update X axis
              _var.x_axis = _var.g.selectAll(".x.axis").data(['x']);
              _var.x_axis.exit().remove();
              _var.x_axis = _var.x_axis.enter().append('g').attr("class", "x axis").merge(_var.x_axis);
              _var.x_axis.call(_var.xAxis.tickSize(-_var.height)).attr("transform", 'translate(0,' + _var.height + ')')
              _var.x_axis.selectAll(".tick line").attr('y1', 3)
              //_var.x_axis.selectAll(".tick text")
              //  .attr('x', function(d, i) {
              //    if((_var.xIsDate || _var.xIsNumber) && i === _var.x_axis.selectAll(".tick text").size()-1) {
              //      return -(this.getBBox().width/2) + _var.margin.right;
              //    } else { return 0; }
              //  })

              // Remove overlapping tick text
              _var.x_axis.selectAll(".tick text").filter(function(d) { return d === _var.xTarget; }).remove();

              // Create and update Y axis
              _var.y_axis = _var.g.selectAll(".y.axis").data(['y']);
              _var.y_axis.exit().remove();
              _var.y_axis = _var.y_axis.enter().append('g').attr("class", "y axis").merge(_var.y_axis);
              _var.y_axis.transition().call(_var.yAxis.tickSize(-_var.width))
              _var.y_axis.selectAll(".tick line").attr('x1', -3)

              // Remove overlapping tick text
              _var.y_axis.selectAll(".tick text").filter(function(d) { return d === _var.yTarget; }).remove();

              // Set axis string
              var yTitle = (_var.data.y != null && _var.data.y.title != null && _var.data.y.title !== "" ? "<b>Y - </b>"+_var.data.y.title : "");
              var xTitle = (_var.data.x != null && _var.data.x.title != null && _var.data.x.title !== "" ? "<b>X - </b>"+_var.data.x.title : "");

              // Set axis title
              if(yTitle !== "" && xTitle !== "") { _var.axisTitle = yTitle+" / "+xTitle; }
              else if(yTitle !== "" && xTitle === "") { _var.axisTitle = yTitle; }
              else if(yTitle === "" && xTitle !== "") { _var.axisTitle = xTitle; }
              else { _var.axisTitle = ""; }

              break;

          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};

export default axis;
