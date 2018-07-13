/**
 * Created by salonasinha on 13/07/18.
 */
(function () {
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    $.when(
        $.getScript( "./lineChart.js" ),
        $.getScript( "./barChart.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){



    });
})

