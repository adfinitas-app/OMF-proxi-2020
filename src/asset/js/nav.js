var next_page = 1;
var curr_page = 1;

function change_page(curr, next) {
    var curr_id = '#q' + curr;
    var next_id = '#q' + next;
    var progress_bar = 'progress-bar__custom-' + next;
    var x = document.getElementById('aside-bg');
    var bg_url = './dist/asset/img/aside_p' + next + '.png';
    document.getElementById('progress-bar').className = progress_bar;
    x.setAttribute("src", bg_url);
    if (next === 1 || next === 9)
        $('#button__up').fadeOut(0);
    else
        $('#button__up').fadeIn(200);
    if (next === 9) {
        $('#button__down').fadeOut(0);
        collect_data();
    }
    $(next_id).hide();
    $(next_id).fadeIn(200);
    $(curr_id).fadeOut(0);
    curr_page = next_page;
}

$(document).ready(function(){
    $("#button__down").click(function () {
        if ((client_anwser[curr_page - 1] >= 1 && client_anwser[curr_page - 1] <= possible_anwser[curr_page - 1])
            || ($.trim($("#btn_5-0").val()) && curr_page === 6) || ($.trim($("#autre").val()) && curr_page === 4)) {
            if (next_page + 1 < 10) {
                next_page = next_page + 1;
                change_page(curr_page, next_page);
            }
        } else {
            $(".control-input").css("opacity", "1");
        }
    });
    $("#button__up").click(function () {
        if (next_page - 1 > 0) {
            next_page = next_page - 1;
            change_page(curr_page, next_page);
        }
    });
    $("#button__rep1").click(function () {
        $("#perso").fadeIn(200);
        $("#home").fadeOut(0);
    });
    $("#button__rep2").click(function () {
        if (validate_form() === false)
            return false;
        personnal_info();
        $("#q1").fadeIn(200);
        $("#perso").fadeOut(0);
        $("#button__down").fadeIn(200);
        document.getElementById('progress-bar').className = 'progress-bar__custom-1';
        var x = document.getElementById('aside-bg');
        x.setAttribute("src", "./dist/asset/img/aside_p1.png");
    });
});