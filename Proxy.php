<?php

    $site = "http://www.bart.gov/dev/eta/bart_eta.xml";
    
    $ch = curl_init($site);
    
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $xml = curl_exec($ch);
    
    header("Content-Type: text/xml");
    echo $xml;
    curl_close($ch);

?>
      