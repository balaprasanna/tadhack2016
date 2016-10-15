(function () {
    angular.module("App")
        .controller("CategoryCtrl", CategoryCtrl)
        .controller("BusinessCtrl", BusinessCtrl)
        .controller("DashboardCtrl", DashboardCtrl)
        .controller("UserChatCtrl", UserChatCtrl);

    function CategoryCtrl($state, dbService) {
        var vm = this;
        vm.categories = "";

        dbService.listCategories()
            .then(function (categories) {
                console.log(categories);
                vm.categories = categories;
            }).catch(function (err) {
                console.info("Some Error Occured",err);
            });
        
        vm.gotoBusiness = function (cId, cName) {
            $state.go("business",{catId: cId, catName: cName});
        };
    }

    CategoryCtrl.$inject = ["$state", "dbService"];
    
    function BusinessCtrl($stateParams,$state, dbService) {
        var vm = this;
        vm.companies = [];        
        
        vm.catId = $stateParams.catId;
        vm.catName = $stateParams.catName;

        vm.listBusiness = function () {
            var xmlhttp = eval(dbService.res.business);
            //console.log("data:"+  dbService.res.business);
            var filteredResult = xmlhttp.filter(function(item) { return item.category_id == vm.catId});
            console.log(typeof(filteredResult), filteredResult);
            vm.filtBiz = filteredResult;
        };
        vm.listBusiness();

        // dbService.listBusiness(vm.catId)
        //     .then(function (result) {
        //         vm.companies = result;
        //     }).catch(function (err) {
        //         console.info("Some Error Occured",err)
        //     });

        vm.gotoDashboard = function (id, name) {                        
            //dbService.initSkylink(id+name);            
            $state.go("dashboard", {'compId' : id, compName: name});
        }
    }

    BusinessCtrl.$inject = ["$stateParams",  "$state", "dbService"];

    function DashboardCtrl($stateParams, $state, dbService) {
        var vm = this;
        vm.compId = $stateParams.compId;
        vm.compName = $stateParams.compName;
        dbService.initSkylink($stateParams.compId + $stateParams.compName);
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

        vm.setname = function(){
            dbService.setname();
        }
        vm.sendmessage = function(){
            dbService.sendmessage();
        }
    }
    DashboardCtrl.$inject = ['$stateParams', '$state', 'dbService'];

    function UserChatCtrl($stateParams, dbService) {
        var vm = this;
        vm.user = {};
        
        vm.start = function(event){
            //dbService.start(event);
        }
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