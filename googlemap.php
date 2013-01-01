<!DOCTYPE html>

<html>
    <head>
        <title>BART Google Map</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" media="screen" type="text/css" href="googlemapstyle.css"/>
        <script type="text/javascript" src="googlemap.js" ></script> 
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script type= "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>       
    </head>
    <body onload= "initialize()">
        <div id="container">
        <div id="bordertop"></div>
            
            <div id="map_canvas"></div>           
            <h1>Hello, welcome to my bArt</h1>
            <p>Select your route, then click icons for times and destinations.</p>
        
                <div id="selform">
                     <form name="route" onsubmit="stnpick()">
                        <select id="routes" style="width:200px">
                            <option value="route1">Route 1</option>
                            <option value="route3">Route 3</option>
                            <option value="route6">Route 6</option>                   
                        </select>
                        <input type="button" value="Submit" onclick=" stnpick()"/>
                    </form>
                     <div id="routeinfo"></div>
                </div>
                
        </div>
    </body>
</html>
    
    
    
