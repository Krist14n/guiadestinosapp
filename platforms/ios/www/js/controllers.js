angular.module('starter.controllers', ['ngCordova','ngMap'])

var app = angular.module('starter.controllers', ['ngCordova','ngMap'])

app.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicSideMenuDelegate, $http) {
  // Form data for the login modal
  $scope.loginData = {};
  

  $http.get('js/guiderest.json').success(function(data){ 
    $ionicSideMenuDelegate.toggleLeft();
  });
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

//Highlight Estados Controller

.controller('HighlightsEstadosCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

    $http.get('https://api.guiadestinos.com/api_highlights_estados').then(function(resp){
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

    $ionicNavBarDelegate.showBackButton(false);

})

//Highlight Ciudades Controller

.controller('HighlightsCiudadesCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
    var filter = $stateParams.estadoId;
    
    $http.get('https://api.guiadestinos.com/api_highlights_ciudades/'+filter).then(function(resp){
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

//Highlight Ciudad Controller

.controller('HighlightCiudadCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
    var filter = $stateParams.ciudadId;
    
    $http.get('https://api.guiadestinos.com/api_highlight_ciudad/'+filter).then(function(resp){
      $scope.highlights = resp.data;
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
//Regiones Controller

.controller('RegionesCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location, $ionicSideMenuDelegate){

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

//Estados Hotel Controller 

.controller('EstadosHotelCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Estados Restaurante Controller

.controller('EstadosRestauranteCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Estados Spas Controller

.controller('EstadosSpaCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Ciudades Controller

.controller('CiudadesHotelCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Ciudades Controller

.controller('CiudadesRestauranteCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Ciudades Controller

.controller('CiudadesSpaCtrl', function($scope , $stateParams, $http, $ionicNavBarDelegate, $location){
    
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

//Todos los Restaurantes por ciudad

.controller('RestaurantesCiudadCtrl', function ($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

  var filter = $stateParams.ciudadId;
  $http.get('https://api.guiadestinos.com/api_restaurantes_ciudades/'+filter).then(function(resp){
      $scope.restaurantes = resp.data;


    },function(err){
      console.log("Error", err);
  })

    $scope.ciudad_id = filter;

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

//Restaurante individual por ciudad

.controller('RestauranteCiudadCtrl', function ($scope, $stateParams, $http, $ionicNavBarDelegate, $location){
  
  var filter = $stateParams.restauranteId;  
  $http.get('https://api.guiadestinos.com/api_restaurante_ciudad/'+filter).then(function(resp){
      $scope.restaurant= resp.data;

      var telefono = resp.data[0]['telefono'];
      var array;
      var json_telefonos = {};
      array = telefono.split(',') 
      json_telefonos.telefonos = array;
      $scope.tel = json_telefonos;

    },function(err){
      console.log("Error", err);
  })


  $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 100) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      
        $location.path( path );
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})

 // Todos los hoteles por ciudad

.controller('HotelesCiudadCtrl', function ($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

  var filter = $stateParams.ciudadId;

  $scope.ciudad_id = filter;

  $http.get('https://api.guiadestinos.com/api_hoteles_ciudades/'+filter).then(function(resp){
      $scope.hoteles = resp.data;
    },function(err){
      console.log("Error", err);
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

//Hotel individual por ciudad

.controller('HotelCiudadCtrl', function ($scope, $stateParams, $http, $ionicNavBarDelegate, $location){
  
  var filter = $stateParams.hotelId;  
  $http.get('https://api.guiadestinos.com/api_hotel_ciudad/'+filter).then(function(resp){
      $scope.hotel= resp.data;

      var telefono = resp.data[0]['telefono'];
      var array;
     
      var json_telefonos = {};
      array = telefono.split(',') 
      json_telefonos.telefonos = array;
      $scope.tel = json_telefonos;

    },function(err){
      console.log("Error", err);
  })


  $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 100) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      
        $location.path( path );
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})

// Todos los spas por ciudad

.controller('SpasCiudadCtrl', function ($scope , $stateParams, $http, $ionicNavBarDelegate, $location){

  var filter = $stateParams.ciudadId;

  $scope.ciudad_id = filter;

  $http.get('https://api.guiadestinos.com/api_spas_ciudades/'+filter).then(function(resp){
      $scope.spas = resp.data;
    },function(err){
      console.log("Error", err);
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

//Spa individual por ciudad

.controller('SpaCiudadCtrl', function ($scope, $stateParams, $http, $ionicNavBarDelegate, $location){
  
  var filter = $stateParams.spaId;  
  $http.get('https://api.guiadestinos.com/api_spa_ciudad/'+filter).then(function(resp){
      $scope.spa= resp.data;
      var telefono = resp.data[0]['telefono'];
      var array;
      var json_telefonos = {};
      array = telefono.split(',') 
      json_telefonos.telefonos = array;
      $scope.tel = json_telefonos;
    },function(err){
      console.log("Error", err);
  })


  $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 100) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      
        $location.path( path );
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})

//Ciudades con descuento

.controller('CiudadesDescuentosCtrl', function ($scope, $stateParams, $http, $ionicNavBarDelegate, $location){
  
  $http.get('https://api.guiadestinos.com/api_destinos_ciudades_descuentos').then(function(resp){
      $scope.ciudades= resp.data;
    },function(err){
      console.log("Error", err);
  })


  $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 100) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      
        $location.path( path );
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})

//Restaurantes con descuento

.controller('RestaurantesDescuentoCtrl', function ($scope, $stateParams, $http, $ionicNavBarDelegate, $location){
  var filter = $stateParams.ciudadId;  
  $http.get('https://api.guiadestinos.com/api_restaurantes_descuentos/'+filter).then(function(resp){
      $scope.restaurantes= resp.data;
    },function(err){
      console.log("Error", err);
  })


  $scope.scrollList = function() {
      var dat = new Date().getTime();
      $scope.lastScrolling = new Date().getTime();
    };

    $scope.canClickInList = function() {
      var diff =  new Date().getTime() - $scope.lastScrolling;
      if (diff > 100) {

          return true;
      } else {
          return false;
      }
    };

    $scope.go = function ( path ) {
      
        $location.path( path );
    };

    $scope.goMenu = function ( path ) {
        $location.path( path );
   };

    $ionicNavBarDelegate.showBackButton(true);

})

.controller('RestaurantesCercanosCtrl', function($scope, $http){
 
})

.controller('DestinosCercanosCtrl', function($scope, $http){
 
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.playlistId = $stateParams.playlistId;
});