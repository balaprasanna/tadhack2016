(function(){
    angular.module("App")
        .config(AppConfig);

    function AppConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("list", {
                url: "/list",
                templateUrl: "/views/list.html",
                controller: "ListCtrl as ctrl"
            })
            .state("dashboard", {
                url: "/dashboard/:compId/:compName",
                templateUrl: "/views/dashboard.html",
                controller: "DashboardCtrl as ctrl"
            })
            .state("dashboard.userChat", {
                url: "/userChat/:compId/:userId",
                views:{
                    'userChat':{
                        templateUrl: "/views/userChat.html",
                        controller: "UserChatCtrl as childctrl"
                    }
                }
            });

        $urlRouterProvider.otherwise("/list");
    }
    
    AppConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
})();
