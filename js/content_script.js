/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-30
 * Time: 上午10:22
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    var $toolbar_trigger = $("<div id='fx-toolbar-trigger'></div>");
    $("body").children().first().before($toolbar_trigger);

    var $toolbar = $("<div id='fx-toolbar'></div>");
    $toolbar.css("display", "none");

    var $username = $("<h1>username</h1><hr>");
    $username.appendTo($toolbar);

    var $statisticsLink = $("<a target='_blank' href='#'><img src='" + chrome.extension.getURL('images/home-24.png') + "'></a>");
    $statisticsLink.appendTo($toolbar);
    var $statisticsLink = $("<a target='_blank' href='" + chrome.extension.getURL('statistics.html') + "'><img src='" + chrome.extension.getURL('images/statistics-24.png') + "'></a>");
    $statisticsLink.appendTo($toolbar);
    var $optionsLink = $("<a target='_blank' href='" + chrome.extension.getURL('options.html') + "'><img src='" + chrome.extension.getURL('images/settings-24.png') + "'></a><br><br>");
    $optionsLink.appendTo($toolbar);


    var $main = $("<div>" +
        "<ul>" +
        "<li><button class='button orange button-inline'>好</button>&nbsp;&nbsp;<button class='button orange button-inline'>不好</button></li>" +
        "<Li><button class='button orange button-block'>随意</button></Li>" +
        "<li><button class='button orange button-block'>分享</button></li>" +
        "</ul>" +
        "</div>");
    $main.appendTo($toolbar);

    //这里代码需要置换
    var $other = $("<div>" +
        "<ul>" +
        "<li><a href='" + chrome.extension.getURL('help.html') + "' target='_blank'>help</a></li>" +
        "<li><a href='" + chrome.extension.getURL('about.html') + "' target='_blank'>about</a></li>" +
        "<li><a href='" + chrome.extension.getURL('data.html') + "' target='_blank'>data</a></li>" +
        "</ul>" +
        "</div>");
    $other.appendTo($toolbar);
    //置换到这里

    $("body").children().first().before($toolbar);

    $("#fx-toolbar-trigger").hover(function () {
        $("#fx-toolbar").css("display", "block");
        $("#fx-toolbar-trigger").css("display", "none");
    }, function () {
    });
    $("#fx-toolbar").hover(function () {
    }, function () {
        $("#fx-toolbar-trigger").css("display", "block");
        $("#fx-toolbar").css("display", "none");
    });
});