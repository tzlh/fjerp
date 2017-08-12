/**
 * @author yuanhang
 */

/**
 * 输出上传附件（编辑）
 * @param output_id 输出内容id
 */
function upload_attachment_edit_output(output_id) {
  var content = 
    '<div class = "upload_attachment_area">'+
    '  <div class = "upload_attachment_btn upload_attachment_btn_left"><span class = "glyphicon glyphicon-chevron-left"></span></div>'+
    '  <div class = "upload_attachment_content">'+
    '    <input class = "upload_attachment_file_choose" type = "file" multiple = "multiple" accept = "image/png, aplication/zip, text/plain, application/pdf,  image/jpeg, image/jpeg, image/jpeg, image/jp2, image/gif" />'+
    '    <div class = "upload_attachment_box">'+
    '      <ul>'+
    '        <li>'+
    '          <a class = "upload_attachment_add" href = "#">'+
    '            <img src = "../../img/add_attachment.png">'+
    '          </a>'+
    '        </li>'+
    '      </ul>'+
    '    </div>'+
    '  </div>'+
    '  <div class = "upload_attachment_btn upload_attachment_btn_right"><span class = "glyphicon glyphicon-chevron-right"></span></div>'+
    '</div>';
    $(output_id).html(content);
}

/**
 * 输出上传附件（查看）
 * @param output_id 输出内容id
 * @param img_data 图片数据的json对象数据。需要两个key：file_name和src
 *   file_name: 文件上传后的文件名，比如：a29cs8d82ka29cs8d82ka29cs8d82k22.png
 *   src: 文件上传后的完整路径，比如：http://127.0.0.1/upload/a29cs8d82ka29cs8d82ka29cs8d82k22.png
 */
function upload_attachment_preview_output(output_id, img_data) {
  var data = "<ul>";
  for (var i = 0; i < img_data.length; i++) {
    data += '<li>';
    data += '  <a class = "upload_attachment_file" href = "#" data-url = "' + PROJECT_PATH + 'upload/' + img_data[i].file_name + '">';
    data += '    <img src = "' + img_data[i].src + '">';
    data += '  </a>';
    data += '</li>';
  }
  data += '</ul>';
  var content = 
    '<div class = "upload_attachment_area">'+
    '  <div class = "upload_attachment_btn upload_attachment_btn_left"><span class = "glyphicon glyphicon-chevron-left"></span></div>'+
    '  <div class = "upload_attachment_content">'+
    '    <input class = "upload_attachment_file_choose" type = "file" multiple = "multiple" accept = "image/png, aplication/zip, text/plain, application/pdf,  image/jpeg, image/jpeg, image/jpeg, image/jp2, image/gif" />'+
    '    <div class = "upload_attachment_box">' + data + '</div>'+
    '  </div>'+
    '  <div class = "upload_attachment_btn upload_attachment_btn_right"><span class = "glyphicon glyphicon-chevron-right"></span></div>'+
    '</div>';
    $(output_id).html(content);
}

/**
 * 绑定上传附件按钮事件
 * @param output_id 内容输出id
 */
