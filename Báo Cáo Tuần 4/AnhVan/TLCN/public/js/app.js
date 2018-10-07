
var mainApp = angular.module("mainApp", ['ngRoute','ngCookies']);
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

        when('/HOME', {
            templateUrl: 'partials/HomePage.html' //, controller: 'AddStudentController'
        }).
        when('/dangnhap', {
            templateUrl: 'partials/dangnhap.html'
        }).
        when('/dangky', {
            templateUrl: 'partials/dangky.html' //, controller: 'AddStudentController'
        }).
        when('/admin', {
            templateUrl: 'partials/admin.html'
        }).
        when('/about', {
            templateUrl: 'partials/about.html'
        }).
		otherwise({
            redirectTo: '/dangnhap'
        });
}]);