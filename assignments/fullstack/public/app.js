var socket = io();
$('#msg').focus();

var scrollDown = function () {
    $('#msg_area').animate({ scrollTop: $(document).height() }, "slow");
}

//handle event when return key entered
$('#msg').keyup(function (e) {
    if (e.keyCode == 13) {
        msg = $('#msg').val();
        console.log(msg);
        if (!msg) {
            msg = JSON.stringify('')
        }
        $('#msg_area').append($('<li>').text(msg).addClass("message usermsg"));
        scrollDown();

        socket.emit('usermsg', msg);

        $('#msg').val('');
        return false;
    }
    else if (e.keyCode == 38) {
        $('#msg').val(msg);
    }
});


socket.on('botmsg', function (msg) {
    console.log(msg);
    $('#msg_area').append($('<li>').text(msg).addClass("message botmsg"));
    scrollDown();
});