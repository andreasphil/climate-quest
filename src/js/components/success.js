(function(ns)
{
  ns.components = ns.components || {};
  ns.components.Success = Vue.component('success',
  {
    data: function()
    {
      return {
        chartData:
        {
          series: ns.data.result
        },
        chartOptions:
        {
          seriesBarDistance: 80,
          axisX:
          {
            offset: 0,
            showGrid: false,
            showLabel: false
          },
          axisY:
          {
            offset: 0,
            showGrid: false,
            showLabel: false
          }
        }
      };
    },

    template: '#success-template',

    mounted: function()
    {
      new Chartist.Bar('#result-chart', this.chartData, this.chartOptions);
    }
  });
})(window);
