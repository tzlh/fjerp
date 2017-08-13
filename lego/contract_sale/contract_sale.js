/**
 * @author wangdi
 */

/**
 * 仓库信息
 */
var contract_sale_warehouse = {"data":[
  {"name":"舟山纳海", "uuid":"33333333333333333333333333333331"},
  {"name":"海纳百川", "uuid":"33333333333333333333333333333332"},
  {"name":"黔驴技穷", "uuid":"33333333333333333333333333333333"},
  {"name":"任人宰割", "uuid":"33333333333333333333333333333334"},
  {"name":"轻车熟路", "uuid":"33333333333333333333333333333335"},
  {"name":"蓬荜生辉", "uuid":"33333333333333333333333333333336"},
  {"name":"礼贤下士", "uuid":"33333333333333333333333333333337"},
  {"name":"举案齐眉", "uuid":"33333333333333333333333333333338"},
  {"name":"相敬如宾", "uuid":"33333333333333333333333333333339"}]
};

/**
 * 企业数据
 */
var contract_sale_enterprise_data = {"data":[
  {"short_name":"腾智联合", "uuid":"00000000000000000000000000000001"},
  {"short_name":"腾智联", "uuid":"00000000000000000000000000000002"},
  {"short_name":"腾智", "uuid":"00000000000000000000000000000003"},
  {"short_name":"腾智联合有限公司", "uuid":"00000000000000000000000000000004"}]
};

/**
 * 销售合同数据
 * contract_code:合同编号
 * buyer_uuid:购买方
 * seller_uuid:销售方
 * product_name:产品名称
 * real_name:真实姓名
 * price:价格
 * quantity:数量
 */
