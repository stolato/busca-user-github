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
      resize();
    };
    $scope.detail = function(section){
        $http.get(section.url).then(function (data) {
        $scope.details = data.data;
      });
      $('#exampleModal').modal('show');
    };
});


function resize(){
  setTimeout(function(){
    var t = 100;
    $('.card').each(function(){
        if($(this).height() > t){
          t = $(this).height();
        }
        console.log($(this).height());
        console.log(t);
    });
    $('.card').height(t);
  },500);
}
