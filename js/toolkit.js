"use strict";

class Toolkit {

  /**
   * 获取uuid
   *
   * @param removeLine true: 返回不含中划线的uuid；false: 返回带有中划线的uuid。
   *
   * @return uuid
   */
  static getUuid(removeLine = false) {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    if (!removeLine) {
      s[8] = s[13] = s[18] = s[23] = "-";
    }
    let uuid = s.join("");
    return uuid;
  }

  /**
   * 根据参数名从url获取参数值
   *
   * @param name 参数名
   *
   * @return 返回参数名对应的值值，没有找到返回null。
   */
  static getQueryFromUrl(name) {
       let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
       let result = window.location.search.substr(1).match(reg);
       if (null != result) {
         let value = result[2];
         if (0 >= value.length) {
           return null;
         }
         return unescape(value);
       } else {
         return null;
       }
  }

  /**
   * ajax助手
   *
   * @param url 请求地址
   * @param data 参数数据
   * @param async
   *        true:异步
   *        false:同步
   * @param withCredentials
   *        true:自带证书
   *        false:不带证书
   * @param multipartUpload
   *        true:附件模式
   *        false:文本模式
   */
  static ajaxAssistant(url, data, async, withCredentials, multipartUpload) {
    let result = null;
    let isCrossDomain = false;;
    if (-1 != window.location.protocol.indexOf("http")) {
      isCrossDomain = false;
    } else {
      isCrossDomain = true;
    }
    let contentType = "application/x-www-form-urlencoded";
    let processData = true;
    if (multipartUpload) {
      contentType = false;
      processData = false;
    }
    $.ajax({
      // 请求方式
      "type": "post",
      // 同步or异步
      "async": async,
      // 请求地址
      "url": url,
      // 参数数据
      "data": data,
      // 数据类型
      "dataType": "json",
      // 是否自带证书
      "xhrFields": {
          "withCredentials": withCredentials
      },
      // 内容类型
      "contentType": contentType,
      // 是否以contentType的默认值传递数据
      "processData": processData,
      // 是否跨域
      //  crossDomain: isCrossDomain,
      // 操作成功后的返回结果
      "success": function(r) {
          result = r;
      }
    });
    return result;
  }
  
  /**
   * 判断json的对象是否含有数据
   *
   * @param obj json对象
   * @return true:有数据 false:无数据
   */
  static jsonExistData(obj) {
    for (let key in obj) {
      return true;
    }
    return false;
  }
  
  /**
   * 生成bootstrap分页控件
   *
   * @param outputId 输出id
   * @param offset 当前显示数据的偏移
   * @param limit 显示的条目数
   * @param pageCount 页签数量（不包括“向左”和“向右”）
   * @param totalCount 总页数
   */
  static generateBootstrapPagination(outputId, offset, limit, pageCount, totalCount) {
    if (offset > totalCount) {
      return;
    }
    let currentPage = 0;
    let code = null;
    code += '<nav class = "pull-right">';
    code += '<ul class = "pagination">';
    if (0 >= offset) {
      currentPage = 1;
    } else {
      currentPage = Math.ceil(offset / limit) + 1;
    }
    let count = Math.ceil(totalCount / limit);
    let displaySceneCount = Math.ceil(count / pageCount);
    let currentPageSceneNum = Math.ceil(currentPage / pageCount);
    if (currentPageSceneNum > 1) {
      code += '<li data-offset = "' + (((currentPageSceneNum - 1) * pageCount * limit) - limit) + '"><a><span>«</span></a></li>';
    }
    for (let i = ((currentPageSceneNum * pageCount) - pageCount + 1); i <= (currentPageSceneNum * pageCount); i++) {
      if (i > count) {
        break;
      }
      if (i == (currentPage)) {
        code += '<li data-offset = "' + (i * limit - limit) + '" class = "active"><a>' + i + '</a></li>';
      } else {
        code += '<li data-offset = "' + (i * limit - limit) + '"><a>' + i + '</a></li>';
      }
    }
    if ((displaySceneCount - currentPageSceneNum) >= 1) {
      code += '<li data-offset = "' + ((currentPageSceneNum * pageCount * limit)) + '"><a><span>»</span></a></li>';
    }
    code += '</ul>';
    code += '</nav>';
    $(outputId).html(code);
  }
}
