/**
 * @author yuanhang
 */

/**
 * 检查用户是否登录，如果没有登录，跳至登录界面，且成功后返回。
 * @param url 登录页面的url
 */
var LAST_URL_CHECK_LOGIN = "";
function check_login() {
  var url = PROJECT_PATH + "lego/lego_user?servletName=getUserSecurityByUser";
  var result = ajax_assistant(url, {}, false, true, false);
  if (1 == result.status) {
    if (1 == result.count) {
      // 已登录
      return;
    }
  }
  // 未登录
  LAST_URL_CHECK_LOGIN = window.location.href;
  window.location.href = "../index/login.html?redirect_url=" + LAST_URL_CHECK_LOGIN;
  window.onerror = function(s) {
    if ("user_not_login" == s) {
      // 返回true，浏览器不会提示错误信息。
      return true;
    }
  }
  throw new Error("user_not_login");
}
