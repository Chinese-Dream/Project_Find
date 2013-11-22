/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-9-28
 * Time: 上午9:13
 * To change this template use File | Settings | File Templates.
 */


function startRecord() {
    chrome.tabs.onUpdated.addListener(tabsOnUpdatedHandler);
    chrome.tabs.onRemoved.addListener(tabsOnRemovedHandler);
    chrome.tabs.onActivated.addListener(tabsOnActivatedHandler);
    chrome.windows.onFocusChanged.addListener(windowsOnFocusChanged);
};
/**
 * Tab更新监听;
 * 每当创建一个Tab或者刷新一个Tab时，该事件都会触发;
 * 新创建的Tab的url 或者 被刷新的Tab的新url 如果符合要求，则一次新的record将开启;
 * 被刷新的Tab的旧url如果存在记录，则结束旧url记录。
 */
function tabsOnUpdatedHandler(tabId, changeInfo, tab) {
    if (readyToRecord()) {
        if (changeInfo.status == "loading") {
            //只有当刷新一个Tab时，被刷新的Tab的formerRecord才有可能存在；
            var formerRecordIdx = records.getRecordIdxByTabId(tabId);
            records.onRemovedHandler(formerRecordIdx);

            // 检查新网址是否应该被过滤掉，如果不被过滤掉，则新记录开始;
            if (isInSysFilterList(tab.url) == false && isInUserFilterList(tab.url) == false) {
                var datetime = new Date();
                //创建record对象;
                var record = new Record(datetime, tab.id, tab.url, tab.title);
                records.push(record);
                chrome.tabs.detectLanguage(tab.id, function (lang) {
                    records.last().lang = lang;
                });
                if (tab.active == true) {     //tab处于active状态
                    chrome.windows.get(tab.windowId, function (window) {
                        if (window.focused == true) {     //window处于focused状态
                            records.lastActiveRecordIdx = records.length - 1;
                            var timeInterval = new TimeInterval(datetime, 0);
                            records.last().activeTimeIntervals.pushTimeInterval(timeInterval);
                        }
                    });
                }
            }
        }
    }
}

function tabsOnRemovedHandler(tabId, removeInfo) {
    if (readyToRecord()) {
        var index = records.getRecordIdxByTabId(tabId);
        records.onRemovedHandler(index);
    }
}

/**
 *  activatedTab改变事件监听;
 *  经测试，任何时候，一旦该事件触发，其activeInfo.tabId对应的record如果存在，则该record一定将进入active状态;
 *                      对于activeInfo.tabId对应的tab：要么原本就存在;要么后来创建（前台打开一个Tab）;
 *                      原本就存在的情况:tab对应的record如果也存在(currentRecordIdx != -1)，则record将进入active状态，在本触发事件中考虑;
 *                      后来创建的情况:tab对应的record也是后来创建的，在onUpdated触发事件中考虑;
 *  在此监听事件内，我们只考虑record.activeTimeIntervals和activeRecordIdx的变化;
 */
function tabsOnActivatedHandler(activeInfo) {
    if (readyToRecord()) {
        var datetime = new Date();
        var currentRecordIdx = records.getRecordIdxByTabId(activeInfo.tabId);
        var lastActiveRecordIdx = records.getLastActiveRecordIdx();
        records.onActivatedHandler(lastActiveRecordIdx, currentRecordIdx, datetime);

        // 触发事件结束前，设置activeRecordIdx的值;
        if (currentRecordIdx != -1) {  //当前页被记录
            records.lastActiveRecordIdx = currentRecordIdx;
        } else {
            records.lastActiveRecordIdx = -1;
        }
    }
}

function windowsOnFocusChanged(windowId) {
        //alert("窗口改变" + windowId);
}

function readyToRecord() {
    if (localStorage.getItem("userType") == 0 || localStorage.getItem("autoRecord") == "false") {
        return false;
    } else {
        return true;
    }
}
