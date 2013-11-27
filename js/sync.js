/**
 * Created by zxt1016 on 13-11-25.
 */

importScripts("ref/URI.min.js");
var urls = new Array();

onmessage = function (event) {
    var records = JSON.parse("[" + event.data + "]");
    for (var i = 0; i < records.length; i++) {
        var result = URI.parse(records[i].url);
        var idx = getIdxByHostname(result.hostname);
        if(idx = -1){
            var url = {
                url: records[i].url,
                protocol: result.protocol,
                hostname: result.hostname,
                recordsId: []
            }
            url.recordsId.push(i);
            urls.push(url);
        } else{
            urls[idx].recordsId.push(i);
        }
    }


    syncData();
};

function getIdxByHostname(hostname) {
    for (var i = 0; i < urls.length; i++) {
        if (hostname == urls[i].hostname) {
            return i;
        }
    }
    return -1;
}

function syncData() {
    //同步数据，亦即从本地回传记录数据到网站数据库
    //问题：如何回传？数据回传错误处理？
    //目标：有效的减少回传次数和回传数据量。
}