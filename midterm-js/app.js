/* =====================
All Functions
===================== */
/* =====================
Cover --> Slide 1
===================== */
var coverToSlide1Transition = function(){
  $(".title").on({
          mouseenter: function(){
            if(appState.slideNumber===0){
              $(this).css("left", "500px")
              .css("top","120px")
              .css("width","266px")
              .css("height","70px")
              .css("padding-top","20px");
              map.removeLayer(layer_slide_All);
              layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
              layer_slide_All1.addTo(map);
              map.setView(coverZoom,12);
            }else{
                map.setView(slide1Center,15);
            }
          },

            mouseleave: function(){
                if(appState.slideNumber===0){
                  $(this).css("left", "588px")
                  .css("top","115px")
                  .css("height","40px")
                  .css("width","102px")
                  .css("padding","6px 7px 8px 7px");

                  layer_slide_All.addTo(map);
                  map.removeLayer(layer_slide_All1);
                  map.setView(amazonXY,11);
                }else {
                  map.setView(slide1Center,15);
                }
            },

          click: function(){
          $(this).fadeOut(200);
          var slide1=[".slide1-legend", ".slide1-a-header", ".slide1-a-content", ".slide1-b-info", ".title-in-slide"];
          _.each(slide1, function(content,i){
            $(content).delay(100+i*100).fadeIn(200);
          });

          //Map transition
          CartoDB_DarkMatterOnlyLabels.addTo(map);

          //hide the initial left arrow
          $('.arrowLeft').hide();
          appState.slideNumber += 1;
          slideOne();
        }
    });
};

