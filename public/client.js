angular.module('rose', [])
  .controller('SearchController', function ($scope, $http) {
    $scope.updateResults = function () {
      $http.get('/index.json', {
        params: { query: $scope.query }
      }).then(function (response) {
        $scope.features = response.data;
      });
    };

    $scope.listify = function (value) {
      return Array.isArray(value) ? value : [value];
    };

    $scope.updateResults();
  });
