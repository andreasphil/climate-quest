'use strict';

(function (exports) {
  $(document).ready(function () {
    var routes = [{ path: '/', name: 'index', component: exports.components.Home }, { path: '/overview', name: 'overview', component: exports.components.Overview }, { path: '/introduction', name: 'introduction', component: exports.components.Introduction }, { path: '/challenge', name: 'challenge', component: exports.components.Challenge }, { path: '/progress', name: 'ongoing', component: exports.components.Ongoing }, { path: '/success', name: 'success', component: exports.components.Success }];

    var router = new VueRouter({
      routes: routes,
      scrollBehavior: function scrollBehavior(to, from, savedPositions) {
        // Scroll to top whenever the path changes
        return { x: 0, y: 0 };
      }
    });

    // Root instance
    var climateQuest = new Vue({
      router: router,
      el: '#application'
    });
  });
})(window);
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Challenge = Vue.component('challenge', {
    template: '#challenge-template'
  });
})(window);
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Home = Vue.component('home', {
    template: '#home-template'
  });
})(window);
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Introduction = Vue.component('introduction', {
    data: function data() {
      return {
        chartData: {
          series: exports.data.co2Emissions
        },
        chartOptions: {
          showPoint: true,
          lineSmooth: true,
          axisX: {
            offset: 0,
            showGrid: false,
            showLabel: false
          },
          axisY: {
            offset: 10,
            showGrid: false,
            showLabel: false
          }
        }
      };
    },

    template: '#introduction-template',

    mounted: function mounted() {
      var chart = new Chartist.Line('#emissions-chart', this.chartData, this.chartOptions);
      var sequence = 0;

      chart.on('created', function () {
        sequence = 0;
      });

      // Animation of points appearing and lines fading in
      chart.on('draw', function (data) {
        data.element.animate({
          opacity: {
            begin: sequence++ * 30,
            dur: 750,
            from: 0,
            to: 1
          },
          y1: {
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
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Ongoing = Vue.component('ongoing', {
    data: function data() {
      return {
        status: 1,
        totalSteps: 10000,
        chart: undefined,
        chartOptions: {
          donut: true,
          donutWidth: 10,
          showLabel: false,
          total: 9900
        },
        simulation: undefined
      };
    },

    computed: {
      // Return true if the goal is reached
      done: function done() {
        return this.status >= this.totalSteps;
      },

      // Return a message depending on the progress
      statusText: function statusText() {
        var statusText = void 0;

        if (this.status >= this.totalSteps) statusText = 'Well done!';else if (this.status >= 9000) statusText = 'Almost there!';else if (this.status >= 7500) statusText = 'Getting there!';else if (this.status >= 5500) statusText = 'Great, keep going!';else if (this.status >= 4500) statusText = 'Halfway through!';else if (this.status >= 2000) statusText = 'You\'re making progress!';else if (this.status >= 200) statusText = 'Just getting started!';else statusText = 'The first steps are the hardest.';

        return statusText;
      },

      currentSteps: function currentSteps() {
        if (this.status === 1) return 0;else if (this.status >= this.totalSteps) return this.totalSteps;else return Math.round(this.status);
      },

      iceWidth: function iceWidth() {
        var relativeProgress = this.status / this.totalSteps;
        var width = Math.round(relativeProgress * 100) + 75;
        return width;
      }
    },

    methods: {
      // Counts the status up until the goal is reached
      startSimulation: function startSimulation() {
        var _this = this;

        // Announce challenge start
        exports.challengeStatus = 'ongoing';

        // Reset simulation if it was already played
        if (this.status === 100) this.status = 1;

        var countFast = function countFast() {
          _this.status += 100;

          if (_this.status >= _this.totalSteps) {
            window.clearInterval(_this.simulation);
            exports.challengeStatus = 'completed';
          }
        };

        var count = function count() {
          _this.status += 1;

          if (_this.status >= 50) {
            window.clearInterval(_this.simulation);
            _this.simulation = window.setInterval(countFast, 50);
          }
        };

        this.simulation = window.setInterval(count, 750);
      },

      // Redraw the chart with new data
      updateChart: function updateChart(progress) {
        var chartData = { series: [progress, this.chartOptions.total - progress] };
        this.chart.update(chartData);
      }
    },

    watch: {
      // Update the chart whenever the status changes
      status: function status(oldVal, newVal) {
        this.updateChart(newVal);
        exports.stepCount = newVal;
      }
    },

    template: '#ongoing-template',

    mounted: function mounted() {
      var _this2 = this;

      var chartData = { series: [this.status, this.chartOptions.total - this.status] };
      this.chart = new Chartist.Pie('#progress-chart', chartData, this.chartOptions);

      // Restore previous status
      this.status = exports.stepCount;

      window.setTimeout(function () {
        alert('Press OK when you\'re ready to start the challenge!');
        _this2.startSimulation();
      }, 200);
    }
  });
})(window);
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Overview = Vue.component('overview', {
    data: function data() {
      return {
        challengeStatus: 'new',
        stepCount: 0
      };
    },

    template: '#overview-template',

    mounted: function mounted() {
      this.challengeStatus = exports.challengeStatus;
      this.stepCount = exports.stepCount;
    }
  });
})(window);
'use strict';

(function (exports) {
  exports.components = exports.components || {};
  exports.components.Success = Vue.component('success', {
    data: function data() {
      return {
        chartData: {
          series: exports.data.result
        },
        chartOptions: {
          seriesBarDistance: 80,
          axisX: {
            offset: 0,
            showGrid: false,
            showLabel: false
          },
          axisY: {
            offset: 0,
            showGrid: false,
            showLabel: false
          }
        }
      };
    },

    template: '#success-template',

    mounted: function mounted() {
      var chart = new Chartist.Bar('#result-chart', this.chartData, this.chartOptions);
      var sequence = 0;

      chart.on('created', function () {
        sequence = 0;
      });

      // Animation of bars building up
      chart.on('draw', function (data) {
        data.element.animate({
          y2: {
            begin: sequence++ * 500,
            from: data.y1,
            to: data.y2,
            dur: 750
          }
        });
      });
    }
  });
})(window);
'use strict';

(function (exports) {
  exports.data = exports.data || {};

  // Global challenge status
  exports.challengeStatus = 'new';
  exports.stepCount = 0;

  // CO2 Emission data fixtures for Sweden and the world; taken from http://data.worldbank.org
  exports.data.co2Emissions = [[5.52862826872355, 5.66312437439099, 5.66053901186304, 5.68293374487378, 5.69308804241805, 5.64504101664953, 5.8047541398111, 5.88435049763087, 5.87633903026625, 6.03619519225582, 6.0980441800285, 6.13913426216307, 6.32655154624309, 6.39842667349654, 6.38992818816225, 6.09800747870118, 6.33155993014971, 6.28170571122958, 6.57378419328715, 6.41430341309402], [6.25174629259818, 6.24852477172438, 6.32403140459934, 5.89509851954463, 5.98545979233472, 5.76966651365779, 5.56243008285854, 5.74702606576468, 6.43422859805055, 6.11519453231213, 6.06224140440501, 5.71031351209116, 5.45900321623082, 5.25352193659618, 5.32809827545271, 4.63141135977089, 5.54734805226545, 5.47495712076762, 4.94230082776452, 4.61718188417353]];

  exports.data.result = [[exports.data.co2Emissions[0][19]], [exports.data.co2Emissions[1][19]], [exports.data.co2Emissions[1][19] / 2]];
})(window);
//# sourceMappingURL=index.js.map
