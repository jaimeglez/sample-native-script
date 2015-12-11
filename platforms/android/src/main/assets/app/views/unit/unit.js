var inspect = require('util-inspect');

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = page._navigationContext;
};
