var application = require("application");
var inspect = require('util-inspect');
var navigation = require("./shared/navigation");
// var Sqlite = require( "nativescript-sqlite" );
application.cssFile = "./app.css";
application.mainModule = navigation.startingPage();
application.start();

