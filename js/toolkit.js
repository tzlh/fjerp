/**
 * 根据参数名从url获取参数值
 * @param paramName 参数名
 * return 找到返回参数值，否则返回null。
 */
function getQueryFromUrl(paramName) {
     var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
     var result = window.location.search.substr(1).match(reg);
     if (null != result) {
       var value = result[2];
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
 * @param url 请求地址
 * @param param_data 参数数据
 * @param is_async true:异步 false:同步
 * @param is_with_credentials true:自带证书 false:不带证书
 * @param is_multipart_upload true:附件模式 false:文本模式
 */
function ajax_assistant(url, param_data, is_async, is_with_credentials, is_multipart_upload) {
  var result;
  var is_cross_domain;
  if (-1 != window.location.protocol.indexOf("http")) {
    is_cross_domain = false;
  } else {
    is_cross_domain = true;
  }
  var content_type = "application/x-www-form-urlencoded";
  var process_data = true;
  if (is_multipart_upload) {
    content_type = false;
    process_data = false;
  }
  $.ajax({
    // 请求方式
    type: "post",
    // 同步or异步
    async: is_async,
    // 请求地址
    url: url,
    // 参数数据
    data: param_data,
    // 数据类型
    dataType: "json",
    // 是否自带证书
    xhrFields: {
        withCredentials: is_with_credentials
    },
    // 内容类型
    contentType: content_type,
    // 是否以contentType的默认值传递数据
    processData: process_data,
    // 是否跨域
//  crossDomain: is_cross_domain,
    // 操作成功后的返回结果
    success:function(r){
        result = r;
    }
  });
  return result;
}

/**
 * 判断json的对象是否含有数据
 * @param obj json对象
 * return true:有数据 false:无数据
 */
function isJsonObjectHasData(obj) {
  for (var key in obj) {
    return true;
  }
  return false;
}
