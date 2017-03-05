/* =====================
appState Initializing
===================== */
var appState = {
  slideNumber: 0,
  totalSlide: 5,
};

/* =====================
Leaflet Configuration
===================== */
var map = L.map('map', {
  center: [47.616404, -122.339864],
  zoom: 11
});
var anotherCenter = [47.6168, -122.33980];
var amazonXY = [47.616404, -122.339864];
var coverZoom=[47.638154, -122.333484];
var slide1Center = [47.621172, -122.351021];
var slide2Center = [47.621172, -122.331021];

var CartoDB_DarkMatterNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

var CartoDB_DarkMatterOnlyLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 20,
  opacity:0.6
});

var pulsingAmazonGo = L.icon.pulse({iconSize:[6,6], color:'#e3f2ff'});
var pulsingMarker = L.marker(amazonXY,{icon: pulsingAmazonGo}).addTo(map);

/* =====================
Datasets and Layers Defining;
===================== */
//not on cover, but all slides, only showing the line!
var cityLimits = "https://raw.githubusercontent.com/laylasun/seattle-boundaries/master/data/city-limits.geojson";
var dataCity;
var layer_slide_All;
var coverLimitStyle = function(feature){
  return {weight:1, color:"#e3f2ff", fillColor: "#e3f2ff", fillOpacity:0};};

//not on cover, but all slides, color changing based on slide's content
//var selectedNeighborhoods = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/update3.geojson";
var selectedNeighborhoods = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/12ngb_update4.geojson";
var dataNeighborhoods;
var layer_slide_All1;

var coverStyle = {weight:1, color: '#A0C7D8', fillOpacity:0};

//--------------------------------slide1 data-------------------------------------
var siblings = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/20sib_updated.geojson";
var dataSiblings;
var layer_slide_1;

