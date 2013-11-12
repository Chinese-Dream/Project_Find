/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-10-21
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */

if (window.localStorage) {
    if (!localStorage.userType) {
        //userType标志位，userType为0代表未初始化用户，为1代表离线试用用户，为2代表普通登录用户。
        //当userType为0代表inactiveState，为其它时代表activeState
        localStorage.setItem("userType", 0);
        chrome.browserAction.setPopup({popup:'login.html'});
        chrome.tabs.create({url: "../installed.html"}, function () {
            //do nothing;
        });
    }
    else {
        if(localStorage.getItem("userType")==0){
            chrome.browserAction.setPopup({popup:'login.html'});
        } else {
            chrome.browserAction.setPopup({popup:'quickSetting.html'});
        }
    }
} else {
    alert("Your browser don't support localStorage");
}