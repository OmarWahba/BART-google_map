var markers = [];
var lines = [];
var times = [];
var destinos = [];
var MY_TYPE = "fade";

function initialize() {
    var latlng = new google.maps.LatLng(37.75, -122.2);
    
    var myOptions = {
      zoom: 10,
      center: latlng,
       mapTypeControlOptions: {
       mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_TYPE]
    },
    mapTypeId: MY_TYPE
  };
    
    

    var style = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { hue: "#ddff00" },
        { saturation: -57,
        lightness: -16,
        Gamma: 1.71 }
      ]
    }
  ];
    
    
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
    
    var styledMapOptions = {
      name: "Fade"
  };  

  var fadeType = new google.maps.StyledMapType(
      style, styledMapOptions);

  map.mapTypes.set(MY_TYPE, fadeType);
  //map.setMapTypeId('fade');     
   
    
}
//the html dropdown select, upon click, calls this function which gets the value of the dropdown and creates a variable called route
//we then connect to the routes xml file on disk and search for the stations on our given route
function stnpick (){
    //clear any existing lines
    clearLine();
    //clear any existing markers
    clearMarkers();
    //get value of drop down
    var route = $('#routes').val();
    //make ajax connection to our routes xml file on the server
    jQuery.get("routes.xml",{}, function(data)  {
        //find our specific route and loop through each station with the each command
        jQuery(data).find("#" + route).each(function() {
            var path = jQuery(this);
            var stns = path.find("station");
            //get color of route
            var color = path.find("color").text();
            //pass the object array stations and the color of the station to function addRoute
            addRoute(stns, color);
            $("#routeinfo").empty();
        });
    });     
}

function popInfo(name){
  
    $("#routeinfo").append('</br>' + name);
}

//by creating an array of lines and adding each line to array, we can then remove lines with simple loop...
function clearLine (){
    if (lines) {
      for (i in lines) {
        lines[i].setMap(null);
      }
      lines.length = 0;
    }   
}
//same logic as above - with markers being pushed to an array, we can remove then more easily
function clearMarkers (){
    if (markers) {
      for (i in markers) {
        markers[i].setMap(null);
      }
      markers.length = 0;
    }   
}


function addRoute(stns, color){
    //create these variable with scope so they can be overwritten and reused
    var infowindow = new google.maps.InfoWindow();
    var coordinates = [];
    var stations = [];
    //make ajax connection to xml file that contains x and y data for station
    jQuery.get("newfile.xml", {}, function(data) {
        //look up each station and get it's x and y
        jQuery(stns).each(function() {
            var stn = jQuery(this);
            var text = stn.text();
            
            jQuery(data).find("#" + text).each(function() {
                
                var image = "bartlogo.png";
                var station = jQuery(this);
                var stanabrv = station.find("abrv").text();
                //getTimes(stanabrv);
                var name = station.find("name").text();
                popInfo(name);                
                
                
                var latlng = new google.maps.LatLng(parseFloat(station.find("xcoord").text()),
                                    parseFloat(station.find("ycoord").text()));
                
                coordinates.push(latlng);
                var marker = new google.maps.Marker({position: latlng, icon: image, map: map});               
                markers.push(marker);
                
                google.maps.event.addListener(marker, 'click', function (e) {
                        infowindow.close();
                        getTimes( marker, stanabrv, name, infowindow);                                        
                 });             
                
                var polyOptions = {
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    path: coordinates
                }
                var gline = new google.maps.Polyline(polyOptions);
                lines.push(gline);
                gline.setMap(map);
                
                        
            });        
        
        });
    
    });
            
}

//use function to get station estimates and destinations using ajax
//create infowindow content with the ajax results and call the window.open function
function getTimes(marker, station, name, infowindow){
    //alert(station);
    //var times = [];
    jQuery.get("Proxy.php", {}, function (data){
        $(data).find("station").each(function (){
             var $each = jQuery(this);
             var abrv = $each.find("abbr").text();
             
             if(station == abrv){                
                 $each.find("eta").each(function (){
                     var that = jQuery(this);
                     var destino = that.find("destination").text();
                     var time = that.find("estimate").text();
                     //alert(destino);
                     times.push(time);
                     destinos.push(destino);
                     //infowindow.setContent(time + destino);
                     //infowindow.open(map, marker);                     
                 });
                 var contentString ='<h2>' + name + '</h2>';
                 for(var i = 0; i < times.length; i++){
                    contentString += '<tr>  <td>' + times[i] + ' </td><td> ' + destinos[i] + '</td></tr></br></br>'
                 
                 }
                 infowindow.setContent(contentString);
                 infowindow.open(map, marker);
             }
            
        });
    });
            
    
}

























