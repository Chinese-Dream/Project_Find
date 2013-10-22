/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-21
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */

if (window.localStorage) {
    if (!localStorage.username) {
        //initial标志位;
        window.localStorage.setItem("initial", 0);
        chrome.tabs.create({url: "../installed.html"}, function () {
            //do nothing;
        });
    }
} else {
    alert("Your browser don't support localStorage");
}