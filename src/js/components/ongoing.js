(function(ns)
{
  ns.components = ns.components || {};
  ns.components.Ongoing = Vue.component('ongoing',
  {
    data: function()
    {
      return {
        status: 1,
        totalSteps: 10000,
        chart: undefined,
        chartOptions:
        {
          donut: true,
          donutWidth: 10,
          showLabel: false,
          total: 99
        },
        simulation: undefined
      };
    },

    computed:
    {
      // Return true if the goal is reached
      done: function()
      {
        return this.status === 100;
      },

      // Return a message depending on the progress
      statusText: function()
      {
        var statusText;

        if (this.status === 100)
          statusText = 'Well done!';
        else if (this.status >= 90)
          statusText = 'Almost there!';
        else if (this.status >= 75)
          statusText = 'Getting there!';
        else if (this.status >= 55)
          statusText = 'Great, keep going!';
        else if (this.status >= 45)
          statusText = 'Halfway through!';
        else if (this.status >= 20)
          statusText = 'You\'re making progress!';
        else if (this.status >= 2)
          statusText = 'Just getting started!';
        else
          statusText = 'The first step is the hardest.';

        return statusText;
      },

      currentSteps: function()
      {
        if (this.status === 1)
          return 0;
        else
          return Math.ceil((this.status / 100) * this.totalSteps);
      }
    },

    methods:
    {
      // Counts the status up until the goal is reached
      startSimulation: function()
      {
        // Reset simulation if it was already played
        if (this.status === 100)
          this.status = 1;

        var count = function()
        {
          this.status += 1;

          if (this.status === 100)
            window.clearInterval(this.simulation);
        }.bind(this);

        this.simulation = window.setInterval(count, 50);
      },

      // Redraw the chart with new data
      updateChart: function(progress)
      {
        var chartData = { series: [ progress, (this.chartOptions.total - progress) ] };
        this.chart.update(chartData);
      }
    },

    watch:
    {
      // Update the chart whenever the status changes
      status: function(oldVal, newVal)
      {
        this.updateChart(newVal);
      }
    },

    template: '#ongoing-template',

    mounted: function()
    {
      var chartData = { series: [ this.status, (this.chartOptions.total - this.status) ] };
      this.chart = new Chartist.Pie('#progress-chart', chartData, this.chartOptions);
    }
  });
})(window);
