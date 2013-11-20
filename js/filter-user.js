/**
 * Created by zxt1016 on 13-11-11.
 */

/*   是否在用户过滤列表，如果在，返回true，否则返回false    */
function isInUserFilterList(url) {
    var urls = JSON.parse(localStorage.getItem("userFilterList"));
    for (var i = 0; i < urls.length; i++) {
        if (url.indexOf(urls[i].url) >= 0) {
            return true;
        }
    }
    return false;
}

function appendToUserFilterList(url) {

}