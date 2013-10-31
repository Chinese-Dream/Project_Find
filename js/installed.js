/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-31
 * Time: 上午11:13
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $("#nextToDo a").click(function(){
       localStorage.setItem("initial", 1);
    });
})