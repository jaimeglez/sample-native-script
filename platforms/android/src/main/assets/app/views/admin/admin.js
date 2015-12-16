var inspect = require('util-inspect');
var globals = require("globals");
var _ = require('underscore');
var navigation = require("../../shared/navigation");
var sqlite = require('nativescript-sqlite');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("../../shared/db");
var db = dbModule.openDb(dbName);
// var Authentication = require("../../shared/authentication")
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var pageData = new observableModule.Observable({
  routes: new observableArrayModule.ObservableArray([]),
  selectedRoutes: new observableArrayModule.ObservableArray([]),
  search: ''
});

var textFieldModule = require("ui/text-field");

function fillLists(results){
  setTimeout(function(){
    pageData.set('routes', _.where(results, {available: 0}));
    pageData.set('selectedRoutes', _.where(results, {available: 0}));
  },100);
};

function getRoutes(){
  db.then(function(db){
    db.resultType(2);
    db.all("SELECT * FROM routes").then(function(results) {
      fillLists(results);
    });
  });
};

exports.pageLoaded = function(args) {
  var page = args.object;
  search = page.getViewById('search');
  page.bindingContext = pageData;
  getRoutes();
};

exports.testing = function() {
  console.log(inspect(pageData.get('search')));
};

pageData.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData){
  // filter(propertyChangeData.value);
  console.log('changeEvent');
});
