(function(exports)
{
  exports.components = exports.components || {};
  exports.components.Success = Vue.component('success',
  {
    data: function()
    {
      return {
        chartData:
        {
          series: exports.data.result
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
      }
    },

    template: '#success-template',

    mounted: function()
    {
      let chart = new Chartist.Bar('#result-chart', this.chartData, this.chartOptions)
      let sequence = 0

      chart.on('created', () =>
      {
        sequence = 0
      })

      // Animation of bars building up
      chart.on('draw', (data) =>
      {
        data.element.animate(
        {
          y2:
          {
            begin: sequence++ * 500,
            from: data.y1,
            to: data.y2,
            dur: 750
          }
        })
      })
    }
  })
})(window);
