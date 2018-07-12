/**
 * Created by vymo on 12/07/18.
 */


// replace these values with those generated in your TokBox Account

var SERVER_BASE_URL = 'https://vymortc.herokuapp.com';
var apiKey = "46152622";
var sessionId = "1_MX40NjE1MjYyMn5-MTUzMTQwNTg4OTkyMn5JTXdKY2dlWSt4bldmbEFBNzRnUDU1cDR-fg";
var token = "T1==cGFydG5lcl9pZD00NjE1MjYyMiZzaWc9YTA1OWNiOTE0MWNhNmYzNTI4NTI3N2UwMTU0ZmNhODkzZWMyNTU0NzpzZXNzaW9uX2lkPTFfTVg0ME5qRTFNall5TW41LU1UVXpNVFF3TlRnNE9Ua3lNbjVKVFhkS1kyZGxXU3Q0YmxkbWJFRkJOelJuVURVMWNEUi1mZyZjcmVhdGVfdGltZT0xNTMxNDA1OTU2Jm5vbmNlPTAuMTI3NDIyOTc0MDQ1NTAyMTgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUzMTQ5MjM1NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

var session;

function handleError(error) {
    if (error) {
        console.error(error);
    }
}

function initializeSession() {
    session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function streamCreated(event) {
        var subscriberOptions = {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        };
        session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
    });

    session.on('sessionDisconnected', function sessionDisconnected(event) {
        console.log('You were disconnected from the session.', event.reason);
    });

    // initialize the publisher
    var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    };
    var publisher = OT.initPublisher('publisher', publisherOptions, handleError);

    // Connect to the session
    session.connect(token, function callback(error) {
        if (error) {
            handleError(error);
        } else {
            // If the connection is successful, publish the publisher to the session
            session.publish(publisher, handleError);
        }
    });

    session.on('signal:msg', function(event) {
        // var msg = document.createElement('p');
        // msg.innerText = event.data;
        // msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
        // msgHistory.appendChild(msg);
        // msg.scrollIntoView();
        if (event.from.connectionId !== session.connection.connectionId) {
            var textArr = event.data.toString().split("####");
            final_span_other.innerHTML = linebreak(textArr[0]);
            if (textArr.length > 1)
                interim_span_other.innerHTML = linebreak(textArr[1]);
        }
    });
}

// See the config.js file.
if (SERVER_BASE_URL) {
    // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
    fetch(SERVER_BASE_URL + '/session').then(function fetch(res) {
        return res.json();
    }).then(function fetchJson(json) {
        apiKey = json.apiKey;
        sessionId = json.sessionId;
        token = json.token;

        initializeSession();
    }).catch(function catchErr(error) {
        handleError(error);
        alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
    });
}

function sendData(msgTxt){
    if (session != null) {
        session.signal({
            type: 'msg',
            data: msgTxt
        }, function (error) {
            if (error) {
                console.log('Error sending signal:', error.name, error.message);
            }
        });
    }
}