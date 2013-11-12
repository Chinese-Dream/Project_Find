/**
 * Created by zxt1016 on 13-11-8.
 */
$(function(){
    $("#offlineTrialLink").click(function(){
        localStorage.setItem("userType", 1);
        if($(this).attr("href")==undefined){
            location.reload();
        }
    });
});