//Top layer - point features: style for the point features
var slide1BaseCircles = {
    radius: 6,
    fillColor: 'Yellow',
    color: "yellow",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

//Bottom layer - neighborhoodsStyle: style for selectedNeighborhoods boundaries in slide 1
function getSlide1Color(n) {
    return n === 'Cascade'      ? '#4ca6a6' :
           n === 'Downtown'     ? '#CD0000' :
           n === 'Capitol Hill' ? '#0080FF' :
           n === 'Central Area' ? '#dcacda' :
                                  '#ecacda';
}
var slide1Style = function(feature){
  return {
        fillColor: getSlide1Color(feature.properties.LargeHood),
        weight: 1,
        opacity: 0.9,
        color: 'white',
        fillOpacity: 0.4
    };
};

//var slide1_b_content = ['.info-title','#small-guide','#mini-bio'];
var slide1b_content='<div class="placeholder"> <span class="info-title">Mini Bio of A Sibling</span> <br/> <span id="small-guide">Hover over a circle...</span> <br/> <table id="mini-bio"> <tr> <td>Name</td> <td><span id="sibling-name">always a cool name</span></td> </tr> <tr> <td>Birth Year</td> <td><span id="sibling-b-year">I am not the youngest</span></td> </tr> <tr> <td>Address</td> <td><span id="sib-address">not far from me</span></td> </tr> <tr> <td>Appraised Value</td> <td><span id="appr-value">for tax purpose...</span></td> </tr> <tr> <td>Net SQFT</td> <td><span id="sib-size">hmmm.....</span></td> </tr> </table> </div>';

//--------------------------------slide2 data-------------------------------------
//var chartData="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/slide2data.tsvhttps://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/slide2data.tsv";
var resources = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/resources.geojson";
var dataResources;
var layer_slide_2;
var chartData = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/slide2data1_12.tsv";
function getSlide2Color(n) {
    return n === 'Belltown'      ? '#4b2173' :
           n === 'Broadway'     ? '#431d67' :
           n === 'Central Business District' ? '#3c1a5c' :
           n === 'Eastlake' ? '#9379ab' :
           n === 'First Hill'? '#a590b9':
           n === 'International District'? '#81639d':
           n === 'Minor'? '#b7a6c7':
           n === 'Pike-Market'? '#c9bcd5':
           n === 'Pioneer Square'? '#6e4d8f':
           n === 'South Lake Union'? '#5d3781':
           n === 'Westlake'? '#ede8f1':
           n === 'Yesler Terrace'? '#dbd2e3':
           'white';
}

var slide2Style = function(feature){
  return {
        fillColor: getSlide2Color(feature.properties.name),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
};

var slide2PointFeatures = {
    radius: 2,
    fillColor: 'white',
    color: "white",
    weight: 0.2,
    opacity: 1,
    fillOpacity: 0.9,
};


//-----------------------------------------------------Slide 3 data---------
var thefts2017="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/theftIncidents_2017_Jan_Feb.geojson";
var dataTheft2017;
var layer_slide_3;
var chartdata_t="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/theft2017_!.tsv";
function getSlide3Color(n) {
    return n === 'Belltown'      ? '#431d67' :
           n === 'Broadway'     ? '#4b2173' :
           n === 'Central Business District' ? '#3c1a5c' :
           n === 'Eastlake' ? '#dbd2e3' :
           n === 'First Hill'? '#9379ab':
           n === 'International District'? '#a590b9':
           n === 'Minor'? '#b7a6c7':
           n === 'Pike-Market'? '#5d3781':
           n === 'Pioneer Square'? '#81639d':
           n === 'South Lake Union'? '#6e4d8f':
           n === 'Westlake'? '#ede8f1':
           n === 'Yesler Terrace'? '#c9bcd5':
           'white';
}

var slide3Style = function(feature){
  return {
        fillColor: getSlide3Color(feature.properties.name),
        weight: 1,
        opacity: 1,
        color: '#79FFC6',
        fillOpacity: 0.7
    };
};

var slide3PointFeatures = {
    radius: 2,
    fillColor: '#79FFC6',
    color: "#79FFC6",
    weight: 0.2,
    opacity: 1,
    fillOpacity: 0.9,
};

//-----------------------------------------------------Slide 4 data---------
var cocaine="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/cocaineArrest.geojson";
var dataCocaine;
var layer_slide_4;
var chartdata_c="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/cocaine1.tsv";
function getSlide4Color(n) {
    return n === 'Belltown'      ? '#6e4d8f' :
           n === 'Broadway'     ? '#81639d' :
           n === 'Central Business District' ? '#4b2173' :
           n === 'First Hill'? '#a590b9':
           n === 'International District'? '#5d3781':
           n === 'Minor'? '#9379ab':
           n === 'Pike-Market'? '#431d67':
           n === 'Pioneer Square'? '#3c1a5c':
           '#ffd5a3';
}

var slide4Style = function(feature){
  return {
        fillColor: getSlide4Color(feature.properties.name),
        weight: 1,
        opacity: 1,
        color: '#FF9719',
        fillOpacity: 0.7
    };
};

var slide4PointFeatures = {
    radius: 2,
    fillColor: '#FF9719',
    color: "#FF9719",
    weight: 0.2,
    opacity: 1,
    fillOpacity: 0.9,
};

//-----------------------------------------------------Slide 5 data---------
var prostitutions = "https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/reportedProstitutions.geojson";
var dataProst;
var layer_slide_5;
var chartdata_p="https://raw.githubusercontent.com/laylasun/JS_MidtermRawData/master/finalSelection/prost1.tsv";
function getSlide5Color(n) {
    return n === 'Belltown'      ? '#431d67' :
           n === 'Broadway'     ? '#a590b9' :
           n === 'Central Business District' ? '#81639d' :
           n === 'First Hill'? '#b7a6c7':
           n === 'International District'? '#431d67':
           n === 'Minor'? '#5d3781':
           n === 'Pike-Market'? '#c9bcd5':
           n === 'Pioneer Square'? '#6e4d8f':
           n === 'South Lake Union'? '#3c1a5c':
           n === 'Westlake'? '#dbd2e3':
           n === 'Yesler Terrace'? '#9379ab':
           '#FFC6CF';
}

var slide5Style = function(feature){
  return {
        fillColor: getSlide5Color(feature.properties.name),
        weight: 1,
        opacity: 0.6,
        color: '#FF4162',
        fillOpacity: 0.7
    };
};

var slide5PointFeatures = {
    radius: 2,
    fillColor: '#FF4162',
    color: "#FF4162",
    weight: 0.2,
    opacity: 1,
    fillOpacity: 0.9,
};

/* =====================
Unique content for slide
===================== */

var neighborhoodsStyle=[coverStyle,slide1Style,slide2Style,slide3Style,slide4Style,slide5Style];
var pointToLayerStyle=[slide1BaseCircles,slide2PointFeatures,slide3PointFeatures,slide4PointFeatures,slide5PointFeatures];
var uniqueContent = [
  { contentTitle:"N", content: "NA"},
  { contentTitle: "A Little about My Family",
    content: "The pulsating circle is me, Amazon Go, a check-out free grocery store located in 2131 7th Ave in downtown Seattle. I am the very first Amazon child in the grocery sector and right now only open to the Amazon employees in the Beta program. It’s been a great year and I want to show you some fun things around me. First, my siblings - Amazon offices, not the lockers!"
  },
  { contentTitle:"Resources in Nearby Neighborhoods",
    content:"407 public resources around me are selected. Bar chart above shows the % distribution of resources in each of the 12 neighborhoods. Hover over a neighborhood for more info...",
    appendTxt: '<div class="ngb-info"><br>ID: <span id="ngb-id"></span> <br>Name: <span id="ngb-name"></span> <br># of Resources: <span id="ngb-reso">#</span> (<span id="ngb-percreso">%</span>)</div>'
  },
  { contentTitle:"Reported Theft Incidents in 2017",
    content: "By the end of February, 913 theft incidents have been reported to Seattle 911. The bar chart shows the frequency of reported thefts in a certain neighborhood. Hover and check it out.",
    appendTxt:' '
    //'<div class="ngb-info"><br>ID: <span id="ngb-id"></span> <br>Name: <span id="ngb-name"></span> <br># of Resources: <span id="ngb-reso">#</span> (<span id="ngb-percreso">%</span>)</div>'
  },
  { contentTitle:"Cocaine Arrests Since 2012 ",
    content:"Only 236 cocaine arrests since 2012. Bar chart above shows the % distribution of cocaine arrests in each of the 12 neighborhoods. Hover over a neighborhood for more info...",
    appendTxt:'<label class="slide4-label"><input type="checkbox" id="#slide4-cbox"><span class="label-txt">sort values</span></label>'
  },
  { contentTitle:"Reported Prostitutions Since 2010 ",
    content:"795 in total. The pattern is interesting. Bar chart above shows the % distribution of these events in each of the 12 neighborhoods. Hover over a neighborhood for more info...",
    appendTxt: ''
  },
];
