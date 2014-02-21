<?php
	header('Content-type: application/json');

	include ('dbconnect.php');


	$timezone = "Europe/Paris";
	date_default_timezone_set($timezone);
	$utc = gmdate("M d Y h:i:s A");
	$offset = date('Z', strtotime($utc));
	$date = date('r', strtotime($utc) + $offset);
			

	$action = $_GET['action'];
	$stop_id = $_GET['stop_id'];
	$limit = $_GET['lim'];
	$lat = floatval($_GET['lat']);
	$lon = floatval($_GET['lon']);
	$dist = floatval($_GET['dist']);

	$jsonout = Array();
	$return_arr = Array();


	//get Station infos
	if ($action=="station"){

		$sql="SELECT * FROM  ratp_stops_lite WHERE stop_id='".$stop_id."';";
		$result=mysql_query($sql);
		

		if(mysql_num_rows($result)>0)
		{

			while ($row=mysql_fetch_array($result)) {
				$return_arr[] = array(
					  'stop_id' => $row['stop_id'],
					  'stop_name' => $row['stop_name'],
					  'stop_lat' => $row['stop_lat'],
					  'stop_lon' => $row['stop_lon']
				);
			}
			



		}
	//get Schedule
	} else 	if ($action=="time"){

		$sql="SELECT * FROM  ratp_horaires_rer WHERE stop_id='".$stop_id."' ORDER BY departure_time ASC LIMIT ".$limit.";";
		$result=mysql_query($sql);
		

		if(mysql_num_rows($result)>0)
		{
			
			while ($row=mysql_fetch_array($result)) {
				$return_arr[] = array(
					  'trip_id' => $row['trip_id'],
					  'departure_time' => $row['departure_time'],
					  'stop_id' => $row['stop_id'],
					  'trip_type' => $row['trip_type'],
					  'dest_id' => $row['dest_id']
				);
			}
			

			


		}
	//get Stations near by a POI
	} else if ($action=="nearby"){

		$sql="SELECT stop_id, stop_name, stop_lat, stop_lon, (3959 * acos( cos( radians(".$lat.") ) * cos( radians( stop_lat ) ) * cos( radians( stop_lon ) - radians(".$lon.") ) + sin( radians(".$lat.") ) * sin( radians( stop_lat ) ) ) ) AS distance FROM ratp_stops_lite HAVING distance < ".$dist." ORDER BY distance LIMIT 0, ".$limit."";
		$result=mysql_query($sql);
		

		if(mysql_num_rows($result)>0)
		{
			
			while ($row=mysql_fetch_array($result)) {
				$return_arr[] = array(
					  'stop_id' => $row['stop_id'],
					  'stop_name' => $row['stop_name'],
					  'stop_lat' => $row['stop_lat'],
					  'stop_lon' => $row['stop_lon'],
					  'distance' => $row['distance']
				);
			}
			

			


		}
	
	}
	
	
		$jsonout[] = array(
					  'version' => "0.1",
					  'dated' => $date,
					  'generator' => "Paris 3.0 API",
					  'source' => "RATP",
					  'items' => $return_arr
				);

		echo json_encode($jsonout,JSON_PRETTY_PRINT);
	


?>
