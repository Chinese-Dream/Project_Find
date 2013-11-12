var urlsMaxLength = 10;
var urls = new Array();

function setInactiveState(){
    $(".rel-active").css("display", "none");
    $("#autoRecordSwitch").bootstrapSwitch('setState', false);
    $("#autoRecordSwitch").bootstrapSwitch('setActive', false);
    $("#autoSidebarSwitch").bootstrapSwitch('setState', false);
    $("#autoSidebarSwitch").bootstrapSwitch('setActive', false);
}

$(function () {
    if (localStorage.getItem("userType") == 0) {
        setInactiveState();
    }
    else {
        chrome.browserAction.setPopup({popup: 'quickSetting.html'});
        $(".rel-inactive").css("display","none");
        var userType = localStorage.getItem("userType");
        init(userType);

        //界面显示
        $("#username").text(localStorage.getItem("username"));

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
            setUserFilterList(urls);
        });
        $("#userFilterList").on("click", ".delete", function () {
            $(this).parent("span").parent("div").parent("li.url").remove();
            setUserFilterList(urls);
        });
    }
});

//根据userType的情况初始化设置;
function init(userType) {
    //是否开启自动记录
    initLocStorageItem("autoRecord", true);
    initLocStorageItem("autoSidebar", true);
    //根据userType的情况初始化设置
    if (userType == 1) {
        initLocStorageItem("username", "default");
        initLocStorageItem("userFilterList", "[]");
    }
    if (userType == 2) {
        //登录初始化，获取用户设置等一系列储存在云端的数据；
        //同时存储在本地做一份备份；
        //如果用户本地修改设置，则即时联网备份；
        //web端不提供给用户修改记录设置的功能；
        initLocStorageItem("username", "default");
        initLocStorageItem("userFilterList", "[]");
    }
}

// 初始化localStorage中的item项；
// 如果item项不存在，则初始化item值为val，如果存在，则不操作；
function initLocStorageItem(item,val){
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

//清空原数组对象，并把urls数组存入localStorage中;
function setUserFilterList(urls){
    urls.splice(0, urls.length);       //清空urls；
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