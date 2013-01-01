<?php
$link = mysql_connect('localhost', 'root', 'lot49');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

?>

<!DOCTYPE html>
<html>
    <head>
        <body>
<?
    $dom = simplexml_load_file("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V");
    
    $result = mysql_query("SELECT * FROM bart.station");
    while($row = mysql_fetch_array($result))
    {
        $abrv = $row["abrv"];
        $dom = simplexml_load_file("http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=" . $abrv ."&key=MW9S-E7SL-26DU-VV8V");
        
        foreach ($dom->stations->station as $station)
        {
            $xcoord = $station->gtfs_latitude;
            $ycoord = $station->gtfs_longitude;
            
            $insert = "UPDATE  bart.station SET xcoord = $xcoord, ycoord = $ycoord WHERE abrv = '$abrv'";
            mysql_query($insert);
          
        }
        
    }
      

?>

        </body>
    </head>
</html>

