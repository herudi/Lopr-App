/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('service', []);

app.service("Auth", function ($firebaseAuth, $q, $timeout) {
    var usersRef = new Firebase("https//lopr.firebaseio.com/auth");
    return {
        login: function () {
            return $firebaseAuth(usersRef);
        },
        logout: function () {
            return usersRef.unauth();
        },
        getUser: function () {
            var def = $q.defer();
            $timeout(function () {
                def.resolve(usersRef.getAuth());
            });
            return def.promise;
        }
    };
});

app.factory('dataSrv', function ($resource) {
    var baseUrl = 'http://localhost:8080/lopr/rest/';
    return {
        rest: function (url, id, param) {
            return $resource(baseUrl + url + '/:' + id, param, {
                'post': {
                    method: 'POST'
                    //if you using php use header undefined.
//                    headers : {
//                        'Content-Type':undefined
//                    }
                }
            });
        }
    };
});