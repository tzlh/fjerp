function contract_logistics_open_info_func(obj) {
  var contract_logistics_contract_code = obj.attr("contract_code");
  var trade_contract_code = obj.parent().parent().parent().parent().attr("trade_contract_code");
  var contract_logistics_contract_code_uuid = obj.attr("contract_logistics_uuid");
  var settlement_bill_logistics_add_buyer_uuid = obj.attr("buyer_uuid");
  var settlement_bill_logistics_add_seller_uuid = obj.attr("seller_uuid");
  var settlement_bill_logistics_add_product_name = obj.attr("product_name");
  var contract_logistics_all_panle_html =
  '<tr>'+
    '<td colspan="11">'+
      '<div class="row">'+
        '<div class="col-lg-12">'+
          '<div id = "contract_logistics_content' + contract_logistics_contract_code_uuid + '">'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</td>'+
  '</tr>';
  var contract_logistics_html = contract_logistics_all_panle_html;
 
  if (obj.hasClass("active")) {
    obj.find(".glyphicon").removeClass("glyphicon-chevron-down");
    obj.removeClass("active");
    obj.parent().parent().nextUntil(".contract_logistics_tr").remove();
    contract_logistics_html = "";
  } else {
    obj.find(".glyphicon").addClass("glyphicon-chevron-down");
    obj.addClass("active");
    obj.parent().parent().after(contract_logistics_html);
  }
  //插入物流对账单合同 ////////////////////////////////////////////////////////
  settlement_bill_logistics_output("#contract_logistics_content" + contract_logistics_contract_code_uuid);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("trade_contract_code",trade_contract_code);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("contract_logistics_code",contract_logistics_contract_code);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("contract_logistics_code_uuid",contract_logistics_contract_code_uuid);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("buyer_uuid",settlement_bill_logistics_add_buyer_uuid);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("seller_uuid",settlement_bill_logistics_add_seller_uuid);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find("#settlement_bill_logistics_add_modle").attr("product_name",settlement_bill_logistics_add_product_name);
  $("#contract_logistics_content" + contract_logistics_contract_code_uuid).find(".settlement_bill_table_sales_trad_uuid").attr("contract_logistics_code_uuid",contract_logistics_contract_code_uuid);
  //清空原始数据
  settlement_bill_logistics_clear_raw_data(contract_logistics_contract_code_uuid);
  //服务器数据
  settlement_bill_logistics_server_data_cover(trade_contract_code, contract_logistics_contract_code);
  //加载数据
  settlement_bill_logistics_fill_variable_data(contract_logistics_contract_code_uuid);
}