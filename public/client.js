angular.module('rose', [])
  .controller('SearchController', function ($scope, featureFactory) {
    featureFactory.get(function (data) {
      $scope.features = data;
    });
  })
  .factory('featureFactory', function ($http, $rootScope) {
    return {
      get: function(success) {
        $http.get('/index.json', { params: {
          query: $rootScope.query
        }}).then(function (response) {
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
