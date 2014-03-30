/*!
 * Set language
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com), Mohamed Diarra (diarra.mohh@gmail.com)
 * \fn void setLang(lang)
 * \memberof paris30
 * \param lang language key 
 * \example 
 *      setLang("EN");
 */
function setLang(lang){
	$.getJSON("lang/"+lang+".ini",function(data){
		$.each(data,function(key,val){				
			$('#page-home #'+key+'').html(val);
			$('#page-map-interactive #'+key+'').html(val);
			$('#page-map-classic #'+key+'').html(val);
			$('#page-list #'+key+'').html(val);			
		});
	});
	$.cookie("lang", lang);	
}


/*!
 * Load map
 * \author Sébastien Touch (sebastien.touch@gmail.com)
 * \fn void setLang(lang)
 * \memberof paris30
 * \param lang language key 
 * \example 
 *      setLang("EN");
 */
function getMapInteractive(){


		


		
		function loadURL(url){
    			navigator.app.loadUrl(url, { openExternal:true });
			    return false;
		} 		

		

		//Geolocation
		$('#map_canvas').gmap().bind('init', function(evt, map) {
			$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
								
				
					var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					$('#map_canvas').gmap('addMarker', {
						'position': clientPosition, 
						'bounds': true,
						'icon': 'img/marker/location-marker.png'
					}).click(function() {
						$('#map_canvas').gmap('openInfoWindow', { 'content': 'Votre position.' }, this);
					});
					
					//Fonction ajoute marker, type=type transport , icon=
					function marker(type,icon){
						$.getJSON( 'http://failwithfairytales.fr/l2o/request/'+type+'/getStations/'+position.coords.latitude+'_'+position.coords.longitude+'/1', function(data) { 
							$.each( data, function(i, marker) {
			
			
								var itineraire = 'https://maps.google.com/maps?daddr='+marker.lat+','+marker.lng+'&saddr='+position.coords.latitude		+','+position.coords.longitude;						 	
								var pos=new google.maps.LatLng(marker.lat, marker.lng);	
							
								$('#map_canvas').gmap('addMarker', { 
									'position': new google.maps.LatLng(marker.lat, marker.lng), 
									'bounds': true,
									'icon' : icon
								}).click(function() {
								$('#map_canvas').gmap('openInfoWindow', { 'content': marker.name+'<div>'+getDistanceLatLon(clientPosition,pos)+'km de votre position'+'<br>'+'<a href="'+itineraire+'" target="_blank">'+'Itineraire'+'</a>'+'</div>' }, this);
								});
							});
						});	
					}
					
					marker('velib','img/marker/pin_velib.png');
					marker('bus','img/marker/pin_bus.png');	
					marker('rer','img/marker/pin_rer.png');
					marker('metro','img/marker/pin_metro.png');
					marker('tram','img/marker/pin_tramway.png');
			});   
		});

		
}


/*!
 * Get distance between two positions given latitude & longitude object of two positions
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn double getDistance(lat1, lon1, lat2, lon2)
 * \memberof paris30
 * \param latlon1 latitude & longitude object of position 1
 * \param latlon2 latitude & longitude object of position 2
 * \return distance between two positions
 * \example 
 *      var latlon1 = new google.maps.LatLng(48.85587109999999,2.331451799999968);
 *      var latlon2 = new google.maps.LatLng(49.85587109999999,2.331451799999968);
 		var dist = calculateDistance(latlon1,latlon2);
 */
function getDistanceLatLon(latlon1, latlon2)
{
	return (google.maps.geometry.spherical.computeDistanceBetween(latlon1, latlon2) / 1000).toFixed(2);  
}


/*!
 * Go to tagged markers
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com), Sébastien Touch (sebastien.touch@gmail.com)
 * \fn void goTag(tag)
 * \memberof paris30
 * \param tag tag key * 
 * \example 
 *      goTag("Favorites");
 */

function goTag(tag) {
	
	$('#map_canvas').gmap('closeInfoWindow');
	$('#map_canvas').gmap('set', 'bounds', null);
	if (tag == 'all' ) {
		$.each($('#map_canvas').gmap('get', 'markers'), function(i, marker) {
			$('#map_canvas').gmap('addBounds', marker.position);
			marker.setVisible(true); 			
		});
	} else {
		$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': tag }, function(marker, found) {
			if (found) {
				$('#map_canvas').gmap('addBounds', marker.position);
			}
			marker.setVisible(found); 
		});
	}
	
	$('#tags').val(tag);

}



/*!
 * Set swipe
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn void setSwipe()
 * \memberof paris30  
 * \example 
 *      setSwipe();
 */
function setSwipe(div){

	$.mobile.ignoreContentEnabled = true;
	
	$('#'+div).bind("swipeleft", function(){
		var nextpage = $(this).next('div[data-role="page"]');
		// swipe using id of next page if exists
		if (nextpage.length > 0) {
			$.mobile.changePage(nextpage, {transition: "slide",
			reverse: false}, true, true);
		}

	  });

	  $('#'+div).bind("swiperight", function(){
		var prevpage = $(this).prev('div[data-role="page"]');
		if (prevpage.length > 0) {
			$.mobile.changePage(prevpage, {transition: "slide",
			reverse: true}, true, true);
		}

	});	

}
