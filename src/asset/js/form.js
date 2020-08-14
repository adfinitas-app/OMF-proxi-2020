var possible_anwser = [1, 5, 1, 4, 1, 0, 1, 1];
var nb_anwser = [3, 5, 10, 4, 3, 0, 2, 2];
var client_anwser = [0, 0, 0, 0, 0, 0, 0, 0];

var input = document.querySelector("#phone");
window.intlTelInput(input, {
    autoPlaceholder: "off",
    preferredCountries: ['fr'],
    separateDialCode: true,
    utilsScript: "./dist/asset/js/scripts.min.js",
});

function multiple(q) {
    var button = document.getElementsByClassName("anwser");
    var start = 0;
    for (var i = 0; i < q; i++)
        start = start + nb_anwser[i];
}

function click_button(a, q) {
    var button = document.getElementsByClassName('anwser');
    if (button[a].className === 'anwser button__passif' && client_anwser[q] < possible_anwser[q]) {
        button[a].className = 'anwser button__active';
        client_anwser[q]++;
    } else if (button[a].className === 'anwser button__active'){
        button[a].className = 'anwser button__passif';
        client_anwser[q]--;
    }
}

function personnal_info() {
    if (document.forms["personal-info"]["phone"].value !== "") {
        var phone_number = $('.iti__selected-dial-code').html();
        $('#phone').val(phone_number + $('#phone').val());
    }
}

function ValidateEmail(email)
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.value);
}

function validate_form() {
    var email = document.forms["personal-info"]["email"];
    var gender = document.forms["personal-info"]["gender"];
    var lname = document.forms["personal-info"]["lastname"];
    var fname = document.forms["personal-info"]["firstname"];
    var check = 0;

    if (email.value === "" || !ValidateEmail(email)) {
       email.className = 'red-border';
       check++;
    }
    if (gender.value === "") {
        gender.className = 'red-border';
        check++;
    }
    if (lname.value === "") {
        lname.className = 'red-border';
        check++;
    }
    if (fname.value === "") {
        fname.className = 'red-border';
        check++;
    }
    if (check > 0) {
        return false;
    } else {
        return true;
    }
}

function collect_data() {
    var anwser = document.getElementsByClassName('button__active');
    var somme = 0;
    var anwser_id;
    var question;
    for (var i = 0; i < 8; i++)
        somme = somme + client_anwser[i];
    for (var j = 0; j < somme; j++) {
        anwser_id = anwser[j].id;
        question = parseInt(anwser[j].id.substring(4, 5), 10);
        mapAnswers[question].push(document.getElementById(anwser_id).innerHTML);
    }
    mapAnswers[5].push(document.forms["observation"]["text"].value);
    if (document.forms["other"]["text"].value !== "")
        mapAnswers[3].push(document.forms["other"]["text"].value);
    sendData();
}

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function get_datetime () {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
        AddZero(now.getMonth() + 1),
        now.getFullYear()].join("/"),
        [AddZero(now.getHours()),
            AddZero(now.getMinutes())].join(":"),
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    return strDateTime;
}