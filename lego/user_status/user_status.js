/**
 * @author yuanhang
 */
"use strict";

class UserStatus {
  /**
   * 检查用户是否登录，如果没有登录，跳至登录界面，且成功后返回。
   * @param url 登录页面的url
   */
  static checkLogin() {
    let url = `${Configure.getProjectPath(2)}lego/lego_user?servletName=getUserSecurityByUser`;
    let result = Toolkit.ajaxAssistant(url, {}, false, true, false);
    if (1 == result.status) {
      if (1 == result.count) {
        // 已登录
        return;
      }
    }
    // 未登录
    window.location.href = "../index/login.html?redirect_url=" + window.location.href;
    window.onerror = function(s) {
      if ("user_not_login" == s) {
        // 返回true，浏览器不会提示错误信息。
        return true;
      }
    }
    throw new Error("user_not_login");
  }
}
