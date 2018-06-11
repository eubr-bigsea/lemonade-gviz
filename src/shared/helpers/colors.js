import * as d3 from 'd3';

//Function to convert hex format to a rgb color
const rgb2hex = rgb => {
  const regex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  const _rgb = rgb.match(regex);

  return (_rgb && _rgb.length === 4) ? "#" +
    ("0" + parseInt(_rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(_rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(_rgb[3],10).toString(16)).slice(-2) : '';
};

// Module declaration
const colors = {
  // Initializer main color pallete
  main: d3.scaleOrdinal(["#ea5c84","#ac73dc"]),
  aux: d3.scaleOrdinal(["#FFFFFF","#ac73dc"]),

  // Initializer gray scale color pallete
  gray: d3.scaleOrdinal(["#434343","#666","#999","#aaa","#bbb","#ccc","#ddd","#eee"]),

  //Function to convert hex format to a rgb color
  rgb2hex: rgb2hex,

  // Is dark function
  isDark: c => {
    if(d3.color(c) != null) {
      c = rgb2hex(d3.color(c).toString());
      c = c.substring(1);
      // strip #
      const rgb = parseInt(c, 16);
      // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xff;
      // extract red
      const g = (rgb >> 8) & 0xff;
      // extract green
      const b = (rgb >> 0) & 0xff;
      // extract blue
      const luma = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      // per ITU-R BT.709
      return luma < 168;
    }
    else {
      return true;
    }
  },

  // Heat colors
  heat: d => {
    if(!d || d == null || isNaN(+d)) { return "#FFF"; }
    else if(+d < 30) { return "#10bbaa"; }
    else if(+d >= 30 && +d < 50) { return "#edaf5c"; }
    else if(+d >= 50 && +d < 75) { return "#e16b4d"; }
    else if(+d >= 75 && +d < 90) { return "#fc7676"; }
    else if(+d >= 90) { return "#d97055"; }
    else { return "#FFF"; }
  }
};

export default colors;
