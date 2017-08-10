var project_path = "http://192.168.1.131:8080/lego/";
//企业
var enterprise_data={"data":[
  {"short_name":"腾智联合", "uuid":"77777777777777777777777777777771"},
  {"short_name":"腾智联", "uuid":"77777777777777777777777777777772"},
  {"short_name":"腾智", "uuid":"77777777777777777777777777777773"},
  {"short_name":"腾智联合有限公司", "uuid":"77777777777777777777777777777774"},
  {"short_name":"金莲", "uuid":"77777777777777777777777777777775"},
  {"short_name":"云谷", "uuid":"77777777777777777777777777777776"}]  
};
//储罐租赁合同
/*
 *contract_code:合同编号
 *lessor_uuid：出租方
 *leaser_uuid：承租方
 * */
var contract_warehouse_data = {"data":[
  {"contract_code":"ZS-FJ-17731363", "lessor_uuid":"77777777777777777777777777777771", "leaser_uuid":"77777777777777777777777777777772", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00000", "culster_list":"123;456"},
  {"contract_code":"AV-YS-111", "lessor_uuid":"77777777777777777777777777777773", "leaser_uuid":"77777777777777777777777777777774", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00001", "culster_list":"123;456"},
  {"contract_code":"FG-FG-1021", "lessor_uuid":"77777777777777777777777777777775", "leaser_uuid":"77777777777777777777777777777776", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00002", "culster_list":"123;456"},
  {"contract_code":"TY-NH-122", "lessor_uuid":"77777777777777777777777777777771", "leaser_uuid":"77777777777777777777777777777772", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00003", "culster_list":"123;456"},
  {"contract_code":"KL-IO-1110", "lessor_uuid":"77777777777777777777777777777772", "leaser_uuid":"77777777777777777777777777777771", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00004", "culster_list":"123;456"},
  {"contract_code":"XC-EC-10", "lessor_uuid":"77777777777777777777777777777773", "leaser_uuid":"77777777777777777777777777777774", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00005", "culster_list":"123;456"},
  {"contract_code":"FT-UH-1", "lessor_uuid":"77777777777777777777777777777775", "leaser_uuid":"77777777777777777777777777777773", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00006", "culster_list":"123;456"},
]
};

function clear_raw_data() {
  $("#contract_warehouse_pages").html("");
  $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
}
//服务器数据
function new_server_data_fill() {
  contract_warehouse_data = {};
  enterprise_data = {};
  //获取储罐合同
  var contract_warehouse_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, "", false, true, false);
  //获取企业
  var contract_warehouse_enterprise_url = project_path + "lego/lego_crm?servletName=getEnterpriseInformation";
  var warehouse_pot_get_contract_enterprise = ajax_assistant(contract_warehouse_enterprise_url, "", false, true, false);
  
  if (1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      contract_warehouse_data = {};
    }
    var tmp_arr = new Array();
    var result = JSON.parse(warehouse_pot_get_contract.result);  
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      tmp_arr[i] = {"contract_code":result[i].contract_code, "lessor_uuid":result[i].lessor_uuid, "leaser_uuid":result[i].leaser_uuid, "start_datetime":result[i].start_datetime, "end_datetime":result[i].end_datetime, "uuid":result[i].uuid};
    }
    contract_warehouse_data["data"] = tmp_arr;
  } else {
    alert("储罐合同数据获取失败");
  }
//企业
if (1 == warehouse_pot_get_contract_enterprise.status) {
    if (0 == warehouse_pot_get_contract_enterprise.count) {
      enterprise_data = {};
    }
    var tmp_arr_pot = new Array();
    var result_enterprise = JSON.parse(warehouse_pot_get_contract_enterprise.result);  
   console.log(result_enterprise);
    for (var i = 0; i < result_enterprise.length; i++) {
      // name id uuid
      tmp_arr_pot[i] = {"short_name":result_enterprise[i].short_name, "uuid":result_enterprise[i].uuid};
    }
    enterprise_data["data"] = tmp_arr_pot;
} else {
    alert("企业信息数据获取失败");
}
}

/////////////////////////////////////////////////
//分页
var rows = 2;
var current_page = 0;//当前页
function pages(getEnterpriseInfoParam,offset) {  
  var totalRows = 0;
  var contract_warehouse_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, getEnterpriseInfoParam, false, true, false);
   
  if (1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    }
    var tmp_arr = new Array();
    var result = JSON.parse(warehouse_pot_get_contract.result);  
    
    for (var i = 0; i < result.length; i++) {
      tmp_arr[i] = {"contract_code":result[i].contract_code, "lessor_uuid":result[i].lessor_uuid, "leaser_uuid":result[i].leaser_uuid, "start_datetime":result[i].start_datetime, "end_datetime":result[i].end_datetime, "uuid":result[i].uuid};
    }
    contract_warehouse_data["data"] = tmp_arr;
  } else {
    alert("储罐合同数据获取失败");
  }
  totalRows = contract_warehouse_data.data.length;
  console.log(totalRows);
  generatePageCtrl("#contract_warehouse_pages",offset,rows,6,totalRows);
}

//$(document).ready(function(){
//pages({}, current_page);
//warehouse_pot_get_contract_fun({"rows":rows,"offset":current_page});
//fill_variable_data()
//})
//pages({"rows":rows,"offset":current_page}, current_page);



function fill_variable_data() {
  //查询储罐合同
  if(isJsonObjectHasData(contract_warehouse_data)) {
    var contract_warehouse_html = "";
    for(var i = 0; i < contract_warehouse_data.data.length; i++) {
      var lessor_uuid = "";
      var leaser_uuid = "";
      for(var j = 0; j < enterprise_data.data.length; j++) {
        //出租方
        if(enterprise_data.data[j].uuid == contract_warehouse_data.data[i].lessor_uuid){
          lessor_uuid = enterprise_data.data[j].short_name;
        }
        //承租方
        if(enterprise_data.data[j].uuid == contract_warehouse_data.data[i].leaser_uuid){
          leaser_uuid = enterprise_data.data[j].short_name;
        }
      }
      var contract_warehouse_start_datetime = contract_warehouse_data.data[i].start_datetime;
      var contract_warehouse_end_datetime = contract_warehouse_data.data[i].end_datetime;
          contract_warehouse_start_datetime = contract_warehouse_start_datetime.substring(0, contract_warehouse_start_datetime.indexOf(' '));
          contract_warehouse_end_datetime = contract_warehouse_end_datetime.substring(0, contract_warehouse_end_datetime.indexOf(' '));
          contract_warehouse_html+='<tr>'+
                                    '<td>'+ contract_warehouse_data.data[i].contract_code +'</td>'+
                                    '<td>'+ lessor_uuid +'</td>'+
                                    '<td>'+ leaser_uuid +'</td>'+
                                    '<td>'+ contract_warehouse_start_datetime +'</td>'+
                                    '<td>'+ contract_warehouse_end_datetime +'</td>'+
                                    '<td>'+
                                      '<span class="glyphicon glyphicon-info-sign contract_warehouse_ml15 contract_warehouse_info" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                      '<span class="glyphicon glyphicon-pencil contract_warehouse_ml15 contract_warehouse_pencil" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                      '<span class="glyphicon glyphicon-remove contract_warehouse_ml15 contract_warehouse_remove" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                    '</td>'+
                                  '</tr>';
    }
    $("#contract_warehouse_box").html(contract_warehouse_html);
  } else {
    $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
  }
}

function contract_warehouse_add_modle() {
  var contract_warehouse_add_modle='<div class="modal fade custom_modal" tabindex="-1" id = "contract_warehouse_add_modle" role="dialog" aria-labelledby="myModalLabel">'+
                                    '<div class="modal-dialog" role="document">'+
                                      '<div class="modal-content">'+
                                        '<div class="modal-header bg-primary">'+
                                          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                            '<h4 class="modal-title" id="myModalLabel">添加储罐租赁合同</h4>'+
                                          '</div>'+
                                          '<div class="modal-body nopadding-bottom">'+
                                          '<div class="row">'+
                                            '<div class="col-lg-6">'+
                                              '<label for="basic-url">出租方</label>'+
                                              '<select class="form-control contract_warehouse_lessor_uuid" value="">'+
                                                '<option value="">--请选择--</option>';
                                                for(var i = 0; i < enterprise_data.data.length; i++) {
                                                  contract_warehouse_add_modle += '<option value="' + enterprise_data.data[i].uuid + '">'+ enterprise_data.data[i].short_name +'</option>';
                                                }
                contract_warehouse_add_modle+='</select>'+
                                            '</div>'+
                                            '<div class="col-lg-6">'+
                                              '<label for="basic-url">承租方</label>'+
                                              '<select class="form-control contract_warehouse_leaser_uuid" value="">'+
                                                '<option value="">--请选择--</option>';
                                                for(var i = 0; i < enterprise_data.data.length; i++) {
                                                    contract_warehouse_add_modle += '<option value="' + enterprise_data.data[i].uuid + '">'+ enterprise_data.data[i].short_name +'</option>';
                                                }
                contract_warehouse_add_modle += '</select>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class="row contract_warehouse_mt20">'+
                                            '<div class="col-lg-6 ">'+
                                              '<div class="form-group has-feedback">'+
                                                '<label>租赁开始时间</label>'+
                                              '<input type="text" class="form-control widget_datepicker contract_warehouse_start_datetime">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="col-lg-6">'+
                                              '<div class="form-group has-feedback">'+
                                                '<label>租赁结束时间</label>'+
                                              '<input type="text" class="form-control widget_datepicker contract_warehouse_end_datetime">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class="row">'+
                                            '<div class="col-lg-12">'+
                                              '<label for="basic-url">储罐租赁合同附件</label>'+
                                              '<div class="panel panel-default">'+
                                                '<div class="panel-body clearfix attch">'+
                                                  '<div class="pull-left has-feedback">'+
                                                    '<button class="btn bg-default">'+
                                                      '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                                                    '</button>'+
                                                  '<input class="positionfile file_style" type="file"  value="" />'+
                                                  '</div>'+
                                                '</div>'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="modal-footer" style="text-align: center;">'+
                                          '<button type="button" class="btn btn-primary" id = "contract_warehouse_add_btn">添加</button>'+
                                          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>';
    $("body").append(contract_warehouse_add_modle);
    $("#contract_warehouse_add_modle").modal("show");
    $("#contract_warehouse_add_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });      
}

function contract_warehouse_add_data(obj) {
  //出租
  var contract_warehouse_lessor_uuid = obj.parents("#contract_warehouse_add_modle").find(".contract_warehouse_lessor_uuid").val();
  //承租
  var contract_warehouse_leaser_uuid = obj.parents("#contract_warehouse_add_modle").find(".contract_warehouse_leaser_uuid").val();
  var contract_warehouse_start_datetime = obj.parents("#contract_warehouse_add_modle").find(".contract_warehouse_start_datetime").val();
  var contract_warehouse_end_datetime = obj.parents("#contract_warehouse_add_modle").find(".contract_warehouse_end_datetime").val();
  var contract_warehouse_cluster_list = "";
      for(var i = 0;i < obj.parents("#contract_warehouse_add_modle").find(".file_name").length; i++){
        contract_warehouse_cluster_list += obj.parents("#contract_warehouse_add_modle").find(".file_name").eq(i).find("img").attr('uuid')+';';
      }
      if("" != contract_warehouse_start_datetime) {
        contract_warehouse_start_datetime += " 00:00:00";
      }
      if("" != contract_warehouse_end_datetime) {
        contract_warehouse_end_datetime += " 00:00:00";
      }
      //验证
      if(null == contract_warehouse_leaser_uuid.match(/^[0-9a-zA-Z]{32}$/)){
        alert("请选择承租方！");
        return;
      };
      if(null == contract_warehouse_lessor_uuid.match(/^[0-9a-zA-Z]{32}$/)){
        alert("请选择出租方！");
        return;
      };
      if(null == contract_warehouse_start_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
        alert("请选择租赁开始时间！");
        return;
      };
      if(null == contract_warehouse_end_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
        alert("请选择租赁结束时间！");
        return;
      };
      if(null == contract_warehouse_cluster_list.match(/^([0-9a-zA-Z]{32};)+$/)){
        alert("请选择储罐租赁合同附件！");
        return;
      };
  var contract_warehouse_add = {
    "cluster_list":contract_warehouse_cluster_list,
    "leaser_uuid":contract_warehouse_leaser_uuid,
    "lessor_uuid":contract_warehouse_lessor_uuid,
    "start_datetime":contract_warehouse_start_datetime,
    "end_datetime":contract_warehouse_end_datetime
  };
  //钓接口
  var contract_warehouse_add_url = project_path + "lego/lego_fjTrade?servletName=addContractWarehousePot";
  var contract_warehouse_add_get_warehouse = ajax_assistant(contract_warehouse_add_url, contract_warehouse_add, false, true, false);
  if(1 == contract_warehouse_add_get_warehouse.status) {
    clear_raw_data();
    new_server_data_fill();
    fill_variable_data(); 
    $("#contract_warehouse_add_modle").modal("hide");
    $("#contract_warehouse_add_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  } else {
    alert("添加储罐合同失败");
  }
}

function contract_warehouse_edit_modle(obj) {
  var uuid = obj.attr("uuid");
  //出租    
  var ontract_warehouse_lessor_uuid = "";
  //承租
  var contract_warehouse_leaser_uuid = "";
  var contract_warehouse_start_datetime = "";
  var contract_warehouse_end_datetime = "";
  var contract_warehouse_culster_list = "";
  var data = {
    "uuid":uuid
  };
  var contract_warehouse_edit_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var contract_warehouse_edit_get_warehouse = ajax_assistant(contract_warehouse_edit_url, data, false, true, false);

      if(1 == contract_warehouse_edit_get_warehouse.status){
        var reslut_json = JSON.parse(contract_warehouse_edit_get_warehouse.result);
        
        if(0 < reslut_json.length){
          ontract_warehouse_lessor_uuid = reslut_json[0].lessor_uuid;
          contract_warehouse_leaser_uuid = reslut_json[0].leaser_uuid;
          contract_warehouse_start_datetime = reslut_json[0].start_datetime;
          contract_warehouse_end_datetime = reslut_json[0].end_datetime;
          contract_warehouse_culster_list = reslut_json[0].normal_cluster_list;
        }
      }
      contract_warehouse_start_datetime = contract_warehouse_start_datetime.substring(0, contract_warehouse_start_datetime.indexOf(' '));
      contract_warehouse_end_datetime = contract_warehouse_end_datetime.substring(0, contract_warehouse_end_datetime.indexOf(' '));
  
  var contract_warehouse_edit_html = '<div class="modal fade custom_modal" tabindex="-1" role="dialog" id="contract_warehouse_edit_modle" aria-labelledby="myModalLabel">'+
                                      '<div class="modal-dialog" role="document">'+
                                        '<div class="modal-content">'+
                                          '<div class="modal-header bg-primary">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                              '<h4 class="modal-title" id="myModalLabel">修改储罐租赁合同</h4>'+
                                          '</div>'+
                                          '<div class="modal-body nopadding-bottom">'+
                                            '<div class="row">'+
                                              '<div class="col-lg-6">'+
                                                '<label for="basic-url">出租方</label>'+
                                                '<select class="form-control contract_warehouse_lessor_uuid" value="' + ontract_warehouse_lessor_uuid + '"  disabled="disabled">';
                                                  for(var i = 0; i < enterprise_data.data.length; i++) {
                                                    if(ontract_warehouse_lessor_uuid == enterprise_data.data[i].uuid){
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '" selected = "selected">'+ enterprise_data.data[i].short_name +'</option>';
                                                    } else {
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '">'+ enterprise_data.data[i].short_name +'</option>';
                                                    }
                                                        
                                                  }
                contract_warehouse_edit_html += '</select>'+
                                              '</div>'+
                                              '<div class="col-lg-6">'+
                                                '<label for="basic-url">承租方</label>'+
                                                '<select class="form-control contract_warehouse_leaser_uuid" value="' + contract_warehouse_leaser_uuid + '" disabled="disabled">';
                                                  for(var i = 0; i < enterprise_data.data.length; i++) {
                                                    if(contract_warehouse_leaser_uuid == enterprise_data.data[i].uuid){
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '" selected = "selected">'+ enterprise_data.data[i].short_name +'</option>';
                                                    } else {
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '">'+ enterprise_data.data[i].short_name +'</option>';
                                                    }
                                                        
                                                  }
                                                  
                contract_warehouse_edit_html +='</select>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="row contract_warehouse_mt20">'+
                                              '<div class="col-lg-6 ">'+
                                                '<div class="form-group has-feedback">'+
                                                  '<label>租赁开始时间</label>'+
                                                '<input type="text" class="form-control widget_datepicker contract_warehouse_start_datetime" value="'+contract_warehouse_start_datetime+'">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                              '</div>'+
                                              '<div class="col-lg-6">'+
                                                '<div class="form-group has-feedback">'+
                                                  '<label>租赁结束时间</label>'+
                                                '<input type="text" class="form-control widget_datepicker contract_warehouse_end_datetime" value="'+contract_warehouse_end_datetime+'">'+
                                  
                                                  '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="row contract_warehouse_mt20">'+
                                              '<div class="col-lg-12">'+
                                                '<label for="basic-url">储罐租赁合同附件</label>'+
                                              '<div class="panel panel-default">'+
                                                  '<div class="panel-body clearfix attch">'+
                                                    '<div class="pull-left has-feedback">'+
                                                      '<button class="btn bg-default">'+
                                                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                                                      '</button>'+
                                                    '<input class="positionfile file_style" type="file"  value="" />'+
                                                    '</div>';
                                                    if(0 < contract_warehouse_culster_list.length){
                                                      contract_warehouse_culster_list = contract_warehouse_culster_list.substring(0, contract_warehouse_culster_list.length - 1).split(';');
                                                      console.log(contract_warehouse_culster_list);
                                                      for(var i=0;i<contract_warehouse_culster_list.length;i++){
                                                        var data={
                                                          "cluster_name":contract_warehouse_culster_list[i]
                                                        };

                                                        var contract_warehouse_file_name=ajax_assistant(project_path+"lego/lego_storage?servletName=getFileByClusterName",data, false, true, false);//查询文件集群信息
                                                        var contract_warehouse_json=JSON.parse(contract_warehouse_file_name.result);
                          contract_warehouse_edit_html += '<div class=" pull-left file_name has-feedback contract_warehouse_ml15">'+
                                                            '<img uuid="'+contract_warehouse_json[0].cluster_name+'" src="'+project_path+'upload/'+contract_warehouse_json[0].cluster_name+'.'+contract_warehouse_json[0].suffix+'" url="'+project_path+'upload/'+contract_warehouse_json[0].cluster_name+'.'+contract_warehouse_json[0].suffix+'"  width="60" height="60" class="img-rounded">'+
                                                            '<button class="btn btn-danger text-center delet_file_btn">'+
                                                              '<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
                                                            '</button>'+
                                                        '</div>';
                                                      }
                                                    }
                    contract_warehouse_edit_html += '</div>'+
                                              '</div>'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class="modal-footer" style="text-align: center;">'+
                                              '<button type="button" class="btn btn-warning" id="contract_warehouse_edit_modle_btn" uuid="'+uuid+'">修改</button>'+
                                              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>';
    $("body").append(contract_warehouse_edit_html);
    $("#contract_warehouse_edit_modle").modal("show");
    $("#contract_warehouse_edit_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
}

function contract_warehouse_edit_data(obj) {
  var uuid = obj.attr("uuid");
  //出租
  var contract_warehouse_lessor_uuid = obj.parents("#contract_warehouse_edit_modle").find(".contract_warehouse_lessor_uuid").val();
  //承租
  var contract_warehouse_leaser_uuid = obj.parents("#contract_warehouse_edit_modle").find(".contract_warehouse_leaser_uuid").val();
  var contract_warehouse_start_datetime = obj.parents("#contract_warehouse_edit_modle").find(".contract_warehouse_start_datetime").val();
  var contract_warehouse_end_datetime = obj.parents("#contract_warehouse_edit_modle").find(".contract_warehouse_end_datetime").val();
  var contract_warehouse_cluster_list = "";
      for(var i = 0;i < obj.parents("#contract_warehouse_edit_modle").find(".file_name").length; i++){
        contract_warehouse_cluster_list += obj.parents("#contract_warehouse_edit_modle").find(".file_name").eq(i).find("img").attr('uuid')+';';
      }
      if("" != contract_warehouse_start_datetime) {
        contract_warehouse_start_datetime += " 00:00:00";
      }
      if("" != contract_warehouse_end_datetime) {
        contract_warehouse_end_datetime += " 00:00:00";
      }
    //验证
    if(null == contract_warehouse_start_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
      alert("请选择租赁开始时间！");
      return;
    };
    if(null == contract_warehouse_end_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
      alert("请选择租赁结束时间！");
      return;
    };
    if(null == contract_warehouse_cluster_list.match(/^([0-9a-zA-Z]{32};)+$/)){
      alert("请选择储罐租赁合同附件！");
      return;
    };
  var data = {
    "idColumnValue":uuid,
    "normal_newClusterList":contract_warehouse_cluster_list,
    "leaser_uuid":contract_warehouse_leaser_uuid,
    "lessor_uuid":contract_warehouse_lessor_uuid,
    "start_datetime":contract_warehouse_start_datetime,
    "end_datetime":contract_warehouse_end_datetime
  };
  //调数据库
  var warehouse_edit_data_url = project_path + "lego/lego_fjTrade?servletName=modifyContractWarehousePot";
  var warehouse_edit_data_warehouse = ajax_assistant(warehouse_edit_data_url, data, false, true, false);
  if(1 == warehouse_edit_data_warehouse.status){
    clear_raw_data();
    new_server_data_fill();
    fill_variable_data(); 
    $("#contract_warehouse_edit_modle").modal("hide");
    $("#contract_warehouse_edit_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  } else {
    alert("修改失败");
  }
}

function contract_warehouse_delete_modle(obj) {
  var uuid = obj.attr("uuid");
  var contract_warehouse_delete_html = '<div class="modal fade custom_modal" id="contract_warehouse_delete_modle" tabindex="-1" role="dialog">'+
                                        '<div class="modal-dialog modal-sm" role="document">'+
                                          '<div class="modal-content">'+
                                            '<div class="modal-header bg-primary">'+
                                              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                              '<h4 class="modal-title">删除储罐租赁合同确认</h4>'+
                                            '</div>'+
                                            '<div class="modal-body nopadding-bottom">确认要删除吗？</div>'+
                                            '<div class="modal-footer noborder nopadding-top" style="text-align: center;">'+
                                            '<button type="button" class="btn btn-danger" id="contract_warehouse_delete_btn"  uuid="' + uuid + '">删除</button>'+
                                                '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                    '</div>';
  $("body").append(contract_warehouse_delete_html);
  $("#contract_warehouse_delete_modle").modal("show");
  $("#contract_warehouse_delete_modle").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function contract_warehouse_delete_data(obj) {
  var uuid = obj.attr("uuid");
  var data = {
    "idColumnValue":uuid
  };
  //接口数据
  var warehouse_delete_data_url = project_path + "lego/lego_fjTrade?servletName=removeContractWarehousePot";
  var warehouse_delete_data_warehouse = ajax_assistant(warehouse_delete_data_url, data, false, true, false);
  if(1 != warehouse_delete_data_warehouse.status){
    alert("删除储罐失败");
  } else {    
  // 更新页面数据
    clear_raw_data();
    new_server_data_fill();
    fill_variable_data();
  }
  $("#contract_warehouse_delete_modle").modal("hide");
  $("#contract_warehouse_delete_modle").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function contract_warehouse_info_modle(obj) {
  var uuid = obj.attr("uuid");
  //出租    
  var ontract_warehouse_lessor_uuid = "";
  //承租
  var contract_warehouse_leaser_uuid = "";
  var contract_warehouse_start_datetime = "";
  var contract_warehouse_end_datetime = "";
  var contract_warehouse_culster_list = "";
  var data = {
    "uuid":uuid
  };
  var contract_warehouse_edit_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var contract_warehouse_edit_get_warehouse = ajax_assistant(contract_warehouse_edit_url, data, false, true, false);
    if(1 == contract_warehouse_edit_get_warehouse.status){
      var reslut_json = JSON.parse(contract_warehouse_edit_get_warehouse.result);
      
      if(0 < reslut_json.length){
        ontract_warehouse_lessor_uuid = reslut_json[0].lessor_uuid;
        contract_warehouse_leaser_uuid = reslut_json[0].leaser_uuid;
        contract_warehouse_start_datetime = reslut_json[0].start_datetime;
        contract_warehouse_end_datetime = reslut_json[0].end_datetime;
        contract_warehouse_culster_list = reslut_json[0].normal_cluster_list;
      }
    }
    contract_warehouse_start_datetime = contract_warehouse_start_datetime.substring(0, contract_warehouse_start_datetime.indexOf(' '));
    contract_warehouse_end_datetime = contract_warehouse_end_datetime.substring(0, contract_warehouse_end_datetime.indexOf(' '));
  var contract_warehouse_edit_html = '<div class="modal fade custom_modal" tabindex="-1" role="dialog" id="contract_warehouse_info_modle" aria-labelledby="myModalLabel">'+
                                      '<div class="modal-dialog" role="document">'+
                                        '<div class="modal-content">'+
                                          '<div class="modal-header bg-primary">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                              '<h4 class="modal-title" id="myModalLabel">储罐租赁合同详情</h4>'+
                                          '</div>'+
                                          '<div class="modal-body nopadding-bottom">'+
                                            '<div class="row">'+
                                              '<div class="col-lg-6">'+
                                                '<label for="basic-url">出租方</label>'+
                                                '<select class="form-control contract_warehouse_lessor_uuid" value="' + ontract_warehouse_lessor_uuid + '"  disabled="disabled">';
                                                
                                                  for(var i = 0; i < enterprise_data.data.length; i++) {
                                                    console.log(ontract_warehouse_lessor_uuid+';'+enterprise_data.data[i].uuid);
                                                    if(ontract_warehouse_lessor_uuid == enterprise_data.data[i].uuid){
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '" selected = "selected">'+ enterprise_data.data[i].short_name +'</option>';
                                                    }
                                                        
                                                  }
                contract_warehouse_edit_html += '</select>'+
                                              '</div>'+
                                              '<div class="col-lg-6">'+
                                                '<label for="basic-url">承租方</label>'+
                                                '<select class="form-control contract_warehouse_leaser_uuid" value="' + contract_warehouse_leaser_uuid + '" disabled="disabled">';
                                                  for(var i = 0; i < enterprise_data.data.length; i++) {
                                                    if(contract_warehouse_leaser_uuid == enterprise_data.data[i].uuid){
                                                      contract_warehouse_edit_html += '<option value="' + enterprise_data.data[i].uuid + '" selected = "selected">'+ enterprise_data.data[i].short_name +'</option>';
                                                    }
                                                        
                                                  }
                                                  
                contract_warehouse_edit_html +='</select>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="row contract_warehouse_mt20">'+
                                              '<div class="col-lg-6 ">'+
                                                '<div class="form-group has-feedback">'+
                                                  '<label>租赁开始时间</label>'+
                                                '<input type="text" class="form-control contract_warehouse_start_datetime" value="'+contract_warehouse_start_datetime+'" disabled="disabled">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                              '</div>'+
                                              '<div class="col-lg-6">'+
                                                '<div class="form-group has-feedback">'+
                                                  '<label>租赁结束时间</label>'+
                                                '<input type="text" class="form-control contract_warehouse_end_datetime" value="'+contract_warehouse_end_datetime+'" disabled="disabled">'+
                                  
                                                  '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="row contract_warehouse_mt20">'+
                                              '<div class="col-lg-12">'+
                                                '<label for="basic-url">储罐租赁合同附件</label>'+
                                              '<div class="panel panel-default">'+
                                                  '<div class="panel-body clearfix attch">';
                                                    if(0 < contract_warehouse_culster_list.length){
                                                      contract_warehouse_culster_list = contract_warehouse_culster_list.substring(0, contract_warehouse_culster_list.length - 1).split(';');
                                                      for(var i=0;i<contract_warehouse_culster_list.length;i++){
                                                        var data={
                                                          "cluster_name":contract_warehouse_culster_list[i]
                                                        };

                                                        var contract_warehouse_file_name=ajax_assistant(project_path+"lego/lego_storage?servletName=getFileByClusterName",data, false, true, false);//查询文件集群信息
                                                        var contract_warehouse_json=JSON.parse(contract_warehouse_file_name.result);
                          contract_warehouse_edit_html += '<div class=" pull-left file_name has-feedback contract_warehouse_ml15">'+
                                                            '<img uuid="'+contract_warehouse_json[0].cluster_name+'" src="'+project_path+'upload/'+contract_warehouse_json[0].cluster_name+'.'+contract_warehouse_json[0].suffix+'" url="'+project_path+'upload/'+contract_warehouse_json[0].cluster_name+'.'+contract_warehouse_json[0].suffix+'"  width="60" height="60" class="img-rounded">'+
                                                            '<button class="btn btn-danger text-center delet_file_btn">'+
                                                              '<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
                                                            '</button>'+
                                                        '</div>';
                                                      }
                                                    }
                    contract_warehouse_edit_html += '</div>'+
                                              '</div>'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class="modal-footer" style="text-align: center;">'+
                                              '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>';
    $("body").append(contract_warehouse_edit_html);
    $("#contract_warehouse_info_modle").modal("show");
    $("#contract_warehouse_info_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
}

function contract_warehouse_search() {
  var contract_warehouse_contract_input = $("#contract_warehouse_search_input").val();
    if("" == contract_warehouse_contract_input) {
      alert("合同号不能为空");
      return;
    }
  var data = {
    "contract_code":contract_warehouse_contract_input
  };
  //获取储罐合同
  var contract_warehouse_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, data, false, true, false);
  if (1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    }
    var tmp_arr = new Array();
    var result = JSON.parse(warehouse_pot_get_contract.result);  
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      tmp_arr[i] = {"contract_code":result[i].contract_code, "lessor_uuid":result[i].lessor_uuid, "leaser_uuid":result[i].leaser_uuid, "start_datetime":result[i].start_datetime, "end_datetime":result[i].end_datetime, "uuid":result[i].uuid};
    }
    contract_warehouse_data["data"] = tmp_arr;
    fill_variable_data();
  } else {
    alert("储罐合同数据获取失败");
  }

}

function contract_warehouse_enterprise_data() {
  var contract_warehouse_html = '<option value="">--请选择--</option>';
  for(var i = 0; i < enterprise_data.data.length; i++) {
      contract_warehouse_html += '<option value="' + enterprise_data.data[i].uuid + '">'+ enterprise_data.data[i].short_name +'</option>';
  }
  $("#contract_warehouse_lessor,#contract_warehouse_leaser").html(contract_warehouse_html);
}

function contract_warehouse_search_fuzzy() {
  var data = {};
  var contract_warehouse_lessor = $("#contract_warehouse_lessor").val();
  var contract_warehouse_leaser = $("#contract_warehouse_leaser").val();
  var contract_warehouse_start = $("#contract_warehouse_start").val();
  var contract_warehouse_end = $("#contract_warehouse_end").val();
      if("" != contract_warehouse_start){
        contract_warehouse_start += "00:00:00";
        data["start_datetime"] = contract_warehouse_start;
      }
      if("" != contract_warehouse_end){
        contract_warehouse_end += "00:00:00";
        data["end_datetime"] = contract_warehouse_end;
      }
      if("" != contract_warehouse_lessor){
        data["lessor_uuid"] = contract_warehouse_lessor;
      }
      if("" != contract_warehouse_leaser){
        data["leaser_uuid"] = contract_warehouse_leaser;
      }
  //获取储罐合同
  var contract_warehouse_url = project_path + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, data, false, true, false);
  if (1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    }
    var tmp_arr = new Array();
    var result = JSON.parse(warehouse_pot_get_contract.result);  
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      tmp_arr[i] = {"contract_code":result[i].contract_code, "lessor_uuid":result[i].lessor_uuid, "leaser_uuid":result[i].leaser_uuid, "start_datetime":result[i].start_datetime, "end_datetime":result[i].end_datetime, "uuid":result[i].uuid};
    }
    contract_warehouse_data["data"] = tmp_arr;
    fill_variable_data();
  } else {
    alert("储罐合同数据获取失败");
  }
}
