
mainApp.controller('myadmin', function($scope,$http,$location)
{
    $scope.profile_pictures=[];
    $http.get('/admin').success(function(data)
    {
        $scope.profile_pictures=data;
    });
    $scope.submitupdate= function()
    {
        var  data2={
            name : $scope.name2,
            email : $scope.email2,
            address : $scope.address2,
            pass : $scope.pass2,
            iduser : $scope.ID
            }

        $http.put("/admin", data2).success(function(data, status)
        {
            alert(data.message);
            $scope.profile_pictures=[];
            $http.get('/admin').success(function(data)
            {
                $scope.profile_pictures=data;
            });
        });
    }
    $scope.submit= function()
    {
        var data =
        {
            name: $scope.name2,
            name: $scope.name2,
            pass: $scope.pass2,
            email: $scope.email2,
            address: $scope.address2
        }


        $http.post("/admin", data).success(function(data, status)
        {
            d=
            {"idUser":data.id,"name":$scope.name2,"pass":$scope.pass2,"email":$scope.email2,"address":$scope.address2
            }

            $scope.profile_pictures.push(d);

        });

    }
    $scope.delete= function(index,data)
    {

        $http.delete("/admin/"+data.idUser).success(function(data)
        {
            alert(data.message)
           // $location.path('/admin')
            $scope.profile_pictures.splice(index,1);

        })

        ;
    }
    $scope.update= function(index)
    {
        $scope.ID=   index.idUser;
        $scope.name2=   index.name;
        $scope.pass2=   index.pass;
        $scope.email2=   index.email;
        $scope.address2=   index.address;
    }
});
