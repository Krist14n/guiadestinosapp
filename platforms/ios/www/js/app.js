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

  //todas las regiones hoteles
  .state('app.regiones_hotel', {
    url: "/regiones_hotel",
    views: {
      'menuContent': {
        templateUrl: "templates/regiones_hotel.html",
        controller: 'RegionesCtrl'
      }
    }
  })

  //todas las regiones restaurante
  .state('app.regiones_restaurante', {
    url: "/regiones_restaurante",
    views: {
      'menuContent': {
        templateUrl: "templates/regiones_restaurante.html",
        controller: 'RegionesCtrl'
      }
    }
  })

  //todas las regiones spa
  .state('app.regiones_spa', {
    url: "/regiones_spa",
    views: {
      'menuContent': {
        templateUrl: "templates/regiones_spa.html",
        controller: 'RegionesCtrl'
      }
    }
  })

  //estados  por region
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

  //estados hotel por region
  .state('app.region_hotel', {  
    url: "/region_hotel/:estadoId",
    cache: false,
    views: {
      'menuContent':{
        templateUrl: "templates/estados_hotel.html",
        controller: 'EstadosCtrl'
      }
    }
  })

  //estados restaurante por region
  .state('app.region_restaurante', {  
    url: "/region_restaurante/:estadoId",
    cache: false,
    views: {
      'menuContent':{
        templateUrl: "templates/estados_restaurante.html",
        controller: 'EstadosCtrl'
      }
    }
  })

  //estados spa por region
  .state('app.region_spa', {  
    url: "/region_spa/:estadoId",
    cache: false,
    views: {
      'menuContent':{
        templateUrl: "templates/estados_spa.html",
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

  //ciudades por estado hotel

  .state('app.estado_hotel',{
    url: "/estado_hotel/:ciudadId",
    cache: false,
    views : {
      'menuContent':{
        templateUrl: "templates/ciudades_hotel.html",
        controller: "CiudadesHotelCtrl"
      }
    }
  })

  //ciudades por estado restaurante

  .state('app.estado_restaurante',{
    url: "/estado_restaurante/:ciudadId",
    cache: false,
    views : {
      'menuContent':{
        templateUrl: "templates/ciudades_restaurante.html",
        controller: "CiudadesRestauranteCtrl"
      }
    }
  })

  //ciudades por estado spa

  .state('app.estado_spa',{
    url: "/estado_spa/:ciudadId",
    cache: false,
    views : {
      'menuContent':{
        templateUrl: "templates/ciudades_spa.html",
        controller: "CiudadesSpaCtrl"
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


  //menu restaurantes por ciudad menu

  .state('app.menu_restaurantes_ciudad',{
    url: "/menu_restaurantes_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/menu_restaurantes_ciudad.html",
        controller: "RestaurantesCiudadCtrl"
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


  //menu hoteles por ciudad

  .state('app.menu_hoteles_ciudad',{
    url: "/menu_hoteles_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/menu_hoteles_ciudad.html",
        controller: "HotelesCiudadCtrl"
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

  //spa individual por ciudad

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

  //menu spas por ciudad

  .state('app.menu_spas_ciudad',{
    url: "/menu_spas_ciudad/:ciudadId",
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: "templates/menu_spas_ciudad.html",
        controller: "SpasCiudadCtrl"
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
