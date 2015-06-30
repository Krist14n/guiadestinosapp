angular.module('starter.controllers', ['ngCordova','ngMap'])

var app = angular.module('starter.controllers', ['ngCordova','ngMap'])

app.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.goMenu = function ( path ) {
        $location.path( path );
  };
  
})

.controller('RestaurantRecomendacionCtrl', function($scope, $http){
  var lon;
  var lat;

  var filter = Math.floor((Math.random() * 128) + 1);


  $http.get('js/guiderest.json').success(function(data){ 
    var result = $.grep(data, function(e){ return e.id == filter; });
    $scope.restaurant = result;

    lon = result[0].map.longitud;
    lat = result[0].map.latitud;

    $scope.markers = { 
      "long": lon, 
      "lat": lat
    }

  });

})

//Regiones Controller

.controller('RegionesCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

    $http.get('https://api.guiadestinos.com/api_regiones').then(function(resp){
      $scope.regiones = resp.data;
    },function(err){
      console.log("Error", err);
    })

    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);

})

  //Estados Controller

.controller('EstadosCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
    var filter = $stateParams.estadoId;  

    $http.get('https://api.guiadestinos.com/api_regiones/'+filter).then(function(resp){
      $scope.estados = resp.data;
    },function(err){
      console.log("Error", err);
    })

    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };  

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})
  //Ciudades Controller

.controller('CiudadesCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
    var filter = $stateParams.ciudadId;  

    $http.get('https://api.guiadestinos.com/api_estados/'+filter).then(function(resp){
      $scope.ciudades = resp.data;
    },function(err){
      console.log("Error", err);
    })

    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})
  //Restaurant List from .json

.controller('RestaurantsCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

    $http.get('js/guiderest.json').success(function(data){
      $scope.restaurants = data;
    })

    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);

})

  //Single restaurant 
.controller('RestaurantCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate){
  var result;
  var lon;
  var lat;

  var filter = $stateParams.restaurantId;  

  $http.get('js/guiderest.json').success(function(data){ 

    result = $.grep(data, function(e){ return e.id == filter; });

    $scope.restaurant = result;
    
    lon = result[0].map.longitud;
    lat = result[0].map.latitud;

    $scope.markers = { 
      "long": lon, 
      "lat": lat
    }

    $scope.promo="";
    $ionicNavBarDelegate.showBackButton(true);
  });

  $scope.$on('mapInitialized', function(event, map) {


  });

})

//Restaurant list by food 

.controller('RestaurantsByCookCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/tipos_comida.json').success(function(data){
      $scope.restaurants = data;
  })
     $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;

      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

//Internal Restaurant list by food 
.controller('RestaurantsListByCookCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate){
  var filter = $stateParams;
  $http.get('js/guiderest.json').success(function(data){
      var result = $.grep(data, function(e){ return e.cook == filter.cookId; });
      $scope.restaurants = result;
  })
  $ionicNavBarDelegate.showBackButton(true);

})

//Restaurant list by zone 

.controller('RestaurantsByZoneCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/por_zona.json').success(function(data){
      $scope.restaurants = data;
  })
      $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      
      if (diff > 200) {
     

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

//Internal Restaurant list by zone 
.controller('RestaurantsListByZoneCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate){

  var filter = JSON.stringify($stateParams.zoneId);
  $http.get('js/guiderest.json').success(function(data){
      var result = JSON.search(data, '//*[zone='+filter+']');
      $scope.restaurants = result;
  })
  $ionicNavBarDelegate.showBackButton(true);
})

//Restaurant list by plan 

.controller('RestaurantsByPlanCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/por_plan.json').success(function(data){
      $scope.restaurants = data;
  })
      $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

//Internal Restaurant list by plan 
.controller('RestaurantsListByPlanCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate){

  var filter = JSON.stringify($stateParams.planId);
  var subfilter ;

  $http.get('js/guiderest.json').success(function(data){
      var result = JSON.search(data, '//*[plancat='+filter+']');
      $scope.restaurants = result;
  })
  $ionicNavBarDelegate.showBackButton(true);

})

// Restaurantes Banorte
.controller('RestaurantsBanorteCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

    $http.get('js/guiderest.json').success(function(data){
      var result = JSON.search(data, '//*[promo!="null"]')
      $scope.restaurants = result;
    })

    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {
          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);

})  

//Restaurantes Banorte por Cocina

.controller('RestaurantsByCookBanorteCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/tipos_comida.json').success(function(data){
      $scope.restaurants = data;
  })
    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      
      if (diff > 200) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

.controller('RestaurantsListByCookBanorteCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate){
  var filter = $stateParams;
  $http.get('js/guiderest.json').success(function(data){

      var result = $.grep(data, function(e){ return e.cook == filter.cookId; });

      var result2 = JSON.search(result, '//*[promo!="null"]');

      $scope.restaurants = result2;
  })
  $ionicNavBarDelegate.showBackButton(true);

})

//Restaurantes Banorte por zona 

.controller('RestaurantsByZoneBanorteCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/por_zona.json').success(function(data){
      $scope.restaurants = data;
  })
    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {
          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

//Restaurantes Banorte Lista por Zona 

.controller('RestaurantsListByZoneBanorteCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate, $location){

  var filter = JSON.stringify($stateParams.zoneId);
  $http.get('js/guiderest.json').success(function(data){

      var result = JSON.search(data, '//*[zone='+filter+']');

      var result2 = JSON.search(result, '//*[promo!="null"]');

      $scope.restaurants = result2;
  })
    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {
          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };
    $scope.goMenu = function ( path ) {
        $location.path( path );
    };
  $ionicNavBarDelegate.showBackButton(true);
})


//Restaurantes Banorte por plan

.controller('RestaurantsByPlanBanorteCtrl', function($scope, $http, $ionicNavBarDelegate, $location){
  $http.get('js/por_plan.json').success(function(data){
      $scope.restaurants = data;
  })
    $scope.lastScrolling = new Date().getTime();

    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
     
      if (diff > 200) {
          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(false);
})

//Restaurantes Banorte Lista por Plan 

.controller('RestaurantsListByPlanBanorteCtrl', function($scope, $stateParams, $http, $ionicNavBarDelegate, $location){

  var filter = JSON.stringify($stateParams.planId);
  $http.get('js/guiderest.json').success(function(data){

      var result = JSON.search(data, '//*[plancat='+filter+']');
      var result2 = JSON.search(result, '//*[promo!="null"]');

      $scope.restaurants = result2;
  })
    $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();

    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 200) {
          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      if ($scope.canClickInList()) {
        $location.path( path );
      }
    };
    $scope.goMenu = function ( path ) {
        $location.path( path );
    };
  $ionicNavBarDelegate.showBackButton(true);
})



.controller('RestaurantesCercanosCtrl', function($scope, $http){
 
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.playlistId = $stateParams.playlistId;
});
