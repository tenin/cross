// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
     function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var map;
        require(["esri/map", "dojo/domReady!"], function (Map) {
            map = new Map("mapDiv", {
                center: [-56.049, 38.485],
                zoom: 3,
                basemap: "streets"
            });
        });
            
         // Declare a proxy to reference the hub.
        var chat = $.connection.BroadCastHub22;
        $.connection.hub.qs = "id=" + 1;
         // Create a function that the hub can call to broadcast messages.
        chat.client.Hi = function () {
            // Html encode display name and message.
            alert("Hi");
        };



        $.connection.hub.start().done(function () {
            $('#notify').click(function () {
                chat.server.hello();
            });
        });

        
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


var x = 0;
$.connection.hub.start().done(function () {
    $('#notify').click(function () {
        alert('in fn');

        cordova.plugins.notification.local.schedule({
            id: x,
            title: "samo 3aleko" + x,
            text: "notification ahe!",

            data: { meetingId: "done ;)" }
        });
        x++;
        cordova.plugins.notification.local.on("click", function (notification) {
            alert('in f');
            joinMeeting(notification.data.meetingId);
        });
    });
    function joinMeeting(text) {
        alert(text)
    }
});
   