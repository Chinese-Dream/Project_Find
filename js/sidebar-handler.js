/**
 * Created by re0marb1e on 13-11-7.
 */


function triggerHandler () {
    $("#fx-sidebar-trigger").hover(function () {
        $("#fx-sidebar").css("display", "block");
        $("#fx-sidebar-trigger").css("display", "none");
    }, function () {
    });
    $("#fx-sidebar").hover(function () {
    }, function () {
        $("#fx-sidebar-trigger").css("display", "block");
        $("#fx-sidebar").css("display", "none");
    });
}