function vehicle_information_open_info_func(obj) {
  var vehicle_information_uuid = obj.attr("uuid");
  var contract_sale_warehouse_uuid = obj.parent().parent().parent().parent().parent().parent().parent().find("#vehicle_information_add_modle").attr("contract_sale_warehouse_uuid");
  var vehicle_information_html = 
  '<tr>'+
    '<td colspan="11">'+
      '<div class="row">'+
        '<div class="col-lg-12">'+
          '<div id = "godown_exit_content' + vehicle_information_uuid + '">'+
          '</div>'+
          '<div id = "godown_entry_content' + vehicle_information_uuid + '">'+
          '</div>'+
          '<div class = "row">'+
            '<div class = "col-md-6" id = "report_test_content' + vehicle_information_uuid + '">'+
            '</div>'+
            '<div class = "col-md-6" id = "report_shore_tank_content' + vehicle_information_uuid + '">'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</td>'+
  '</tr>';
  if (obj.hasClass("active")) {
    obj.find(".glyphicon").removeClass("glyphicon-chevron-down");
    obj.removeClass("active");
    obj.parent().parent().nextUntil(".vehicle_information_tr").remove();
    vehicle_information_html = "";
  } else {
    obj.find(".glyphicon").addClass("glyphicon-chevron-down");
    obj.addClass("active");
    obj.parent().parent().after(vehicle_information_html);
  }
  
  //出库单
  godown_exit_content("#godown_exit_content" + vehicle_information_uuid);
  $("#godown_exit_content" + vehicle_information_uuid).find("#godown_exit_add_modal_btn").attr("vehicle_information_uuid",vehicle_information_uuid);
  // 清空原始数据
  godown_exit_clear_raw_data(vehicle_information_uuid);
  // 服务器数据
  godown_exit_server_data_cover(vehicle_information_uuid);
  // 加载数据
  godown_exit_fill_variable_data(vehicle_information_uuid);  
  
  //入库单
  godown_entry_content("#godown_entry_content" + vehicle_information_uuid);
  $("#godown_entry_content" + vehicle_information_uuid).find("#godown_entry_add_modal_btn").attr("vehicle_information_uuid",vehicle_information_uuid);
  // 清空原始数据
  godown_entry_clear_raw_data(vehicle_information_uuid);
  //获取储罐
  godown_entry_get_warehouse_pot(contract_sale_warehouse_uuid);
  // 服务器数据
  godown_entry_server_data_cover(vehicle_information_uuid);
  // 加载数据
  godown_entry_fill_variable_data(vehicle_information_uuid);  
  
  //化验单
  report_test_content("#report_test_content" + vehicle_information_uuid);
  $("#report_test_content" + vehicle_information_uuid).find("#report_test_add_modal_btn").attr("vehicle_information_uuid",vehicle_information_uuid);
  // 清空原始数据
  report_test_clear_raw_data(vehicle_information_uuid);
  // 服务器数据
  report_test_server_data_cover(vehicle_information_uuid);
  // 加载数据
  report_test_fill_variable_data(vehicle_information_uuid);  
  
  //商检单
  report_shore_tank_content("#report_shore_tank_content" + vehicle_information_uuid);
  $("#report_shore_tank_content" + vehicle_information_uuid).find("#report_shore_tank_add_modle_btn").attr("vehicle_information_uuid",vehicle_information_uuid);
  // 清空原始数据
  report_shore_tank_clear_raw_data(vehicle_information_uuid);
  // 服务器数据
  report_shore_tank_server_data_cover(vehicle_information_uuid);
  // 加载数据
  report_shore_tank_fill_variable_data(vehicle_information_uuid);
}
