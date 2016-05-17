hbStatApp.controller('mainController', function($scope, hbStat) {
    
    $scope.message = 'Everyone come and see how good I look!';
    $scope.sendForm = function(){
        var outgoingMessage = $scope.text;
        hbStat.send(outgoingMessage);
    }
});