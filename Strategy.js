class Strategy {
    Strategy(action) {
        let command = "jsp/strategyDocs/";

        command += "Strategy.jsp";
        command += "?action=" + action;
        // Send AJAX Request
        $.ajax({
            url: command,
            dataType:'html',
            success:function(data) {
                $("#article").html(data);
            }
        });
    }
}
