/**
 * Created by zxt1016 on 13-11-8.
 */

$(function () {
    //switch显示
    if(localStorage.getItem("autoRecord")=="true"){
        $('#autoRecordSwitch').bootstrapSwitch('setState', true);
    } else{
        $('#autoRecordSwitch').bootstrapSwitch('setState', false);
    }
    if(localStorage.getItem("autoSidebar")=="true"){
        $('#autoSidebarSwitch').bootstrapSwitch('setState', true);
    } else{
        $('#autoSidebarSwitch').bootstrapSwitch('setState', false);
    }

    //switch监听事件
    $('#autoSidebarSwitch').on('switch-change', function (e, data) {
        localStorage.setItem("autoSidebar", data.value);
    });

    $('#autoRecordSwitch').on('switch-change', function (e, data) {
        localStorage.setItem("autoRecord", data.value);
    });
});