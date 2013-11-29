/**
 * Created by re0marb1e on 13-11-13.
 */

/**
 * record对象构造函数;
 * record对象包含属性：tabId,url,title,startTime,finishTime,activeTimeIntervals,browserVer,lang;
 *
 */
function Record(startTime, tabId, url, title) {
    //attribute
    this.tabId = tabId;
    this.url = url;
    this.title = title;
    this.startTime = startTime;
    this.activeTimeIntervals = new TimeIntervals();
    this.browserVer = browserVer;

    this.appendToLocStorage = function () {
        if (localStorage.records) {
            localStorage.setItem("records", localStorage.getItem("records") + "," + JSON.stringify(this));
            localStorage.setItem("length", parseInt(localStorage.getItem("length")) + 1);
        } else {
            localStorage.setItem("records", JSON.stringify(this));
            localStorage.setItem("length", 1);
        }

        //如果record记录超过一定数目,则回传数据库;
        if (parseInt(localStorage.getItem("length")) >= 1) {
            var sendPKG = new Worker("js/sync.js");
            sendPKG.postMessage(localStorage.getItem("records"));
        }
    };
}

/*
 * Records对象重新包装数组对象，数组对象原有属性和方法不变，新增属性和方法如下;
 */
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
    //根据tabId寻找对应的record：如果存在，返回索引值;如果不存在，返回－1;
    records.getRecordIdxByTabId = function (tabId){
        for(var i =0;i < this.length; i++){
            if(this[i].tabId == tabId){
                return i;
            }
        }
        return -1;
    };

    /*
     * records事件处理;
     */

    //创建record;
    records.createRecord = function(tab){
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
                    records.last().activeTimeIntervals.pushTimeInterval(new TimeInterval(datetime));
                }
            });
        }
    };

    //移除record;
    records.removeRecord = function (idx) {
        if (idx != -1) {
            var datetime = new Date();
            var record = this[idx];
            if (this.lastActiveRecordIdx == idx) {
                record.activeTimeIntervals.last().setFinishTime(datetime, true);
            }
            record.finishTime = datetime;
            record.appendToLocStorage();
            this.splice(idx, 1);
        }
    };

    //lastIdx代表前次处于active状态的record对象的索引，currentIdx代表当前处于active状态的record对象的索引;
    records.onActivatedHandler = function (lastIdx, currentIdx, datetime) {
        if (lastIdx != -1) {
            records[lastIdx].activeTimeIntervals.last().setFinishTime(datetime, false);
        }
        if (currentIdx != -1) {
            records[currentIdx].activeTimeIntervals.pushTimeInterval(new TimeInterval(datetime));
        }
    };

    return records;
}