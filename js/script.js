'use strict';

function init() {
    var MapViewModel = function() {
        // To make our GoogleMap unique...
        var styles = [
			{
				featureType: 'water',
				stylers: [
					{color: '#19a0d8'}
				]
			},{
				featureType: 'administrative',
				elementType: 'labels.text.stroke',
				stylers: [
					{color: '#ffffff'},
					{weight: 5}
				]
			}, {
				featureType: 'administrative',
				elementType: 'labels.text.fill',
				stylers: [
					{color: '#7C0B0F'}
				]
			},{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [
					{color: '#D8E8EF'},
					{lightness: -40}
				]
			},{
				featureType: 'transit.station',
				stylers: [
					{weight: 9},
					{hue: '#7C0B0F'}
				]
			},{
				featureType: 'road.highway',
				elementType: 'labels.icon',
				stylers: [
					{visibility: 'off'}
				]
			},{
			    featureType: 'water',
					elementType: 'labels.text.stroke',
				stylers: [
						{ lightness: 100 }
				]
				},{
				featureType: 'water',
					elementType: 'labels.text.fill',
		        stylers: [
		        	{ lightness: -100 }
		        ]
		    },{
		        featureType: 'poi',
		        elementType: 'geometry',
		        stylers: [
		        	{ visibility: 'on' },
		        	{ color: '#f0e4d3' }
		        ]
		    },{
				featureType: 'road.highway',
				elementType: 'geometry.fill',
				stylers: [
					{color: '#D8E8EF'},
					{lightness: -25}
				]
			}
		];
        var self = this;
        self.infoMarker = null;
        self.reviews = ko.observableArray();
        self.location = ko.observableArray();

        // Display Google Map...
        self.map = new google.maps.Map(document.getElementById('map'), {
	        center: {lat: 35.2977357, lng: -78.7400579},
	        zoom: 8,
	        styles: styles,
	        mapTypeControl: false
    	});
        self.updateList = function(businessId) {
            self.yelp(businessId, null);
        };

        // Our base Yelp API integration...
        self.yelp = function(businessId, marker) {
            var auth = {
	            consumerKey: "075NV9hdtE4WvuCTh09oKQ",
	            consumerSecret: "zaP21iHZ2jwqtsOEb5Ya9AE5Xes",
	            accessToken: "9Ojq-deiUWSZ_Csd6btJjAKVDWysS44n",
	            accessTokenSecret: "YJMKQ2LLeQvh0iVZzY1WKFkOaxY",
	            serviceProvider: {
	                signatureMethod: "HMAC-SHA1"
	            }
	        };
            var yelp_url = 'https://api.yelp.com/v2/business/' + businessId;

            var parameters = {
                oauth_consumer_key: auth.consumerKey,
                oauth_token: auth.accessToken,
                oauth_nonce: nonceGenerate(),
                oauth_timestamp: Math.floor(Date.now() / 1000),
                oauth_signature_method: 'HMAC-SHA1',
                oauth_version: '1.0',
                callback: 'cb'
            };

            var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, auth.consumerSecret, auth.accessTokenSecret);
            parameters.oauth_signature = encodedSignature;
            var selectedMarker = null;
            self.markers().forEach(function(currentmarker) {
                if (currentmarker.yelp_id === businessId) {
                    selectedMarker = currentmarker;
                    currentmarker.setIcon('https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png');
                } else {
                    currentmarker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                }
            });

            var errorTimeout = setTimeout(function() {
                alert("Error! Please refresh or try again later.");
            }, 8000);

            $.ajax({
                url: yelp_url,
                data: parameters,
                cache: true,
                dataType: 'jsonp',
                success: function(results) {
                    clearTimeout(errorTimeout);
                    self.business(results);
                    self.location(results.location.display_address);
                    self.reviews([]);
                    results.reviews.forEach(function(review) {
                            var theReview;
			    self.reviews ? theReview = self.reviews.push({
                            review: review.excerpt + " - " + review.user.name
                            }) : theReview = "No reviews available.";
                    });

                    // Creates content for inside of info windows...
                    var contentString = '<div class="content">' +
                        '<h1 id="first-heading" class="first-heading">' + results.location.city + '</h1><br><p>' +  + '</p></div>';
                    if (self.InfoMarker != null) {
                        self.InfoMarker.close();
                    }
		    self.InfoMarker = new google.maps.InfoWindow({
                        content: contentString
                    });
                    self.InfoMarker.open(mapview.map, selectedMarker);
              	    },
                error: function(err) {
                    alert("Error! Please refresh or try again later.");
                }
            });
        };

        self.markers = new ko.observableArray();
        self.searchFilter = ko.observable('');
        self.business = ko.observable('');

        self.createLocation = function(title, latitude, longitude, business_id) {
            var location = {
                position: new google.maps.LatLng(latitude, longitude),
                title: title,
                visible: true,
                map: self.map,
                yelp_id: business_id
            };

            // Add a new marker to the markers array...
            self.markers.push(new google.maps.Marker(location));
            self.markers()[self.markers().length - 1].setAnimation(null);
            self.markers()[self.markers().length - 1].setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
            // And add the click function & animation to the new marker...
            self.markers()[self.markers().length - 1].addListener('click', function() {
                var marker = this;
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 1400);

                }
                self.yelp(this.yelp_id, this);
            });

            return location;
        };

        // Add in all of our locations...
        self.coordinates = [
            new self.createLocation('Clinton', 35.0046746, -78.3169622, 'alfredos-ristorante-italiano-clinton', '100 example lane, city, nc 12345'),
            new self.createLocation('Dunn', 35.3108479, -78.6177013, 'broad-st-deli-and-market-dunn'),
            new self.createLocation('Elizabethtown', 34.642956, -78.6438134, 'melvins-elizabethtown'),
            new self.createLocation('Fayetteville', 35.043645, -78.9736737, 'macs-speed-shop-fayetteville'),
            new self.createLocation('Greensboro', 36.1054801, -79.8287552, 'hops-burger-bar-greensboro'),
            new self.createLocation('Goldsboro', 35.3830701, -77.9880316, 'thai-garden-goldsboro'),
            new self.createLocation('Kenansville', 34.9630782, -77.9628029, 'tokyo-sunrise-kenansville'),
            new self.createLocation('Lumbertown Counseling Center', 34.658596, -79.0016207, 'thai-chili-lumberton-4'),
            new self.createLocation('Lumbertown Home Care', 34.658596, -79.0016207, 'taqueria-los-molcajetes-lumberton'),
            new self.createLocation('Lumbertown Day Supports', 34.6959457, -79.0135523, 'adelios-restaurant-lumberton'),
            new self.createLocation('Pembroke', 34.6822376, -79.1923251, 'san-jose-mexican-restaurant-pembroke'),
            new self.createLocation('Raeford', 34.965679, -79.2246487, 'las-palmas-mexican-grill-raeford'),
            new self.createLocation('Rockingham', 34.930962, -79.7652326, 'pattans-downtown-grille-rockingham'),
            new self.createLocation('St. Pauls Corporate Office', 34.8064457, -78.9756869, 'zacharys-pizza-restaurant-saint-pauls-2'),
            new self.createLocation('Laurinburg', 34.752784, -79.4822187, '215-on-main-laurinburg'),
            new self.createLocation('Red Springs', 34.8137862, -79.1815505, 'taqueria-el-leon-red-springs'),
            new self.createLocation('Rocky Mount', 35.9635897, -77.8558228, 'the-prime-smokehouse-rocky-mount'),
            new self.createLocation('Sanford', 35.4670974, -79.1641057, 'la-dolce-vita-pizzeria-sanford'),
            new self.createLocation('Smithfield', 35.4991552, -78.3540322, 'san-marcos-mexican-restaurant-smithfield'),
            new self.createLocation('Whiteville', 34.3287555, -78.7079783, 'the-chef-and-the-frog-whiteville'),
            new self.createLocation('Wilson', 35.7608348, -77.9539971, 'la-rancherita-grill-and-tequila-bar-wilson'),
            new self.createLocation('Winston Salem', 36.0720404, -80.2232532, 'camino-bakery-winston-salem-2')
        ];

        // Updates locations list and marker visibilities based on input from the search field...
        self.searchFilter.subscribe(function(searchValue) {
            searchValue = searchValue.toLowerCase();
            var change = false;
            ko.utils.arrayForEach(self.markers(), function(marker) {
                var text = marker.title.toLowerCase();
                if (text.search(searchValue) === -1) {
                    if (marker.getVisible() === true) {
                        change = true;
                    }
                    marker.setVisible(false);
                } else {
                    if (marker.getVisible() === false) {
                        change = true;
                    }
                    marker.setVisible(true);
                }
            });
            if (change === true) {
                var data = self.markers().slice(0);
                self.markers([]);
                self.markers(data);
            }
        });
    };
    // Activates knockout...
    var mapview = new MapViewModel();
    ko.applyBindings(mapview);
}

function nonceGenerate(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function errorHandler() {
	alert("There was an error loading Google Maps. Please refresh or try again later!");
}