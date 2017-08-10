var project_path = "http://192.168.1.131:8080/lego/";
//企业
var enterprise_data={"data":[
  {"short_name":"腾智联合", "uuid":"0001"},
  {"short_name":"腾智联", "uuid":"0002"},
  {"short_name":"腾智", "uuid":"0003"},
  {"short_name":"腾智联合有限公司", "uuid":"0004"},
  {"short_name":"金莲", "uuid":"0005"},
  {"short_name":"云谷", "uuid":"0006"}]
  
};
//储罐租赁合同
/*
 *contract_code:合同编号
 *lessor_uuid：出租方
 *leaser_uuid：承租方
 * */
var contract_warehouse_data = {"data":[
  {"contract_code":"ZS-FJ-17731363", "lessor_uuid":"0001", "leaser_uuid":"0002", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00000", "culster_list":"123,456"},
  {"contract_code":"AV-YS-111", "lessor_uuid":"0002", "leaser_uuid":"0004", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00001", "culster_list":"123,456"},
  {"contract_code":"FG-FG-1021", "lessor_uuid":"0003", "leaser_uuid":"0005", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00002", "culster_list":"123,456"},
  {"contract_code":"TY-NH-122", "lessor_uuid":"0004", "leaser_uuid":"0003", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00003", "culster_list":"123,456"},
  {"contract_code":"KL-IO-1110", "lessor_uuid":"0005", "leaser_uuid":"0005", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00004", "culster_list":"123,456"},
  {"contract_code":"XC-EC-10", "lessor_uuid":"0006", "leaser_uuid":"0006", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00005", "culster_list":"123,456"},
  {"contract_code":"FT-UH-1", "lessor_uuid":"0006", "leaser_uuid":"0004", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00006", "culster_list":"123,456"},
]
};

function clear_raw_data() {
  $("#contract_warehouse_box,#contract_warehouse_pages").html("");
}

function fill_variable_data() {
  //查询储罐合同
  if(isJsonObjectHasData(contract_warehouse_data)) {
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
      $("#contract_warehouse_box").append('<tr>'+
                                            '<td>'+ contract_warehouse_data.data[i].contract_code +'</td>'+
                                            '<td>'+ lessor_uuid +'</td>'+
                                            '<td>'+ leaser_uuid +'</td>'+
                                            '<td>'+ contract_warehouse_data.data[i].start_datetime +'</td>'+
                                            '<td>'+ contract_warehouse_data.data[i].end_datetime +'</td>'+
                                            '<td>'+
                                              '<span class="glyphicon glyphicon-info-sign contract_warehouse_ml15" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                              '<span class="glyphicon glyphicon-pencil contract_warehouse_ml15" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                              '<span class="glyphicon glyphicon-remove contract_warehouse_ml15" uuid = "' + contract_warehouse_data.data[i].uuid + '"></span>'+
                                            '</td>'+
                                          '</tr>');
    }
  }
}

function contract_warehouse_add_modle() {
  var contract_warehouse_add_modle='<div class="modal fade" tabindex="-1" id = "contract_warehouse_add_modle" role="dialog" aria-labelledby="myModalLabel">'+
                                    '<div class="modal-dialog" role="document">'+
                                      '<div class="modal-content">'+
                                        '<div class="modal-header bg-primary">'+
                                          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                            '<h4 class="modal-title" id="myModalLabel">添加储罐租赁合同</h4>'+
                                          '</div>'+
                                          '<div class="modal-body">'+
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
                                          '<div class="row">'+
                                            '<div class="col-lg-6 ">'+
                                              '<div class="form-group has-feedback">'+
                                                '<label>租赁开始时间</label>'+
                                              '<input type="text" class="form-control data_cha contract_warehouse_start_datetime">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="col-lg-6">'+
                                              '<div class="form-group has-feedback">'+
                                                '<label>租赁结束时间</label>'+
                                              '<input type="text" class="form-control data_cha contract_warehouse_end_datetime">'+
                                                '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class="row">'+
                                            '<div class="col-lg-12">'+
                                              '<label for="basic-url">储罐租赁合同附件</label>'+
                                              '<div class="panel panel-default">'+
                                                '<div class="panel-body clearfix attch">'+
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

function contract_warehouse_add_data(_this) {
//var contract_warehouse_cluster_list = _this.parents("#contract_warehouse_add_modle").find("")
  //出租
  var contract_warehouse_lessor_uuid = _this.parents("#contract_warehouse_add_modle").find(".contract_warehouse_lessor_uuid").val();
  //承租
  var contract_warehouse_leaser_uuid = _this.parents("#contract_warehouse_add_modle").find(".contract_warehouse_leaser_uuid").val();
  var contract_warehouse_start_datetime = _this.parents("#contract_warehouse_add_modle").find(".contract_warehouse_start_datetime").val();
  var contract_warehouse_end_datetime = _this.parents("#contract_warehouse_add_modle").find(".contract_warehouse_end_datetime").val();
  debugger;
      if("" != contract_warehouse_start_datetime) {
        contract_warehouse_start_datetime += "00:00:00";
      }
      if("" != contract_warehouse_end_datetime) {
        contract_warehouse_end_datetime += "00:00:00";
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
//    if(null == file_html.match(/^([0-9a-zA-Z]{32};)+$/)){
//      alert("请选择储罐租赁合同附件！");
//      return;
//    };
  var contract_warehouse_add = {
    "cluster_list":"",
    "leaser_uuid":contract_warehouse_leaser_uuid,
    "lessor_uuid":contract_warehouse_lessor_uuid,
    "start_datetime":contract_warehouse_start_datetime,
    "end_datetime":contract_warehouse_end_datetime
  };
  //钓接口
  if("" != contract_warehouse_start_datetime) {
    clear_raw_data();
    contract_warehouse_data = {"data":[
      {"contract_code":"ZS-FJ-17731363", "lessor_uuid":"0001", "leaser_uuid":"0002", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00000", "culster_list":"123,456"},
      {"contract_code":"AV-YS-111", "lessor_uuid":"0002", "leaser_uuid":"0004", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00001", "culster_list":"123,456"},
      {"contract_code":"FG-FG-1021", "lessor_uuid":"0003", "leaser_uuid":"0005", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00002", "culster_list":"123,456"},
      {"contract_code":"TY-NH-122", "lessor_uuid":"0004", "leaser_uuid":"0003", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00003", "culster_list":"123,456"},
      {"contract_code":"KL-IO-1110", "lessor_uuid":"0005", "leaser_uuid":"0005", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00004", "culster_list":"123,456"},
      {"contract_code":"XC-EC-10", "lessor_uuid":"0006", "leaser_uuid":"0006", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00005", "culster_list":"123,456"},
      {"contract_code":"FT-UH-1", "lessor_uuid":"0006", "leaser_uuid":"0004", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00006", "culster_list":"123,456"},
      {"contract_code":"wwwwwwwww", "lessor_uuid":"0006", "leaser_uuid":"0004", "start_datetime":"2017-05-06 00:00:00", "end_datetime":"2017-05-08 00:00:00", "uuid":"00007", "culster_list":"123,456"}
    ]
    };
    fill_variable_data(); 
    $("#contract_warehouse_add_modle").modal("hide");
    $("#contract_warehouse_add_modle").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  } else {
    alert("添加储罐合同失败");
  }
  
}