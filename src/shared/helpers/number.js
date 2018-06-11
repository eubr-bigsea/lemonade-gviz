import * as d3 from 'd3';

// Default user locale
const userLocale = 'en-US';

// Get user locale function
const getUserLocale = function () {
  // Get user locale
  this.userLocale = window.navigator.userLanguage || window.navigator.language;

  // Validate locale
  const number = 0;
  try {
    return number.toLocaleString(userLocale);
  }
  catch (e) {
    return this.userLocale = 'en-US';
  }
}

// Helper to locale string
const locale = function (d) {
  return d.toLocaleString(userLocale);
};

// Default number format
const numberFormat = d => {
  const value = +d || 0;
  if(d >= 1000000000 || d <= -1000000000) { return (d3.format(".2s")(d).replace('G', 'B')); }
  else if(d >= 1000000 || d <= -1000000) { return (d3.format(".2s")(d)); }
  else if(d >= 1000 || d <= -1000) { return (d3.format(".2s")(d).toUpperCase()); }
  else if(d >= 100 || d <= -100) { return (d.toFixed(0)); }
  else if(d >= 10 || d <= -10) { return (d % 1 + '').length > 3 ? d.toFixed(1) : d; }
  else if(d >= 1 || d <= -1) { return (d % 1 + '').length > 4 ? d.toFixed(2) : d; }
  else if(d < 1 && d > -1) { return (d % 1 + '').length > 5 ? d.toFixed(3) : d; }
};

// Parse format from axis
const parseFormat = axis => {
  let fmt = numberFormat, prefix = "", suffix = "";

  // Get axis format with prefix and suffix
  if(axis != null) {
    // Set prefix and suffix
    prefix = axis.prefix != null ? axis.prefix : "";
    suffix  = axis.suffix != null ? axis.suffix : (axis.sufix != null ? axis.sufix : "");

    // Get format
    fmt = numberFormat;
    if(axis.format === 'locale') { fmt = locale; }
    else if(axis.format != null && axis.format != "") { fmt = d3.format(axis.format); }
  }

  else {
    prefix = "";
    suffix = "";
    fmt = numberFormat;
  }

  // Return format parsed
  return d => {
    d = +d || 0;
    return fmt(d).toString().indexOf('-') !== -1 ? '-' + prefix + fmt(d).toString().replace('-','') + suffix : prefix + fmt(d) + suffix;
  }
};

const format = {
  s: d3.format(".2s"),

  perc: (d, c) => {
    c = c || 2;
    return d3.format('.' + c + '%')(d);
  }
};

// Helpers numbers
const number = {
  userLocale,
  getUserLocale,
  locale,
  format,
  numberFormat,
  parseFormat,
};

export default number;
