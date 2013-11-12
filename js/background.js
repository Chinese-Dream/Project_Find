/**
 * Created with JetBrains WebStorm.
 * User: re0marb1e
 * Date: 13-9-28
 * Time: 上午9:13
 * To change this template use File | Settings | File Templates.
 */

/**
 * records是当前仍在纪录的record的集合；
 * record对象包含属性：tabId,url,title,startTime,finishTime,browserVer,lang,formerRecord,fore
 */
var records = new Array();
var activeStartTime = 0;
var activeFinishTime = 0;
/**
 *  trackID是当前record的id
 *  write_records是用来存储record的数组
 */
var trackID = 0;
var write_records = [];
/**
 *  捕获浏览器类型及版本
 */
var browserVer = getBrowserVer();
/**
 * Tab更新监听；
 * 每当系统产生一条Record，则在其之前Tab必定会更新；
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //当Tab更新时，我们首先检测是否开启记录。如果未开启，则不执行任何操作
    if (localStorage.getItem("userType") == 0 || localStorage.getItem("autoRecord")== "false" ) {
        //do nothing;
    }
    //如果记录开启，我们则查找此Tab之前的纪录；
    // 如果存在，则结束此条纪录并将纪录信息写入数据库，同时从records中删除此纪录；
    // 如果不存在，
    else
    {
        if (changeInfo.status == "loading") {
            //只有当更新的tab页是当前页是才需要刷新activeTime；
            var formerRecordIdx = getRecordIdxByTabId(tabId);
            if (tab.active == true) {
                activeFinishTime = new Date();
                if (formerRecordIdx != -1) {
                    var formerRecord = records[formerRecordIdx];
                    formerRecord.activeTime += getTimeInterval(activeStartTime, activeFinishTime);
                    removeRecordByIdx(formerRecordIdx);
                }
                activeStartTime = activeFinishTime;
            }
            // 检查新网址是否应该被过滤掉，如果不被过滤掉，则新记录开始；
            if (isInSysFilterList(tab.url) == false && isInUserFilterList(tab.url) == false) {
                //网页纪录开始；
                trackData(tab);
            }
        }
    }
});

/**
 *  Tab关闭事件监听
 */
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    var index = getRecordIdxByTabId(tabId);
    if (index != -1) {
        removeRecordByIdx(index);
    }
});

/**
 *  activatedTab改变事件监听
 */
chrome.tabs.onActivated.addListener(function (activeInfo) {
    activeFinishTime = new Date();
    var formerRecordIdx = getActiveRecordIdx();
    var currentRecordIdx = getRecordIdxByTabId(activeInfo.tabId);
    //前activeRecord对象存在
    if (formerRecordIdx != -1) {
        var formerRecord = records[formerRecordIdx];
        formerRecord.activeTime += getTimeInterval(activeStartTime, activeFinishTime);
        formerRecord.active = false;
    }

    // 当前activeRecord对象存在
    if (currentRecordIdx != -1) {
        var currentRecord = records[currentRecordIdx];
        currentRecord.active = true;
    }
    activeStartTime = activeFinishTime;
});

//根据tabId在records数组中寻找对应的纪录对象，如果存在，返回纪录对象在records中的索引，如果不存在，返回－1；
function getRecordIdxByTabId(tabId) {
    for (var i = 0; i < records.length; i++) {
        if (records[i].tabId == tabId) {
            return i;
        }
    }
    return -1;
}

//在records数组中寻找处于active状态的纪录对象，如果存在，返回纪录对象在records中的索引，如果不存在，返回－1；
function getActiveRecordIdx(){
    for (var i = 0; i < records.length; i++) {
        if (records[i].active == true) {
            return i;
        }
    }
    return -1;
}

//获取开始时间和结束时间的时间间隔，单位为秒；
function getTimeInterval(start , finish){
    return Math.round((finish-start)/1000);
}

function trackData(tab) {
    var record = new Object();
    records.push(record);
    record.active = tab.active;                 //record对象是否处于active状态
    record.activeTime = 0;                      //record纪录的前台时间，单位为秒
    record.startTime = new Date();              //捕获开始时间
    record.tabId = tab.id;
    record.url = tab.url;                       //捕获url
    record.title = tab.title;                   //捕获title
    record.website = getWebsite(tab.url);       //捕获网站
    chrome.tabs.detectLanguage(tab.id, function (lang) {
        records[records.length - 1].lang = lang;
    });                                         //捕获语言
    record.isInBookmarks = isInBookmarks(tab.url);
}


function getWebsite(url) {
    /* 纯JS实现  */
    var website_url = url.match(/\w+[:][/][/][^/]+[.]?[^/]*[.]?[^/]*[.][^/]+[/]/).toString();
    var website_name = website_url.match(/[^/]+[.]?[^/]*[.]?[^/]*[.][^/]+/).toString();
    return website_name;
}

function getBrowserVer(){
    var Ver = {};
    var ua = navigator.userAgent.toLowerCase();
    var temp;
    (temp = ua.match(/chrome\/([\d.]+)/)) ? Ver.chrome = temp[1] :
    (temp = ua.match(/msie ([\d.]+)/)) ? Ver.ie = temp[1] :
    (temp = ua.match(/firefox\/([\d.]+)/)) ? Ver.firefox = temp[1] :
    (temp = ua.match(/opera.([\d.]+)/)) ? Ver.opera = temp[1] :
    (temp = ua.match(/version\/([\d.]+).*safari/)) ? Ver.safari = temp[1] : 0;
    if (Ver.ie) return 'IE: ' + Ver.ie;
    if (Ver.firefox) return 'Firefox: ' + Ver.firefox;
    if (Ver.chrome) return 'Chrome: ' + Ver.chrome;
    if (Ver.opera) return 'Opera: ' + Ver.opera;
    if (Ver.safari) return 'Safari: ' + Ver.safari;
}

function isInBookmarks(url){
    /*           */
}

function removeRecordByIdx(index){
    var record = records[index];
    record.finishTime = new Date();
    writeToLocS(record);
    records.splice(index, 1);
}

function writeToLocS(record){
    var write_record = {"trackID": trackID, "url": record.url, "title": record.title, "website": record.website,
        "browserVer": browserVer, "startTime": record.startTime, "finishTime": record.finishTime,
        "lang": record.lang, "isInBookmarks": record.isInBookmarks,  "activeTime": record.activeTime, "formerURL": 0};
    write_records.push(write_record);
    localStorage.setItem("records", JSON.stringify(write_records));
    trackID = trackID + 1;
}