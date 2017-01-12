(function(ns)
{
  ns.components = ns.components || {};
  ns.components.Introduction = Vue.component('introduction',
  {
    data: function()
    {
      return {
        chartData:
        {
          series: ns.data.co2Emissions
        },
        chartOptions: ns.data.chartOptions
      };
    },

    template: '#introduction-template',

    mounted: function()
    {
      new Chartist.Line('.ct-chart', this.chartData, this.chartOptions);
    }
  });
})(window);
