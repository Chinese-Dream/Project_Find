$(function () {
    var urls = new Array();
    localStorage.setItem("initial", 1);
    if (!localStorage.username) {
        localStorage.setItem("username", "default");
    }
    if (!localStorage.userFilterList) {
        localStorage.setItem("userFilterList", "[]");
    }
    $("#username").val(localStorage.getItem("username"));
    if (localStorage.userFilterList) {
        urls = JSON.parse(localStorage.getItem("userFilterList"));
        for (var i = 0; i < urls.length; i++) {
            var $li = $("<li>URL:<input type='text' class='url'/><span class='delete'>删除<span/></li>");
            $li.find("input").val(urls[i].url);
            $li.appendTo("#userFilterList");
        }
    }
    $("#addUrl").click(function () {
        if ($("#userFilterList").children("li").size() >= 5) {
            alert("已超过URL数量上限");
        } else {
            $("#userFilterList").append("<li>URL:<input type='text' class='url'/><span class='delete'>删除<span/></li>");
        }
    });
    $("#saveUserFilterList").click(function () {
        urls.splice(0, urls.length);
        var len = $("#userFilterList").children("li").size();
        for (var i = 0; i < len; i++) {
            var url = new Object();
            url.url = $("#userFilterList li .url")[i].value;
            urls.push(url);
        }
        localStorage.setItem("username", $("#username").val());
        localStorage.setItem("userFilterList", JSON.stringify(urls));
    });
    $("#userFilterList").on("click", ".delete", function () {
        $(this).parent().remove();
    });
});
