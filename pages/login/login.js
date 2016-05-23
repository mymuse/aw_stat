hbStatApp.controller('loginController', function($scope, $location) {
    $scope.go = function ( path ) {
        $location.path( path );
    };
    
    $scope.submit = function () {
       var user = $scope.user;
    };
    
    function _validation(user) {
        
    };
    
});
