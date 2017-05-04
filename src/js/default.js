(function(exports)
{
  $(document).ready(() =>
  {
    let routes =
    [
      { path: '/', name: 'index', component: exports.components.Home },
      { path: '/overview', name: 'overview', component: exports.components.Overview },
      { path: '/introduction', name: 'introduction', component: exports.components.Introduction },
      { path: '/challenge', name: 'challenge', component: exports.components.Challenge },
      { path: '/progress', name: 'ongoing', component: exports.components.Ongoing },
      { path: '/success', name: 'success', component: exports.components.Success }
    ]

    let router = new VueRouter(
    {
      routes,
      scrollBehavior: function(to, from, savedPositions)
      {
        // Scroll to top whenever the path changes
        return { x: 0, y: 0 }
      }
    })

    // Root instance
    let climateQuest = new Vue(
    {
      router,
      el: '#application'
    })
  })
})(window)
