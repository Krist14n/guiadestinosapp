// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngMap'])
.directive('myMap', function($http) {
    var jsonArr = [];
    var json1 =[];

    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            //center: new google.maps.LatLng(50, 2),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
                getLocation();

                function getLocation() {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                  } else {
                    alert("Geolocation is not supported by this browser.");
                  }
                }
                function showPosition(position) {
                  var lat = position.coords.latitude;
                  var lng = position.coords.longitude;
                  map.setCenter(new google.maps.LatLng(lat, lng));
                  
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    icon: "img/current.png"
                  });
                  marker.setMap(map);
                }

                // place a marker
                function setMarker(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    };

                    marker = new google.maps.Marker(markerOptions);
                    markers.push(marker); // add marker to array
                  
                    google.maps.event.addListener(marker, 'click', function () {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                $http.get('js/guiderest.json').success(function(data){ 

                //var markers2 = JSON.search(data, '//*[id]');

                for( var i = 0; i<data.length; i++ ){
                    setMarker(map, new google.maps.LatLng(data[i].map.latitud, data[i].map.longitud), " ", "<a href='#/app/restaurant/"+data[i].id+"'>"+data[i].name+"</a>");
                  }
                })
            }
        }     
        
        // show the map and place some markers
        initMap();
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left').previousTitleText(false);;
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  //todas las regiones
  .state('app.regiones', {
    url: "/regiones",
    views: {
      'menuContent': {
        templateUrl: "templates/regiones.html",
        controller: 'RegionesCtrl'
      }
    }
  })

  //estados por region

  .state('app.region', {  
    url: "/region/:estadoId",
    cache: false,
    views: {
      'menuContent':{
        templateUrl: "templates/estados.html",
        controller: 'EstadosCtrl'
      }
    }
  })

  //ciudades por estado

  .state('app.estado',{
    url: "/estado/:ciudadId",
    cache: false,
    views : {
      'menuContent':{
        templateUrl: "templates/ciudades.html",
        controller: "CiudadesCtrl"
      }
    }
  })

  //restaurantes por ciudad

  .state('app.restaurantes_ciudad',{
    url: "/restaurantes_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/restaurantes_ciudad.html",
        controller: "RestaurantesCiudadCtrl"
      }
    }
  })

   //restaurante individual por ciudad

  .state('app.restaurante_ciudad',{
    url: "/restaurante_ciudad/:restauranteId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/restaurante_ciudad.html",
        controller: "RestauranteCiudadCtrl"
      }
    }
  })

  //hoteles por ciudad

  .state('app.hoteles_ciudad',{
    url: "/hoteles_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/hoteles_ciudad.html",
        controller: "HotelesCiudadCtrl"
      }
    }
  })

  //hotel individual por ciudad

  .state('app.hotel_ciudad',{
    url: "/hotel_ciudad/:hotelId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/hotel_ciudad.html",
        controller: "HotelCiudadCtrl"
      }
    }
  })  

//spas por ciudad

  .state('app.spas_ciudad',{
    url: "/spas_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/spas_ciudad.html",
        controller: "SpasCiudadCtrl"
      }
    }
  })

  //hotel individual por ciudad

  .state('app.spa_ciudad',{
    url: "/spa_ciudad/:spaId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/spa_ciudad.html",
        controller: "SpaCiudadCtrl"
      }
    }
  }) 


  // todos los restaurantes

  .state('app.restaurants', {
    url: "/restaurants",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurants.html",
        controller: 'RestaurantsCtrl'
      }
    }
  })

  .state('app.restaurant', {  
    url: "/restaurant/:restaurantId",
    cache: false,
    views: {
      'menuContent':{
        templateUrl: "templates/restaurant.html",
        controller: 'RestaurantCtrl'
      }
    }
  })

  //por cocina

  .state('app.restaurantscook', {
    url: "/restaurantscook",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantscook.html",
        controller: 'RestaurantsByCookCtrl'
      }
    }
  })

  .state('app.restaurantcook', {
    url: "/restaurantcook/:cookId",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantscooklist.html",
        controller: 'RestaurantsListByCookCtrl'
      }
    }
  })

  // por zona

  .state('app.restaurantszone', {
    url: "/restaurantszone",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantszone.html",
        controller: 'RestaurantsByZoneCtrl'
      }
    }
  })

  .state('app.restaurantzone', {
    url: "/restaurantzone/:zoneId",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantszonelist.html",
        controller: 'RestaurantsListByZoneCtrl'
      }
    }
  })

  // por plan

  .state('app.restaurantsplan', {
    url: "/restaurantsplan",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantsplan.html",
        controller: 'RestaurantsByPlanCtrl'
      }
    }
  })

  .state('app.restaurantplan', {
    url: "/restaurantplan/:planId",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantplanlist.html",
        controller: 'RestaurantsListByPlanCtrl'
      }
    }
  })

  // todos los restaurantes promocion banorte

  .state('app.restaurantsbanorte', {
    url: "/restaurantsbanorte",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantsbanorte.html",
        controller: 'RestaurantsBanorteCtrl'
      }
    }
  })

  // todos los restaurantes promocion banorte por cocina

  .state('app.restaurantscookbanorte', {
    url: "/restaurantscookbanorte",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantscookbanorte.html",
        controller: 'RestaurantsByCookBanorteCtrl'
      }
    }
  })

  .state('app.restaurantcookbanorte', {
    url: "/restaurantcookbanorte/:cookId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantscooklistbanorte.html",
        controller: 'RestaurantsListByCookBanorteCtrl'
      }
    }
  })


  // todos los restaurantes promocion banorte por zona

  .state('app.restaurantszonebanorte', {
    url: "/restaurantszonebanorte",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantszonebanorte.html",
        controller: 'RestaurantsByZoneBanorteCtrl'
      }
    }
  })

  .state('app.restaurantzonebanorte', {
    url: "/restaurantzonebanorte/:zoneId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantszonelist.html",
        controller: 'RestaurantsListByZoneBanorteCtrl'
      }
    }
  })



  // todos los restaurantes promocion banorte por plan

  .state('app.restaurantsplanbanorte', {
    url: "/restaurantsplanbanorte",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantsplanbanorte.html",
        controller: 'RestaurantsByPlanBanorteCtrl'
      }
    }
  })

  .state('app.restaurantplanbanorte', {
    url: "/restaurantplanbanorte/:planId",
    views: {
      'menuContent': {
        templateUrl: "templates/restaurantplanlistbanorte.html",
        controller: 'RestaurantsListByPlanBanorteCtrl'
      }
    }
  })





  .state('app.restaurantRecomendacion', {  
    url: "/restaurantRecomendacion",
    views: {
      'menuContent':{
        templateUrl: "templates/restaurantrecomendacion.html",
        controller: 'RestaurantRecomendacionCtrl'
      }
    }
  })

  .state('app.restaurantesCercanos',{
    url: "/restaurantesCercanos",
    views: {
      'menuContent':{
        templateUrl: "templates/restaurantescercanos.html",
        controller: "RestaurantesCercanosCtrl"
      }
    }
  })

  .state('app.marco',{
    url: "/marcobeteta",
    views: {
      'menuContent':{
        templateUrl : "templates/marcobeteta.html"
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })


  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/regiones');
});
