/**
 * Created with JetBrains WebStorm.
 * User: zxt1016
 * Date: 13-10-30
 * Time: 上午10:22
 * To change this template use File | Settings | File Templates.
 */

var toolbar = document.createElement("div");
toolbar.id= "findToolbar";
//banner.textContent = "<a herf='www.baidu.com' target='_blank'>setting</a>";
//banner.innerText = "<a herf='www.baidu.com' target='_blank'>setting</a>";
//setting = document.createElement("a");
//setting.textContent="setting";
//banner.appendChild(setting);
toolbar.textContent = "这里是Toolbar。。。setting；statistic；help；about"
document.body.insertBefore(toolbar, document.body.firstChild);
