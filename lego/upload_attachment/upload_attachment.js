function upload_attachment_btn_event_bind() {
    var box_li_width = $("#upload_attachment_box li").width();
    var li_list = $("#upload_attachment_box ul").children("li");
    var content_width = $("#upload_attachment_content").width();
    var count = parseInt(content_width / box_li_width);
    var length = li_list.length - count;
    var i = 0;
    $("#upload_attachment_btn_right").click(function() {
      i++;
      if (i < length) {
          $("#upload_attachment_box").css("left", -(box_li_width * i));
      } else {
        i = length;
        $("#upload_attachment_box").css("left", -(box_li_width * length));
      }
    });
    $("#upload_attachment_btn_left").click(function() {
      i--;
      if(0 <= i) {
         $("#upload_attachment_box").css("left", -(box_li_width * i));
      } else {
       i = 0;
       $("#upload_attachment_box").css("left", 0);
      }
    });
    // 打开“文件选择”
    $(".upload_attachment_add").click(function() {
      $("#upload_attachment_file_selected").trigger("click");
    });
}