/* =====================
Slide 1
===================== */
// point feature layer interaction
function highlightFeature(e) {
var layer = e.target;
layer.setStyle({
    radius: 10,
    weight: 3,
    color: 'yellow',
    dashArray: '',
    fillOpacity: 1
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
}

var names = layer.feature.properties.Name,
    addr=layer.feature.properties.Address,
    appsValue=layer.feature.properties.AppraiseValue,
    b_year=layer.feature.properties.BuiltYr,
    netSize=layer.feature.properties.NetSQFT;

    $('#sibling-name').text(names);
    $('#sibling-b-year').text(b_year);
    $('#sib-address').text(addr);
    $('#appr-value').text(appsValue);
    $('#sib-size').text(netSize);
}
function resetHighlight(e) {
  //geojson.resetStyle(e.target);
  var layer = e.target;
  layer.setStyle(slide1BaseCircles);
  $('#sibling-name').text("Meow?");
  $('#sibling-b-year').text("Hover over a cirle.");
  $('#sib-address').text("...a tiny point, maybe?");
  $('#appr-value').text("...on the right -->");
  $('#sib-size').text("....");
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

//--------------------------------------------Slide 1 transition functions
var slideOne = function(){
  //add legend when have time
  map.removeLayer(layer_slide_2);
  $('.slide2SVG').replaceWith(slide1b_content);
  $(".ngb-info").remove();//remove info-part from slide 2
  $('.slide-title').text(uniqueContent[appState.slideNumber].contentTitle);
  $('.slide-content').text(uniqueContent[appState.slideNumber].content);
  $('.slide1-legend').delay(300).fadeIn(200);
  map.setView(slide1Center,15);
  layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
  layer_slide_1.addTo(map);
  console.log("slideOne runs fine");
};

/* =====================
Slide 2-5 featureGroup interactions
===================== */
// neighborhoods polygon feature layer interaction
function highlightFeature2(e) {
    var layer = e.target,
        ngb_id = layer.feature.properties.index,
        ngb_name=layer.feature.properties.name;
        $('#ngb-id').text(ngb_id);
        $('#ngb-name').text(ngb_name);

if(appState.slideNumber!==(1||0)){layer.setStyle({
        weight: 3,
        color: 'yellow',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToBack();}

if(appState.slideNumber===2){
  var n_reso=layer.feature.properties.C_RESO,
      reso_perc=layer.feature.properties.resofreq;
      $('#ngb-reso').text(n_reso);
      $('#ngb-percreso').text(reso_perc);
}else if (appState.slideNumber===3) {
  var  n_theft=layer.feature.properties.C_THEFT17,
      theft_perc=layer.feature.properties.theftfreq;
      $('#ngb-reso').text(n_theft);
      $('#ngb-percreso').text(theft_perc);
}else if (appState.slideNumber===4) {
  var  n_cocaine=layer.feature.properties.C_COCAINE,
       cocaine_perc=layer.feature.properties.cocainefreq;
       $('#ngb-reso').text(n_cocaine);
       $('#ngb-percreso').text(cocaine_perc);
}else if (appState.slideNumber===5) {
  var  n_prost=layer.feature.properties.C_PROPS,
       prost_perc=layer.feature.properties.prosfreq;
       $('#ngb-reso').text(n_prost);
       $('#ngb-percreso').text(prost_perc);
}
}

function resetHighlight2(e) {
  var layer = e.target;

  $('#ngb-id').text('this is also the # at x-axis');
  $('#ngb-name').text('');
  $('#ngb-reso').text('#');
  $('#ngb-percreso').text('%');

if(appState.slideNumber!==(1||0)){
  layer.setStyle({
      weight: 1,
      dashArray: '',
      fillOpacity: 0.7
  });
  layer.bringToFront();
}

if(appState.slideNumber===2){
    layer.setStyle({
        color: 'white'
    });
  }else if (appState.slideNumber===3) {
    layer.setStyle({
        color: '#79FFC6'
    });
  }else if (appState.slideNumber===4) {
    layer.setStyle({
        color: '#FF9719',
        opacity: 0.6
    });
  }else if (appState.slideNumber===5) {
    layer.setStyle({
        color: '#FF4162',
        opacity: 0.6
    });
  }
}

function slideclick(e){
  var layer = e.target;
  var bound = layer.getBounds();
  map.fitBounds(bound);
}

function onEachFeature2(feature, layer) {
  layer.on({
          mouseover: highlightFeature2,
          mouseout: resetHighlight2,
          click:    slideclick
      });
    }

/* =====================
Slide 2
===================== */

//--------------------Slide 2 Content Modification and Transitions
var slideTwo = function(){
  $(".ngb-info").remove();//remove the info-part from slide 3 when turning page back
  $('.slide1-legend').hide();
  $('.slide-title').text(uniqueContent[appState.slideNumber].contentTitle);
  $('.slide-content').text(uniqueContent[appState.slideNumber].content);
  //add info-part from slide 2
  $('.content-part1').after(uniqueContent[appState.slideNumber].appendTxt);
  layer_slide_2.addTo(map);
  layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
  map.removeLayer(layer_slide_1);
  map.removeLayer(layer_slide_3);
  map.setView(slide2Center,13);

  //------D3 Bar Chart Insert------------
  //-----Adapted from Mike Bostock's sample bar chart (https://bl.ocks.org/mbostock/3885304)
  $('.placeholder').replaceWith('<svg class="slide2SVG" width=269 height=109></svg>');
  $('.slide3SVG').replaceWith('<svg class="slide2SVG" width=269 height=109></svg>');
  d3.select("svg.slide2SVG").attr("position",'absolute');
    //append("rect").attr("width", 269).attr("height", 109)
  var svg = d3.select("svg.slide2SVG"),
      margin = {top: 12, right: 8, bottom: 20, left: 35},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().range([height, 0]);
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var formatPercent = d3.format(".0%");
  d3.tsv(chartData, function(d) {
      d.Frequency = +d.Frequency; //coerce to number
      return d;
    }, function(error, data) {
      if (error) throw error;

  x.domain(data.map(function(d) { return d.Name; }));
  y.domain([0, d3.max(data, function(d) { return d.Frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(4, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".21em")
      .attr("text-anchor", "end");

      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("dy", ".31em")
        .attr("transform", "translate(" + (margin.left+9) + "," + (margin.top-2) + ")rotate(-90)")
        .text("Freq.")
        .style("font-size","10px")
        //.style("stroke","#e3f2ff") (stroke makes the text FAT!)
        .style("fill","#e3f2ff");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Name); })
      .attr("y",0)// function (d, i) {return height;})
      .attr("width", x.bandwidth())
      //.attr("height", function(d) { return height - y(d.Frequency);})
      .on('mouseover', function(){d3.select(this).style("fill", "Yellow");})
      .on('mouseout',function(){d3.select(this).style("fill", function(d) {return d.color;});})
      .style("fill", function(d) {return d.color;})
      .attr("height",0)
			.transition()
			.duration(200)
			.delay(function (d, i) {return i * 50;})
			.attr("y", function (d, i) {return y(d.Frequency);})
			.attr("height", function (d, i) {
				return height-y(d.Frequency);
			});
    });
  console.log("2 is fine");
};

/* =====================
Slide 3
===================== */
var slideThree = function(){
  map.removeLayer(layer_slide_2);
  map.removeLayer(layer_slide_4);
  $(".slide4-label").remove();
  $('.slide1-legend').hide();
  $('.slide-title').text(uniqueContent[appState.slideNumber].contentTitle);
  $('.slide-content').text(uniqueContent[appState.slideNumber].content);
  //$('.content-part1').after(uniqueContent[appState.slideNumber].appendTxt);
  layer_slide_3.addTo(map);
  layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
  map.setView(slide2Center,13);
  $('.slide2SVG').replaceWith('<svg class="slide3SVG" width=269 height=109></svg>');
  $('.slide4SVG').replaceWith('<svg class="slide3SVG" width=269 height=109></svg>');

  //D3 Chart with different animation
  //-----Adapted from Tom Carden's Updated Pattern (https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01)
  d3.select("svg.slide3SVG").attr("position",'absolute');

  var svg = d3.select("svg.slide3SVG"),
      margin = {top: 12, right: 8, bottom: 20, left: 35},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().range([height, 0]);
      console.log(y(0),height,width);//77

    // g is the place for the chart! not SVG!
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv(chartdata_t, function (d){
      d.Frequency =+ d.Frequency;
      return d;
    }, function(error, data){
      if(error) throw error;
      replay(data);

    function replay(data){
    var slices = [];
    //****<= not < data.length!!! Or the 12th element wont show up!!
    for (var i = 0; i <=data.length; i++) {
      slices.push(data.slice(0, i+1));
    }
    _.each(slices, function(slice, index){
      setTimeout(function(){draw(slice);}, index * 300);
    });
  }

    function draw(data){
      x.domain(data.map(function(d) { return d.Name; }));
      y.domain([0, d3.max(data, function(d) { return d.Frequency; })]);
      g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));
      g.select('.axis--y').transition().duration(300).call(d3.axisLeft(y).ticks(4, "%"));

    var bars = g.selectAll(".bar").data(data, function(d) { return d.Name; });
    //AHHHHH, I SPENT 3 HOURS TO CATCH THIS ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // I HATE SVG G SVG G SVG G!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //I AM CRYING AND SCREAMING.....ANYWAY, YOU WILL not DETECT THESE.....AHHHHHHHH

    bars.exit().transition().duration(100).attr("y", 0)
      .attr("height", height)
      .style('fill-opacity', 0.01)
      .remove();

    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("y", height)
      .attr("height", 0)
      .on('mouseover', function(){d3.select(this).style("fill", "Yellow");})
      .on('mouseout', function(){d3.select(this).style("fill", function(d) {return d.color;});});

    bars.transition().duration(400).attr("x", function(d) { return x(d.Name); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.bandwidth()) // constant, so no callback function(d) here
    .attr("y", function(d) { return y(d.Frequency); })
    .attr("height", function(d) { return height - y(d.Frequency); })
    .style("fill", function(d) {return d.color;});
  }

  g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));
  g.append("g")
       .attr("class", "axis axis--y")
       .call(d3.axisLeft(y).ticks(4, "%"))
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 5)
       .attr("dy", ".21em")
       .attr("text-anchor", "end");

  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("dy", ".31em")
  .attr("transform", "translate(" + (margin.left+9) + "," + (margin.top-5) + ")rotate(-90)")
  .text("Freq.")
  .style("font-size","10px")
  .style("fill","#e3f2ff");
  });
};

/* =====================
Slide 4
===================== */

var slideFour = function(){
  map.removeLayer(layer_slide_3);
  map.removeLayer(layer_slide_5);
  //$(".ngb-info").remove();
  $('.slide-title').text(uniqueContent[appState.slideNumber].contentTitle);
  $('.slide-content').text(uniqueContent[appState.slideNumber].content);
  $('.slide1-legend').hide();
  layer_slide_4.addTo(map);
  layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
  map.setView(slide2Center,13);
  $('.slide3SVG').replaceWith('<svg class="slide4SVG" width=269 height=109></svg>');
  $('.slide5SVG').replaceWith('<svg class="slide4SVG" width=269 height=109></svg>');
  $('.slide4SVG').before(uniqueContent[appState.slideNumber].appendTxt);

  //---------------------------------Different Animation D3----------------------------
  //----Adapted from Mike Bostock's Sortable Bar Chart (https://bl.ocks.org/mbostock/3885705)-------
  d3.select("svg.slide3SVG").attr("position",'absolute');

  var svg = d3.select("svg.slide4SVG"),
      margin = {top: 12, right: 15, bottom: 18, left: 35},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().range([height, 0]);
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv(chartdata_c, function(error, data){
    if (error) throw error;
    _.each(data, function(d){
      d.Frequency = +d.Frequency;
    });

    x.domain(data.map(function(d) { return d.Name; }));
    y.domain([0, d3.max(data, function(d) { return d.Frequency; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(4, "%"));

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("dy", ".31em")
      .attr("transform", "translate(" + (margin.left-5) + "," + (margin.top-5) + ")")
      .text("Freq.")
      .style("font-size","10px")
      .style("fill","#e3f2ff");

  g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Frequency); })
      .attr("height", function(d) { return height - y(d.Frequency); })
      .on('mouseover', function(){d3.select(this).style("fill", "Yellow");})
      .on('mouseout', function(){d3.select(this).style("fill", function(d) {return d.color;});})
      .style("fill", function(d) {return d.color;});

  d3.select("input").on("change", change);
  //d3.select("#slide4-cbox").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 100);

  function change(){
    clearTimeout(sortTimeout);
    var x0 = x.domain(data.sort(
      this.checked?
      function(a,b){return b.Frequency-a.Frequency;}
      : function(a,b){return d3.ascending(a.Name, b.Name);}
    )
    .map(function(d){return d.Name;}))
    .copy();

    g.selectAll(".bar")
    .sort(function(a, b) { return x0(a.Name) - x0(b.Name); });

    var transition = g.transition().duration(550),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.Name); });

    transition.select(".axis--x")
        .call(d3.axisBottom(x)).selectAll("g")
        .delay(delay);
  }
  });
};

