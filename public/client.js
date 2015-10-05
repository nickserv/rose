angular.module('rose', [])
  .controller('SearchController', function ($scope, $http) {
    $scope.updateResults = function () {
      $http.get('/index.json', {
        params: { query: $scope.query }
      }).then(function (response) {
        $scope.features = response.data;
      });
    };

    $scope.updateResults();
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
