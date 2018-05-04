var typingTimer;
var app = angular.module('app', []);
app.controller('Ctrl', function($scope, $http) {
    $scope.update = function(){
      clearTimeout(typingTimer);
      var user = $scope.user;
      if(user!=null){
        typingTimer = setTimeout(function(){ $scope.chamada(user); }, 1000);
      }
    };
    $scope.chamada = function(script){
      $('.loading').show();
      $http.get("https://api.github.com/search/users?q="+script)
      .then(function (response) {$scope.users = response.data.items;}).finally(function(){ $('.loading').hide(); });
    };
    $scope.detail = function(section){
        $http.get(section.url).then(function (data) {
        $scope.details = data.data;
      });
      $('#exampleModal').modal('show');
    };
});
