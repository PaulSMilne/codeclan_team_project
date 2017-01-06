
var StartView = require('./views/start_view.js')

var app = function() {
  var startview = new StartView();
  startview.makeMenu();
};


window.onload = app;