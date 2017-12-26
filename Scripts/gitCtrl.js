var app = angular.module('gitApp', []);
app.controller('gitCtrl', function ($scope, $http) {
    var count = 0;
    $scope.check1 = "disabled";
    $scope.limitFixed = 6;
    $scope.startLimit = 1;
    $scope.startLimitOF = 1;
    $scope.onKeyPressFun = function (event) {
        var username = $scope.usernameTxt;
        if (event.keyCode == 13) {
            //Profile Result
            $http.get("https://api.github.com/users/" + username)
                .then(function mySuccess(response) {
                    $scope.res = response.data;
                    document.getElementById("topLayerID").style.display = "none";
                }, function myError(response) {
                    if (response.statusText == "Forbidden") {
                        $scope.alertText = "Git API access limit has been reached. Please try again after 1 hour!";
                        document.getElementById("alertBtnID").click();
                    }
                    if (response.statusText == "Not Found") {
                        $scope.alertText = "Entered username is not found!";
                        document.getElementById("alertBtnID").click();
                    }
                });
            //Profile Repository Result 
            $http.get("https://api.github.com/users/" + username + "/repos")
                .then(function mySuccess(response) {
                    $scope.resRep = response.data;
                }, function myError(response) {});
        }
    }
    $scope.checkNav = function () {
        if ($scope.startLimitOF == 1 || $scope.startLimitOF < 0) {
            $scope.check1 = "disabled";
        } else {
            $scope.check1 = "";
        }
        if ($scope.resLim == $scope.startLimitOF || $scope.startLimitOF > $scope.resLim) {
            $scope.check2 = "disabled";
        } else {
            $scope.check2 = "";
        }
    }
});
