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
  allRoutes: new observableArrayModule.ObservableArray([]),
  routes: new observableArrayModule.ObservableArray([]),
  selectedRoutes: new observableArrayModule.ObservableArray([]),
  search: '',
  noRoutes: 'hidden'
});

var textFieldModule = require("ui/text-field");

function fillLists(results){
  setTimeout(function(){
    pageData.set('allRoutes', _.where(results, {available: 0}));
    pageData.set('selectedRoutes', _.where(results, {available: 1}));
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

function filterRoutes(){
  if (query != ""){
    filteredItems = _.filter(pageData.get('allRoutes'), function(item){ return item.name.indexOf(query) > -1; });
    if (filteredItems.length > 0){
      pageData.set('routes', filteredItems);
      pageData.set('noRoutes', 'show');
    }else{
      pageData.set('noRoutes', 'hidden');
    }
  }else{
    pageData.set('noRoutes', 'hidden');
  }
};

exports.pageLoaded = function(args) {
  var page = args.object;
  search = page.getViewById('search');
  routesList = page.getViewById('routes-list');
  page.bindingContext = pageData;
  getRoutes();
};

exports.addSelectedRoute = function(args) {
  var unit = args.view.bindingContext;
  items = _.without(pageData.get('allRoutes'), unit);
  selectedRoutes = pageData.get('selectedRoutes');
  selectedRoutes.push(unit);
  console.log(inspect(selectedRoutes));
  pageData.set('allRoutes', items);
  pageData.set('routes', items);
  pageData.set('selectedRoutes', selectedRoutes);
};

// onChange search
pageData.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData){
  query = propertyChangeData.value;
  property = propertyChangeData.propertyName;
  if (property == 'search'){ filterRoutes(query); }
});
