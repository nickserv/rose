angular.module('rose', [])
  .filter('highlight', function ($sce) {
    return function (string, query) {
      var matchString = '<span class="text-primary">$&</span>';
      var result = query ? string.replace(new RegExp(query, 'gi'), matchString) : string;
      return $sce.trustAsHtml(result);
    };
  })
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
