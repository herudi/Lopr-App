
app.controller('onlineCtrl', function ($ionicFilterBar, $scope, Auth, $state, dataSrv, $ionicModal, $ionicPopup) {
    $scope.online = [];
    setTimeout(function () {
        getUser();
    });
    var filterBarInstance;
    $scope.refreshItems = function () {
        if (filterBarInstance) {
            filterBarInstance();
            filterBarInstance = null;
        }
        setTimeout(function () {
            getUser();
            $scope.$broadcast('scroll.refreshComplete');
        }, 2000);
    };
    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.online,
            update: function (filteredItems) {
                $scope.online = filteredItems;
            }
        });
    };

    function getUser() {
        dataSrv.rest('userOnline').query().$promise.then(function (data) {
            $scope.online = data;
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

    $scope.klik = function (data) {
        $state.go('app.userProblem', {uid: data});
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

