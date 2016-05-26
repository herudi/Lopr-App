
app.controller('problemsCtrl', function ($scope, Auth, $state, dataSrv, $ionicModal, $ionicPopup) {
    $scope.user = {};
    $scope.post = {};
    $scope.button = 'Create';
    $scope.problem = [];
    $scope.svg = 'A';
    $scope.statusDetail = false;
    setTimeout(function () {
        getUser();
    });

    $scope.refreshItems = function () {
        setTimeout(function () {
            getUser();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
    function getUser() {
        Auth.getUser().then(function (data) {
            dataSrv.rest('problem/' + data.uid).query().$promise.then(function (prob) {
                $scope.problem = prob;
                $scope.post.uid = data.uid;
                if (data.facebook === undefined) {
                    $scope.user = data.google;
                } else {
                    $scope.user = data.facebook;
                }
            });
        });
    }
    ;

    $ionicModal.fromTemplateUrl('views/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.close = function () {
        $scope.statusDetail = false;
        $scope.post = {};
        $scope.button = 'Create';
        getUser();
        $scope.modal.hide();
    };
    $scope.open = function () {
        $scope.modal.show();
    };

    $scope.saveOrUpdate = function () {
        if ($scope.button === 'Create') {
            $scope.post.status = '1';
            dataSrv.rest('problemInsert').post($scope.post, function () {
                $ionicPopup.alert({
                    title: 'Information',
                    template: 'Create Success...'
                });
                $scope.post = {};
                getUser();
            });
        } else {
            dataSrv.rest('problemUpdate/' + $scope.post.id).post($scope.post, function () {
                $ionicPopup.alert({
                    title: 'Information',
                    template: 'Update Success...'
                });
                $scope.statusDetail = true;
            });
        }
    };

    $scope.klik = function (data) {
        $scope.statusDetail = true;
        $scope.post = data;
        $scope.button = 'Update';
        $scope.svg = data.title.substring(0, 1).toUpperCase();
        $scope.open();
    };

    $scope.edit = function () {
        $scope.statusDetail = false;

    };

    $scope.onHold = function (id) {
        $ionicPopup.show({
            template: 'Are you sure remove this data ?',
            title: 'Confirm',
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Ok</b>',
                    type: 'button-assertive',
                    onTap: function () {
                        dataSrv.rest('problemDelete/' + id).post({id: id}, function () {
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Delete Success...'
                            });
                            getUser();
                        });
                    }
                }
            ]
        });
    };
});

app.filter('svg', function () {
    return function (text) {
        return text.substring(0, 1).toUpperCase();
    };

});

