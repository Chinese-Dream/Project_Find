/**
 * Created by zxt1016 on 13-11-2.
 */
$(function(){
    var records = JSON.parse(localStorage.getItem("records"));
    for(var i=0;i<records.length;i++){
        var $tr= $("<tr>" +
            "<td>"+ records[i].trackID +"</td>" +
            "<td>"+ records[i].url +"</td>" +
            "<td>"+ records[i].title +"</td>" +
            "<td>"+ records[i].hostname +"</td>" +
            "<td>"+ records[i].browserVer +"</td>" +
            "<td>"+ records[i].startTime +"</td>" +
            "<td>"+ records[i].finishTime +"</td>" +
            "<td>"+ records[i].lang +"</td>" +
            "<td>"+ records[i].isInBookmarks +"</td>" +
            "<td>"+ records[i].activeTimeInterval +"</td>" +
            "<td>"+ records[i].formerURL +"</td>" +
            "</tr>");
        $tr.appendTo("table");

    }
});