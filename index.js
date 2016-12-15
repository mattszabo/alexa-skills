var alexa = require('alexa-app');
var app = new alexa.app('helloWorld');

app.launch(function(request, response) {
    response.say('hello matt, and hello world');
});

// slots is there to auto generate in schema with `alcl schema`
app.intent('helloIntent',
  {
    "slots": [
      {
        "name": "name",
        "type": "AMAZON.LITERAL"
      }
    ]
    ,"utterances":[ "say the your name" ]
  },
  function(request, response) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    var url;
    var name = request.slot('name');

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        response.say(JSON.parse(xmlHttp.responseText).message);
        response.send();
      }
    }
    if( name != undefined) {
      url = 'http://www.mattcodes.com.au:3903/api/hello?name=' + name;
    } else {
      url = 'http://www.mattcodes.com.au:3903/api/hello';
    }

    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);

    // return false to prevent response from automatically sending
    // in order to wait for the get request,
    // we manually send the response in onreadystatechange
    return false;
  }
);


if (process.argv.length > 2) {
    var arg = process.argv[2];
    if (arg === '-s' || arg === '--schema') {
        console.log(app.schema());
    }
    if (arg === '-u' || arg === '--utterances') {
        console.log(app.utterances());
    }
}

module.exports = app;
