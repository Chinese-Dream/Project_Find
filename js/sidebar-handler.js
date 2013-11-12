/**
 * Created by re0marb1e on 13-11-7.
 */

// 这里禁止声明任何全局变量，以防止任何不可遇见的冲突；
$(function () {
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
});