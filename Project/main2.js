// For the NinaStartSession CONNECT message
var nmaid = "NinaCloud";
var nmaidKey = "b7635accb9e5f37de5c9d9cd7578b6a05015720c981c6e0104f720d400bde56cfd116e4aabeee418e5ab53116ac034c97b409c0579fea300a2ec5264e7796b0b";
var username = "webapp_vm142:84";
var http_url = "https://webapi-demo.nuance.mobi:11443/nina-webapi/";

var companyName;
var appName;
var cloudModelVersion;

// Audio handlers
var audioContext = initAudioContext();
var audioPlayer = new AudioPlayer(audioContext); // For the play audio command

function startSession() {

    // Check parameters of the connection message.
    var lNmaid = $('#nmaid')[0].value;
    if (lNmaid.length > 0) {
        nmaid = lNmaid;
    }
    var lNmaidKey = $('#nmaid_key')[0].value;
    if (lNmaidKey.length > 0) {
        nmaidKey = lNmaidKey;
    }
    var lUsername = $('#username')[0].value;
    if (lUsername.length > 0) {
        username = lUsername;
    }
    var lHttp_url = $('#http_url')[0].value;
    if (lHttp_url.length > 0) {
        http_url = lHttp_url;
    }

    var lCompanyName = $('#companyName')[0].value;
    if (lCompanyName.length > 0) {
        companyName = lCompanyName;
    }
    var lAppName = $('#appName')[0].value;
    if (lAppName.length > 0) {
        appName = lAppName;
    }
    var lCloudModelVersion = $('#cloudModelVersion')[0].value;
    if (lCloudModelVersion.length > 0) {
        cloudModelVersion = lCloudModelVersion;
    }

    $("#myModal").modal('hide');
    $('.secondaryTab').fadeIn();
}

function nluNLE() {

    if (!$("#nlu_nle_txtbutton").hasClass("disabled")) {
        var inputText = fixLineBreaks($("#nlu_nle_text").val());

        $('#nlu_nle_results').text("");

        //Send POST Request to NinaDoNLU API
        var request = new XMLHttpRequest();
        var url = http_url + "NinaDoNLU/";

        request.open("POST", url, true);
        request.responseType = "json";
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("nmaid", nmaid);
        request.setRequestHeader("nmaidkey", nmaidKey);

        var command = {
            companyName: companyName,
            appName: appName,
            cloudModelVersion: cloudModelVersion,
            user: username,
            text: inputText,
            nlu_engine: "NLE"
        };

        request.send(JSON.stringify(command));

        //Handle the response
        request.onreadystatechange = function(event) {
            if (request.readyState === 4 && request.status === 200) {
                var response = request.response;
                if (response) {
                    $('#nlu_nle_results').text(JSON.stringify(response, null, 4));
                }
            }
        };

    }
}

function playAudio() {

    if (!$("#playaudio_button").hasClass("disabled")) {
        $('#playaudio_results').text("");

        var inputText = $("#text").val();

        // POST request to TTS API
        var request = new XMLHttpRequest();
        var url = http_url + "TTS/";

        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("nmaid", nmaid);
        request.setRequestHeader("nmaidkey", nmaidKey);
        request.responseType = "arraybuffer";

        request.send(JSON.stringify({
            user: username,
            text: inputText,
            tts_type: "text"
        }));

        request.onreadystatechange = function(event) {
            if (request.readyState === 4 && request.status === 200) {
                var arrayBuffer = request.response;
                if (arrayBuffer) {
                    $('#playaudio_results').text('Audio received.');
                    audioPlayer.play(arrayBuffer);
                }
            }
        };
    }
}


