/**
 * @author yuanhang
 */

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

/**
 * 生成bootstrap分页控件
 * @param output_id 输出id
 * @param offset 当前显示数据的偏移
 * @param limit 显示的条目数
 * @param page_count 页签数量（不包括“向左”和“向右”）
 * @param total_count 总页数
 */
function generate_bootstrap_pagination_ctrl(output_id, offset, limit, page_count, total_count) {
  if (offset > total_count) {
    return;
  }
  var current_page;
  var code = "";
  code += '<nav class = "pull-right">';
  code += '<ul class = "pagination">';
  if (0 >= offset) {
    current_page = 1;
  } else {
    current_page = Math.ceil(offset / limit) + 1;
  }
  var count = Math.ceil(total_count / limit);
  var display_scene_count = Math.ceil(count / page_count);
  var current_page_scene_num = Math.ceil(current_page / page_count);
  if (current_page_scene_num > 1) {
    code += '<li data-offset = "' + (((current_page_scene_num - 1) * page_count * limit) - limit) + '"><a><span>«</span></a></li>';
  }
  for (var i = ((current_page_scene_num * page_count) - page_count + 1); i <= (current_page_scene_num * page_count); i++) {
    if (i > count) {
      break;
    }
    if (i == (current_page)) {
      code += '<li data-offset = "' + (i * limit - limit) + '" class = "active"><a>' + i + '</a></li>';
    } else {
      code += '<li data-offset = "' + (i * limit - limit) + '"><a>' + i + '</a></li>';
    }
  }
  if ((display_scene_count - current_page_scene_num) >= 1) {
    code += '<li data-offset = "' + ((current_page_scene_num * page_count * limit)) + '"><a><span>»</span></a></li>';
  }
  code += '</ul>';
  code += '</nav>';
  $(output_id).html(code);
}
