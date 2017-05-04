(function(exports)
{
  exports.components = exports.components || {}
  exports.components.Overview = Vue.component('overview',
  {
    data: function()
    {
      return {
        challengeStatus: 'new',
        stepCount: 0
      }
    },

    template: '#overview-template',

    mounted: function()
    {
      this.challengeStatus = exports.challengeStatus
      this.stepCount = exports.stepCount
    }
  })
})(window)
