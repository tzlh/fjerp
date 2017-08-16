var contract_sale_all_penle_uuid = "";
function contract_sale_open_info_func(obj) {
  var contract_sales_contract_code = obj.attr("contract_code");
  var contract_sales_contract_code_uuid = obj.attr("contract_sales_contract_code_uuid");
  var contract_sale_warehouse_uuid = obj.attr("contract_sale_warehouse_uuid");
  var contract_trad_add_url = "lego/lego_fjTrade?servletName=addTradeInvoiceInformation";
  var contract_trad_edit_url = "lego/lego_fjTrade?servletName=modifyTradeInvoiceInformation";
  //贸易合同合计
  var contract_sale_all_price = obj.attr("contract_sale_all_price");
  
  var contract_sale_all_penle =
  '<tr>'+
    '<td colspan="11">'+
      '<div class="row">'+
        '<div class="col-lg-12">'+
          '<div id = "paid_record_content' + contract_sales_contract_code_uuid + '">'+
          '</div>'+
          '<div id = "contract_logistics_content' + contract_sales_contract_code_uuid + '">'+
          '</div>'+
          '<div id = "vehicle_information_content' + contract_sales_contract_code_uuid + '">'+
          '</div>'+
          '<div id = "settlement_bill_sale_content' + contract_sales_contract_code_uuid + '">'+
          '</div>'+
          '<div id = "invoice_information_content' + contract_sales_contract_code_uuid + '">'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</td>'+
  '</tr>';
  var contract_sales_html = contract_sale_all_penle;
  if (obj.hasClass("active")) {
    obj.find(".glyphicon").removeClass("glyphicon-chevron-down");
    obj.removeClass("active");
    obj.parent().parent().nextUntil(".contract_sale_tr").remove();
    contract_sales_html = "";
  } else {
    obj.find(".glyphicon").addClass("glyphicon-chevron-down");
    obj.addClass("active");
    obj.parent().parent().after(contract_sales_html);
    for (var i = 0; i < $(".contract_sale_data_screening_btn").length; i++) {
      if($(".contract_sale_data_screening_btn").eq(i).prop("checked") == false) {
        var contract_sale_idd = $(".contract_sale_data_screening_btn").eq(i).attr("id");
        $(".contract_sale_all_panel").find("." + contract_sale_idd).addClass("contract_sales_none");
      }
    }
  }
  //收款记录
  paid_record_output("#paid_record_content" + contract_sales_contract_code_uuid, contract_sale_all_price);
  $("#paid_record_content" + contract_sales_contract_code_uuid).find("#paid_record_add_modle").attr("trade_contract_code",contract_sales_contract_code);
  $("#paid_record_content" + contract_sales_contract_code_uuid).find("#paid_record_add_modle").attr("contract_sale_all_price",contract_sale_all_price);
//$("#paid_record_content" + contract_sales_contract_code_uuid).find(".settlement_bill_table_sales_trad_uuid").attr("trade_contract_code",contract_sale_all_price);
  
  
  
  
  //插入物流合同 ////////////////////////////////////////////////////////
  contract_logistics_output("#contract_logistics_content" + contract_sales_contract_code_uuid);
  $("#contract_logistics_content" + contract_sales_contract_code_uuid).find("#contract_logistics_add_modle").attr("trade_contract_code",contract_sales_contract_code);
  $("#contract_logistics_content" + contract_sales_contract_code_uuid).find("#contract_logistics_add_modle").attr("trade_contract_code_uuid",contract_sales_contract_code_uuid);
  $("#contract_logistics_content" + contract_sales_contract_code_uuid).find("#contract_logistics_table_sales_trad_uuid").attr("trade_contract_code_uuid",contract_sales_contract_code_uuid);
  $("#contract_logistics_content" + contract_sales_contract_code_uuid).find("#contract_logistics_table_sales_trad_uuid").attr("trade_contract_code",contract_sales_contract_code);
  //清空原始数据
  contract_logistics_clear_raw_data(contract_sales_contract_code_uuid);
  //服务器数据
  contract_logistics_server_data_cover(contract_sales_contract_code);
  //加载数据
  contract_logistics_fill_variable_data(contract_sales_contract_code_uuid);
  
  
  //车船信息 ///////////////////////////////////////////////////////////
  vehicle_information_output("#vehicle_information_content" + contract_sales_contract_code_uuid);
  $("#vehicle_information_content" + contract_sales_contract_code_uuid).find("#vehicle_information_add_modle").attr("contract_code",contract_sales_contract_code);
  $("#vehicle_information_content" + contract_sales_contract_code_uuid).find("#vehicle_information_add_modle").attr("contract_sales_contract_code_uuid",contract_sales_contract_code_uuid);
  $("#vehicle_information_content" + contract_sales_contract_code_uuid).find("#vehicle_information_add_modle").attr("contract_sale_warehouse_uuid",contract_sale_warehouse_uuid);
  $("#vehicle_information_content" + contract_sales_contract_code_uuid).find("#vehicle_information_table_sales_trad_uuid").attr("vehicle_information_table_sales_trad_uuid",contract_sales_contract_code_uuid);
  //清空原始数据
  vehicle_information_clear_raw_data(contract_sales_contract_code_uuid);
  //服务器数据
  vehicle_information_server_data_cover(contract_sales_contract_code);
  //加载数据
  vehicle_information_fill_variable_data(contract_sales_contract_code_uuid);
  
  
  //销售合同//////////////////////////////////////
  settlement_bill_sale_output("#settlement_bill_sale_content" + contract_sales_contract_code_uuid);
  $("#settlement_bill_sale_content" + contract_sales_contract_code_uuid).find("#settlement_bill_sale_add_modle").attr("contract_code",contract_sales_contract_code);
  $("#settlement_bill_sale_content" + contract_sales_contract_code_uuid).find("#settlement_bill_sale_add_modle").attr("contract_code_uuid",contract_sales_contract_code_uuid);
  $("#settlement_bill_sale_content" + contract_sales_contract_code_uuid).find("#settlement_bill_table_sales_trad_uuid").attr("contract_code_uuid",contract_sales_contract_code_uuid); 
  //清空原始数据
  settlement_bill_sale_clear_raw_data(contract_sales_contract_code_uuid);
  //服务器数据
  settlement_bill_sale_server_data_cover(contract_sales_contract_code, "1", "2");
  //加载数据
  settlement_bill_sale_fill_variable_data(contract_sales_contract_code_uuid);
  
  
  //发票信息///////////////////////////////////////////
  invoice_information_output("#invoice_information_content" + contract_sales_contract_code_uuid, contract_sale_all_price, "1");
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find("#invoice_information_add_modle").attr("contract_code",contract_sales_contract_code);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find("#invoice_information_add_modle").attr("invoice_type","1");
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find("#invoice_information_add_modle").attr("contract_logistics_trad_add_url",contract_trad_add_url);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find("#invoice_information_add_modle").attr("contract_code_uuid",contract_sales_contract_code_uuid);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find("#invoice_information_add_modle").attr("contract_sale_all_price",contract_sale_all_price);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find(".invoice_information_table_sales_trad_uuid").attr("contract_code_uuid",contract_sales_contract_code_uuid);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find(".invoice_information_table_sales_trad_uuid").attr("contract_sale_all_price",contract_sale_all_price);
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find(".invoice_information_table_sales_trad_uuid").attr("invoice_type","1");
  $("#invoice_information_content" + contract_sales_contract_code_uuid).find(".invoice_information_table_sales_trad_uuid").attr("contract_logistics_trad_edit_url",contract_trad_edit_url);
  //清空原始数据
  invoice_information_clear_raw_data(contract_sales_contract_code_uuid);
  //服务器数据
  invoice_information_server_data_cover(contract_sales_contract_code);
  //加载数据
  
  invoice_information_fill_variable_data(contract_sales_contract_code_uuid, contract_sale_all_price, "1");
}