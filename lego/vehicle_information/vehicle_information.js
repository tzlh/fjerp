/**
 * @author wangdi
 */

/**
 * 车船信息数据

 */
var vehicle_information_data = {"data":[
    {"contract_code":"fj-xy-111111", "name":"鲁a22222", "approved_load":"12", "deliver_quantity":"1", "contact_name":"战三", "contact_number":"15977777777", "idcard_number":"215478954685215785", "uuid":"11111111111111111111111111111111"},
    {"contract_code":"fj-xy-111111", "name":"鲁a33333", "approved_load":"13", "deliver_quantity":"1", "contact_name":"李四", "contact_number":"15966666666", "idcard_number":"215478954685215785", "uuid":"11111111111111111111111111111112"},
    {"contract_code":"fj-xy-111111", "name":"鲁a44444", "approved_load":"14", "deliver_quantity":"1", "contact_name":"王五", "contact_number":"15999999999", "idcard_number":"215478954685215785", "uuid":"11111111111111111111111111111113"}
  ]
};

function vehicle_information_clear_raw_data(trade_contract_code_uuid) {
  $("#vehicle_information_content" + trade_contract_code_uuid).find(".vehicle_information_box").html('<tr><td colspan="8" align="center">没数据</td></tr>');
}

/**
 * 服务器数据
 */
function vehicle_information_server_data_cover(contract_code) {
  //获取车船信息
  var server_data = {
    "contract_code":contract_code
  };
  var vehicle_information_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getVehicleInformation";
  var vehicle_information_get_contract = ajax_assistant(vehicle_information_url, server_data, false, true, false);
  vehicle_information_data = {};
  if (1 == vehicle_information_get_contract.status) {
    if (0 == vehicle_information_get_contract.count) {
      vehicle_information_data = {};
    } else {
      var tmp_arr = new Array();
      var vehicle_information_result = JSON.parse(vehicle_information_get_contract.result);  
      console.log(vehicle_information_result);
      for (var i = 0; i < vehicle_information_result.length; i++) {
        tmp_arr[i] = {"contract_code":contract_code, "name":vehicle_information_result[i].name, "approved_load":vehicle_information_result[i].approved_load, "deliver_quantity":vehicle_information_result[i].deliver_quantity, "contact_name":vehicle_information_result[i].contact_name, "contact_number":vehicle_information_result[i].contact_number, "idcard_number":vehicle_information_result[i].idcard_number, "uuid":vehicle_information_result[i].uuid};
      }
      vehicle_information_data["data"] = tmp_arr;
    }
  } else {
    alert("车船信息数据获取失败");
  }
}

function vehicle_information_fill_variable_data(trade_contract_code_uuid) {
  if (isJsonObjectHasData(vehicle_information_data)) {
    var vehicle_information_html = "";
    for (var i = 0; i < vehicle_information_data.data.length; i++) {
      vehicle_information_html +=
        '<tr class = "vehicle_information_tr">'+
          '<td><button type = "button" class = "btn btn-info btn-xs vehicle_information_open_btn" contract_code = "' + vehicle_information_data.data[i].contract_code + '" uuid = "' + vehicle_information_data.data[i].uuid + '"><span class = "glyphicon glyphicon-chevron-up"></span></button></td>'+
          '<td>' + vehicle_information_data.data[i].name + '</td>'+
          '<td>' + vehicle_information_data.data[i].approved_load + '</td>'+
          '<td>' + vehicle_information_data.data[i].deliver_quantity + '</td>'+
          '<td>' + vehicle_information_data.data[i].contact_name + '</td>'+
          '<td>' + vehicle_information_data.data[i].contact_number + '</td>'+
          '<td>' + vehicle_information_data.data[i].idcard_number + '</td>'+
          '<td>'+
            '<span class = "glyphicon glyphicon-info-sign vehicle_information_ml15 vehicle_information_modle_info" uuid = "' + vehicle_information_data.data[i].uuid + '" contract_code = "' + vehicle_information_data.data[i].contract_code + '"  warehouse_uuid = "17c2655b819541978281eb40b4d969e4"></span>'+
            '<span class = "glyphicon glyphicon-pencil vehicle_information_ml15 vehicle_information_modle_pencil" uuid = "' + vehicle_information_data.data[i].uuid + '" contract_code = "' + vehicle_information_data.data[i].contract_code + '"  warehouse_uuid = "17c2655b819541978281eb40b4d969e4"></span>'+
            '<span class = "glyphicon glyphicon-remove vehicle_information_ml15 vehicle_information_modle_remove" uuid = "' + vehicle_information_data.data[i].uuid + '" contract_code = "' + vehicle_information_data.data[i].contract_code + '"  warehouse_uuid = "17c2655b819541978281eb40b4d969e4"></span>'+
          '</td>'+
        '</tr>';
    }
    //$("#vehicle_information_content" + trade_contract_code_uuid).find
    $("#vehicle_information_content" + trade_contract_code_uuid).find(".vehicle_information_box").html(vehicle_information_html);
  } else {
    //$("#vehicle_information_"+trade_contract_code).find(".vehicle_information_box")
    $("#vehicle_information_content" + trade_contract_code_uuid).find(".vehicle_information_box").html('<tr><td colspan="8" align="center">没数据</td></tr>');
  }
}

