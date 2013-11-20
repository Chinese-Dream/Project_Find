/**
 * Created by re0marb1e on 13-11-13.
 */

//record构造函数;
function Record(startTime ,tabId, url, title, activeTimeInterval){
    this.startTime = startTime;
    this.tabId = tabId;
    this.url = url;
    this.title = title;
    this.activeTimeInterval = activeTimeInterval;

    //function
    this.isActive = function(){
        var idx = records.indexOf(this);
        var activeRecordIdx = window.activeRecordIdx;
        if (activeRecordIdx == records.indexOf(this)) {
            return true;
        } else {
            return false;
        }
    };

    this.pushTimeInterval = function (startTime, finishTime) {
        var len = this.activeTimeInterval.length;
        if (startTime != 0 && finishTime == 0) {    //参数形如（Date，0，record）
            if (len == 0 || (len > 0 && this.activeTimeInterval[len - 1].finishTime != 0)) {
                var temp = {startTime: startTime, finishTime: finishTime};
                this.activeTimeInterval.push(temp);
                return true;
            } else {
                return false;
            }
        }
        else if (startTime == 0 && finishTime != 0) {      //参数形如（0，Date，record）
            if (this.activeTimeInterval[len - 1].finishTime == 0) {
                this.activeTimeInterval[len - 1].finishTime = finishTime;
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    };
}

function isLastActiveRecordExist() {
    if (activeRecordIdx != -1 && records.length > 0 && activeRecordIdx < records.length) {
        return true;
    } else {
        return false;
    }
}

function isLastActiveTimeIntervalDone() {
    if (isActiveRecordExist() && records[activeRecordIdx].finishTime != 0) {
        return true;
    } else {
        return false;
    }
}





function setActiveRecordIdx() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
        activeRecordIdx = tabs[0].id;
    });
}

//根据tabId在records数组中寻找对应的纪录对象，如果存在，返回纪录对象在records中的索引，如果不存在，返回－1；
function getRecordIdxByTabId(tabId) {
    for (var i = 0; i < records.length; i++) {
        if (records[i].tabId == tabId) {
            return i;
        }
    }
    return -1;
}

//获取开始时间和结束时间的时间间隔，单位为秒；
function getTimeInterval(start , finish){
    return Math.round((finish-start)/1000);
}

function removeRecordByIdx(index){
    var record = records[index];
    writeToLocS(record);
    records.splice(index, 1);
}

function writeToLocS(record){
    var timeInterval = JSON.stringify(record.activeTimeInterval);
    var write_record = {"trackID": trackID, "url": record.url, "title": record.title, "hostname": record.hostname,
        "browserVer": browserVer, "startTime": record.startTime, "finishTime": record.finishTime,
        "lang": record.lang, "isInBookmarks": record.isInBookmarks,  "activeTimeInterval": timeInterval, "formerURL": 0};
    write_records.push(write_record);
    localStorage.setItem("records", JSON.stringify(write_records));
    trackID = trackID + 1;
}

function getHostname(url) {
    /* 纯JS实现  */
    //var website_url = url.match(/\w+[:][/][/][^/]+[.]?[^/]*[.]?[^/]*[.][^/]+[/]/).toString();
    //var hostname = website_url.match(/[^/]+[.]?[^/]*[.]?[^/]*[.][^/]+/).toString();
    //return hostname;

    var parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
}

function isInBookmarks(url){
    /*           */
}

/**
 *  捕获浏览器类型及版本
 */
function getBrowserVer(){
    var ver = {};
    var ua = navigator.userAgent.toLowerCase();
    var temp;
    (temp = ua.match(/chrome\/([\d.]+)/)) ? ver.chrome = temp[1] :
        (temp = ua.match(/msie ([\d.]+)/)) ? ver.ie = temp[1] :
            (temp = ua.match(/firefox\/([\d.]+)/)) ? ver.firefox = temp[1] :
                (temp = ua.match(/opera.([\d.]+)/)) ? ver.opera = temp[1] :
                    (temp = ua.match(/version\/([\d.]+).*safari/)) ? ver.safari = temp[1] : 0;
    if (ver.ie) return 'IE: ' + ver.ie;
    if (ver.firefox) return 'Firefox: ' + ver.firefox;
    if (ver.chrome) return 'Chrome: ' + ver.chrome;
    if (ver.opera) return 'Opera: ' + ver.opera;
    if (ver.safari) return 'Safari: ' + ver.safari;
}

