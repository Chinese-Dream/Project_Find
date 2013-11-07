/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-18
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $("#offlineTrial p a").click(function(){
        localStorage.setItem("initial", 1);
    });
})
