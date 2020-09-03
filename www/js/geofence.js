document.addEventListener('deviceready', function () {
    console.log("Start geofence init");
    // window.geofence is now available
    const onError = (error) => {
        console.log('Geolocation watch failed', error);
    }
    const onSuccess = (position) => {
        console.log('Geolocation watch success', position);
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

    window.geofence.initialize().then(function () {
        console.log("Successful geofence initialization");
        const onTransitionReceived = (geofences) => {
            console.log('Geofences arrived', geofences);
        };

        window.geofence.onTransitionReceived = onTransitionReceived;
        window.geofence.addOrUpdate({
            id: 'geofence_id', // a unique identifier of geofence
            latitude: 47.470293, // geo latitude of geofence
            longitude: 19.058875, // geo longitude of geofence
            radius: 500, // radius of geofence in meters
            transitionType: window.TransitionType.ENTER, // type of transition 1 - Enter, 2 - Exit, 3 - Both
            notification: { // notification object
                id: 123,
                openAppOnClick: true, // is main app activity should be opened after clicking on notification
                foreground: false,
                data: {
                    mydata: 'test'
                }, // custom object associated with notification
                title: 'Notification title',
                text: 'Notification text', // text of notification
            },
        }).then(() => {
          console.log('Gefonce add success');
        }, (error) => {
          console.log('Geofence add failed', error);
        });
    }, function (error) {
        console.log("Geofence init failed", error);
    });
}, false);