/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-10-21
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */

function startRecord() {
    chrome.tabs.onUpdated.addListener(tabsOnUpdatedHandler);
    chrome.tabs.onRemoved.addListener(tabsOnRemovedHandler);
    chrome.tabs.onActivated.addListener(tabsOnActivatedHandler);
    chrome.windows.onFocusChanged.addListener(windowsOnFocusChanged);
}

var browserVer = getBrowserVer();
var records = new Records();

startRecord();
if (window.localStorage) {
    if (!localStorage.userType) {
        //userType标志位，userType为0代表未初始化用户，为1代表离线试用用户，为2代表普通登录用户。
        //当userType为0代表inactiveState，为其它时代表activeState
        localStorage.setItem("userType", 0);
        chrome.browserAction.setPopup({popup: 'login.html'});
        chrome.tabs.create({url: "../installed.html"}, function () {
        });
    }
    else {
        if (localStorage.getItem("userType") == 0) {   //未初始化用户
            chrome.browserAction.setPopup({popup: 'login.html'});
        } else {                                       //已初始化用户
            chrome.browserAction.setPopup({popup: 'quickSetting.html'});
        }
    }
} else {
    alert("Your browser don't support localStorage");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.info == "ok") {
        sendResponse({
            autoSidebar: localStorage.getItem("autoSidebar"),
            username: localStorage.getItem("username")
        });
    }
});

/*
window.addEventListener("storage",handle_storage,false);

function handle_storage(e){
}
*/