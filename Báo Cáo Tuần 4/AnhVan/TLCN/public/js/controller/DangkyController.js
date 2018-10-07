
mainApp.controller('myCtrl', function($scope,$http,$location)
    {
        $scope.submit= function() {
            if ($scope.formdk.$valid) {
                var data =
                {
                    name: $scope.name1,
                    pass: $scope.pass1,
                    email: $scope.email1,
                    address: $scope.address1
                }


                $http.post("/Dangky", data).success(function (data, status) {
                    //console.log('Data posted successfully');
                    alert(data);
                    $location.path("/dangnhap")
                });

            }
        }
});