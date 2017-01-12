(function(ns)
{
  var routes =
  [
    { path: '/', name: 'index', component: ns.components.Home },
    { path: '/introduction', name: 'introduction', component: ns.components.Introduction },
    { path: '/challenge', name: 'challenge', component: ns.components.Challenge },
    { path: '/progress', name: 'ongoing', component: ns.components.Ongoing },
    { path: '/success', name: 'success', component: ns.components.Success }
  ];

  var router = new VueRouter({ routes: routes });

  // Root instance
  var climateQuest = new Vue(
  {
    router: router,
    el: '#application'
  });
})(window);
