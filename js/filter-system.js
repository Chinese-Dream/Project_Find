/**
 * Created by re0marb1e on 13-11-11.
 */

/*    是否在系统过滤列表，如果在，返回true，否则返回false；
 *    此函数后期重点完善，过滤冗余信息；
 *    google跳转，网页加载不成功等等；
 */
function isInSysFilterList(url) {
    if (url.indexOf("chrome-extension://") >= 0 || url.indexOf("chrome://") >= 0 || url.indexOf("file://") >= 0
        || url.indexOf("chrome-devtools://") >= 0 || url.indexOf("chrome-search://") >= 0) {
        return true;
    }
    return false;
}