/* =====================
Slide 5
===================== */

var slideFive = function(){
  map.removeLayer(layer_slide_4);
  $(".slide4-label").remove();
  $('.slide-title').text(uniqueContent[appState.slideNumber].contentTitle);
  $('.slide-content').text(uniqueContent[appState.slideNumber].content);
  $('.slide1-legend').hide();
  //$('.content-part1').after(uniqueContent[appState.slideNumber].appendTxt);
  layer_slide_5.addTo(map);
  layer_slide_All1.setStyle(neighborhoodsStyle[appState.slideNumber]);
  map.setView(slide2Center,13);
  $('.slide4SVG').replaceWith('<svg class="slide5SVG" width=269 height=109></svg>');

  d3.select("svg.slide5SVG").attr("position",'absolute');

  var svg = d3.select("svg.slide5SVG"),
      margin = {top: 12, right: 10, bottom: 18, left: 35},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().range([height, 0]);
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv(chartdata_p, function(error, data){
    if (error) throw error;
    _.each(data, function(d){
      d.Frequency = +d.Frequency;
    });
    data.sort(function(a, b) {
    return b.Frequency - a.Frequency;
  });
  var formatValue = d3.format(",.2%"),
      formatFrequency = function(d){return formatValue(d);};

  x.domain(data.map(function(d) { return d.Name; }));
  y.domain([0, d3.max(data, function(d) { return d.Frequency; })]);
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(4, "%"));

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("dy", ".31em")
      .attr("transform", "translate(" + (margin.left-5) + "," + (margin.top-8) + ")")
      .text("Freq.")
      .style("font-size","10px")
      .style("fill","#e3f2ff");

  g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Frequency); })
      .attr("height", function(d) { return height - y(d.Frequency); })
      .style("fill", function(d) {return d.color;});

  g.selectAll(".label")
      .data(data)
      .enter().append("text")
      .attr("class","label")
      .attr("text-anchor", "middle")
      .attr("y", function(d){return x(d.Name)+ x.bandwidth()/1.25;})
      .attr("x", function(d){console.log(height, y(d.Frequency));return height/3-70;})
      .attr("transform", "rotate(-85)")
      .text(function(d){return d3.format(",.2%")(d.Frequency);})
      .attr("font-family", "sans-serif")
      .attr("dy", ".31em")
      .attr("font-size", "9px")
      .attr("fill", "yellow");
});

};

