$(function () {
    if (localStorage.getItem("initial") == 0) {
        $("#loginUser").css("display", "none");
        $("#trialUser").css("display", "none");
        $("#filter").css("display", "none");
        $("#stop").css("display", "none");
        $("#start").css("display", "none");
        $(".trial").click(function () {
            localStorage.setItem("initial", 1);
            location.reload();
        });
    }
    else {
        var urls = new Array();
        $(".initial_0").css("display","none");
        chrome.browserAction.setPopup({popup: ''});
        if (!localStorage.username) {
            localStorage.setItem("username", "default");
        }
        if (!localStorage.userFilterList) {
            localStorage.setItem("userFilterList", "[]");
        }
        if (!localStorage.isRecord){
            localStorage.setItem("isRecord", 1);
        }

        if(localStorage.getItem("initial")==1){

            $("#trialUser").text(localStorage.getItem("username"));
        }
        if(localStorage.getItem("initial")==2){
            //登录初始化
            //获取用户设置等一系列储存在云端的数据；
            //同时存储在本地做一份备份；
            //如果用户本地修改设置，则即时联网备份；
            //web端不提供给用户修改记录设置的功能；
            $("#loginUser").text(localStorage.getItem("username"));
        }

        //显示
        if(localStorage.getItem("isRecord")==0){
            $("#stop").css("display","none");
        } else{
            $("#start").css("display","none");
        }
        if (localStorage.userFilterList) {
            urls = JSON.parse(localStorage.getItem("userFilterList"));
            for (var i = 0; i < urls.length; i++) {
                var $li = $("<li>URL:<input type='text' class='url'/><span class='delete'>删除<span/></li>");
                $li.find("input").val(urls[i].url);
                $li.appendTo("#userFilterList");
            }
        }

        //监听事件
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
            localStorage.setItem("userFilterList", JSON.stringify(urls));
        });
        $("#userFilterList").on("click", ".delete", function () {
            $(this).parent().remove();
        });
        $("#start button").click(function(){
            localStorage.setItem("isRecord",1);
            $("#start").css("display","none");
            $("#stop").css("display","inline");
        });
        $("#stop button").click(function(){
            localStorage.setItem("isRecord",0);
            $("#stop").css("display","none");
            $("#start").css("display","inline");

        })
    }
});
