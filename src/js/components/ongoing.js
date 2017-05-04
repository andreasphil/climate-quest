(function(exports)
{
  exports.components = exports.components || {}
  exports.components.Ongoing = Vue.component('ongoing',
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
          total: 9900
        },
        simulation: undefined
      }
    },

    computed:
    {
      // Return true if the goal is reached
      done: function()
      {
        return this.status >= this.totalSteps
      },

      // Return a message depending on the progress
      statusText: function()
      {
        let statusText

        if (this.status >= this.totalSteps)
          statusText = 'Well done!'
        else if (this.status >= 9000)
          statusText = 'Almost there!'
        else if (this.status >= 7500)
          statusText = 'Getting there!'
        else if (this.status >= 5500)
          statusText = 'Great, keep going!'
        else if (this.status >= 4500)
          statusText = 'Halfway through!'
        else if (this.status >= 2000)
          statusText = 'You\'re making progress!'
        else if (this.status >= 200)
          statusText = 'Just getting started!'
        else
          statusText = 'The first steps are the hardest.'

        return statusText
      },

      currentSteps: function()
      {
        if (this.status === 1)
          return 0
        else if (this.status >= this.totalSteps)
          return this.totalSteps
        else
          return Math.round(this.status)
      }
    },

    methods:
    {
      // Counts the status up until the goal is reached
      startSimulation: function()
      {
        // Announce challenge start
        exports.challengeStatus = 'ongoing'

        // Reset simulation if it was already played
        if (this.status === 100)
          this.status = 1

        let countFast = () =>
        {
          this.status += 100

          if (this.status >= this.totalSteps)
          {
            window.clearInterval(this.simulation)
            exports.challengeStatus = 'completed'
          }
        }

        let count = () =>
        {
          this.status += 1

          if (this.status >= 50)
          {
            window.clearInterval(this.simulation)
            this.simulation = window.setInterval(countFast, 50)
          }
        }

        this.simulation = window.setInterval(count, 750)
      },

      // Redraw the chart with new data
      updateChart: function(progress)
      {
        let chartData = { series: [ progress, (this.chartOptions.total - progress) ] }
        this.chart.update(chartData)
      }
    },

    watch:
    {
      // Update the chart whenever the status changes
      status: function(oldVal, newVal)
      {
        this.updateChart(newVal)
        exports.stepCount = newVal
      }
    },

    template: '#ongoing-template',

    mounted: function()
    {
      let chartData = { series: [ this.status, (this.chartOptions.total - this.status) ] }
      this.chart = new Chartist.Pie('#progress-chart', chartData, this.chartOptions)

      // Restore previous status
      this.status = exports.stepCount

      window.setTimeout(() =>
      {
        alert('Press OK when you\'re ready to start the challenge!')
        this.startSimulation()
      }, 200)
    }
  })
})(window)
