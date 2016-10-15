(function () {
    angular.module("App")
        .service("dbService", dbService);

    function dbService($http, $q) {
        var vm = this;
        
        vm.list = function () {
            var defer = $q.defer();
            var params = {
                
            };
            $http.get("/api/companies", {
                params: params
            }).then(function (result) {
                defer.resolve(result.data);
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };
        
        vm.getUserChat = function (compId,userId) {
            var defer = $q.defer();
            var param = {
                compId: compId,
                userId: userId
            };
            $http.get("/api/company/user/",{
                params: param
            }).then(function (result) {
                defer.resolve(result.data);
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };
    }
})();