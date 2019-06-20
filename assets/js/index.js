$(document).ready(function() {
  //global variables used
  var $events = $("#events");
  var town;
  var HTMLTemplate = "";
  var queryURL;
  getLocation();

  //grabbing users location
  function getLocation() {
      $.ajax({
        url: "http://ip-api.com/json",
        method: "GET"
      }).then(function(location) {
        town = location.city;
        pictureShower();
      });
    }

    //ajax call + ajax variables with token
    function pictureShower(){
      var token = "C5PB5LDMQ2KD6MY7AUEO";
      queryURL =
      `https://www.eventbriteapi.com/v3/events/search/?location.address=${town}&location.within=50mi&expand=venue&token=` +
      token;

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(res) {
          //first item of the carousel
          HTMLTemplate +=`
          <div class="carousel-item active">
          <img class="d-block w-100" src="${res.events[0].logo.url}" alt="slide 1">
          </div>`;
          for (var i = 1; i < res.events.length; i++) {
              var event = res.events[i];
              //sending items to the carousel
              HTMLTemplate +=`
              <div class="carousel-item ">
              <img class="d-block w-100" src="${event.logo.url}" alt="slide ${i + 1}">
              </div>`;
          }
          $events.html(HTMLTemplate);
      })
    }
});