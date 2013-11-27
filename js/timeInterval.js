/**
 * Created by re0marb1e on 13-11-21.
 */

/**
 * TimeInterval对象构造函数:
 * 时间间隔对象有两个属性:startTime代表该时间间隔的起始时间，finishTime代表该时间间隔的结束时间;
 * 创建对象时，请传递两个参数startTime和finishTime，如果缺省请手动传入0;
 */
function TimeInterval(startTime, finishTime) {
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.setStartTime = function (startTime) {
        if (this.startTime == 0) {
            this.startTime = startTime;
            return true;
        } else {
            return false;
        }
    }
    this.setFinishTime = function (finishTime) {
        if (this.finishTime == 0) {
            this.finishTime = finishTime;
            return true;
        } else {
            return false;
        }
    }
}

//TimeIntervals对象重新包装数组对象，数组对象原有属性和方法不变，新增属性和方法如下;
function TimeIntervals() {
    var timeIntervals = new Array();
    //function
    timeIntervals.last = function () {    //返回最后一个元素;
        return this[this.length - 1];
    }
    timeIntervals.pushTimeInterval = function (timeInterval) {
        var len = this.length;
        if (len == 0 || (len > 0 && this.last().finishTime != 0)) {
            this.push(timeInterval);
            return true;
        } else {
            return false;
        }
    };
    return timeIntervals;
}