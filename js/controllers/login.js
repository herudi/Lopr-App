/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('LoginCtrl', function ($scope, Auth, $state, dataSrv, $ionicHistory,$ionicLoading) {
    $ionicLoading.show({
      template: 'Checking User...'
    });
    setTimeout(function () {
        Auth.getUser().then(function (data) {
            if (data !== null) {
                $state.go('app.problems');
            }
            $ionicLoading.hide();
        });
    }, 2000);
    $scope.login = function (a) {
        Auth.login().$authWithOAuthPopup(a).then(function (data) {
            dataSrv.rest('userByUid/' + data.uid).query().$promise.then(function (cekUser) {
                if (cekUser.length === 0) {
                    if (data.provider === 'facebook') {
                        dataSrv.rest('userInsert').post({
                            uid: data.uid,
                            displayName: data.facebook.displayName,
                            picture: data.facebook.profileImageURL,
                            status: '1'
                        }, function () {
                            $ionicHistory.clearCache().then(function () {
                                $state.go('app.problems');
                            });
                        });
                    } else {
                        dataSrv.rest('userInsert').post({
                            uid: data.uid,
                            displayName: data.google.displayName,
                            picture: data.google.profileImageURL,
                            status: '1'
                        }, function () {
                            $ionicHistory.clearCache().then(function () {
                                $state.go('app.problems');
                            });
                        });
                    }
                } else {
                    if (data.provider === 'facebook') {
                        dataSrv.rest('userUpdate/' + data.uid).post({
                            uid: data.uid,
                            displayName: data.facebook.displayName,
                            picture: data.facebook.profileImageURL,
                            status: '1'
                        }, function () {
                            $ionicHistory.clearCache().then(function () {
                                $state.go('app.problems');
                            });
                        });
                    } else {
                        dataSrv.rest('userUpdate/' + data.uid).post({
                            uid: data.uid,
                            displayName: data.google.displayName,
                            picture: data.google.profileImageURL,
                            status: '1'
                        }, function () {
                            $ionicHistory.clearCache().then(function () {
                                $state.go('app.problems');
                            });
                        });
                    }
                }

            });

        });
    };
});
