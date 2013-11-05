/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-30
 * Time: 上午10:22
 * To change this template use File | Settings | File Templates.
 */

var urlOptions = chrome.extension.getURL("options.html");
var urlStatistics = chrome.extension.getURL("statistics.html");
var urlHelp = chrome.extension.getURL("help.html");
var urlAbout = chrome.extension.getURL("about.html");
var urlData = chrome.extension.getURL("data.html");
$(function () {
    var $toolbar_trigger = $("<div id='fx-toolbar-trigger'></div>");
    $("body").children().first().before($toolbar_trigger);



    var $toolbar = $("<div id='fx-toolbar'></div>");
    $toolbar.css("display", "none");
    var $page = $("<div></div>");

    //toolbar左区域;
    var $toolbar_left = $("<ul id='fx-toolbar-left' class='pull-left list-inline'></ul>");

    //toolbar中区域;
    var $toolbar_center = $("<ul id='fx-toolbar-center' class='list-inline'></ul>");

    //toolbar右区域;
    var $toolbar_right = $("<ul id='fx-toolbar-right' class='pull-right list-inline'></ul>");
    var $aOptions = $("<li><a class='btn btn-default' role='button' href='" + urlOptions + "' target='_blank'>options</a></li>");
    $aOptions.appendTo($toolbar_right);
    var $aStatistics = $("<li><a class='btn btn-default' role='button' href='" + urlStatistics + "' target='_blank'>statistics</a></li>");
    $aStatistics.appendTo($toolbar_right);
    var $aHelp = $("<li><a class='btn btn-default' role='button' href='" + urlHelp + "' target='_blank'>help</a></li>");
    $aHelp.appendTo($toolbar_right);
    var $aAbout = $("<li><a class='btn btn-default' role='button' href='" + urlAbout + "' target='_blank'>about</a></li>");
    $aAbout.appendTo($toolbar_right);
    var $aData = $("<li><a class='btn btn-default' role='button' href='" + urlData + "' target='_blank'>data</a></li>");
    $aData.appendTo($toolbar_right);

    $toolbar_left.appendTo($toolbar);
    $toolbar_center.appendTo($toolbar);
    $toolbar_right.appendTo($toolbar);

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