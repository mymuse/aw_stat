var hbStatApp = angular.module('hbStatApp', ['ngRoute']);
hbStatApp.constant('hbStat', new HBStat('123'));

hbStatApp.run(function($rootScope,$location) {
        $rootScope.go = function ( path ) {
            $location.path( path );
        };
});


hbStatApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home/home.html',
            controller  : 'mainController'
        })

        .when('/about', {
            templateUrl : 'pages/about/about.html',
            controller  : 'aboutController'
        })

        .when('/contact', {
            templateUrl : 'pages/contact/contact.html',
            controller  : 'contactController'
        })
        
        .when('/login', {
            templateUrl : 'pages/login/login.html',
            controller  : 'loginController'
        })
    
        .when('/registration', {
            templateUrl : 'pages/registration/registration.html',
            controller  : 'registrationController'
        });
});