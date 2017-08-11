/**
 * 输出上传附件
 * @param output_id 输出内容id
 */
function upload_attachment_output(output_id) {
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
    '        <li>'+
    '          <a class = "upload_attachment_file" href = "#" data-url = "../../img/file_type/accdb.png">'+
    '            <img src = "../../img/file_type/accdb.png">'+
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
 * 绑定上传附件按钮事件
 * @param {Object} output_id
 */
function upload_attachment_btn_event_bind(output_id) {
  // 绑定左右按钮事件
  // var box_li_width = $("#upload_attachment_box li").width();
  var box_li_width = $(output_id).find("li").width();
  // var li_list = $("#upload_attachment_box ul").children("li");
  var li_list = $(output_id).find("ul").children("li");
  // var content_width = $(".upload_attachment_content").width();
  var content_width = $(output_id).find(".upload_attachment_content").width();
  var count = parseInt(content_width / box_li_width);
  var length = li_list.length - count;
  var i = 0;
  $(output_id).find(".upload_attachment_btn_left").click(function() {
    i--;
    if(0 <= i) {
       $(output_id).find(".upload_attachment_box").css("left", -(box_li_width * i));
    } else {
     i = 0;
     $(output_id).find(".upload_attachment_box").css("left", 0);
    }
  });
  $(output_id).find(".upload_attachment_btn_right").click(function() {
    i++;
    if (i < length) {
        $(output_id).find(".upload_attachment_box").css("left", -(box_li_width * i));
    } else {
      i = length;
    }
  });
  // 打开“文件选择”对话框
  $(output_id).find(".upload_attachment_add").click(function() {
    $(".upload_attachment_file_choose").trigger("click");
  });
  // 新页面打开附件
  $(output_id).find(".upload_attachment_file").click(function() {
    var current_path = window.document.location.href.substring(0, window.document.location.href.lastIndexOf("/") + 1);
    current_path += $(this).attr("data-url");
    window.open(current_path);
  });
  $(document).on("change", $(output_id).find(".upload_attachment_file_choose"), function() {
    // alert("aa");
    debugger;
    for (var i = 0; i < $(this)[0].files.length; i++) {
      var form_data = new FormData();
      form_data.append("file", $(this)[0].files[i]);
      var result = ajax_assistant(PROJECT_PATH + "/lego/lego_storage?servletName=c_uploadTemporaryFile", form_data);
      if (1 == result.status) {
        // 上传成功
        result = JSON.parse(result.result);
        var file_name = result.file_name;
        var cluster_name = result.cluster_name;
      } else {
        alert("[" + $(this)[0].files[i].name + "]上传失败")
        return;
      }
      // var url = PROJECT_PATH + "upload/" + file_name;
      // var file_type = result.file_name.split(".")[1].toLowerCase();
      // if("png" == file_type || "jpg" == file_type || "jpeg" == file_type || "gif" == file_type || "psd" == file_type){
      //   var file = '<div class=" pull-left file_name has-feedback ml15">'+
      //   '<img url="'+url+'" width="60" height="60" uuid="'+cluster_name+'" src="'+url+'" class="img-rounded"/>'+
      //   '<button class="btn btn-danger text-center delet_file_btn">'+
      //   '<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
      //   '</button>'+
      //   '</div>';
      //   $(this).parents(".attch").append(file);
      // } else {
      //   var file = '<div class=" pull-left file_name has-feedback ml15">'+
      //   '<img url="'+url+'" width="60" height="60"  src="img/aa.jpg" class="img-rounded"/>'+
      //   '<button class="btn btn-danger text-center delet_file_btn">'+
      //   '<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
      //   '</button>'+
      //   '</div>';
      //   $(this).parents(".attch").append(file);
      // }
    }
    $('.upload_attachment_file_choose').val("");
  });
}
