import * as d3 from 'd3';
import $ from 'jquery';

// Module declaration
const loading = {
  queue: [],

  show: () => {
    loading.queue.push(1);

    // Show loading div
    d3.selectAll(".loading-div")
      .style('display','block')
      .selectAll(".loading-div-inner")
      .style('height', $(window).outerHeight())
      .style('width', $(window).outerWidth());

    // Remove scroll
    d3.select("body").classed("no-scroll", true);
  },

  // Some com loading div
  hide: () => {
    loading.queue.pop();

    // Hide loading div only if the queue has finished
    if (loading.queue.length === 0) {
      $(".loading-div").css('display', 'none');
      $("body").removeClass("no-scroll");
    }
  }
};

export default loading;
