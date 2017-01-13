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
        chartOptions:
        {
          showPoint: false,
          lineSmooth: true,
          axisX:
          {
            offset: 0,
            showGrid: false,
            showLabel: false
          },
          axisY:
          {
            offset: 10,
            showGrid: false,
            showLabel: false
          }
        }
      };
    },

    template: '#introduction-template',

    mounted: function()
    {
      new Chartist.Line('#emissions-chart', this.chartData, this.chartOptions);
    }
  });
})(window);
