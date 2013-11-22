/**
 * Created by re0marb1e on 13-11-13.
 */


/**
 *  捕获浏览器类型及版本
 */
var browserVer = getBrowserVer();
/**
 * records是当前仍在纪录的record的集合；
 * record对象包含属性：tabId,url,title,startTime,finishTime,browserVer,lang,formerRecord
 */
var records = new Records();
startRecord();

//Record构造函数;
function Record(startTime, tabId, url, title) {
    //attribute
    this.startTime = startTime;
    this.tabId = tabId;
    this.url = url;
    this.title = title;
    this.activeTimeIntervals = new TimeIntervals();
    
    //function
    this.isActive = function () {
        var idx = records.indexOf(this);
        var activeRecordIdx = records.lastActiveRecordIdx;
        if (activeRecordIdx == records.indexOf(this)) {
            return true;
        } else {
            return false;
        }
    };
    this.appendToLocStorage = function () {
        if (localStorage.records) {
            localStorage.setItem("records", localStorage.getItem("records") + "," + JSON.stringify(this));
        } else {
            localStorage.setItem("records", JSON.stringify(this));
        }
    };
}

//Records对象重新包装数组对象，数组对象原有属性和方法不变，新增属性和方法如下;
function Records() {
    var records = new Array();

    //attribute
    records.lastActiveRecordIdx = -1;

    //function
    records.last = function() {
        return this[this.length-1];
    };
    records.setLastActiveRecordIdx = function (){
         chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
             this.lastActiveRecordIdx = tabs[0].id;
         });
    };
    //如果存在，返回索引值;如果不存在，返回－1;
    records.getLastActiveRecordIdx = function (){
        if(this.lastActiveRecordIdx != -1 && this.length > 0 && this.lastActiveRecordIdx < this.length){
            return this.lastActiveRecordIdx;
        }else{
            return -1;
        }
    };
    //如果存在，返回record对象;如果不存在，返回undefined;
    records.getLastActiveRecord = function () {
        if (this.getLastActiveRecordIdx() != -1) {
            return this[this.getLastActiveRecordIdx()];
        }
    };
    records.isLastActiveTimeIntervalDone = function () {
        var record = this.getLastActiveRecord();
        if (record != undefined && record.activeTimeIntervals.last().finishTime != 0) {
            return true;
        } else {
            return false;
        }
    };
    records.getRecordIdxByTabId = function (tabId){
        for(var i =0;i < this.length; i++){
            if(this[i].tabId == tabId){
                return i;
            }
        }
        return -1;
    };
    records.onRemovedHandler = function (idx) {
        if (idx != -1) {
            var datetime = new Date();
            var record = this[idx];
            if (record.isActive()) {
                record.activeTimeIntervals.last().setFinishTime(datetime);
            }
            record.finishTime = datetime;
            record.appendToLocStorage();
            this.splice(idx, 1);
        }
    };
    //lastIdx代表前次处于active状态的record对象的索引，currentIdx代表当前处于active状态的record对象的索引;
    records.onActivatedHandler = function (lastIdx, currentIdx, datetime) {
        if (lastIdx != -1) {
            records[lastIdx].activeTimeIntervals.last().setFinishTime(datetime);
        }
        if (currentIdx != -1) {
            records[currentIdx].activeTimeIntervals.pushTimeInterval(new TimeInterval(datetime, 0));
        }
    };
    
    return records;
}

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