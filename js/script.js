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
                lat: 35.0045566,
                lng: -78.3150126
            },
            address: '820 College Street<br>Clinton, NC 28328-3506',
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
                lat: 35.043645,
                lng: -78.971485
            },
            address: '5412-A Raeford Road<br>Fayetteville, NC 28304-3155',
            phone: '<strong>(P)</strong> 910-339-0963<br><strong>(P)</strong> 910-339-0964<br><strong>(F)</strong> 910-339-0965'
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
            title: 'Goldsboro',
            location: {
                lat: 35.3829748,
                lng: -77.9859449
            },
            address: '701 East Ash Street<br>Goldsboro, NC 27530-3801',
            phone: '<strong>(P)</strong> 919-705-5955<br><strong>(P)</strong> 919-705-5959<br><strong>(F)</strong> 919-705-5966'
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
            title: 'Laurinburg',
            location: {
                lat: 34.752784,
                lng: -79.48003
            },
            address: '1777-A South Main Street<br>Laurinburg, NC 28352-5407',
            phone: '<strong>(P)</strong> 910-506-4299<br><strong>(F)</strong> 910-506-4299'
        },
        {
            title: '*NEW* Laurinburg Office',
            location: {
                lat: 34.7729088,
                lng: -79.4653127
            },
            address: '505 Atkinson Street<br>Laurinburg, NC 28352-3715',
            phone: '<strong>(P)</strong> 910-277-0001<br><strong>(F)</strong> 910-277-0002'
        },
        {
            title: 'Lumberton Counseling Center',
            location: {
                lat: 34.658596,
                lng: -78.999432
            },
            address: '4721 Fayetteville Road, Suite B<br>Lumberton, NC 28358-2113',
            phone: '<strong>(P)</strong> 910-738-3939<br><strong>(P)</strong> 910-738-3926<br><strong>(F)</strong> 910-738-3938},'
        },
        {
            title: 'Lumberton Home Care',
            location: {
                lat: 34.658596,
                lng: -78.999432
            },
            address: '4721 Fayetteville Road, Suite A<br>Lumberton, NC 28358-2113',
            phone: '<strong>(P)</strong> 910-738-7339<br><strong>(P)</strong> 910-738-9003<br><strong>(F)</strong> 910-738-9799'
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
            address: '1514 South Horner Blvd.<br>Sanford, NC 27330-5632',
            phone: '<strong>(P)</strong> 919-774-7044<br><strong>(P)</strong> 919-774-7046<br><strong>(F)</strong> 919-774-7047'
        },
        {
            title: 'Smithfield',
            location: {
                lat: 35.499124,
                lng: -78.351684
            },
            address: '839 S Brightleaf Blvd, Ste #1<br>Smithfield, NC 27577-4386',
            phone: '<strong>(P)</strong> 919-209-0597<br><strong>(F)</strong> 919-989-1168'
        },
        {
            title: 'Whiteville',
            location: {
                lat: 34.3287555,
                lng: -78.7057896
            },
            address: '106 S Lee Street<br>Whiteville, NC 28472-4028',
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
