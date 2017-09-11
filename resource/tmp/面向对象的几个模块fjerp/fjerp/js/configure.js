"use strict";

class Configure {
  /**
   * @param code
   *        1:返回内网测试服务器项目路径
   *        2:返回阿里云服务器项目路径
   *        其他: 返回null
   *
   * @return 返回项目路径
   */
  static getProjectPath(code) {
    if (1 == code) {
      return "http://192.168.1.131:8080/lego/";
    } else if (2 == code) {
      return "http://47.92.152.242:8080/lego/";
    } else {
      return null;
    }
  }
}
