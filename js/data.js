/**
 * Created by zxt1016 on 13-11-2.
 */
$(function(){
    var records = JSON.parse("[" + localStorage.getItem("records") + "]");
    for(var i=0;i<records.length;i++){
        var tr= "<tr>" +
            "<td>"+ records[i].url.slice(0,50) +"</td>" +
            "<td>"+ records[i].title.slice(0,50) +"</td>" +
            "<td>"+ records[i].browserVer +"</td>" +
            "<td>"+ records[i].startTime +"</td>" +
            "<td>"+ records[i].finishTime +"</td>" +
            "<td>"+ records[i].lang +"</td>" +
            "<td>";
        for(var j=0; j<records[i].activeTimeIntervals.length; j++){
            tr += "start:" + records[i].activeTimeIntervals[j].startTime + "<br>finish:" +
                records[i].activeTimeIntervals[j].finishTime + "<br>";
        }
        tr +="</td></tr>"
        
        var $tr = $(tr);
        $tr.appendTo("table");

    }
});