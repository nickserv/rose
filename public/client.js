angular.module('rose', ['hljs', 'infinite-scroll'])
  .value('count', 10)
  .controller('SearchController', function ($scope, features) {
    $scope.features = [];
    $scope.page = 0;

    $scope.fetchFeatures = function () {
      features.get($scope.query, $scope.page, function (newFeatures) {
        newFeatures.forEach(function (feature) {
          $scope.features.push(feature);
        });
        $scope.page += 1;
      });
    };

    $scope.resetFeatures = function () {
      $scope.features = [];
      $scope.page = 0;
      $scope.fetchFeatures();
    };

    $scope.fetchFeatures();
  })
  .factory('features', function ($http, count) {
    return {
      get: function(query, page, success) {
        $http.get('/index.json', {
          params: {
            query: query,
            index: page * count,
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
  });
