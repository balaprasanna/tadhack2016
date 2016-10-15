(function(){
    angular.module("App")
        .config(AppConfig);

    function AppConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("category", {
                url: "/category",
                templateUrl: "/views/category.html",
                controller: "CategoryCtrl as ctrl"
            })
            .state("business", {
                url: "/business/:catId/:catName",
                templateUrl: "/views/business.html",
                controller: "BusinessCtrl as ctrl"
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

        $urlRouterProvider.otherwise("/category");
    }
    
    AppConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
})();