/* =====================
 Button Functions
===================== */
//back-to-cover ....Acturally refresh the page :)
var backToCover = function(){
   window.parent.location = window.parent.location.href;
  //window.location.reload();
};

function reCenter(){
  var center = appState.slideNumber==1? slide1Center:slide2Center;
  var zmLevel = appState.slideNumber==1? 15:13;
  map.setView(center,zmLevel);
}

//slide going forward and both buttons hide/show
var nextSlide=function(){
  if(appState.slideNumber+1 === appState.totalSlide){
    //hide the next button
    $('.arrowRight').hide();
    appState.slideNumber = appState.totalSlide;
    console.log('last page?',appState.slideNumber);
  }else if(appState.slideNumber >0 && appState.slideNumber < appState.totalSlide){
    $('.arrowLeft').show();
    appState.slideNumber+=1;
    console.log('valid page:',appState.slideNumber);
  }
};

//slide going back
var prevSlide=function(){
  if(appState.slideNumber-1 === 1){
    //hide the next button
    $('.arrowLeft').hide();
    appState.slideNumber = 1;
    console.log('first page?',appState.slideNumber);
  }else if(appState.slideNumber >1 && appState.slideNumber <= appState.totalSlide){
    $('.arrowRight').show();
    appState.slideNumber -= 1;
  }
};

var turnPage=function(){
  if(appState.slideNumber===1){
    slideOne();
  }else if(appState.slideNumber===2) {
    slideTwo();
  }else if (appState.slideNumber===3) {
    slideThree();
  }else if(appState.slideNumber===4){
    slideFour();
  }else if(appState.slideNumber===5){
    slideFive();
  }
};
