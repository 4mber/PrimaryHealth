'use strict';

var map;
var markers = [];
var polygon = null;
var placeMarkers = [];

function initMap() {
    var styles = [{
        featureType: 'water',
        stylers: [{
            color: '#19a0d8'
        }]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [{
                color: '#ffffff'
            },
            {
                weight: 5
            }
        ]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#7C0B0F'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
                color: '#D8E8EF'
            },
            {
                lightness: -40
            }
        ]
    }, {
        featureType: 'transit.station',
        stylers: [{
                weight: 9
            },
            {
                hue: '#7C0B0F'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
            lightness: 100
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            lightness: -100
        }]
    }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
                visibility: 'on'
            },
            {
                color: '#f0e4d3'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
                color: '#D8E8EF'
            },
            {
                lightness: -25
            }
        ]
    }];
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 36.6625215,
            lng: -79.4896637
        },
        zoom: 8,
        styles: styles,
        mapTypeControl: false
    });

    var locations = [{
            title: 'Corporate Office',
            location: {
                lat: 34.8064457,
                lng: -78.9734982
            },
            address: '219 West Broad Street<br>St Pauls, NC 28384-1533',
            phone: '<strong>(P)</strong> 910-865-3500<br><strong>(F)</strong> 910-865-4124'
        },
        {
            title: 'Albemarle',
            location: {
                lat: 35.33781,
                lng: -80.21435
            },
            address: '407 Commerce Street Apt B<br>Albemarle, NC 28001-6489',
            phone: '<strong>(P)</strong> 980-581-8487<br><strong>(F)</strong> 980-581-8636'
        },
        {
            title: 'Asheboro',
            location: {
                lat: 35.69698,
                lng: -79.81483
            },
            address: '817 S. Fayetteville Street<br>Asheboro, NC 27203-6489',
            phone: '<strong>(P)</strong> 336-628-4125<br><strong>(F)</strong> 336-628-4139'
        },
        {
            title: 'Burlington',
            location: {
                lat: 36.08851,
                lng: -79.44884
            },
            address: '1148 S. Church Street<br>Burlington, NC 27215-5066',
            phone: '<strong>(P)</strong> 336-639-7947<br><strong>(F)</strong> 336-639-7948'
        },
        {
            title: 'Clinton',
            location: {
                lat: 34.99811,
                lng: -78.30966
            },
            address: '421 Warsaw Road<br>Clinton, NC 28328-3506',
            phone: '<strong>(P)</strong> 910-590-3177<br><strong>(F)</strong> 910-590-3180'
        },
        {
            title: 'Dunn',
            location: {
                lat: 35.3108479,
                lng: -78.6155126
            },
            address: '509 West Broad Street<br>Dunn, NC 28334-4809',
            phone: '<strong>(P)</strong> 910-230-3760<br><strong>(F)</strong> 910-230-3761'
        },
        {
            title: 'Elizabethtown',
            location: {
                lat: 34.642977,
                lng: -78.641509
            },
            address: '2950 West Broad Street<br>Elizabethtown, NC 28337-7137',
            phone: '<strong>(P)</strong> 910-862-3040<br><strong>(P)</strong> 910-862-3043<br><strong>(F)</strong> 910-862-3051'
        },
        {
            title: 'Fayetteville',
            location: {
                lat: 35.04015,
                lng: -78.93342
            },
            address: '3217 Friendly Road<br>Fayetteville, NC 28304-3155',
            phone: '<strong>(P)</strong> 910-339-0963<br><strong>(P)</strong> 910-339-0964<br><strong>(F)</strong> 910-339-0965'
        },
        {
            title: 'Forest City',
            location: {
                lat: 35.31718,
                lng: -81.85698
            },
            address: '727 South Broadway C<br>Forest City, NC 28043-4333',
            phone: '<strong>(P)</strong> 828-305-7512<br><strong>(F)</strong> 828-305-7518'
        },
        {
            title: 'Gastonia',
            location: {
                lat: 35.25267,
                lng: -81.15669
            },
            address: '1595 East Garrison Bvd Ste. B <br>Gastonia, NC 28054',
            phone: '<strong>(P)</strong> 704-691-7189<br><strong>(F)</strong> 704-691-7188'
        },
        {
            title: 'Greensboro',
            location: {
                lat: 36.1054801,
                lng: -79.8265665
            },
            address: '2509 Battleground Avenue Ste. C<br>Greensboro, NC 27408-1929',
            phone: '<strong>(P)</strong> 336-285-7715<br><strong>(F)</strong> 336-291-8244'
        },
        {
             title: 'Greenville',
            location: {
                lat: 35.58816,
                lng: -77.37465
            },
            address: '214 East Arlington Blvd Ste B C<br>Greenville, NC 27858-5023',
            phone: '<strong>(P)</strong> 252-565-8025<br><strong>(F)</strong> 252-565-8026'
        },
        {
            title: 'Goldsboro',
            location: {
                lat: 35.3829748,
                lng: -77.9859449
            },
            address: '701 East Ash Street<br>Goldsboro, NC 27530-3801',
            phone: '<strong>(P)</strong> 919-705-5955<br><strong>(P)</strong> 919-705-5959<br><strong>(F)</strong> 919-705-5966'
        },
        {
           title: 'Jacksonville',
            location: {
                lat: 34.76308,
                lng: -77.41382
            },
            address: '102 Elizabeth Street Ste C <br>Jacksonville, NC 28540-5679',
            phone: '<strong>(P)</strong> 910-939-2070<br><strong>(F)</strong> 910-939-2060'
        },
        {
            title: 'Kenansville',
            location: {
                lat: 34.9631247,
                lng: -77.960782
            },
            address: '<strong>(Physical)</strong> 302 North Main St., Suite 2<br>Kenansville, NC 28349-9044<br><strong>(Mail)</strong> PO Box 70<br>Kenansville, NC 28349-0070',
            phone: '<strong>(P)</strong> 910-296-1200<br><strong>(P)</strong> 910-275-0232<br><strong>(F)</strong> 910-296-1210'
        },
        {
          title: 'Kinston',
            location: {
                lat: 35.28441,
                lng: -77.58958
            },
            address: '2300 North Herritage Street<br>Kinston, NC 28501-1615',
            phone: '<strong>(P)</strong> 252-643-2535<br><strong>(F)</strong> 252-643-2536'
        },
        {   
            title: 'Laurinburg',
            location: {
                lat: 34.752784,
                lng: -79.48003
            },
            address: '801 South Main Street<br>Laurinburg, NC 28352-3715',
            phone: '<strong>(P)</strong> 910-277-0001<br><strong>(F)</strong> 910-277-0002'
        },
        {
            title: 'Laurinburg Day Supports',
            location: {
                lat: 34.77305,
                lng: -79.46533
            },
            address: '505 Atkinson Street<br>Laurinburg, NC 28352-3715',
            phone: '<strong>(P)</strong> 910-361-4936<br><strong>(F)</strong> 910-506-4542'
        },
        {
            title: 'Lenoir',
            location: {
                lat: 35.91507,
                lng: -81.53619
            },
            address: '565 Harper Ave SW Ste B <br>Lenoir, NC 28645-5076',
            phone: '<strong>(P)</strong> 828-759-9444<br><strong>(F)</strong> 828-759-9445'
        },
        {
             title: 'Lexington',
            location: {
                lat: 35.82115,
                lng: -80.25819
            },
            address: '20 West 5th Avenue; Unit #4 <br>Lecington, NC 27292-3224',
            phone: '<strong>(P)</strong> 336-300-7135<br><strong>(F)</strong> 336-300-7136'
        },
        {
             title: 'Lincolnton',
            location: {
                lat: 35.49655,
                lng: -81.24414
            },
            address: '110 Vandiver Drive <br>Lincolnton, NC 28092',
            phone: '<strong>(P)</strong> 704-240-4455<br><strong>(F)</strong> 704-4453'
        },
        {
            title: 'Lumberton Counseling Center',
            location: {
                lat: 34.658596,
                lng: -78.999432
            },
            address: '4701 Fayetteville Road <br>Lumberton, NC 28358-2113',
            phone: '<strong>(P)</strong> 910-738-3939<br><strong>(P)</strong> 910-738-3926<br><strong>(F)</strong> 910-738-3938},'
        },
        {
            title: 'Lumberton Home Care',
            location: {
                lat: 34.658596,
                lng: -78.999432
            },
            address: '4701 Fayetteville Road <br>Lumberton, NC 28358-2113',
            phone: '<strong>(P)</strong> 910-738-7339<br><strong>(P)</strong> 910-738-9003<br><strong>(F)</strong> 910-738-9799'
        },
        {
            title: 'Lumberton Enhanced Services Office',
            location: {
                lat: 34.65883,
                lng: -78.99958
            },
            address: '4721 Fayetteville Road Ste A <br> Lumberton, NC 28358-2113',
            phone: '<strong>(P)</strong> 910-536-1103<br><strong>(F)</strong> 910-536-1207'
        },
        {
            title: 'Lumberton Day Supports',
            location: {
                lat: 34.6945539,
                lng: -79.0057999
            },
            address: '107-A Mt. Moriah Church Road<br>Lumberton, NC 28360-8446',
            phone: '<strong>(P)</strong> 910-739-7000<br><strong>(F)</strong> 910-739-7995'
        },
        {
            title: 'Monroe',
            location: {
                lat: 34.99796,
                lng: -80.54750
            },
            address: '1617 W Roosevelt Blvd Ste. M <br> Monroe, NC 28110',
            phone: '<strong>(P)</strong> 980-210-3725<br><strong>(F)</strong> 980-210-3782'
        },
        {
            title: 'Pembroke',
            location: {
                lat: 34.6795978,
                lng: -79.1926344
            },
            address: '208 Union Chapel Rd., Suite D<br>Pembroke, NC 28372-7419',
            phone: '<strong>(P)</strong> 910-668-1625<br><strong>(F)</strong> 910-668-1626'
        },
        {
            title: 'Raeford',
            location: {
                lat: 34.965679,
                lng: -79.22246
            },
            address: '755 South Main Street<br>Raeford, NC 28376-3238',
            phone: '<strong>(P)</strong> 910-875-1485<br><strong>(P)</strong> 910-875-1564<br><strong>(F)</strong> 910-875-1567'
        },
        {
            title: 'Rockingham',
            location: {
                lat: 34.930962,
                lng: -79.7630439
            },
            address: '621 East Broad Ave.<br>Rockingham, NC 28379-3758',
            phone: '<strong>(P)</strong> 910-434-7180<br><strong>(F)</strong> 910-434-7181'
        },
        {
            title: 'Red Springs',
            location: {
                lat: 34.8137862,
                lng: -79.1793618
            },
            address: '227 East 4th Avenue<br>Red Springs, NC 28377-1327',
            phone: '<strong>(P)</strong> 910-359-0021<br>910-359-0022 / 910-359-0023<br><strong>(F)</strong> 910-359-0024'
        },
        {
            title: 'Rocky Mount',
            location: {
                lat: 35.963477,
                lng: -77.853601
            },
            address: '<strong>(Physical)</strong> 3705 Sunset Avenue<br>Rocky Mount, NC 27804-3327<br><strong>(Mail)</strong> PO Box 7886<br>Rocky Mount, NC 27804-0886',
            phone: '<strong>(P)</strong> 252-443-2748<br><strong>(F)</strong> 252-443-2681'
        },
        {
            title: 'Sanford',
            location: {
                lat: 35.4670974,
                lng: -79.161917
            },
            address: '1518 South Horner Blvd.<br>Sanford, NC 27330-5632',
            phone: '<strong>(P)</strong> 919-774-7044<br><strong>(P)</strong> 919-774-7046<br><strong>(F)</strong> 919-774-7047'
        },
        {
            title: 'Selma',
            location: {
                lat: 35.499124,
                lng: -78.351684
            },
            address: '1011 South Pollock Street<br>Selma, NC 27576-2931',
            phone: '<strong>(P)</strong> 919-634-9696<br><strong>(F)</strong> 919-351-0062'
        },
        {
            title: 'Shelby',
            location: {
                lat: 35.30121,
                lng: -81.54012
            },
            address: '809 N Lafayette Street Ste G<br>Shelby, NC 28150-3886',
            phone: '<strong>(P)</strong> 704-466-9002<br><strong>(F)</strong> 704-466-3034'
        },
        {
            title: 'St. Pauls HWY 20',
            location: {
                lat: 34.82251,
                lng: -79.00585
            },
            address: '1392 NC HWY 20 W<br>St. Pauls, NC 28384-1533',
            phone: '<strong>(P)</strong> 910-885-9002 <br><strong>(F)</strong> 910-885-9026'
        },
        {
             title: 'Tarboro',
            location: {
                lat: 35.89522,
                lng: -77.53284
            },
            address: '101 North Main Street<br> Tarboro, NC 27886-5005',
            phone: '<strong>(P)</strong> 252-563-5251 <br><strong>(F)</strong> 252-563-5256'
        },
        {
            title: 'Wadesboro',
            location: {
                lat: 34.96399,
                lng: -80.05818
            },
            address: '1154A East Caswell Steet NW<br>Wadesboro, NC 28170-2376',
            phone: '<strong>(P)</strong> 980-278-8080<br><strong>(F)</strong> 980-278-8104'
        },
        {
            title: 'Whiteville',
            location: {
                lat: 34.33931,
                lng: -78.70444
            },
            address: '100 Memory Plaza<br>Whiteville, NC 28472-4028',
            phone: '<strong>(P)</strong> 910-642-9900<br><strong>(P)</strong> 910-642-9902<br><strong>(F)</strong> 910-642-9905'
        },
        {
            title: 'Wilson',
            location: {
                lat: 35.7608348,
                lng: -77.9518084
            },
            address: '3358 B Airport Blvd. NW<br>Wilson, NC 27896-8813',
            phone: '<strong>(P)</strong> 252-234-7200<br><strong>(P)</strong> 252-234-7202<br><strong>(F)</strong> 252-234-7210'
        },
        {
            title: 'Winston Salem',
            location: {
                lat: 36.0720404,
                lng: -80.2210645
            },
            address: '1922 S. Martin Luther King Dr., Ste. 13<br>Winston Salem, NC 27107-1361',
            phone: '<strong>(P)</strong> 336-464-3128'
        }
    ];

    var largeInfowindow = new google.maps.InfoWindow();

    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('1C28CD');
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var address = locations[i].address;
        var phone = locations[i].phone;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            address: address,
            phone: phone,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        markers.push(marker);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }


    function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;

            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div><strong class="title">' + marker.title + '</strong></div><div>' + marker.address + '</div><div>' + marker.phone + '</div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    infowindow.setContent('<div><strong>' + marker.title + '</strong></div><div>' + marker.address + '</div><div>' + marker.phone + '</div>');
                }
            }
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            infowindow.open(map, marker);
        }
    }

    function showListings() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    }

    function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }
    showListings();

    function createMarkersForPlaces(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            var place = places[i];
            var icon = {
                url: place.icon,
                size: new google.maps.Size(35, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                id: place.place_id
            });
            var placeInfoWindow = new google.maps.InfoWindow();
            marker.addListener('click', function() {
                if (placeInfoWindow.marker == this) {
                    console.log("This infowindow is already on this marker!");
                } else {
                    getPlacesDetails(this, placeInfoWindow);
                }
            });
            placeMarkers.push(marker);
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        }
        map.fitBounds(bounds);
    }

    function getPlacesDetails(marker, infowindow) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: marker.id
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                infowindow.marker = marker;
                var innerHTML = '<div>';
                if (place.name) {
                    innerHTML += '<strong>' + place.name + '</strong>';
                }
                if (place.formatted_address) {
                    innerHTML += '<br>' + place.formatted_address;
                }
                if (place.formatted_phone_number) {
                    innerHTML += '<br>' + place.formatted_phone_number;
                }
                if (place.opening_hours) {
                    innerHTML += '<br><br><strong>Hours:</strong><br>' +
                        place.opening_hours.weekday_text[0] + '<br>' +
                        place.opening_hours.weekday_text[1] + '<br>' +
                        place.opening_hours.weekday_text[2] + '<br>' +
                        place.opening_hours.weekday_text[3] + '<br>' +
                        place.opening_hours.weekday_text[4] + '<br>' +
                        place.opening_hours.weekday_text[5] + '<br>' +
                        place.opening_hours.weekday_text[6];
                }
                if (place.photos) {
                    innerHTML += '<br><br><img src="' + place.photos[0].getUrl({
                        maxHeight: 100,
                        maxWidth: 200
                    }) + '">';
                }
                innerHTML += '</div>';
                infowindow.setContent(innerHTML);
                infowindow.open(map, marker);
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            }
        });
    }
}
