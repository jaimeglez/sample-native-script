var application = require("application");
var inspect = require('util-inspect');
var navigation = require("./shared/navigation");
application.cssFile = "./app.css";
application.mainModule = navigation.startingPage();
application.start();