var contract_sale_data = {"data":[
  {"contract_code":"fj-xy-170604", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"3.0", "quantity":"330", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111111"},
  {"contract_code":"fj-xy-111111", "buyer_uuid":"00000000000000000000000000000001", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"5.0", "quantity":"450", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111112"},
  {"contract_code":"fj-xy-222222", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"7.0", "quantity":"360", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111113"},
  {"contract_code":"fj-xy-333333", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"4.0", "quantity":"780", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111114"},
  {"contract_code":"fj-xy-444444", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000004", "product_name":"福记", "real_name":"富纪有限公司", "price":"2.0", "quantity":"4550", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111115"}]
};

/**
 * 分页变量
 */
var rows = 2;
var current_offset = 0;
var contract_sale_search_condition = {};

function contract_sale_clear_raw_data() {
  $("#contract_sales_pages").html("");
  $("#contract_sales_box").html('<tr><td colspan="11" align="center">没数据</td></tr>');
}

/**
 * 服务器数据
 */
function contract_sale_server_data_cover() {
  //获取销售合同
  contract_sale_search_condition["type"] = "1";
  var contract_sale_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getContractTrade";
  var contract_sale_get_contract = ajax_assistant(contract_sale_url, contract_sale_search_condition, false, true, false);
  //获取企业信息
  var contract_sale_enterprise_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  var contract_sale_enterprise_get_contract = ajax_assistant(contract_sale_enterprise_url, "", false, true, false);

  //获取仓库
  var contract_sale_warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
  var contract_sale_warehouse_get_contract = ajax_assistant(contract_sale_warehouse_url, "", false, true, false);
  contract_sale_data = {};
  if (1 == contract_sale_get_contract.status) {
    if (0 == contract_sale_get_contract.count) {
      contract_sale_data = {};
    } else {
      var tmp_arr = new Array();
      var contract_sale_result = JSON.parse(contract_sale_get_contract.result);  
      console.log(contract_sale_result);
      for (var i = 0; i < contract_sale_result.length; i++) {
        tmp_arr[i] = {"contract_code":contract_sale_result[i].contract_code, "buyer_uuid":contract_sale_result[i].buyer_uuid, "seller_uuid":contract_sale_result[i].seller_uuid, "product_name":contract_sale_result[i].product_name, "real_name":contract_sale_result[i].real_name, "price":contract_sale_result[i].price, "quantity":contract_sale_result[i].quantity, "deliver_datetime":contract_sale_result[i].deliver_datetime, "uuid":contract_sale_result[i].uuid};
      }
      contract_sale_data["data"] = tmp_arr;
    }
  } else {
    alert("销售合同数据获取失败");
  }
  //企业
  contract_sale_enterprise_data = {};
  if (1 == contract_sale_enterprise_get_contract.status) {
    if (0 == contract_sale_enterprise_get_contract.count) {
      contract_sale_enterprise_data = {};
    } else {
      var tmp_enterprise_arr = new Array();
      var contract_sale_enterprise_result = JSON.parse(contract_sale_enterprise_get_contract.result);  
      console.log(contract_sale_enterprise_result);
      for (var i = 0; i < contract_sale_enterprise_result.length; i++) {
        tmp_enterprise_arr[i] = {"short_name":contract_sale_enterprise_result[i].short_name, "uuid":contract_sale_enterprise_result[i].uuid};
      }
      contract_sale_enterprise_data["data"] = tmp_enterprise_arr;
    }
  } else {
    alert("企业信息数据获取失败");
  }
  //仓库
  contract_sale_warehouse = {};
  if (1 == contract_sale_warehouse_get_contract.status) {
    if (0 == contract_sale_warehouse_get_contract.count) {
      contract_sale_warehouse = {};
    } else {
      var tmp_warehouse_arr = new Array();
      var contract_sale_warehouse_result = JSON.parse(contract_sale_warehouse_get_contract.result);  
      console.log(contract_sale_warehouse_result);
      for (var i = 0; i < contract_sale_warehouse_result.length; i++) {
        tmp_warehouse_arr[i] = {"name":contract_sale_warehouse_result[i].name, "uuid":contract_sale_warehouse_result[i].uuid};
      }
      contract_sale_warehouse["data"] = tmp_warehouse_arr;
    }
  } else {
    alert("仓库数据获取失败");
  }
}

function contract_sale_fill_variable_data() {
  if(isJsonObjectHasData(contract_sale_data)) {
    var contract_sale_html = "";
    for(var i = 0; i < contract_sale_data.data.length; i++) {
      var seller_uuid = "";
      var buyer_uuid = "";
      if(isJsonObjectHasData(contract_sale_enterprise_data)) {
        for(var j = 0; j < contract_sale_enterprise_data.data.length; j++) {
          //出租方
          if(contract_sale_enterprise_data.data[j].uuid == contract_sale_data.data[i].seller_uuid){
            seller_uuid = contract_sale_enterprise_data.data[j].short_name;
          }
          //承租方
          if(contract_sale_enterprise_data.data[j].uuid == contract_sale_data.data[i].buyer_uuid){
            buyer_uuid = contract_sale_enterprise_data.data[j].short_name;
          }
        }
      }
      var contract_sale_deliver_datetime = contract_sale_data.data[i].deliver_datetime;
      contract_sale_deliver_datetime = contract_sale_deliver_datetime.substring(0, contract_sale_deliver_datetime.indexOf(' '));
      var contract_sale_all_price = (contract_sale_data.data[i].price*contract_sale_data.data[i].quantity).toFixed(2);
      contract_sale_html +=
        '<tr class = "contract_sale_tr">'+
          '<td><button type = "button" class = "btn btn-info btn-xs contract_sale_open_btn" contract_code = "' + contract_sale_data.data[i].contract_code + '"><span class = "glyphicon glyphicon-chevron-up"></span></button></td>'+
          '<td>' + contract_sale_data.data[i].contract_code + '</td>'+
          '<td>' + buyer_uuid + '</td>'+
          '<td>' + seller_uuid + '</td>'+
          '<td>' + contract_sale_data.data[i].product_name + '</td>'+
          '<td>' + contract_sale_data.data[i].real_name + '</td>'+
          '<td>' + contract_sale_data.data[i].price + '</td>'+
          '<td>' + contract_sale_data.data[i].quantity + '</td>'+
          '<td>' + contract_sale_all_price + '</td>'+
          '<td>' + contract_sale_deliver_datetime + '</td>'+
          '<td>'+
            '<span class = "glyphicon glyphicon-info-sign contract_sale_ml15 contract_sale_modle_info" uuid = "' + contract_sale_data.data[i].uuid + '"></span>'+
            '<span class = "glyphicon glyphicon-pencil contract_sale_ml15 contract_sale_modle_pencil" uuid = "' + contract_sale_data.data[i].uuid + '"></span>'+
            '<span class = "glyphicon glyphicon-remove contract_sale_ml15 contract_sale_modle_remove" uuid = "' + contract_sale_data.data[i].uuid + '" contract_code = "' + contract_sale_data.data[i].contract_code + '"></span>'+
          '</td>'+
        '</tr>';
    }
    $("#contract_sales_box").html(contract_sale_html);
  } else {
    $("#contract_sales_box").html('<tr><td colspan="11" align="center">没数据</td></tr>');
  }
}

function contract_sales_add_modle_func() {
  var contract_sales_html = 
      '<div class = "modal fade custom_modal" tabindex = "-1" id = "contract_sales_add_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
        '<div class = "modal-dialog modal-lg" role = "document">'+
          '<div class = "modal-content">'+
            '<div class = "modal-header bg-primary">'+
              '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
              '<h4 class = "modal-title">添加销售合同</h4>'+
            '</div>'+
            '<div class = "modal-body nopadding-bottom">'+
              '<div class = "row">'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">购买方</label>'+
                    '<select class = "form-control contract_sales_buyer_uuid" value = "">'+
                      '<option value = "">--请选择--</option>';
                      if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                        for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                          contract_sales_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                      contract_sales_html+=
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">销售方</label>'+
                    '<select class = "form-control contract_sales_seller_uuid" value = "">'+
                      '<option value = "">--请选择--</option>';
                      if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                        for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                          contract_sales_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                    contract_sales_html+=
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">产品名称</label>'+
                    '<input type = "text" class = "form-control contract_sales_product_name" value = ""/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">标记</label>'+
                    '<input type = "text" class = "form-control contract_sales_real_name" value = ""/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">单价</label>'+
                    '<div class = "input-group">'+
                      '<input type = "text" class = "form-control contract_sales_price" value = "" >'+
                      '<span class = "input-group-addon">元</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">数量</label>'+
                    '<div class = "input-group">'+
                      '<input type = "text" class = "form-control contract_sales_quantity" value = ""/>'+
                      '<span class = "input-group-addon">吨</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">规格</label>'+
                    '<input type = "text" class = "form-control contract_sales_specification" value = "" />'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">交货地点</label>'+
                    '<input type = "text" class = "form-control contract_sales_deliver_place" value = ""/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group has-feedback">'+
                    '<label>交货时间</label>'+
                    '<input type = "text" class = "form-control widget_datepicker contract_sales_deliver_datetime" value = "">'+
                    '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">合同损耗</label>'+
                    '<div class = "input-group">'+
                      '<input type = "text" class = "form-control contract_sales_contract_ullage" value = ""/>'+
                      '<span class = "input-group-addon">‰</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group has-feedback">'+
                    '<label>签署时间</label>'+
                    '<input type = "text" class = "form-control widget_datepicker contract_sales_sign_datetime" value = "">'+
                    '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-4">'+
                  '<div class = "form-group">'+
                    '<label for = "">库区</label>'+
                    '<select class = "form-control contract_sales_warehouse_uuid" value = "">'+
                      '<option value = "">--请选择--</option>';
                      if(isJsonObjectHasData(contract_sale_warehouse)) {
                        for (var i = 0; i < contract_sale_warehouse.data.length; i++) {
                          contract_sales_html += '<option value = "' + contract_sale_warehouse.data[i].uuid + '">' + contract_sale_warehouse.data[i].name + '</option>';
                        }
                      }
                      contract_sales_html +=
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-12">'+
                  '<div class = "form-group">'+
                    '<label for = "">备注</label>'+
                    '<textarea type = "text" class = "form-control contract_sales_remark" value = ""></textarea>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-12">'+
                  '<label class = "margin15">采购合同附件</label>'+
                  '<div class = "panel panel-default">'+
                    '<div class = "panel-body clearfix attch">'+
                      '<div class = "pull-left has-feedback">'+
                        '<button class = "btn bg-default">'+
                          '<span class = "glyphicon glyphicon-plus" style = "font-size:40px;margin-right:0;color:#fff;"></span>'+
                        '</button>'+
                        '<input class = "positionfile file_style" type = "file"  value = "" />'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class = "modal-footer"  style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-primary" id = "contract_sales_add_modle_prop_btn">添加</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
  $("body").append(contract_sales_html);
  $("#contract_sales_add_modle_prop").modal("show");
  $("#contract_sales_add_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function contract_sales_add_data_func(obj) {
  //购买企业uuid
  var contract_sales_buyer_uuid = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_buyer_uuid").val();
  //销售企业uuid
  var contract_sales_seller_uuid = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_seller_uuid").val();
  //产品名称
  var contract_sales_product_name = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_product_name").val();
  //真实姓名
  var contract_sales_real_name = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_real_name").val();
  //单价
  var contract_sales_price = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_price").val();
  //数量
  var contract_sales_quantity = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_quantity").val();
  //交货地点
  var contract_sales_deliver_place = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_deliver_place").val();
  //交货时间
  var contract_sales_deliver_datetime = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_deliver_datetime").val();
  if(contract_sales_deliver_datetime.length > 0){
    contract_sales_deliver_datetime += ' 00:00:00';
  }
  //签订时间
  var contract_sales_sign_datetime = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_sign_datetime").val();
  if(contract_sales_sign_datetime.length > 0){
    contract_sales_sign_datetime +=' 00:00:00';
  }
  //合同损耗
  var contract_sales_contract_ullage = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_contract_ullage").val();
  //库区的uuid
  var contract_sales_warehouse_uuid = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_warehouse_uuid").val();
  //规格
  var contract_sales_specification = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_specification").val();
  //备注
  var contract_sales_remark = obj.parents("#contract_sales_add_modle_prop").find(".contract_sales_remark").val();
  //附件
  var contract_sales_cluster_list = "";
    for(var i = 0; i < obj.parents("#contract_sales_add_modle_prop").find(".file_name").length; i++){
      contract_sales_cluster_list += obj.parents("#contract_sales_add_modle_prop").find(".file_name").eq(i).find("img").attr('uuid')+';';
    }
  //验证
  if(null == contract_sales_buyer_uuid.match(/^[0-9a-zA-Z]{32}$/)) {
    alert("请选择购买企业！");
    return;
  }
  if(null == contract_sales_seller_uuid.match(/^[0-9a-zA-Z]{32}$/)) {
    alert("请选择销售企业！");
    return;
  }
  if(null == contract_sales_product_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
    alert("请输入正确的产品名称！");
    return;
  }
  if(null == contract_sales_real_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
    alert("请输入正确的标记！");
    return;
  }
  if(null == contract_sales_price.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
    alert("请输入正确的单价！");
    return;
  }
  if(null == contract_sales_quantity.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
    alert("请输入正确的数量！");
    return;
  }
  if(null == contract_sales_deliver_place.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
    alert("请输入正确的交货地点！");
    return;
  }
  if(null == contract_sales_deliver_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
    alert("请选择交货时间！");
    return;
  }
  if(null == contract_sales_contract_ullage.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
    alert("请输入正确的合同损耗！");
    return;
  }
  if(null == contract_sales_sign_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
    alert("请选择签署时间！");
    return;
  }
  if(null == contract_sales_warehouse_uuid.match(/^[0-9a-zA-Z]{32}$/)) {
    alert("请输选择库区！");
    return;
  }
//if(null == contract_sales_cluster_list.match(/^([0-9a-zA-Z]{32};)+$/)) {
//  alert("请添加采购合同附件！");
//  return;
//}
  var data={
    "cluster_list":contract_sales_cluster_list,
    "buyer_uuid":contract_sales_buyer_uuid,
    "seller_uuid":contract_sales_seller_uuid,
    "product_name":contract_sales_product_name,
    "real_name":contract_sales_real_name,
    "price":contract_sales_price,
    "quantity":contract_sales_quantity,
    "deliver_place":contract_sales_deliver_place,
    "deliver_datetime":contract_sales_deliver_datetime,
    "sign_datetime":contract_sales_sign_datetime,
    "contract_ullage":contract_sales_contract_ullage,
    "warehouse_uuid":contract_sales_warehouse_uuid,
    "type":1
  };
  if(0 < contract_sales_specification.length) {
    if(null == contract_sales_specification.match(/^.{1,128}$/)) {
      alert("请输入正确的规格！");
      return;
    };
    data["specification"] = contract_sales_specification;
  };
  if(0 < contract_sales_remark.length) {
    if(null == contract_sales_remark.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,128}$/)) {
      alert("请输入正确的备注！");
      return;
    };
    data["remark"] = contract_sales_remark;
  };
  //调用接口
  if("abc" == contract_sales_product_name) {
    contract_sale_clear_raw_data();
    contract_sale_data = {"data":[
      {"contract_code":"fj-xy-170604", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"3.0", "quantity":"330", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111111"},
      {"contract_code":"fj-xy-111111", "buyer_uuid":"00000000000000000000000000000001", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"5.0", "quantity":"450", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111112"},
      {"contract_code":"fj-xy-222222", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"7.0", "quantity":"360", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111113"},
      {"contract_code":"fj-xy-333333", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"4.0", "quantity":"780", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111114"},
      {"contract_code":"fj-xy-444444", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000004", "product_name":"福记", "real_name":"富纪有限公司", "price":"2.0", "quantity":"4550", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111115"},
      {"contract_code":"fj-xy-000000", "buyer_uuid":"00000000000000000000000000000001", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"0.0", "quantity":"0", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111116"}]
    };
    contract_sale_fill_variable_data(); 
    $("#contract_sales_add_modle_prop").modal("hide");
    $("#contract_sales_add_modle_prop").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  } else {
    alert("添加销售合同失败");
  }
}

function contract_sales_edit_modle_func(obj) {
  var uuid = obj.attr("uuid");
  //购买企业uuid
  var contract_sales_buyer_uuid = "";
  //销售企业uuid
  var contract_sales_seller_uuid = "";
  //产品名称
  var contract_sales_product_name = "";
  //真实姓名
  var contract_sales_real_name = "";
  //单价
  var contract_sales_price = "";
  //数量
  var contract_sales_quantity = "";
  //交货地点
  var contract_sales_deliver_place = "";
  //交货时间
  var contract_sales_deliver_datetime = "";
  //签订时间
  var contract_sales_sign_datetime = "";
  //合同损耗
  var contract_sales_contract_ullage = "";
  //库区的uuid
  var contract_sales_warehouse_uuid = "";
  //规格
  var contract_sales_specification = "";
  //备注
  var contract_sales_remark = "";
  //附件
  var contract_sales_cluster_list = "";
  var data = {
    "uuid":uuid,
    "type":1
  };
  //调接口  查询数据
  var contract_warehouse_edit_data = [{"contract_code":"fj-xy-170604", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"3.0", "quantity":"330", "deliver_datetime":"2017-05-06 00:00:00", "deliver_place":"交货地点", "sign_datetime":"2017-05-06 00:00:00", "contract_ullage":"0.1", "warehouse_uuid":"33333333333333333333333333333331", "uuid":"11111111111111111111111111111111", "cluster_list":"aaa23aaaa4aaaaaaaaaaaaaaaaaaaaaa;bbbbbbbbbbbb6bbbbb77bbb89bbbbbbb", "specification":"规格", "remark":"啊啊啊啊啊啊啊啊啊"}];
//if (1 == aaaaaaaaaaaaaaaaaaaa.status) {
    if (0 < contract_warehouse_edit_data.length) {
      contract_sales_buyer_uuid = contract_warehouse_edit_data[0].buyer_uuid;
      contract_sales_seller_uuid = contract_warehouse_edit_data[0].seller_uuid;
      if (null != contract_warehouse_edit_data[0].cluster_list) {
        contract_sales_cluster_list = contract_warehouse_edit_data[0].cluster_list;
      };
      if (null != contract_warehouse_edit_data[0].product_name) {
        contract_sales_product_name = contract_warehouse_edit_data[0].product_name;
      };
      if (null != contract_warehouse_edit_data[0].real_name) {
        contract_sales_real_name = contract_warehouse_edit_data[0].real_name;
      };
      if (null != contract_warehouse_edit_data[0].price) {
        contract_sales_price = contract_warehouse_edit_data[0].price;
      };
      if (null != contract_warehouse_edit_data[0].quantity) {
        contract_sales_quantity = contract_warehouse_edit_data[0].quantity;
      };
      if (null != contract_warehouse_edit_data[0].specification) {
        contract_sales_specification = contract_warehouse_edit_data[0].specification;
      };
      if (null != contract_warehouse_edit_data[0].deliver_place) {
        contract_sales_deliver_place = contract_warehouse_edit_data[0].deliver_place;
      };
      if (null != contract_warehouse_edit_data[0].deliver_datetime) {
        contract_sales_deliver_datetime = contract_warehouse_edit_data[0].deliver_datetime;
        contract_sales_deliver_datetime = contract_sales_deliver_datetime.substring(0, contract_sales_deliver_datetime.indexOf(' '));
      };
      if (null != contract_warehouse_edit_data[0].sign_datetime) {
        contract_sales_sign_datetime = contract_warehouse_edit_data[0].sign_datetime;
        contract_sales_sign_datetime = contract_sales_sign_datetime.substring(0, contract_sales_sign_datetime.indexOf(' '));
      };
      if (null != contract_warehouse_edit_data[0].contract_ullage) {
        contract_sales_contract_ullage = contract_warehouse_edit_data[0].contract_ullage;
      };
      if (null != contract_warehouse_edit_data[0].warehouse_uuid) {
        contract_sales_warehouse_uuid = contract_warehouse_edit_data[0].warehouse_uuid;
      };
      if (null != contract_warehouse_edit_data[0].remark) {
        contract_sales_remark = contract_warehouse_edit_data[0].remark;
      };
    } else {
      alert("没数据");
    }
//} else {
//  alert("查询数据失败");
//}
  var contract_sale_edit_html = 
    '<div class = "modal fade custom_modal" tabindex = "-1" id = "contract_sales_edit_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
      '<div class = "modal-dialog modal-lg" role = "document">'+
        '<div class = "modal-content">'+
          '<div class = "modal-header bg-primary">'+
            '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
            '<h4 class = "modal-title">修改销售合同</h4>'+
          '</div>'+
          '<div class = "modal-body nopadding-bottom">'+
            '<div class = "row">'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">购买方</label>'+
                  '<select class = "form-control contract_sales_buyer_uuid" value = "' + contract_sales_buyer_uuid + '"  disabled="disabled">';
                    if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                      for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                        if(contract_sales_buyer_uuid == contract_sale_enterprise_data.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '" selected = "selected">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        } else {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                    }
                    contract_sale_edit_html+=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">销售方</label>'+
                  '<select class = "form-control contract_sales_seller_uuid" value = "' + contract_sales_seller_uuid + '"  disabled="disabled">';
                    if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                      for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                        if(contract_sales_seller_uuid == contract_sale_enterprise_data.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '" selected = "selected">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        } else {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                    }
                  contract_sale_edit_html+=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">产品名称</label>'+
                  '<input type = "text" class = "form-control contract_sales_product_name" value = "' + contract_sales_product_name + '"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">标记</label>'+
                  '<input type = "text" class = "form-control contract_sales_real_name" value = "' + contract_sales_real_name + '"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">单价</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_price" value = "' + contract_sales_price + '" >'+
                    '<span class = "input-group-addon">元</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">数量</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_quantity" value = "' + contract_sales_quantity + '"/>'+
                    '<span class = "input-group-addon">吨</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">规格</label>'+
                  '<input type = "text" class = "form-control contract_sales_specification" value = "' + contract_sales_specification + '" />'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">交货地点</label>'+
                  '<input type = "text" class = "form-control contract_sales_deliver_place" value = "' + contract_sales_deliver_place + '"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group has-feedback">'+
                  '<label>交货时间</label>'+
                  '<input type = "text" class = "form-control widget_datepicker contract_sales_deliver_datetime" value = "' + contract_sales_deliver_datetime + '">'+
                  '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">合同损耗</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_contract_ullage" value = "' + contract_sales_contract_ullage + '"/>'+
                    '<span class = "input-group-addon">‰</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group has-feedback">'+
                  '<label>签署时间</label>'+
                  '<input type = "text" class = "form-control widget_datepicker contract_sales_sign_datetime" value = "' + contract_sales_sign_datetime + '">'+
                  '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">库区</label>'+
                  '<select class = "form-control contract_sales_warehouse_uuid" value = "' + contract_sales_warehouse_uuid + '">';
                    if(isJsonObjectHasData(contract_sale_warehouse)) {
                      for (var i = 0; i < contract_sale_warehouse.data.length; i++) {
                        if(contract_sales_warehouse_uuid == contract_sale_warehouse.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_warehouse.data[i].uuid + '" selected = "selected">' + contract_sale_warehouse.data[i].name + '</option>';
                        } else {
                          contract_sale_edit_html += '<option value = "' + contract_sale_warehouse.data[i].uuid + '">' + contract_sale_warehouse.data[i].name + '</option>';
                        }
                      }
                    }
                    contract_sale_edit_html+=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-12">'+
                '<div class = "form-group">'+
                  '<label for = "">备注</label>'+
                  '<textarea type = "text" class = "form-control contract_sales_remark" value = "' + contract_sales_remark + '">' + contract_sales_remark + '</textarea>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-12">'+
                '<label class = "margin15">采购合同附件</label>'+
                '<div class = "panel panel-default">'+
                  '<div class = "panel-body clearfix attch">'+
                    '<div class = "pull-left has-feedback">'+
                      '<button class = "btn bg-default">'+
                        '<span class = "glyphicon glyphicon-plus" style = "font-size:40px;margin-right:0;color:#fff;"></span>'+
                      '</button>'+
                      '<input class = "positionfile file_style" type = "file"  value = "" />'+
                    '</div>';
                    if(0 < contract_sales_cluster_list.length) {
                      contract_sales_cluster_list = contract_sales_cluster_list.substring(0, contract_sales_cluster_list.length - 1).split(';');
                      for(var i=0;i<contract_sales_cluster_list.length;i++) {
                        var data = {
                          "cluster_name":contract_sales_cluster_list[i]
                        };
//                        var contract_sale_file_name=ajax_assistant(PROJECT_PATH+"lego/lego_storage?servletName=getFileByClusterName",data, false, true, false);//查询文件集群信息
//                        var contract_sales_json=JSON.parse(contract_sale_file_name.result);
//                        if(0 != contract_sale_file_name.count){
                          contract_sale_edit_html += 
                            '<div class = "pull-left file_name has-feedback contract_sale_ml15">'+
//                                '<img uuid = "'+contract_sales_json[0].cluster_name+'" src = "'+PROJECT_PATH+'upload/'+contract_sales_json[0].cluster_name+'.'+contract_sales_json[0].suffix+'" url = "'+PROJECT_PATH+'upload/'+contract_sales_json[0].cluster_name+'.'+contract_sales_json[0].suffix+'" width = "60" height = "60" class = "img-rounded">'+
                                '<img src = "a.png" uuid = "' + contract_sales_cluster_list[i] + '" width = "60" height = "60" class = "img-rounded">'+
                                '<button class = "btn btn-danger text-center delet_file_btn">'+
                                  '<span class = "glyphicon glyphicon-remove  btn-danger fon12"></span>'+
                                '</button>'+
                            '</div>';
//                        }
                      }
                    }
                    contract_sale_edit_html += 
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class = "modal-footer"  style = "text-align: center;">'+
              '<button type = "button" class = "btn btn-warning" id = "contract_sales_edit_modle_prop_btn" uuid = "' + uuid + '">修改</button>'+
              '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(contract_sale_edit_html);
  $("#contract_sales_edit_modle_prop").modal("show");
  $("#contract_sales_edit_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function contract_sales_edit_data_func(obj) {
  var uuid = obj.attr("uuid");
  //购买企业uuid
  var contract_sales_buyer_uuid = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_buyer_uuid").val();
  //销售企业uuid
  var contract_sales_seller_uuid = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_seller_uuid").val();
  //产品名称
  var contract_sales_product_name = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_product_name").val();
  //真实姓名
  var contract_sales_real_name = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_real_name").val();
  //单价
  var contract_sales_price = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_price").val();
  //数量
  var contract_sales_quantity = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_quantity").val();
  //交货地点
  var contract_sales_deliver_place = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_deliver_place").val();
  //交货时间
  var contract_sales_deliver_datetime = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_deliver_datetime").val();
  //签订时间
  var contract_sales_sign_datetime = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_sign_datetime").val();
  //合同损耗
  var contract_sales_contract_ullage = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_contract_ullage").val();
  //库区的uuid
  var contract_sales_warehouse_uuid = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_warehouse_uuid").val();
  //规格
  var contract_sales_specification = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_specification").val();
  //备注
  var contract_sales_remark = obj.parents("#contract_sales_edit_modle_prop").find(".contract_sales_remark").val();
  //附件
  var contract_sales_cluster_list = "";
  for (var i = 0; i < obj.parents("#contract_sales_edit_modle_prop").find(".file_name").length; i++) {
    contract_sales_cluster_list += obj.parents("#contract_sales_edit_modle_prop").find(".file_name").eq(i).find("img").attr('uuid')+';';
  }
  //验证
  if (null == contract_sales_buyer_uuid.match(/^[0-9a-zA-Z]{32}$/)) {
    alert("请选择购买企业！");
    return;
  }
  if (null == contract_sales_seller_uuid.match(/^[0-9a-zA-Z]{32}$/)) {
    alert("请选择销售企业！");
    return;
  }
  var data = {
    "idColumnValue":uuid,
    "buyer_uuid":contract_sales_buyer_uuid,
    "seller_uuid":contract_sales_seller_uuid
  };
  //验证
  if ("" != contract_sales_quantity) {
    if(null == contract_sales_quantity.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){
      alert("请输入正确的数量！");
      return;
    }
    data["quantity"] = contract_sales_quantity;
  }
  if ("" != contract_sales_specification) {
    if(null == contract_sales_specification.match(/^.{1,128}$/)){
      alert("请输入正确的规格！");
      return;
    }
    data["specification"] = contract_sales_specification;
  }
  if (0 == contract_sales_specification.length) {
    data["sn_specification"] = "set_null";
  }
  if ("" != contract_sales_remark.length) {
    if (null == contract_sales_remark.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,128}$/)) {
      alert("请输入正确的备注！");
      return;
    }
    data["remark"] = contract_sales_remark;
  }
  if (0 == contract_sales_remark.length) {
    data["sn_remark"] = "set_null";
  }
  if ("" != contract_sales_product_name) {
    if (null == contract_sales_product_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
      alert("请输入正确的产品名称！");
      return;
    }
    data["product_name"] = contract_sales_product_name;
  }
//if("" != contract_sales_cluster_list){
//  if(null == contract_sales_cluster_list.match(/^([0-9a-zA-Z]{32};)+$/)){
//    alert("请添加合同附件！");
//    return;
//  }
//  data["normal_newClusterList"] = contract_sales_cluster_list;
//}
  if ("" != contract_sales_real_name) {
    if (null == contract_sales_real_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
      alert("请输入正确的标记！");
      return;
    }
    data["real_name"] = contract_sales_real_name;
  }
  if ("" != contract_sales_price) {
    if(null == contract_sales_price.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){
      alert("请输入正确的价格！");
      return;
    }
    data["price"] = contract_sales_price;
  }
  if ("" != contract_sales_deliver_datetime) {
    contract_sales_deliver_datetime += ' 00:00:00';
    if(null == contract_sales_deliver_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
      alert("请选择交货日期！");
      return;
    }
    data["deliver_datetime"] = contract_sales_deliver_datetime;
  }
  if ("" != contract_sales_deliver_place) {
    if(null == contract_sales_deliver_place.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
      alert("请输入正确的交货地点！");
      return;
    }
    data["deliver_place"] = contract_sales_deliver_place;
  }
  if ("" != contract_sales_sign_datetime) {
    contract_sales_sign_datetime += ' 00:00:00';
    if(null == contract_sales_sign_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
      alert("请选择签署时间！");
      return;
    }
    data["sign_datetime"] = contract_sales_sign_datetime;
  }
  if ("" != contract_sales_contract_ullage) {
    if(null == contract_sales_contract_ullage.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){
      alert("请输入正确的合同损耗！");
      return;
    }
    data["contract_ullage"] = contract_sales_contract_ullage;
  }
  if ("" != contract_sales_warehouse_uuid) {
    if(null == contract_sales_warehouse_uuid.match(/^[0-9a-zA-Z]{32}$/)){
      alert("请选择库区！");
      return;
    }
    data["warehouse_uuid"] = contract_sales_warehouse_uuid;
  };
  //调数据库
  if ("abc" == contract_sales_product_name) {
    contract_sale_clear_raw_data();
    contract_sale_data = {"data":[
      {"contract_code":"fj-xy-999999999", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"3.0", "quantity":"330", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111111"},
      {"contract_code":"fj-xy-111111", "buyer_uuid":"00000000000000000000000000000001", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"5.0", "quantity":"450", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111112"},
      {"contract_code":"fj-xy-222222", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"7.0", "quantity":"360", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111113"},
      {"contract_code":"fj-xy-333333", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"4.0", "quantity":"780", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111114"},
      {"contract_code":"fj-xy-444444", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000004", "product_name":"福记", "real_name":"富纪有限公司", "price":"2.0", "quantity":"4550", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111115"},]
    };
    contract_sale_fill_variable_data();
    $("#contract_sales_edit_modle_prop").modal("hide");
    $("#contract_sales_edit_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  } else {
    alert("修改失败");
  }   
}

function contract_sales_delete_modle_func(obj) {
  var uuid = obj.attr("uuid");
  var contract_sales_contract_code = obj.attr("contract_code");
  var contract_sales_delete_html = 
      '<div class="modal fade custom_modal" id="contract_sales_delete_modle_prop" tabindex="-1" role="dialog">'+
        '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
            '<div class="modal-header bg-primary">'+
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
              '<h4 class="modal-title">删除销售合同确认</h4>'+
            '</div>'+
            '<div class="modal-body nopadding-bottom">确认要删除吗？</div>'+
            '<div class="modal-footer noborder nopadding-top" style="text-align: center;">'+
            '<button type="button" class="btn btn-danger" id="contract_sales_delete_modle_prop_btn" contract_code = "' + contract_sales_contract_code + '" uuid="' + uuid + '">删除</button>'+
                '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
    '</div>';
  $("body").append(contract_sales_delete_html);
  $("#contract_sales_delete_modle_prop").modal("show");
  $("#contract_sales_delete_modle_prop").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function contract_sales_delete_data_func(obj) {
  var uuid = obj.attr("uuid");
  var contract_sales_contract_code = obj.attr("contract_code");
  var data = {
    "idColumnValue":uuid,
    "contract_code":contract_sales_contract_code
  };
  //接口数据
  if ("11111111111111111111111111111111" != uuid) {
    alert("删除销售合同失败");
  } else {    
  // 更新页面数据
    contract_sale_clear_raw_data();
    contract_sale_data = {"data":[
      {"contract_code":"fj-xy-111111", "buyer_uuid":"00000000000000000000000000000001", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"5.0", "quantity":"450", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111112"},
      {"contract_code":"fj-xy-222222", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"7.0", "quantity":"360", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111113"},
      {"contract_code":"fj-xy-333333", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000003", "product_name":"福记", "real_name":"富纪有限公司", "price":"4.0", "quantity":"780", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111114"},
      {"contract_code":"fj-xy-444444", "buyer_uuid":"00000000000000000000000000000002", "seller_uuid":"00000000000000000000000000000004", "product_name":"福记", "real_name":"富纪有限公司", "price":"2.0", "quantity":"4550", "deliver_datetime":"2017-05-06 00:00:00", "uuid":"11111111111111111111111111111115"},]
    };
    contract_sale_fill_variable_data();
  }
  $("#contract_sales_delete_modle_prop").modal("hide");
  $("#contract_sales_delete_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function contract_sales_info_modle_func(obj) {
  var uuid = obj.attr("uuid");
  //购买企业uuid
  var contract_sales_buyer_uuid = "";
  //销售企业uuid
  var contract_sales_seller_uuid = "";
  //产品名称
  var contract_sales_product_name = "";
  //真实姓名
  var contract_sales_real_name = "";
  //单价
  var contract_sales_price = "";
  //数量
  var contract_sales_quantity = "";
  //交货地点
  var contract_sales_deliver_place = "";
  //交货时间
  var contract_sales_deliver_datetime = "";
  //签订时间
  var contract_sales_sign_datetime = "";
  //合同损耗
  var contract_sales_contract_ullage = "";
  //库区的uuid
  var contract_sales_warehouse_uuid = "";
  //规格
  var contract_sales_specification = "";
  //备注
  var contract_sales_remark = "";
  //附件
  var contract_sales_cluster_list = "";
  var data = {
    "uuid":uuid,
    "type":1
  };
  //调接口  查询数据
  var contract_warehouse_edit_data = [{"contract_code":"fj-xy-170604", "buyer_uuid":"00000000000000000000000000000004", "seller_uuid":"00000000000000000000000000000001", "product_name":"福记", "real_name":"富纪有限公司", "price":"3.0", "quantity":"330", "deliver_datetime":"2017-05-06 00:00:00", "deliver_place":"交货地点", "sign_datetime":"2017-05-06 00:00:00", "contract_ullage":"0.1", "warehouse_uuid":"33333333333333333333333333333331", "uuid":"11111111111111111111111111111111", "cluster_list":"aaa23aaaa4aaaaaaaaaaaaaaaaaaaaaa;bbbbbbbbbbbb6bbbbb77bbb89bbbbbbb", "specification":"规格", "remark":"啊啊啊啊啊啊啊啊啊"}];
//if(1 == aaaaaaaaaaaaaaaaaaaa.status){
    if (0 < contract_warehouse_edit_data.length) {
      contract_sales_buyer_uuid = contract_warehouse_edit_data[0].buyer_uuid;
      contract_sales_seller_uuid = contract_warehouse_edit_data[0].seller_uuid;
      if (null != contract_warehouse_edit_data[0].cluster_list) {
        contract_sales_cluster_list = contract_warehouse_edit_data[0].cluster_list;
      }
      if (null != contract_warehouse_edit_data[0].product_name) {
        contract_sales_product_name = contract_warehouse_edit_data[0].product_name;
      }
      if (null != contract_warehouse_edit_data[0].real_name) {
        contract_sales_real_name = contract_warehouse_edit_data[0].real_name;
      }
      if (null != contract_warehouse_edit_data[0].price) {
        contract_sales_price = contract_warehouse_edit_data[0].price;
      }
      if (null != contract_warehouse_edit_data[0].quantity) {
        contract_sales_quantity = contract_warehouse_edit_data[0].quantity;
      }
      if (null != contract_warehouse_edit_data[0].specification) {
        contract_sales_specification = contract_warehouse_edit_data[0].specification;
      }
      if (null != contract_warehouse_edit_data[0].deliver_place) {
        contract_sales_deliver_place = contract_warehouse_edit_data[0].deliver_place;
      }
      if (null != contract_warehouse_edit_data[0].deliver_datetime) {
        contract_sales_deliver_datetime = contract_warehouse_edit_data[0].deliver_datetime;
        contract_sales_deliver_datetime = contract_sales_deliver_datetime.substring(0, contract_sales_deliver_datetime.indexOf(' '));
      }
      if (null != contract_warehouse_edit_data[0].sign_datetime) {
        contract_sales_sign_datetime = contract_warehouse_edit_data[0].sign_datetime;
        contract_sales_sign_datetime = contract_sales_sign_datetime.substring(0, contract_sales_sign_datetime.indexOf(' '));
      }
      if (null != contract_warehouse_edit_data[0].contract_ullage) {
        contract_sales_contract_ullage = contract_warehouse_edit_data[0].contract_ullage;
      }
      if (null != contract_warehouse_edit_data[0].warehouse_uuid) {
        contract_sales_warehouse_uuid = contract_warehouse_edit_data[0].warehouse_uuid;
      }
      if (null != contract_warehouse_edit_data[0].remark) {
        contract_sales_remark = contract_warehouse_edit_data[0].remark;
      }
    } else {
      alert("没数据");
    }
//} else {
//  alert("查询数据失败");
//}
  var contract_sale_edit_html = 
    '<div class = "modal fade custom_modal" tabindex = "-1" id = "contract_sales_info_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
      '<div class = "modal-dialog modal-lg" role = "document">'+
        '<div class = "modal-content">'+
          '<div class = "modal-header bg-primary">'+
            '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
            '<h4 class = "modal-title">销售合同详情</h4>'+
          '</div>'+
          '<div class = "modal-body nopadding-bottom">'+
            '<div class = "row">'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">购买方</label>'+
                  '<select class = "form-control contract_sales_buyer_uuid" value = "' + contract_sales_buyer_uuid + '"  disabled="disabled">';
                    if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                      for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                        if(contract_sales_buyer_uuid == contract_sale_enterprise_data.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '" selected = "selected">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                    }
                    contract_sale_edit_html +=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">销售方</label>'+
                  '<select class = "form-control contract_sales_seller_uuid" value = "' + contract_sales_seller_uuid + '"  disabled="disabled">';
                    if(isJsonObjectHasData(contract_sale_enterprise_data)) {
                      for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
                        if(contract_sales_seller_uuid == contract_sale_enterprise_data.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_enterprise_data.data[i].uuid + '" selected = "selected">' + contract_sale_enterprise_data.data[i].short_name + '</option>';
                        }
                      }
                    }
                  contract_sale_edit_html +=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">产品名称</label>'+
                  '<input type = "text" class = "form-control contract_sales_product_name" value = "' + contract_sales_product_name + '" disabled="disabled"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">标记</label>'+
                  '<input type = "text" class = "form-control contract_sales_real_name" value = "' + contract_sales_real_name + '" disabled="disabled"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">单价</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_price" value = "' + contract_sales_price + '"  disabled="disabled">'+
                    '<span class = "input-group-addon">元</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">数量</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_quantity" value = "' + contract_sales_quantity + '" disabled="disabled"/>'+
                    '<span class = "input-group-addon">吨</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">规格</label>'+
                  '<input type = "text" class = "form-control contract_sales_specification" value = "' + contract_sales_specification + '"  disabled="disabled"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">交货地点</label>'+
                  '<input type = "text" class = "form-control contract_sales_deliver_place" value = "' + contract_sales_deliver_place + '" disabled="disabled"/>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group has-feedback">'+
                  '<label>交货时间</label>'+
                  '<input type = "text" class = "form-control widget_datepicker contract_sales_deliver_datetime" value = "' + contract_sales_deliver_datetime + '" disabled="disabled">'+
                  '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">合同损耗</label>'+
                  '<div class = "input-group">'+
                    '<input type = "text" class = "form-control contract_sales_contract_ullage" value = "' + contract_sales_contract_ullage + '" disabled="disabled"/>'+
                    '<span class = "input-group-addon">‰</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group has-feedback">'+
                  '<label>签署时间</label>'+
                  '<input type = "text" class = "form-control widget_datepicker contract_sales_sign_datetime" value = "' + contract_sales_sign_datetime + '" disabled="disabled">'+
                  '<span class = "glyphicon glyphicon-calendar form-control-feedback" aria-hidden = "true"></span>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-4">'+
                '<div class = "form-group">'+
                  '<label for = "">库区</label>'+
                  '<select class = "form-control contract_sales_warehouse_uuid" value = "' + contract_sales_warehouse_uuid + '" disabled="disabled">';
                    if(isJsonObjectHasData(contract_sale_warehouse)) {
                      for (var i = 0; i < contract_sale_warehouse.data.length; i++) {
                        if(contract_sales_warehouse_uuid == contract_sale_warehouse.data[i].uuid) {
                          contract_sale_edit_html += '<option value = "' + contract_sale_warehouse.data[i].uuid + '" selected = "selected">' + contract_sale_warehouse.data[i].name + '</option>';
                        }
                      }
                    }
                    contract_sale_edit_html +=
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-12">'+
                '<div class = "form-group">'+
                  '<label for = "">备注</label>'+
                  '<textarea type = "text" class = "form-control contract_sales_remark" value = "' + contract_sales_remark + '" disabled="disabled">' + contract_sales_remark + '</textarea>'+
                '</div>'+
              '</div>'+
              '<div class = "col-md-12">'+
                '<label class = "margin15">采购合同附件</label>'+
                '<div class = "panel panel-default">'+
                  '<div class = "panel-body clearfix attch">';
                    if(0 < contract_sales_cluster_list.length) {
                      contract_sales_cluster_list = contract_sales_cluster_list.substring(0, contract_sales_cluster_list.length - 1).split(';');
                      for(var i=0;i<contract_sales_cluster_list.length;i++) {
                        var data = {
                          "cluster_name":contract_sales_cluster_list[i]
                        };
//                        var contract_sale_file_name=ajax_assistant(PROJECT_PATH+"lego/lego_storage?servletName=getFileByClusterName",data, false, true, false);//查询文件集群信息
//                        var contract_sales_json=JSON.parse(contract_sale_file_name.result);
//                        if(0 != contract_sale_file_name.count){
                          contract_sale_edit_html += 
                            '<div class = "pull-left file_name has-feedback contract_sale_ml15">'+
//                                '<img uuid = "'+contract_sales_json[0].cluster_name+'" src = "'+PROJECT_PATH+'upload/'+contract_sales_json[0].cluster_name+'.'+contract_sales_json[0].suffix+'" url = "'+PROJECT_PATH+'upload/'+contract_sales_json[0].cluster_name+'.'+contract_sales_json[0].suffix+'" width = "60" height = "60" class = "img-rounded">'+
                                '<img src = "a.png" uuid = "' + contract_sales_cluster_list[i] + '" width = "60" height = "60" class = "img-rounded">'+
                            '</div>';
//                        }
                      }
                    }
                    contract_sale_edit_html += 
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class = "modal-footer"  style = "text-align: center;">'+
              '<button type = "button" class = "btn btn-default" data-dismiss = "modal">关闭</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(contract_sale_edit_html);
  $("#contract_sales_info_modle_prop").modal("show");
  $("#contract_sales_info_modle_prop").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function contract_sale_open_info_func(obj) {
  var contract_sales_contract_code = obj.attr("contract_code");
  var contract_sales_html = '<tr class = "contract_sale_all_panel"><td colspan="11"><div class = "contract_sale_records_checkbox">收款记录</div><div class = "contract_sale_logistics_checkbox">物流合同</div><div class = "contract_sale_transport_checkbox">车船信息</div><div class = "contract_sale_pick_checkbox">提货委托函</div><div class = "contract_sale_confirm_checkbox">货物确认函</div><div class = "contract_sale_settlement_checkbox">销售结算函</div></td></tr>';
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
}

function contract_sale_data_screening_func(obj) {
  var contract_sale_idd = obj.attr("id");
  if (obj.prop("checked") == true) {
    $(".contract_sale_all_panel").find("." + contract_sale_idd).addClass("contract_sales_none");
  } else {
    $(".contract_sale_all_panel").find("." + contract_sale_idd).removeClass("contract_sales_none");
  }
}

function contract_sale_search_btn_func() {
  var contract_sale_search_input_val = $("#contract_sale_search_input").val();
  if ("" == contract_sale_search_input_val) {
    alert("合同号不能为空");
    return;
  }
  if (null == contract_sale_search_input_val.match(/^[A-Z]{2,}-[A-Z]{2,}-[0-9]{5,}$/)) {
    alert("请输入正确的合同号！");
    return;
  };
}

function contract_sale_search_fuzzy_btn_func() {
  var contract_sale_buyer=$("#contract_sale_buyer").val();
  var contract_sale_saller=$("#contract_sale_saller").val();
  var contract_sale_search_product_name_fuzzy=$("#contract_sale_search_product_name_fuzzy").val();
  var contract_sale_search_real_name_fuzzy=$("#contract_sale_search_real_name_fuzzy").val();
  var contract_sale_search_warehouse_uuid=$("#contract_sale_search_warehouse_uuid").val();
  var contract_sale_search_start_sign_datetime=$("#start_sign_datetime").val();
  var contract_sale_search_end_sign_datetime=$("#contract_sale_search_end_sign_datetime").val();
  var contract_sale_invoice=$("#contract_sale_invoice").val();
  if ("" != contract_sale_search_product_name_fuzzy) {
    if(null == contract_sale_search_product_name_fuzzy.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
      alert("请输入正确的产品名称！");
      return;
    }
  }
  if ("" != contract_sale_search_real_name_fuzzy) {
    if(null == contract_sale_search_real_name_fuzzy.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
      alert("请输入正确的标记！");
      return;
    }
  }
}

function contract_sale_enterprise_data_val() {
  var contract_sale_html = '<option value="">--请选择--</option>';
  if(isJsonObjectHasData(contract_sale_enterprise_data)) {
    for (var i = 0; i < contract_sale_enterprise_data.data.length; i++) {
      contract_sale_html += '<option value="' + contract_sale_enterprise_data.data[i].uuid + '">'+ contract_sale_enterprise_data.data[i].short_name +'</option>';
    }
  }
  $("#contract_sale_buyer,#contract_sale_saller").html(contract_sale_html);
}

function contract_sale_warehouse_data_val() {
  var contract_sale_html = '<option value="">--请选择--</option>';
  if(isJsonObjectHasData(contract_sale_warehouse)) {
    for (var i = 0; i < contract_sale_warehouse.data.length; i++) {
      contract_sale_html += '<option value = "' + contract_sale_warehouse.data[i].uuid + '">' + contract_sale_warehouse.data[i].name + '</option>';
    }
  }
  $("#contract_sale_search_warehouse_uuid").html(contract_sale_html);
}



