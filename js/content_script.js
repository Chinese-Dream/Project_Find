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
$(function(){
    var $toolbar = $("<div id='findToolbar'></div>");
    var $aOptions = $("<a href='" + urlOptions + "' target='_blank'>options</a>");
    $aOptions.appendTo($toolbar);

    var $aOptions = $("<a href='" + urlStatistics + "' target='_blank'>statistics</a>");
    $aOptions.appendTo($toolbar);

    var $aOptions = $("<a  href='" + urlHelp + "' target='_blank'>help</a>");
    $aOptions.appendTo($toolbar);

    var $aOptions = $("<a href='" + urlAbout + "' target='_blank'>about</a>");
    $aOptions.appendTo($toolbar);

    $toolbar.css("display","none");
    $("body").children().first().before($toolbar);
});