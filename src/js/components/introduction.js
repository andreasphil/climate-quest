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
          showPoint: true,
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
      var chart = new Chartist.Line('#emissions-chart', this.chartData, this.chartOptions);
      var sequence = 0;

      chart.on('created', function()
      {
        sequence = 0;
      });

      // Animation of points appearing and lines fading in
      chart.on('draw', function(data)
      {
        data.element.animate(
        {
          opacity:
          {
            begin: sequence++ * 30,
            dur: 750,
            from: 0,
            to: 1
          },
          y1:
          {
            begin: sequence++ * 30,
            dur: 300,
            from: chart.container.clientHeight,
            to: data.y
          }
        });
      });
    }
  });
})(window);
