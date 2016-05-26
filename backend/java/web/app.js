/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', []);
app.controller('appCtrl', function ($scope, $http) {
    var data = {
        uid: "asd",
        displayName: "herudi",
        picture: "test",
        status: "a"
    };
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    $scope.save = function () {
        $http.post('http://localhost:8080/lopr/rest/userInsert', data, config).then(
                function (response) {
                    console.log(response);
                },
                function (err) {
                    console.log(err);
                    // failure callback
                }
        );
    };
});
