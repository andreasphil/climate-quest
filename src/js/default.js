(function(exports)
{
  $(document).ready(() =>
  {
    var routes =
    [
      { path: '/', name: 'index', component: exports.components.Home },
      { path: '/introduction', name: 'introduction', component: exports.components.Introduction },
      { path: '/challenge', name: 'challenge', component: exports.components.Challenge },
      { path: '/progress', name: 'ongoing', component: exports.components.Ongoing },
      { path: '/success', name: 'success', component: exports.components.Success }
    ];

    var router = new VueRouter(
    {
      routes,
      scrollBehavior: function(to, from, savedPositions)
      {
        // Scroll to top whenever the path changes
        return { x: 0, y: 0 };
      }
    });

    // Root instance
    var climateQuest = new Vue(
    {
      router,
      el: '#application'
    });
  })
})(window)
