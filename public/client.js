angular.module('rose', ['ui.scroll', 'ui.scroll.jqlite'])
  .factory('features', function ($http, $rootScope) {
    return {
      get: function(index, count, success) {
        $http.get('/index.json', {
          params: {
            query: $rootScope.query,
            index: index,
            count: count
          }
        }).then(function (response) {
          success(response.data);
        });
      }
    };
  })
  .filter('highlight', function ($sce) {
    return function (string, query) {
      var matchString = '<mark>$&</mark>';
      var result = query ? string.replace(new RegExp(query, 'gi'), matchString) : string;
      return $sce.trustAsHtml(result);
    };
  })
  .filter('listify', function () {
    return function (value) {
      return Array.isArray(value) ? value : [value];
    };
  });
