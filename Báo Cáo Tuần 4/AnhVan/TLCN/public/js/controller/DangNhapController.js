
mainApp.factory('service_user', function ($rootScope) {
    var service = {};
    service.username = false;
    service.state = false;
    service.sendData = function (username, state) {
        this.username = username;
        this.state = state;
        $rootScope.$broadcast('data_shared');
    };
    service.setallData=function () {
        this.username = '';
        this.state = false;
    }

    service.getusername = function () {
        return this.username;
    };
    service.getstate = function () {
        return this.state;
    };
    return service;
});
mainApp.controller('ctrl_Header', function ($cookieStore,$location, $scope, $rootScope, service_user) {

    $scope.$on('data_shared', function () {
        alert(service_user.getusername());
        $rootScope.username = service_user.getusername();
        $rootScope.state =true;
    });

    $rootScope.username = $cookieStore.get('user');

    $rootScope.state = $cookieStore.get('State');
    $scope.logout = function () {
        alert('Logout thanh cong');
        $cookieStore.put('user', '');
        $cookieStore.put('State', false);
        service_user.setallData();
        $rootScope.username = '';
        $rootScope.state = false;
        $location.path('/dangnhap');

    }
});

mainApp.controller('ctrl_dangnhap', function($scope,$http,$location,$cookieStore,$rootScope,service_user)
{

    $scope.dangnhap= function()
    {

        var data =
        {
            username: $scope.name1,
            password: $scope.pass1
        }



        $http.post("/dangnhap", data).success(function(data)
        {
            if(data.user!==''){
                $cookieStore.put('State', true);
                $cookieStore.put('user',data.user);
                var usercookie = $cookieStore.get('user');
                var State = $cookieStore.get('State');
                $rootScope.username=usercookie;
                $rootScope.state=true;
                if(data.admin==1){
                    service_user.sendData(usercookie, State);
                    $location.path('/admin');

                }
                else {
                    service_user.sendData(usercookie, State);
                    $location.path('/HOME');
                }
            }else{
                alert(data.message);
            }

        });

    }
});
