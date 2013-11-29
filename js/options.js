var urlsMaxLength = 10;

$(function () {
    if (localStorage.getItem("userType") == 0) {
        setInactiveState();
    }
    else {
        chrome.browserAction.setPopup({popup: 'quickSetting.html'});
        $(".rel-inactive").css("display","none");
        var userType = localStorage.getItem("userType");

        //是否开启自动记录
        if (!localStorage.autoRecord) {
            localStorage.setItem("autoRecord", true);
        }
        if (!localStorage.autoSidebar) {
            localStorage.setItem("autoSidebar", true);
        }
        //根据userType的情况初始化设置
        if (userType == 1) {
            if (!localStorage.username) {
                localStorage.setItem("username", "default");
            }
            if (!localStorage.userFilterList) {
                localStorage.setItem("userFilterList", "[]");
            }
        }
        if (userType == 2) {
            //登录初始化，获取用户设置等一系列储存在云端的数据；
            //同时存储在本地做一份备份；
            //如果用户本地修改设置，则即时联网备份；
            //web端不提供给用户修改记录设置的功能；
            if (!localStorage.username) {
                localStorage.setItem("username", "default");
            }
            if (!localStorage.userFilterList) {
                localStorage.setItem("userFilterList", "[]");
            }
        }

        //界面显示
        $("#username").text(localStorage.getItem("username"));

        if (localStorage.userFilterList) {
            var urls = JSON.parse(localStorage.getItem("userFilterList"));
            for (var i = 0; i < urls.length; i++) {
                appendToUrlList(urls[i].url);
            }
        }
        //监听事件
        $("#addUrl").click(function () {
            var len = $("#userFilterList").find(".url").size();
            if (len >= urlsMaxLength) {
                alert("已超过URL数量上限");
                return;
            }
            if (len!=0 && $("#userFilterList").find(".url input")[len - 1].value == "") {
                $("#userFilterList").find(".url input").last().attr("placeholder","The URL is invalid");
            } else {
               appendToUrlList("");
            }
        });
        $('#userFilterList').on('change','.url input',function(){
            setUserFilterListItem();
        });
        $("#userFilterList").on("click", ".delete", function () {
            $(this).parent("span").parent("div").parent("li.url").remove();
            setUserFilterListItem();
        });
    }
});

function setInactiveState(){
    $(".rel-active").css("display", "none");
    $("#autoRecordSwitch").bootstrapSwitch('setState', false);
    $("#autoRecordSwitch").bootstrapSwitch('setActive', false);
    $("#autoSidebarSwitch").bootstrapSwitch('setState', false);
    $("#autoSidebarSwitch").bootstrapSwitch('setActive', false);
}

//urls数组存入localStorage中;
function setUserFilterListItem(){
    var urls = new Array();
    var len = $("#userFilterList").children("li").size();
    for (var i = 0; i < len; i++) {
        var url = {url:$("#userFilterList .url input")[i].value};
        if (url.url != "") {
            urls.push(url);
        }
    }
    localStorage.setItem("userFilterList", JSON.stringify(urls));
}


function appendToUrlList(url) {
    var $li = $("<li class='list-group-item url'>" +
        "<div class='input-group'>" +
        "<span class='input-group-addon'>URL:</span>" +
        "<input type='text' class='form-control' placeholder='Please Input URL'>" +
        "<span class='input-group-btn'>" +
        "<button class='btn btn-default delete' type='button'>" +
        "<span class='glyphicon glyphicon-minus-sign'></span>" +
        "</button>" +
        "</span>" +
        "</div>" +
        "</li>");
    if (url != "") {
        $li.find("input").val(url);
    }
    $li.appendTo("#userFilterList");
}