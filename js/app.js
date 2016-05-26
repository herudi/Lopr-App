
var app = angular.module('starter', ['ionic','jett.ionic.filter.bar', 'firebase', 'service', 'oc.lazyLoad', 'ngResource', 'ion-floating-menu']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            //Lets hide the accessory bar fo the keyboard (ios)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // also, lets disable the native overflow scroll
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            if (ionic.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#2c76f3");
            } else {
                StatusBar.styleLightContent();
            }
        }
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 500);
    });
});

app.config(function ($provide, $filterProvider, $compileProvider, $controllerProvider, $stateProvider, $urlRouterProvider) {
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;
    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    lazy: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/login.js');
                    }
                },
                auth: {
                    require: false
                }
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/menu.html',
                auth: {
                    require: true
                },
                controller: 'AppCtrl'
            })

            .state('app.problems', {
                url: '/problems',
                views: {
                    'menuContent': {
                        templateUrl: 'views/problems.html',
                        controller: 'problemsCtrl'
                    }
                },
                resolve: {
                    data: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/problems.js');
                    }
                },
                auth: {
                    require: true
                }
            }).state('app.online', {
        url: '/online',
        views: {
            'menuContent': {
                templateUrl: 'views/online.html',
                controller: 'onlineCtrl'
            }
        },
        resolve: {
            data: function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/online.js');
            }
        },
        auth: {
            require: true
        }
    }).state('app.userProblem', {
        url: '/userProblem/:uid',
        views: {
            'menuContent': {
                templateUrl: 'views/userProblem.html',
                controller: 'userProblemCtrl'
            }
        },
        resolve: {
            data: function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/userProblem.js');
            }
        },
        auth: {
            require: true
        }
    });

    $urlRouterProvider.otherwise('/login');
});
app.run(function ($rootScope, $state, Auth, $rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var require = toState.auth.require;
        Auth.getUser().then(function (data) {
            if (require && data === null) {
                event.preventDefault();
                $state.go('login');
            }
        });

    });
});

app.controller('AppCtrl', function (Auth, $state, $scope, dataSrv) {
    $scope.logout = function () {
        Auth.getUser().then(function (data) {
            dataSrv.rest('status/' + data.uid).post({status: '0', uid: data.uid}, function () {
                Auth.logout().then(function () {
                    $state.go('login');
                });
            });
        });
    };
});
