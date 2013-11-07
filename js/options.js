var urlsMaxLength = 10;
var urls = new Array();
$(function () {
    if (localStorage.getItem("initial") == 0) {
        $("#username").css("display", "none");
        $(".initialized").css("display", "none");
        $("#autoRecordSwitch").bootstrapSwitch('setState', false);
        $("#autoRecordSwitch").bootstrapSwitch('setActive', false);
        $("#autoToolbarSwitch").bootstrapSwitch('setState', false);
        $("#autoToolbarSwitch").bootstrapSwitch('setActive', false);
        $(".trial").click(function () {
            localStorage.setItem("initial", 1);
            location.reload();
        });
    }
    else {
        chrome.browserAction.setPopup({popup: 'quickSetting.html'});

        $(".initial").css("display","none");
        init(localStorage.getItem("initial"));

        //界面显示
        $("#username").text(localStorage.getItem("username"));
        if(localStorage.getItem("autoRecord")=="true"){
            $('#autoRecordSwitch').bootstrapSwitch('setState', true);
        } else{
            $('#autoRecordSwitch').bootstrapSwitch('setState', false);
        }

        if (localStorage.userFilterList) {
            urls = JSON.parse(localStorage.getItem("userFilterList"));
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
            saveURLsToLocS(urls);
        });
        $("#userFilterList").on("click", ".delete", function () {
            $(this).parent("span").parent("div").parent("li.url").remove();
            saveURLsToLocS(urls);
        });

        //switch监听事件
        $('#autoRecordSwitch').on('switch-change', function (e, data) {
            localStorage.setItem("autoRecord", data.value);
        });
    }
});

//根据initial的情况初始化设置;
function init(initial) {
    //是否开启自动记录
    initItem("autoRecord", true);
    initItem("autoToolbar", true);
    //根据initial的情况初始化设置
    if (initial == 1) {
        initItem("username", "default");
        initItem("userFilterList", "[]");
    }
    if (initial == 2) {
        //登录初始化，获取用户设置等一系列储存在云端的数据；
        //同时存储在本地做一份备份；
        //如果用户本地修改设置，则即时联网备份；
        //web端不提供给用户修改记录设置的功能；
        initItem("username", "default");
        initItem("userFilterList", "[]");
    }
}

//如果item项不存在，则初始化item值为val，如果存在，则不操作；
function initItem(item, val) {
    if (!localStorage.getItem(item)) {
        localStorage.setItem(item, val);
    }
}

function appendToUrlList(url) {
    var $li = $("<li class='list-group-item url'>" +
            "<div class='input-group'>" +
            "<span class='input-group-addon'>URL:</span>" +
            "<input type='text' class='form-control' placeholder='Please Input URL'>" +
            //"<button type='button' class='btn btn-link delete'>删除</button>" +
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

function saveURLsToLocS(urls){
    urls.splice(0, urls.length);       //清空urls
    var len = $("#userFilterList").children("li").size();
    for (var i = 0; i < len; i++) {
        var url = new Object();
        url.url = $("#userFilterList .url input")[i].value;
        if (url.url != "") {
            urls.push(url);
        }
    }
    localStorage.setItem("userFilterList", JSON.stringify(urls));
}

