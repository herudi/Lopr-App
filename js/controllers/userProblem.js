
app.controller('userProblemCtrl', function ($scope, Auth, $state, dataSrv, $ionicModal, $ionicPopup, $stateParams) {
    $scope.user = {};
    $scope.problem = [];
    getUser();
    $scope.refreshItems = function () {
        setTimeout(function () {
            getUser();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
    function getUser() {
        dataSrv.rest('userByUid/' + $stateParams.uid).query().$promise.then(function (data) {
            dataSrv.rest('problem/' + $stateParams.uid).query().$promise.then(function (prob) {
                angular.forEach(data, function (value, key) {
                    $scope.user.displayName = value.displayName;
                    $scope.user.picture = value.picture;
                });
                $scope.problem = prob;
            });
        });
    };

    $ionicModal.fromTemplateUrl('views/modalUser.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.close = function () {
        getUser();
        $scope.modal.hide();
    };
    $scope.open = function () {
        $scope.modal.show();
    };

    $scope.klik = function (data) {
        $scope.post = data;
        $scope.svg = data.title.substring(0, 1).toUpperCase();
        $scope.open();
    };
});

app.filter('svg', function () {
    return function (text) {
        return text.substring(0, 1).toUpperCase();
    };

});