function upload_attachment_btn_event_bind(output_id) {
  // 打开“文件选择”对话框
  $(output_id).find(".upload_attachment_add").click(function() {
    $(".upload_attachment_file_choose").trigger("click");
  });
  $(document).on("change", output_id + " .upload_attachment_file_choose", function() {
    for (var i = 0; i < $(this)[0].files.length; i++) {
      var form_data = new FormData();
      form_data.append("file", $(this)[0].files[i]);
      var result = ajax_assistant(PROJECT_PATH + "/lego/lego_storage?servletName=c_uploadTemporaryFile", form_data, false, true, true);
      if (1 == result.status) {
        // 上传成功
        result = JSON.parse(result.result);
        var img_src = null;
        var suffix = result.file_name.substring(result.file_name.indexOf(".") + 1).toLowerCase();
        if ("png" == suffix) {
          img_src = PROJECT_PATH + "upload/" + result.file_name;
        } else if ("jpg" == suffix) {
          img_src = PROJECT_PATH + "upload/" + result.file_name;
        } else if ("jpeg" == suffix) {
          img_src = PROJECT_PATH + "upload/" + result.file_name;
        } else if ("gif" == suffix) {
          img_src = PROJECT_PATH + "upload/" + result.file_name;
        } else {
          if ("accdb" == suffix) {
            img_src = "../../img/file_type/accdb.png";
          } else if ("avi" == suffix) {
            img_src = "../../img/file_type/avi.png";
          } else if ("bmp" == suffix) {
            img_src = "../../img/file_type/bmp.png";
          } else if ("css" == suffix) {
            img_src = "../../img/file_type/css.png";
          } else if ("doc" == suffix) {
            img_src = "../../img/file_type/doc.png";
          } else if ("docx" == suffix) {
            img_src = "../../img/file_type/docx.png";
          } else if ("eml" == suffix) {
            img_src = "../../img/file_type/eml.png";
          } else if ("eps" == suffix) {
            img_src = "../../img/file_type/eps.png";
          } else if ("fla" == suffix) {
            img_src = "../../img/file_type/fla.png";
          } else if ("ind" == suffix) {
            img_src = "../../img/file_type/ind.png";
          } else if ("ini" == suffix) {
            img_src = "../../img/file_type/ini.png";
          } else if ("jsf" == suffix) {
            img_src = "../../img/file_type/jsf.png";
          } else if ("midi" == suffix) {
            img_src = "../../img/file_type/midi.png";
          } else if ("mov" == suffix) {
            img_src = "../../img/file_type/mov.png";
          } else if ("mp3" == suffix) {
            img_src = "../../img/file_type/mp3.png";
          } else if ("mpeg" == suffix) {
            img_src = "../../img/file_type/mpeg.png";
          } else if ("pdf" == suffix) {
            img_src = "../../img/file_type/pdf.png";
          } else if ("pptx" == suffix) {
            img_src = "../../img/file_type/pptx.png";
          } else if ("proj" == suffix) {
            img_src = "../../img/file_type/proj.png";
          } else if ("psd" == suffix) {
            img_src = "../../img/file_type/psd.png";
          } else if ("pub" == suffix) {
            img_src = "../../img/file_type/pub.png";
          } else if ("rar" == suffix) {
            img_src = "../../img/file_type/rar.png";
          } else if ("readme" == suffix) {
            img_src = "../../img/file_type/readme.png";
          } else if ("settings" == suffix) {
            img_src = "../../img/file_type/settings.png";
          } else if ("tiff" == suffix) {
            img_src = "../../img/file_type/tiff.png";
          } else if ("url" == suffix) {
            img_src = "../../img/file_type/url.png";
          } else if ("vsd" == suffix) {
            img_src = "../../img/file_type/vsd.png";
          } else if ("wav" == suffix) {
            img_src = "../../img/file_type/wav.png";
          } else if ("wma" == suffix) {
            img_src = "../../img/file_type/wma.png";
          } else if ("wmv" == suffix) {
            img_src = "../../img/file_type/wmv.png";
          } else if ("xls" == suffix) {
            img_src = "../../img/file_type/xls.png";
          } else if ("xlsx" == suffix) {
            img_src = "../../img/file_type/xlsx.png";
          } else if ("zip" == suffix) {
            img_src = "../../img/file_type/zip.png";
          } else {
            img_src = "../../img/file_type/other.png";
          }
        }
        $(output_id).find("ul").append(
          '<li>'+
          '  <a class = "upload_attachment_file" href = "#" data-url = "' + PROJECT_PATH + 'upload/' + result.file_name + '">'+
          '    <button class="btn btn-danger"><span class="glyphicon glyphicon-remove  btn-danger"></span></button>'+
          '    <img src = "' + img_src + '">'+
          '  </a>'+
          '</li>'
        );
      } else {
        alert("[" + $(this)[0].files[i].name + "]上传失败")
        return;
      }
    }
    $('.upload_attachment_file_choose').val("");
    // 绑定新页面打开附件事件
    $(output_id).find(".upload_attachment_file").unbind("click");
    $(output_id).find(".upload_attachment_file").click(function() {
      window.open($(this).attr("data-url"));
    });
    // 绑定删除附件按钮事件
    $(output_id).find(".upload_attachment_file button").unbind("click");
    $(output_id).find(".upload_attachment_file button").click(function() {
      $(this).parent().parent().remove();
    });
  });
  // 绑定左右滚动按钮事件
  $(output_id).find(".upload_attachment_btn_left").click(function() {
    var left_value = parseInt($(output_id).find(".upload_attachment_box").css("left"));
    var step = left_value + $(output_id).find("a").width();
    if (0 <= step) {
      step = 0;
    }
    $(output_id).find(".upload_attachment_box").css("left", step);
  });
  $(output_id).find(".upload_attachment_btn_right").click(function() {
    var li_list = $(output_id).find("ul").children("li");
    var left_value = parseInt($(output_id).find(".upload_attachment_box").css("left"));
    var step = left_value - $(output_id).find("a").width();
    if ($(output_id).find("a").width() * li_list.length - $(output_id).find("a").width() > Math.abs(step)) {
      $(output_id).find(".upload_attachment_box").css("left", step);
    }
  });
}