function vehicle_information_add_modle_func(obj) {
  var contract_code = obj.attr("contract_code");
  var contract_sales_contract_code_uuid = obj.attr("contract_sales_contract_code_uuid");
  var vehicle_information_html = 
    '<div class = "modal fade custom_modal" tabindex = "-1" id = "vehicle_information_add_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
      '<div class = "modal-dialog" role = "document">'+
        '<div class = "modal-content">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title">添加车船信息</h4>'+
          '</div>'+
          '<div class="modal-body">'+
            '<div class="row">'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">车船名</label>'+
                  '<input type="text" class="form-control vehicle_information_name" value=""/>'+
                '</div>'+
              '</div>'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">核载量</label>'+
                  '<div class=" input-group">'+
                    '<input type="text" class="form-control vehicle_information_approved_load" value=""/>'+
                    '<span class="input-group-addon">吨</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">提货数量</label>'+
                  '<div class=" input-group">'+
                    '<input type="text" class="form-control vehicle_information_deliver_quantity" value=""/>'+
                    '<span class="input-group-addon">吨</span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">联系人</label>'+
                  '<input type="text" class="form-control vehicle_information_contact_name" value=""/>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">联系方式</label>'+
                  '<input type="text" class="form-control vehicle_information_contact_number" value=""/>'+
                '</div>'+
              '</div>'+
              '<div class="col-md-6">'+
                '<div class="form-group">'+
                  '<label for="">身份证号码</label>'+
                  '<input type="text" class="form-control vehicle_information_idcard_number" value=""/>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="modal-footer" style="text-align: center;">'+
            '<button type="button" class="btn btn-primary" id="vehicle_information_add_data_btn" contract_code = "' + contract_code + '" contract_sales_contract_code_uuid = "' + contract_sales_contract_code_uuid + '">添加</button>'+
            '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(vehicle_information_html);
  $("#vehicle_information_add_modle_prop").modal("show");
  $("#vehicle_information_add_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function vehicle_information_add_data_func(obj) {
  var contract_code = obj.attr("contract_code");
//var vehicle_information_warehouse_uuid = obj.attr("warehouse_uuid");
  var contract_sales_contract_code_uuid = obj.attr("contract_sales_contract_code_uuid");
  var vehicle_information_name = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_name").val();
  var vehicle_information_approved_load = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_approved_load").val();
  var vehicle_information_deliver_quantity = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_deliver_quantity").val();
  var vehicle_information_contact_name = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_contact_name").val();
  var vehicle_information_contact_number = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_contact_number").val();
  var vehicle_information_idcard_number = obj.parents("#vehicle_information_add_modle_prop").find(".vehicle_information_idcard_number").val();
  /*验证*/
  if(null == vehicle_information_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
    alert("请输入正确的车船名！");
    return;
  };
  if(null == vehicle_information_approved_load.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){

    alert("请输入正确的核载量！");
    return;
  };
  if(null == vehicle_information_deliver_quantity.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){

    alert("请输入正确的提货数量！");
    return;
  };
  if(null == vehicle_information_contact_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
    alert("请输入正确的联系人名称！");
    return;
  };
  if(null == vehicle_information_contact_number.match(/^[0-9]{6,15}$/)){
    alert("请输入正确的联系方式！");
    return;
  };
  if(null == vehicle_information_idcard_number.match(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)){
    alert("请输入正确的身份证号码！");
    return;
  };
  var data = {
    "contract_code":contract_code,
    "name":vehicle_information_name,
    "approved_load":vehicle_information_approved_load,
    "deliver_quantity":vehicle_information_deliver_quantity,
    "contact_name":vehicle_information_contact_name,
    "contact_number":vehicle_information_contact_number,
    "idcard_number":vehicle_information_idcard_number
  };
  //调用接口
  var vehicle_information_add_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=addVehicleInformation";
  var vehicle_information_add_get = ajax_assistant(vehicle_information_add_url, data, false, true, false);
  if ("1" == vehicle_information_add_get.status) {
    vehicle_information_clear_raw_data(contract_sales_contract_code_uuid);
    vehicle_information_server_data_cover(contract_code);
    vehicle_information_fill_variable_data(contract_sales_contract_code_uuid); 
    $("#vehicle_information_add_modle_prop").modal("hide");
    $("#vehicle_information_add_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  } else {
    alert("添加车船信息失败");
  }
}

function vehicle_information_edit_modle_func(obj) {
  var uuid = obj.attr("uuid");
//var vehicle_information_warehouse_uuid = obj.attr("warehouse_uuid");
  var contract_sales_contract_code_uuid = obj.parent().parent().parent().parent().attr("vehicle_information_table_sales_trad_uuid");
  var contract_code = obj.attr("contract_code");
  var vehicle_information_name = "";
  var vehicle_information_approved_load = "";
  var vehicle_information_deliver_quantity = "";
  var vehicle_information_contact_name = "";
  var vehicle_information_contact_number = "";
  var vehicle_information_idcard_number = "";
  var vehicle_information_edit_data = {
    "uuid":uuid
  };
  //调接口  查询数据
  var vehicle_information_edit_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getVehicleInformation";
  var vehicle_information_edit_get_warehouse = ajax_assistant(vehicle_information_edit_url, vehicle_information_edit_data, false, true, false);
  if ("1" == vehicle_information_edit_get_warehouse.status) {
    var vehicle_information_edit_data_d = JSON.parse(vehicle_information_edit_get_warehouse.result);
    console.log(vehicle_information_edit_data_d);
    if (0 < vehicle_information_edit_data_d.length) {
      vehicle_information_name = vehicle_information_edit_data_d[0].name;
      vehicle_information_approved_load = vehicle_information_edit_data_d[0].approved_load;
      vehicle_information_deliver_quantity = vehicle_information_edit_data_d[0].deliver_quantity;
      vehicle_information_contact_name = vehicle_information_edit_data_d[0].contact_name;
      vehicle_information_contact_number = vehicle_information_edit_data_d[0].contact_number;
      vehicle_information_idcard_number = vehicle_information_edit_data_d[0].idcard_number;
    } else {
      alert("没数据");
    }
  } else {
    alert("查询数据失败");
  }
  var vehicle_information_edit_html = 
    '<div class = "modal fade custom_modal" tabindex = "-1" id = "vehicle_information_edit_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
        '<div class = "modal-dialog" role = "document">'+
          '<div class = "modal-content">'+
            '<div class = "modal-header bg-primary">'+
              '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
              '<h4 class = "modal-title">修改车船信息</h4>'+
            '</div>'+
            '<div class = "modal-body">'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">车船名</label>'+
                    '<input type = "text" class = "form-control vehicle_information_name" value = "' + vehicle_information_name + '"/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">核载量</label>'+
                    '<div class = " input-group">'+
                      '<input type = "text" class = "form-control vehicle_information_approved_load" value = "' + vehicle_information_approved_load + '"/>'+
                      '<span class = "input-group-addon">吨</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">提货数量</label>'+
                    '<div class = " input-group">'+
                      '<input type = "text" class = "form-control vehicle_information_deliver_quantity" value = "' + vehicle_information_deliver_quantity + '"/>'+
                      '<span class = "input-group-addon">吨</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">联系人</label>'+
                    '<input type = "text" class = "form-control vehicle_information_contact_name" value = "' + vehicle_information_contact_name + '"/>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">联系方式</label>'+
                    '<input type = "text" class = "form-control vehicle_information_contact_number" value = "' + vehicle_information_contact_number + '"/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">身份证号码</label>'+
                    '<input type = "text" class = "form-control vehicle_information_idcard_number" value = "' + vehicle_information_idcard_number + '"/>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class = "modal-footer" style = "text-align: center;">'+
              '<button type = "button" class = "btn btn-warning" id = "vehicle_information_edit_data_btn" contract_code = "' + contract_code + '" uuid = "' + uuid + '" contract_sales_contract_code_uuid = "' + contract_sales_contract_code_uuid + '">修改</button>'+
              '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
  $("body").append(vehicle_information_edit_html);
  $("#vehicle_information_edit_modle_prop").modal("show");
  $("#vehicle_information_edit_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function vehicle_information_edit_data_func(obj) {
  var uuid = obj.attr("uuid");
//var vehicle_information_warehouse_uuid = obj.attr("warehouse_uuid");
  var contract_sales_contract_code_uuid = obj.attr("contract_sales_contract_code_uuid");
  var contract_code = obj.attr("contract_code");
  var vehicle_information_name = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_name").val();
  var vehicle_information_approved_load = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_approved_load").val();
  var vehicle_information_deliver_quantity = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_deliver_quantity").val();
  var vehicle_information_contact_name = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_contact_name").val();
  var vehicle_information_contact_number = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_contact_number").val();
  var vehicle_information_idcard_number = obj.parents("#vehicle_information_edit_modle_prop").find(".vehicle_information_idcard_number").val();
  /*验证*/
  if (null == vehicle_information_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
    alert("请输入正确的车船名！");
    return;
  }
  if (null == vehicle_information_approved_load.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
    alert("请输入正确的核载量！");
    return;
  }
  if(null == vehicle_information_deliver_quantity.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
    alert("请输入正确的提货数量！");
    return;
  }
  if (null == vehicle_information_contact_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)) {
    alert("请输入正确的联系人名称！");
    return;
  }
  if (null == vehicle_information_contact_number.match(/^[0-9]{6,15}$/)) {
    alert("请输入正确的联系方式！");
    return;
  }
  if (null == vehicle_information_idcard_number.match(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)) {
    alert("请输入正确的身份证号码！");
    return;
  }
  var data={
    "uuid":uuid,
    "contract_code":contract_code,
    "name":vehicle_information_name,
    "approved_load":vehicle_information_approved_load,
    "deliver_quantity":vehicle_information_deliver_quantity,
    "contact_name":vehicle_information_contact_name,
    "contact_number":vehicle_information_contact_number,
    "idcard_number":vehicle_information_idcard_number
  };
  //调数据库
  var vehicle_information_edit_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyVehicleInformation";
  var vehicle_information_edit_data_get = ajax_assistant(vehicle_information_edit_data_url, data, false, true, false);
  if ("1" == vehicle_information_edit_data_get.status){
    vehicle_information_clear_raw_data(contract_sales_contract_code_uuid);
    vehicle_information_server_data_cover(contract_code);
    vehicle_information_fill_variable_data(contract_sales_contract_code_uuid);
    $("#vehicle_information_edit_modle_prop").modal("hide");
    $("#vehicle_information_edit_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  } else {
    alert("修改失败");
  }   
}

function vehicle_information_delete_modle_func(obj) {
  var uuid = obj.attr("uuid");
  var contract_code = obj.attr("contract_code");
  var contract_sales_contract_code_uuid = obj.parent().parent().parent().parent().attr("vehicle_information_table_sales_trad_uuid");
  var vehicle_information_delete_html = 
      '<div class = "modal fade custom_modal" id = "vehicle_information_delete_modle_prop" tabindex = "-1" role = "dialog">'+
        '<div class = "modal-dialog modal-sm" role = "document">'+
          '<div class = "modal-content">'+
            '<div class = "modal-header bg-primary">'+
              '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
              '<h4 class = "modal-title">删除车船信息确认</h4>'+
            '</div>'+
            '<div class = "modal-body nopadding-bottom vehicle_information_center">确认要删除吗？</div>'+
            '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
            '<button type = "button" class = "btn btn-danger" id = "vehicle_information_delete_modle_prop_btn" contract_code = "' + contract_code + '" uuid = "' + uuid + '" contract_sales_contract_code_uuid = "' + contract_sales_contract_code_uuid + '">删除</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
    '</div>';
  $("body").append(vehicle_information_delete_html);
  $("#vehicle_information_delete_modle_prop").modal("show");
  $("#vehicle_information_delete_modle_prop").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function vehicle_information_delete_data_func(obj) {
  var uuid = obj.attr("uuid");
  var contract_code = obj.attr("contract_code");
  var contract_sales_contract_code_uuid = obj.attr("contract_sales_contract_code_uuid");
  var data = {
    "uuid":uuid,
    "contract_code":contract_code
  };
  //接口数据
  var vehicle_information_delete_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeVehicleInformation";
  var vehicle_information_delete_data_get = ajax_assistant(vehicle_information_delete_data_url, data, false, true, false);
  if ("1" != vehicle_information_delete_data_get.status){
    alert("删除车船信息失败");
  } else {  
    // 更新页面数据
    vehicle_information_clear_raw_data(contract_sales_contract_code_uuid);
    vehicle_information_server_data_cover(contract_code);
    vehicle_information_fill_variable_data(contract_sales_contract_code_uuid);
    $("#vehicle_information_delete_modle_prop").modal("hide");
    $("#vehicle_information_delete_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  }
}

function vehicle_information_info_modle_func(obj) {
  var uuid = obj.attr("uuid");
//var vehicle_information_warehouse_uuid = obj.attr("warehouse_uuid");
  var contract_code = obj.attr("contract_code");
  var vehicle_information_name = "";
  var vehicle_information_approved_load = "";
  var vehicle_information_deliver_quantity = "";
  var vehicle_information_contact_name = "";
  var vehicle_information_contact_number = "";
  var vehicle_information_idcard_number = "";
  //调接口  查询数据
  var vehicle_information_edit_data = {
    "uuid":uuid
  };
  //调接口  查询数据
  var vehicle_information_edit_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getVehicleInformation";
  var vehicle_information_edit_get_warehouse = ajax_assistant(vehicle_information_edit_url, vehicle_information_edit_data, false, true, false);
  if ("1" == vehicle_information_edit_get_warehouse.status) {
    var vehicle_information_edit_data_d = JSON.parse(vehicle_information_edit_get_warehouse.result);
    console.log(vehicle_information_edit_data_d);
    if (0 < vehicle_information_edit_data_d.length) {
      vehicle_information_name = vehicle_information_edit_data_d[0].name;
      vehicle_information_approved_load = vehicle_information_edit_data_d[0].approved_load;
      vehicle_information_deliver_quantity = vehicle_information_edit_data_d[0].deliver_quantity;
      vehicle_information_contact_name = vehicle_information_edit_data_d[0].contact_name;
      vehicle_information_contact_number = vehicle_information_edit_data_d[0].contact_number;
      vehicle_information_idcard_number = vehicle_information_edit_data_d[0].idcard_number;
    } else {
      alert("没数据");
    }
  } else {
    alert("查询数据失败");
  }
  var vehicle_information_edit_html = 
    '<div class = "modal fade custom_modal" tabindex = "-1" id = "vehicle_information_info_modle_prop" role = "dialog" aria-labelledby = "myLargeModalLabel">'+
        '<div class = "modal-dialog" role = "document">'+
          '<div class = "modal-content">'+
            '<div class = "modal-header bg-primary">'+
              '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
              '<h4 class = "modal-title">车船信息详情</h4>'+
            '</div>'+
            '<div class = "modal-body">'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">车船名</label>'+
                    '<input type = "text" class = "form-control vehicle_information_name" value = "' + vehicle_information_name + '" disabled = "disabled"/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">核载量</label>'+
                    '<div class = " input-group">'+
                      '<input type = "text" class = "form-control vehicle_information_approved_load" value = "' + vehicle_information_approved_load + '" disabled = "disabled"/>'+
                      '<span class = "input-group-addon">吨</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">提货数量</label>'+
                    '<div class = " input-group">'+
                      '<input type = "text" class = "form-control vehicle_information_deliver_quantity" value = "' + vehicle_information_deliver_quantity + '" disabled = "disabled"/>'+
                      '<span class = "input-group-addon">吨</span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">联系人</label>'+
                    '<input type = "text" class = "form-control vehicle_information_contact_name" value = "' + vehicle_information_contact_name + '" disabled = "disabled"/>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class = "row">'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">联系方式</label>'+
                    '<input type = "text" class = "form-control vehicle_information_contact_number" value = "' + vehicle_information_contact_number + '" disabled = "disabled"/>'+
                  '</div>'+
                '</div>'+
                '<div class = "col-md-6">'+
                  '<div class = "form-group">'+
                    '<label for = "">身份证号码</label>'+
                    '<input type = "text" class = "form-control vehicle_information_idcard_number" value = "' + vehicle_information_idcard_number + '" disabled = "disabled"/>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class = "modal-footer" style = "text-align: center;">'+
              '<button type = "button" class = "btn btn-default" data-dismiss = "modal">关闭</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
  $("body").append(vehicle_information_edit_html);
  $("#vehicle_information_info_modle_prop").modal("show");
  $("#vehicle_information_info_modle_prop").on("hidden.bs.modal", function(e) {
    $(this).remove();
  });
}

function vehicle_information_open_info_func(obj) {
  var vehicle_information_contract_code = obj.attr("contract_code");
  var vehicle_information_html = '<tr class = "vehicle_information_all_panel"><td colspan="8"><div>aaaaaaaaa</div></td></tr>';
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
}

/**
 * 输出top_nav
 * @param output_id 输出内容id
 */
function vehicle_information_output(output_id) {
  var content = 
    '  <div class = "panel panel-primary ">'+
    '    <div class = "panel-heading clearfix">车船信息<span class = "glyphicon glyphicon-plus pull-right" id = "vehicle_information_add_modle"></span></div>'+
    '    <div class = "panel-body">'+
    '        <div class = "row">'+
    '          <div class = "col-lg-12">'+
    '            <table cellpadding = "0" cellspacing = "0" border = "0" width = "100%" class = "table" id = "vehicle_information_table_sales_trad_uuid">'+
    '              <thead>'+
    '                <tr>'+
    '                  <th>展开详情</th>'+
    '                  <th>车船名</th>'+
    '                  <th>核载量（吨）</th>'+
    '                  <th>提货数量（吨）</th>'+
    '                  <th>联系人</th>'+
    '                  <th>联系方式</th>'+
    '                  <th>身份证号码</th>'+
    '                  <th>&nbsp;</th>'+
    '                </tr>'+
    '              </thead>'+
    '              <tbody class = "vehicle_information_box">'+
    '                <tr>'+
    '                  <td><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-up"></span></button></td>'+
    '                  <td>鲁a11111</td>'+
    '                  <td>300</td>'+
    '                  <td>200</td>'+
    '                  <td>张三</td>'+
    '                  <td>15911111111</td>'+
    '                  <td>3701245789654521547</td>'+
    '                  <td>'+
    '                    <span class = "glyphicon glyphicon-info-sign vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-pencil vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-remove vehicle_information_ml15"></span>'+
    '                  </td>'+
    '                </tr>'+
    '                <tr>'+
    '                  <td><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-up"></span></button></td>'+
    '                  <td>鲁a11111</td>'+
    '                  <td>300</td>'+
    '                  <td>200</td>'+
    '                  <td>张三</td>'+
    '                  <td>15911111111</td>'+
    '                  <td>3701245789654521547</td>'+
    '                  <td>'+
    '                    <span class = "glyphicon glyphicon-info-sign vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-pencil vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-remove vehicle_information_ml15"></span>'+
    '                  </td>'+
    '                </tr>'+
    '                <tr>'+
    '                  <td><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-up"></span></button></td>'+
    '                  <td>鲁a11111</td>'+
    '                  <td>300</td>'+
    '                  <td>200</td>'+
    '                  <td>张三</td>'+
    '                  <td>15911111111</td>'+
    '                  <td>3701245789654521547</td>'+
    '                  <td>'+
    '                    <span class = "glyphicon glyphicon-info-sign vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-pencil vehicle_information_ml15"></span>'+
    '                    <span class = "glyphicon glyphicon-remove vehicle_information_ml15"></span>'+
    '                  </td>'+
    '                </tr>'+
    '              </tbody>'+
    '            </table>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '    </div>';
    $(output_id).html(content);
}