/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-10-30
 * Time: 上午10:22
 * To change this template use File | Settings | File Templates.
 */

// 这里禁止声明任何全局变量，以防止任何不可遇见的冲突；
$(function () {
    var $sidebar_trigger = $("<div id='fx-sidebar-trigger'></div>");
    $("body").children().first().before($sidebar_trigger);

    var $sidebar = $("<div id='fx-sidebar'></div>");
    $sidebar.css("display", "none");

    var $username = $("<h1>username</h1><br><hr>");
    $username.appendTo($sidebar);

    var $links = $("<div>" +
        "<a target='_blank' href='#'>" +
        "<img src='" + chrome.extension.getURL('images/home-24.png') + "'>" +
        "</a>" +
        "<a target='_blank' href='" + chrome.extension.getURL('statistics.html') + "'>" +
        "<img src='" + chrome.extension.getURL('images/statistics-24.png') + "'>" +
        "</a>" +
        "<a target='_blank' href='" + chrome.extension.getURL('options.html') + "'>" +
        "<img src='" + chrome.extension.getURL('images/settings-24.png') + "'>" +
        "</a>" +
        "</div>");
    $links.appendTo($sidebar);

    //var $quickSetting =$("<div></div>" +
    //    "");


    var $main = $("<div>" +
        "<ul>" +
        "<li><button class='button orange button-inline'>好</button>&nbsp;&nbsp;<button class='button orange button-inline'>不好</button></li>" +
        "<Li><button class='button orange button-block'>随意</button></Li>" +
        "<li><button class='button orange button-block'>分享</button></li>" +
        "</ul>" +
        "</div>");
    $main.appendTo($sidebar);

    var $helpLink = $("<a target='_blank' href='" + chrome.extension.getURL('help.html') + "'>" +
        "<img src='" + chrome.extension.getURL('images/questionmark-24.png') + "'>" +
        "</a>");
    var $aboutLink = $("<a target='_blank' href='" + chrome.extension.getURL('about.html') + "'>" +
        "<img src='" + chrome.extension.getURL('images/information-24.png') + "'>" +
        "</a>");
    $helpLink.appendTo($sidebar);
    $aboutLink.appendTo($sidebar);

    //这里代码需要置换
    var $other = $("<div>" +
        "<ul>" +
        "<li><a href='" + chrome.extension.getURL('data.html') + "' target='_blank'>data</a></li>" +
        "</ul>" +
        "</div>");
    $other.appendTo($sidebar);
    //置换到这里

    $("body").children().first().before($sidebar);
});