import * as d3 from "d3";
import $ from "jquery";
import shared from "../../shared/shared";
import L from 'leaflet';

// Initialize the visualization class
const geoJsonLayer = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;

  // Validate attributes
  var validate = function (step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {
        case 'run':
          var extent = d3.extent(_var.data.data, function(d) { return +d.value; });

          // domain steps
          var step = (extent[1] - extent[0])/(_var.heatColors.length - 1);
          var domain = [];

          for(var i = 0; i < _var.heatColors.length; i++) {
            if(i === 0) { domain[i] = extent[0]; }

            else {
              domain[i] = domain[i - 1] + step;
            }
          }

          var colorScale = d3.scaleLinear()
            .domain(domain)
            .range(_var.heatColors);

          // these won't change. We don't need to reassign them
          var getColor = getColor || function(id) {
            var obj = _var.data.data.find(function(d) { return d.id === id; })

            if(obj) {
              return colorScale(+obj.value);
            }

            else {
              return '#c1c1c1';
            }
          };

          // these won't change. We don't need to reassign them
          var style = style || function(feature) {
            return {
              fillColor: getColor(feature.properties[_var.data.geojsonProperty]),
              weight: 2,
              opacity: 1,
              color: 'black',
              dashArray: '3',
              fillOpacity: 0.7
            };
          };

          var tooltip = tooltip || function(layer) {
            var obj = _var.data.data.find(function(d) { return d.id === layer.feature.properties[_var.data.geojsonProperty]; });
            if(!obj) { return 'No Data'; }
            return `<strong>Id:</strong> ${obj.id}<br><strong>Value:</strong> ${obj.value}<br>`
          };

          // Creates layer if it does not exist
          _var.geoJsonLayer = new L.FeatureGroup().addTo(_var.map);
          _var.geoJsonLayer.clearLayers();

          // Appends geojson layer
          L.geoJson(_var.data.geojson, { style: style })
            .bindTooltip(tooltip)
          .addTo(_var.geoJsonLayer);

          // Fits layer
          _var.map.fitBounds(_var.geoJsonLayer.getBounds());

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','data'].forEach(function (key) {

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

export default geoJsonLayer;
