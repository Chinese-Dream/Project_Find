/**
 * Created by re0marb1e on 13-11-22.
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

function readyToRecord() {
    if (localStorage.getItem("userType") == 0 || localStorage.getItem("autoRecord") == "false") {
        return false;
    } else {
        return true;
    }
}