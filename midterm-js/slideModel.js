/* =====================
Structural Execution
===================== */
$(document).ready(function() {
  //city boundary for cover page
  $.ajax(cityLimits).done(function(data){
    var dataCity=JSON.parse(data);
    layer_slide_All=L.geoJson(dataCity,{style: coverLimitStyle}).addTo(map);
  });

  //initial setup for the 11 selected small neighborhoods boundaries
  $.ajax(selectedNeighborhoods).done(function(data){
    dataNeighborhoods=JSON.parse(data);

    layer_slide_All1=L.geoJson(dataNeighborhoods,{
      onEachFeature: onEachFeature2
    });
  });

  //slide_1 point features
  $.ajax(siblings).done(function(data){
    dataSiblings=JSON.parse(data);
    layer_slide_1=L.geoJson(dataSiblings,{
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, slide1BaseCircles);
      },
      onEachFeature: onEachFeature
    });
  });
  //slide_2 point features
  $.ajax(resources).done(function(data){
    dataResources=JSON.parse(data);
    layer_slide_2=L.geoJson(dataResources,{
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng,slide2PointFeatures);
      }
    });
  });
  //slide_3 point features
  $.ajax(thefts2017).done(function(data){
    dataTheft2017=JSON.parse(data);
    layer_slide_3=L.geoJson(dataTheft2017,{
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, slide3PointFeatures);
      }
    });
  });
  //slide_4 point features
  $.ajax(cocaine).done(function(data){
    dataCocaine=JSON.parse(data);
    layer_slide_4=L.geoJson(dataCocaine,{
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, slide4PointFeatures);
      }
    });
  });

//slide_5 point features
$.ajax(prostitutions).done(function(data){
  dataProst=JSON.parse(data);
  layer_slide_5=L.geoJson(dataProst,{
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, slide5PointFeatures);
    }
  });
});
  coverToSlide1Transition();

  $('.arrowRight').click(function(){
    nextSlide();
    turnPage();
  });
  $('.arrowLeft').click(function(){
    prevSlide();
    turnPage();
  });
});
