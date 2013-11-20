/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-9-28
 * Time: 上午9:13
 * To change this template use File | Settings | File Templates.
 */

/*仅在此列出同窗口的所有情况以测试：
     现在：前台网页置入有符合要求url    操作：关闭该网页
                                         刷新该网页至置有新url的网页
                                         刷新该网页至置无url的网页
                                         前台打开置有url的网页
                                         后台打开置有url的网页
                                         前台打开置无url的网页
                                         后台打开置无url的网页

          前台网页置入无符合要求url    操作：关闭该网页
                                         刷新该网页至置有新url的网页
                                         刷新该网页至置无url的网页
                                         前台打开置有url的网页
                                         后台打开置有url的网页
                                         前台打开置无url的网页
                                         后台打开置无url的网页
*/

/**
 * records是当前仍在纪录的record的集合；
 * record对象包含属性：tabId,url,title,startTime,finishTime,browserVer,lang,formerRecord
 */
var records = new Array();
var activeRecordIdx = -1;
/**
 *  trackID是当前record的id
 *  write_records是用来存储record的数组
 */
var trackID = 0;
var write_records = [];
var browserVer = getBrowserVer();
/**
 * Tab更新监听;
 * 每当创建一个Tab或者刷新一个Tab时，该事件都会触发;
 * 新创建的Tab的url 或者 被刷新的Tab的新url 如果符合要求，则一次新的record将开启;
 * 被刷新的Tab的旧url如果存在记录，则结束旧url记录。
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (localStorage.getItem("userType") == 0 || localStorage.getItem("autoRecord") == "false") {
        return;
    }
    if (changeInfo.status == "loading") {
        var datetime = new Date();
        //只有当刷新一个Tab时，被刷新的Tab的formerRecord才有可能存在；
        var formerRecordIdx = getRecordIdxByTabId(tabId);
        if (formerRecordIdx != -1) { //被重定向的Tab在重定向之前所对应的record存在;
            var formerRecord = records[formerRecordIdx];
            if (formerRecord.isActive()) {  //被重定向的Tab当前处于active状态;
                formerRecord.pushTimeInterval(0, datetime);
            }
            formerRecord.finishTime = datetime;
            removeRecordByIdx(formerRecordIdx);
        }

        // 检查新网址是否应该被过滤掉，如果不被过滤掉，则新记录开始；
        if (isInSysFilterList(tab.url) == false && isInUserFilterList(tab.url) == false) {
            //网页纪录开始；
            var record = new Record(datetime, tab.id, tab.url, tab.title, []);

            record.hostname = getHostname(tab.url);     //related to url
            record.isInBookmarks = isInBookmarks(tab.url);     //related to url
            records.push(record);
            chrome.tabs.detectLanguage(tab.id, function (lang) {
                records[records.length - 1].lang = lang;
            });                                         //捕获语言

            if (tab.active == true) {     //tab处于active状态
                chrome.windows.get(tab.windowId, function (window) {
                    if (window.focused == true) {     //window处于focused状态
                        activeRecordIdx = records.length - 1;
                        records[records.length - 1].pushTimeInterval(datetime, 0);
                    }
                });
            }
        }
    }
});

/**
 *  Tab关闭事件监听
 */
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    var activeRecordIdxExample = activeRecordIdx;

    var datetime = new Date();

    var index = getRecordIdxByTabId(tabId);
    if (index != -1) {  //被关闭的tab所对应的record存在;
        var record = records[index];
        if (record.isActive()) {   //被关闭的tab所对应的record在tab被关闭前处于active状态;
            record.pushTimeInterval(0, datetime);
        }
        record.finishTime = datetime;
        removeRecordByIdx(index);
    }
});

/**
 *  activatedTab改变事件监听;
 *  经测试，任何时候，一旦该事件触发，其activeInfo.tabId对应的record如果存在，则该record一定将进入active状态;
 *                      对于activeInfo.tabId对应的tab：要么原本就存在;要么后来创建（前台打开一个Tab）;
 *                              原本就存在的情况:tab对应的record如果也存在(currentRecordIdx != -1)，则record将进入active状态，在本触发事件中考虑;
 *                              后来创建的情况:tab对应的record也是后来创建的，在onUpdated触发事件中考虑;
 *  在此监听事件内，我们只考虑record.activeTimeInterval和activeRecordIdx的变化;
 */
chrome.tabs.onActivated.addListener(function (activeInfo) {
    var datetime = new Date();

    var currentRecordIdx = getRecordIdxByTabId(activeInfo.tabId);

    if (currentRecordIdx != -1) {
        records[currentRecordIdx].pushTimeInterval(datetime, 0);
    }

    if (isLastActiveRecordExist()) {
        var record = records[activeRecordIdx];
        record.pushTimeInterval(0, datetime);
    }
    //alert("改变");

    // 触发事件结束前，设置activeRecordIdx的值;
    if (currentRecordIdx != -1) {  //当前页被记录
        activeRecordIdx = currentRecordIdx;
    } else {
        activeRecordIdx = -1;
    }
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
    //alert("窗口改变" + windowId);
});
