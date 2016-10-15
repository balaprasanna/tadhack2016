(function () {
    angular.module("App")
        .controller("ListCtrl", ListCtrl)
        .controller("DashboardCtrl", DashboardCtrl)
        .controller("UserChatCtrl", UserChatCtrl);

    function ListCtrl($state, dbService) {
        var vm = this;
        vm.companies = [
            { "id": 001,
              "name": "ABC" },
            { "id": 002,
                "name": "DEF" },
            { "id": 003,
                "name": "GHI" },
            { "id": 004,
                "name": "JKL" },
            { "id": 005,
                "name": "MNO" },
            { "id": 006,
                "name": "PQR" }
        ];

        // dbService.list()
        //     .then(function (companies) {
        //         vm.companies = companies;
        //     }).catch(function (err) {
        //         console.info("Some Error Occured",err)
        //     });

        vm.gotoDashboard = function (id, name) {
            $state.go("dashboard", {'compId' : id, compName: name});
        }
    }
    
    ListCtrl.$inject = ["$state", "dbService"];

    function DashboardCtrl($stateParams, $state, dbService) {
        var vm = this;
        vm.compId = $stateParams.compId;
        vm.compName = $stateParams.compName;
        vm.usersList = [
            {"id": 0001,
            "name": "Bala",
            "status": "online"},
            {"id": 0002,
                "name": "Prasanna",
                "status": "Offline"},
            {"id": 0003,
                "name": "Sindhu",
                "status": "online"},
            {"id": 0004,
                "name": "Rob",
                "status": "Away"}
        ];
    }
    DashboardCtrl.$inject = ['$stateParams', '$state', 'dbService'];

    function UserChatCtrl($stateParams, dbService) {
        var vm = this;
        vm.user = {};

        dbService.getUserChat($stateParams.compId,$stateParams.userId)
            .then(function (user) {
                vm.user = user;
            })
            .catch(function (err) {
                console.info("Some Error Occured",err);
            });
    }

    UserChatCtrl.$inject = ["$stateParams", "dbService"];
})();