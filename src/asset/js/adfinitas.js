function sendData() {
    var email = document.forms["personal-info"]["email"].value;
    var gender = document.forms["personal-info"]["gender"].value;
    var lastname = document.forms["personal-info"]["lastname"].value;
    var firstname = document.forms["personal-info"]["firstname"].value;
    var phone = document.forms["personal-info"]["phone"].value;

    const payload = {
        "db": {
            "schema": "omf_enquete20",
            "db": {
                "email": email,
                "firstname": firstname,
                "lastname": lastname,
                "civility": gender,
                "phone": phone,
                "datetime": get_datetime(),
                'quest_1': mapAnswers[0][0] ,
                'quest_2': JSON.stringify(mapAnswers[1]) ,
                'quest_3': mapAnswers[2][0] ,
                'quest_4': JSON.stringify(mapAnswers[3]) ,
                'quest_5': mapAnswers[4][0] ,
                'quest_6': mapAnswers[5][0] ,
                'quest_7': mapAnswers[6][0] ,
                'quest_8': mapAnswers[7][0] ,
            }
        },
    }
    console.log(payload)
    //makeCorsRequest(payload);
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/ee114f17-5663-4fcf-8179-0de0cf8a9cde/webhook/6be71199-3649-4e42-9c84-86e40df53d60';
    var body = JSON.stringify(data);
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
}