angular.module('mainApp')
  .controller('event_manageCtrl',['$scope', '$http', 'cookieService', 'eventService', function($scope, $http, cookieService, eventService) {

    let ev = location.pathname.slice(14);
    $scope.members = [];
    $scope.place = '';
    $scope.author = cookieService.getCookie('username');
    $scope.pht = cookieService.getCookie('userPhoto');




  $http.get(`/api/events/${ev}`)
    .then(function(response) {
      injectWeather(response.data.place);
      response.data.time = response.data.time.substring(11,16);
      response.data.date = response.data.date.substring(0,10);
      changeImage(response.data.photoURL);
      $scope.event = angular.fromJson(response.data);


      eventService.getMembers($scope);
      var interval = setInterval(function(){
        console.log(weather);
        if(weather != undefined) {
          console.log(weather);

          document.getElementById('weather').innerHTML = weather.title;

          // find the proper date
          let dt = new Date($scope.event.date);
          let val = 0;

          for(let i = 0; i < 10; i++) {
            let api_dt = new Date(weather.item.forecast[i].date);
            console.log(api_dt);

            if( dt.toString().substring(0,15) == api_dt.toString().substring(0,15)) {
              // transform F into C
              let temp = ((+weather.item.forecast[i].high - 32) / 1.8).toFixed(0);
              document.getElementById('weather_temp').innerHTML = temp + ' <sup>o</sup>C';
              document.getElementById('weather_status').innerHTML = weather.item.forecast[i].text;
              val = 1;
            }
          }
          if(val === 0) document.getElementById('weather_temp').innerHTML = 'Cannot find weather.';
          console.log(dt);
          clearInterval(interval);
        }



      }, 200);
    });



    // TODO put this func into service

    function changeImage(url) {
      $('.event-picture').css({
        'background-image': `url(${url})`,
        'width': '100%',
        'height': '400px'
      });
    }



    $scope.change = function() {
      changeImage($scope.new_photo);

      $http.put(`/api/events/${ev}`, {
        'name': $scope.event.name,
        'place': $scope.event.place,
        'date': $scope.event.date,
        'time': $scope.event.time,
        'type': $scope.event.type,
        'payment': $scope.event.payment,
        'description': $scope.event.description,
        'photoURL': $scope.new_photo,
        'members': $scope.event.members
      });
    }




      $scope.deleteReadonlyState = function(val) {
        if(!($(`#${val}`).attr('readonly')) ) {

          $(`#${val}`).attr('readonly', '');

            $http.put(`/api/events/${ev}`, {
              'name': $scope.event.name,
              'place': $scope.event.place,
              'date': $scope.event.date,
              'time': $scope.event.time,
              'type': $scope.event.type,
              'payment': $scope.event.payment,
              'description': $scope.event.description,
              'photoURL': $scope.event.photoURL,
              'members': $scope.event.members
            });


          } else {

            $(`#${val}`).removeAttr('readonly');

          }

      };


  }]);
