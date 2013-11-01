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
$(function () {
    var $toolbar = $("<div id='fx-toolbar'></div>");
    $toolbar.css("display", "none");

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

    $toolbar_left.appendTo($toolbar);
    $toolbar_center.appendTo($toolbar);
    $toolbar_right.appendTo($toolbar);

    $("body").children().first().before($toolbar);
});