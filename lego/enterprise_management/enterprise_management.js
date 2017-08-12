/**
 * @author yangyongxia
 */

/**
 * 复选框 icheck
 */
function enterprise_management_checkbox() {
  $("input").iCheck({
    checkboxClass: 'icheckbox_square-blue',
  });
}

function enterprise_management_clear_raw_data() {
  $("#enterprise_management_list thead").html("");
  $("#enterprise_management_list tbody").html("");
}

/**
 * 企业信息列表变量
 */
var company_data = {"data": [
  {"name": "腾智联合互联网科技有限公司","short_name": "腾智","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"},
  {"name": "东营瑞腾石油化工有限公司","short_name": "瑞腾","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"},
  {"name": "上海煦语石油化工有限公司","short_name": "煦语","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"},
  {"name": "上海凌言化工有限公司","short_name": "凌言","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"},
  {"name": "中油华威石油化工（大连）有限公司","short_name": "华威","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"},
  {"name": "舟山纳海污水处理有限公司","short_name": "舟山纳海","registered_capital": "10000","establish_datetime": "2017-07-03","tax_identification_number": "111111111111111111","bank_name": "山东建设银行历下支行","account": "6217002390000544121","telephone_number": "15764231003","address": "山东省济南市历下区","uuid": "11111111111"}
]};

var current_company_detail_data = {
  "name": "腾智联合互联网科技有限公司",
  "short_name": "腾智",
  "registered_capital": "10000",
  "establish_datetime": "2017-07-03",
  "tax_identification_number": "111111111111111111",
  "bank_name": "山东建设银行历下支行",
  "account": "6217002390000544121",
  "telephone_number": "15764231003",
  "address": "山东省济南市历下区",
  "uuid": "11111111111"
};

function enterprise_management_fill_variable_data() {
  var header = 
    '<tr>'+
      '<th class = "name">企业名称</th>'+
      '<th class = "short_name">企业简称</th>'+
      '<th class = "registered_capital">注册资金（元）</th>'+
      '<th class = "establish_datetime">成立时间</th>'+
      '<th class = "tax_identification_number">纳税识别号</th>'+
      '<th class = "bank_name">开户银行</th>'+
      '<th class = "account">银行账号</th>'+
      '<th class = "telephone_number">联系电话</th>'+
      '<th class = "address">地址</th>'+
      '<th></th>'+
    '</tr>'
  var content = null;
  if (isJsonObjectHasData(company_data)) {
    for (var i = 0; i < company_data.data.length; i++){
      content += 
        '<tr>'+
            '<td class = "name">' + company_data.data[i].name + '</td>'+
            '<td class = "short_name">' + company_data.data[i].short_name + '</td>'+
            '<td class = "registered_capital">' + company_data.data[i].registered_capital + '</td>'+
            '<td class = "establish_datetime">' + company_data.data[i].establish_datetime + '</td>'+
            '<td class = "tax_identification_number">' + company_data.data[i].tax_identification_number + '</td>'+
            '<td class = "bank_name">' + company_data.data[i].bank_name + '</td>'+
            '<td class = "account">' + company_data.data[i].account + '</td>'+
            '<td class = "telephone_number">' + company_data.data[i].telephone_number + '</td>'+
            '<td class = "address">' + company_data.data[i].address + '</td>'+
            '<td>'+
              '<span title = "详情" data-uuid = "' + company_data.data[i].uuid + '" class = "glyphicon glyphicon-info-sign" id = "enterprise_management_detail_info"></span>'+
              '<span title = "修改" data-uuid = "' + company_data.data[i].uuid + '" class = "glyphicon glyphicon-pencil" id = "enterprise_management_edit_info"></span>'+
              '<span title = "删除" data-uuid = "' + company_data.data[i].uuid + '" class = "glyphicon glyphicon-remove" id = "enterprise_management_delete_info"></span>'+
            '</td>'+
        '</tr>'
    }
    $("#enterprise_management_list thead").html(header);
    $("#enterprise_management_list tbody").html(content);
  } else {
    $("#enterprise_management_list thead").html("没有数据");
    $("#enterprise_management_list tbody").html("");
  }
}

/**
 * 企业信息展示和隐藏
 */
function enterprise_management_show_or_hide() {
  //企业名称
  if(true == $("#enterprise_management_condition .name input").prop('checked')){
    $("#enterprise_management_list .name").show();
  } else{
    $("#enterprise_management_list .name").hide();
  }
  //企业简称
  if(true == $("#enterprise_management_condition .short_name input").prop('checked')){
    $("#enterprise_management_list .short_name").show();
  } else{
    $("#enterprise_management_list .short_name").hide();
  }
  //注册资金
  if(true == $("#enterprise_management_condition .registered_capital input").prop('checked')){
    $("#enterprise_management_list .registered_capital").show();
  } else{
    $("#enterprise_management_list .registered_capital").hide();
  }
  //成立时间
  if(true == $("#enterprise_management_condition .establish_datetime input").prop('checked')){
    $("#enterprise_management_list .establish_datetime").show();
  } else{
    $("#enterprise_management_list .establish_datetime").hide();
  }
  //纳税识别号
  if(true == $("#enterprise_management_condition .tax_identification_number input").prop('checked')){
    $("#enterprise_management_list .tax_identification_number").show();
  } else{
    $("#enterprise_management_list .tax_identification_number").hide();
  }
  //开户银行
  if(true == $("#enterprise_management_condition .bank_name input").prop('checked')){
    $("#enterprise_management_list .bank_name").show();
  } else{
    $("#enterprise_management_list .bank_name").hide();
  }
  //银行账号
  if(true == $("#enterprise_management_condition .account input").prop('checked')){
    $("#enterprise_management_list .account").show();
  } else{
    $("#enterprise_management_list .account").hide();
  }
  //联系电话
  if(true == $("#enterprise_management_condition .telephone_number input").prop('checked')){
    $("#enterprise_management_list .telephone_number").show();
  } else{
    $("#enterprise_management_list .telephone_number").hide();
  }
  //地址
  if(true == $("#enterprise_management_condition .address input").prop('checked')){
    $("#enterprise_management_list .address").show();
  } else{
    $("#enterprise_management_list .address").hide();
  }
}

/**
 * 企业名称搜索
 */
function enterprise_management_search_name() {
  var name = $("#enterprise_management_search .name").val();
  var short_name = $("#enterprise_management_search .short_name").val("");
  if("" == name){
    alert("请输入企业名称")
  } else {
    if(null == name.match(/^[\u4e00-\u9fffa（）\(\)]{8,32}$/)){
      alert("企业名称格式错误！")
    }
  } 
}

/**
 * 企业简称搜索
 */
function enterprise_management_search_short_name() {
  var short_name = $("#enterprise_management_search .short_name").val();
  var name = $("#enterprise_management_search .name").val("");
  if("" == short_name){
    alert("请输入企业简称")
  } else {
    if(null == short_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
      alert("企业简称格式错误！")
    }
  }
}

/**
 * 添加企业信息模态框
 */
function enterprise_management_add_modal() {
  var add_modal = 
    '<div class="modal fade custom_modal" id="enterprise_management_add_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content" style="height: 700px;">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">添加企业信息</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="overflow-y: scroll;height: 642px;">'+
            '<div class="panel panel-default">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">基本信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>企业名称</label>'+
                    '<input type="text" class="form-control enterprise_name" value = "腾智联合互联网科技有限公司">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业简称</label>'+
                    '<input type="text" class="form-control enterprise_short_name" value = "腾智">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业类型</label>'+
                    '<select class="form-control enterprise_type">'+
                      '<option>--请选择--</option>'+
                      '<option value="1">自运营企业</option>'+
                      '<option value="2">贸易企业</option>'+
                      '<option value="3">物流企业</option>'+
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>注册资金(万元)</label>'+
                    '<input type="text" class="form-control registered_capital" value = "1000000">'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<div class="form-group has-feedback">'+
                      '<label>成立时间</label>'+
                      '<input type="text" class="form-control widget_datepicker establish_datetime" value = "2017-05-17">'+
                      '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="panel panel-default invoice">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">开票信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>纳税识别号</label>'+
                    '<input type="text" class="form-control tax_identification_number" value = "00000000000000000">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>开户银行</label>'+
                    '<input type="text" class="form-control bank_name" value = "山东建设银行历下支行">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>银行账号</label>'+
                    '<input type="text" class="form-control account" value = "111111111111">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>联系电话</label>'+
                    '<input type="text" class="form-control telephone_number" value = "111111111">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>地址</label>'+
                    '<input type="text" class="form-control address" value = "山东省济南市历下区">'+
                  '</div>'+
                '</div>'+
              '<div class="row">'+
              '<div class="form-group col-md-12">'+
                '<label>开票信息附件</label>'+
                '<div class="panel panel-default">'+
                  '<div class="panel-body attch clearfix invoice_attch">'+
                    '<div class="pull-left has-feedback">'+
                      '<button class="btn bg-default">'+
                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                      '</button>'+
                      '<input class="positionfile file_style" type="file"  value="" />'+
                    '</div>'+
                    /*'<div class="swiper-slide btn_slider position-relative">'+
                      '<img src="img/img2.jpg"/>'+
                      '<button class="btn btn-danger position-absolute ab-btn text-center btn-remove">'+
                      '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                      '</button>'+
                    '</div>'+*/
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="panel panel-default">'+
            '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">其他证件</p>'+
            '<div class="panel-body">'+
              '<div class="row">'+
                '<div class="form-group col-md-12">'+
                  '<label>机构信用代码证</label>'+
                  '<div class="panel panel-default">'+
                    '<div class="panel-body attch clearfix institutionalCreditCodeAttch">'+
                      '<div class="pull-left has-feedback">'+
                        '<button class="btn bg-default">'+
                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                        '</button>'+
                        '<input class="positionfile file_style" type="file"  value="" />'+
                      '</div>'+
                      /*'<div class="swiper-slide btn_slider position-relative">'+
                        '<img src="img/img2.jpg"/>'+
                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                        '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                        '</button>'+
                      '</div>'+*/
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>危化品经营许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix HazardousChemicalsAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>法人身份证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix IdCardAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>开户许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix AccountOpeningPermitAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>安全生产许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix SafetyProductionAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        ' </div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>营业执照</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix BusinessLicenseAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-primary add_btn">添加</button>'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(add_modal);
  $("#enterprise_management_add_modal").modal("show");
  $("#enterprise_management_add_modal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

/**
 * 添加企业信息
 */
function enterprise_management_add_info() {
  var enterprise_name = $("#enterprise_management_add_modal .enterprise_name").val();
  var enterprise_short_name = $("#enterprise_management_add_modal .enterprise_short_name").val();
  var enterprise_type = $("#enterprise_management_add_modal .enterprise_type").val();
  var registered_capital = $("#enterprise_management_add_modal .registered_capital").val();
  var establish_datetime = $("#enterprise_management_add_modal .establish_datetime").val()+' 00:00:00';
  var tax_identification_number = $("#enterprise_management_add_modal .tax_identification_number").val();
  var address = $("#enterprise_management_add_modal .address").val();
  var telephone_number = $("#enterprise_management_add_modal .telephone_number").val();
  var bank_name = $("#enterprise_management_add_modal .bank_name").val();
  var account = $("#enterprise_management_add_modal .account").val();
  var invoiceCluster_list = "";
  for(var i = 1;i < $("#enterprise_management_add_modal .invoice_attch div").length;i++){
    invoiceCluster_list += $("#enterprise_management_add_modal .invoice_attch div").eq(i).data("id")+';';
  }
  if("" == enterprise_name){
    alert("请输入企业名称");
    return;
  } else {
    if(null == enterprise_name.match(/^[\u4e00-\u9fffa（）\(\)]{8,32}$/)){
      alert("企业名称格式错误！");
      return;
    }
  }
  if("" == enterprise_short_name){
    alert("请输入企业简称");
    return;
  } else {
    if(null == enterprise_short_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
      alert("企业简称格式错误！");
      return;
    }
  }
  if(null == enterprise_type.match(/^[123]$/)) {
    alert("请选择企业类型！");
    return;
  }  
  if ("" == registered_capital){
      alert("请输入注册资本！");
      return;  
  } else {
    if (null == registered_capital.match(/^(\d+)(\.\d+)?$/)){
      alert("注册资本格式错误！");
      return;  
    } 
  }
  if(null == establish_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
    alert("请选择成立时间！");
    return;
  }
  if("" == tax_identification_number){
    alert("请输入纳税识别号！");
    return;
  } else {
    if(null == tax_identification_number.match(/^[0-9a-zA-Z]{15,18}$/)){
      alert("纳税识别号格式错误！");
      return;
    }
  }
  if("" == bank_name){
    alert("请输入开户银行！");
    return;
  } else {
    if(null == bank_name.match(/^[\u4e00-\u9fffa]{8,64}$/)){
      alert("开户银行格式错误！");
      return;
    }
  }
  if("" == account){
    alert("请输入银行账号！");
    return;
  } else {
    if(null == account.match(/^[0-9]{10,30}$/)){
      alert("开户银行格式错误！");
      return;
    }
  }
  if("" == telephone_number){
    alert("请输入联系方式！");
    return;
  } else {
    if(null == telephone_number.match(/^[0-9]{6,15}$/)){
      alert("联系方式格式错误！");
      return;
    }
  }
  if ("" == address) {
    alert("请输入地址！");
    return;
  } else {
    if (null == address.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{8,100}$/)) {
      alert("地址格式错误！");
      return;
    }
  }
  
  if ("腾智联合互联网科技有限公司" == enterprise_name) {
    $("#enterprise_management_add_modal").modal("hide");
  } else {
    alert("添加失败！")
  }
}

/**
 * 修改企业模态框
 */
function enterprise_management_edit_modal(uuid) {
  var edit_modal = 
    '<div class="modal fade custom_modal" id="enterprise_management_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content" style="height: 700px;">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">添加企业信息</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="overflow-y: scroll;height: 642px;">'+
            '<div class="panel panel-default">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">基本信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>企业名称</label>'+
                    '<input type="text" class="form-control enterprise_name" value = "' + current_company_detail_data.name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业简称</label>'+
                    '<input type="text" class="form-control enterprise_short_name" value = "' + current_company_detail_data.short_name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业类型</label>'+
                    '<select class="form-control enterprise_type">'+
                      '<option>--请选择--</option>'+
                      '<option value="1">自运营企业</option>'+
                      '<option value="2">贸易企业</option>'+
                      '<option value="3">物流企业</option>'+
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>注册资金(万元)</label>'+
                    '<input type="text" class="form-control registered_capital" value = "' + current_company_detail_data.registered_capital + '">'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<div class="form-group has-feedback">'+
                      '<label>成立时间</label>'+
                      '<input type="text" class="form-control widget_datepicker establish_datetime" value = "' + current_company_detail_data.establish_datetime + '">'+
                      '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="panel panel-default invoice">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">开票信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>纳税识别号</label>'+
                    '<input type="text" class="form-control tax_identification_number" value = "' + current_company_detail_data.tax_identification_number + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>开户银行</label>'+
                    '<input type="text" class="form-control bank_name" value = "' + current_company_detail_data.bank_name + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>银行账号</label>'+
                    '<input type="text" class="form-control account" value = "' + current_company_detail_data.account + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>联系电话</label>'+
                    '<input type="text" class="form-control telephone_number" value = "' + current_company_detail_data.telephone_number + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>地址</label>'+
                    '<input type="text" class="form-control address" value = "' + current_company_detail_data.address + '">'+
                  '</div>'+
                '</div>'+
              '<div class="row">'+
              '<div class="form-group col-md-12">'+
                '<label>开票信息附件</label>'+
                '<div class="panel panel-default">'+
                  '<div class="panel-body attch clearfix invoice_attch">'+
                    '<div class="pull-left has-feedback">'+
                      '<button class="btn bg-default">'+
                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                      '</button>'+
                      '<input class="positionfile file_style" type="file"  value="" />'+
                    '</div>'+
                    /*'<div class="swiper-slide btn_slider position-relative">'+
                      '<img src="img/img2.jpg"/>'+
                      '<button class="btn btn-danger position-absolute ab-btn text-center btn-remove">'+
                      '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                      '</button>'+
                    '</div>'+*/
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="panel panel-default">'+
            '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">其他证件</p>'+
            '<div class="panel-body">'+
              '<div class="row">'+
                '<div class="form-group col-md-12">'+
                  '<label>机构信用代码证</label>'+
                  '<div class="panel panel-default">'+
                    '<div class="panel-body attch clearfix institutionalCreditCodeAttch">'+
                      '<div class="pull-left has-feedback">'+
                        '<button class="btn bg-default">'+
                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                        '</button>'+
                        '<input class="positionfile file_style" type="file"  value="" />'+
                      '</div>'+
                      /*'<div class="swiper-slide btn_slider position-relative">'+
                        '<img src="img/img2.jpg"/>'+
                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                        '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                        '</button>'+
                      '</div>'+*/
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>危化品经营许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix HazardousChemicalsAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>法人身份证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix IdCardAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>开户许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix AccountOpeningPermitAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>安全生产许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix SafetyProductionAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        ' </div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>营业执照</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix BusinessLicenseAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-warning edit_btn" data-uuid = "' + uuid + '">修改</button>'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(edit_modal);
  $("#enterprise_management_edit_modal").modal("show");
  $("#enterprise_management_edit_modal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

/**
 * 修改企业信息
 */
function enterprise_management_edit_info(uuid) {
  var enterprise_name = $("#enterprise_management_edit_modal .enterprise_name").val();
  var enterprise_short_name = $("#enterprise_management_edit_modal .enterprise_short_name").val();
  var enterprise_type = $("#enterprise_management_edit_modal .enterprise_type").val();
  var registered_capital = $("#enterprise_management_edit_modal .registered_capital").val();
  var establish_datetime = $("#enterprise_management_edit_modal .establish_datetime").val()+' 00:00:00';
  var tax_identification_number = $("#enterprise_management_edit_modal .tax_identification_number").val();
  var address = $("#enterprise_management_edit_modal .address").val();
  var telephone_number = $("#enterprise_management_edit_modal .telephone_number").val();
  var bank_name = $("#enterprise_management_edit_modal .bank_name").val();
  var account = $("#enterprise_management_edit_modal .account").val();
  var invoiceCluster_list = "";
  for(var i = 1;i < $("#enterprise_management_edit_modal .invoice_attch div").length;i++){
    invoiceCluster_list += $("#enterprise_management_edit_modal .invoice_attch div").eq(i).data("id")+';';
  }
  if("" == enterprise_name){
    alert("请输入企业名称");
    return;
  } else {
    if(null == enterprise_name.match(/^[\u4e00-\u9fffa（）\(\)]{8,32}$/)){
      alert("企业名称格式错误！");
      return;
    }
  }
  if("" == enterprise_short_name){
    alert("请输入企业简称");
    return;
  } else {
    if(null == enterprise_short_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{2,32}$/)){
      alert("企业简称格式错误！");
      return;
    }
  }
  if(null == enterprise_type.match(/^[123]$/)){
    alert("请选择企业类型！");
    return;
  }
  if ("" == registered_capital){
      alert("请输入注册资本！");
      return;  
  } else {
    if (null == registered_capital.match(/^(\d+)(\.\d+)?$/)){
      alert("注册资本格式错误！");
      return;  
    } 
  }
  if(null == establish_datetime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)){
    alert("请选择成立时间！");
    return;
  }
  if("" == tax_identification_number){
    alert("请输入纳税识别号！");
    return;
  } else {
    if(null == tax_identification_number.match(/^[0-9a-zA-Z]{15,18}$/)){
      alert("纳税识别号格式错误！");
      return;
    }
  }
  if("" == bank_name){
    alert("请输入开户银行！");
    return;
  } else {
    if(null == bank_name.match(/^[\u4e00-\u9fffa]{8,64}$/)){
      alert("开户银行格式错误！");
      return;
    }
  }
  if("" == account){
    alert("请输入银行账号！");
    return;
  } else {
    if(null == account.match(/^[0-9]{10,30}$/)){
      alert("开户银行格式错误！");
      return;
    }
  }
  if("" == telephone_number){
    alert("请输入联系方式！");
    return;
  } else {
    if(null == telephone_number.match(/^[0-9]{6,15}$/)){
      alert("联系方式格式错误！");
      return;
    }
  }
  if ("" == address) {
    alert("请输入地址！");
    return;
  } else {
    if (null == address.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{8,100}$/)) {
      alert("地址格式错误！");
      return;
    }
  }
  
  if ("腾智联合互联网科技有限公司" == enterprise_name) {
    $("#enterprise_management_edit_modal").modal("hide");
  } else {
    alert("修改失败！")
  }
}

/**
 * 企业详情模态框
 */
function enterprise_management_detail_modal() {
  var detail_modal = 
    '<div class="modal fade custom_modal" id="enterprise_management_detail_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content" style="height: 700px;">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">添加企业信息</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="overflow-y: scroll;height: 642px;">'+
            '<div class="panel panel-default">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">基本信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>企业名称</label>'+
                    '<input type="text" class="form-control enterprise_name" value = "' + current_company_detail_data.name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业简称</label>'+
                    '<input type="text" class="form-control enterprise_short_name" value = "' + current_company_detail_data.short_name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业类型</label>'+
                    '<select class="form-control enterprise_type">'+
                      '<option>--请选择--</option>'+
                      '<option value="1">自运营企业</option>'+
                      '<option value="2">贸易企业</option>'+
                      '<option value="3">物流企业</option>'+
                    '</select>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>注册资金(元)</label>'+
                    '<input type="text" class="form-control registered_capital" value = "' + current_company_detail_data.registered_capital + '">'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<div class="form-group has-feedback">'+
                      '<label>成立时间</label>'+
                      '<input type="text" class="form-control data_cha establish_datetime" value = "' + current_company_detail_data.establish_datetime + '">'+
                      '<span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="panel panel-default invoice">'+
              '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">开票信息</p>'+
              '<div class="panel-body">'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>纳税识别号</label>'+
                    '<input type="text" class="form-control tax_identification_number" value = "' + current_company_detail_data.tax_identification_number + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>开户银行</label>'+
                    '<input type="text" class="form-control bank_name" value = "' + current_company_detail_data.bank_name + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>银行账号</label>'+
                    '<input type="text" class="form-control account" value = "' + current_company_detail_data.account + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>联系电话</label>'+
                    '<input type="text" class="form-control telephone_number" value = "' + current_company_detail_data.telephone_number + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>地址</label>'+
                    '<input type="text" class="form-control address" value = "' + current_company_detail_data.address + '">'+
                  '</div>'+
                '</div>'+
              '<div class="row">'+
              '<div class="form-group col-md-12">'+
                '<label>开票信息附件</label>'+
                '<div class="panel panel-default">'+
                  '<div class="panel-body attch clearfix invoice_attch">'+
                    '<div class="pull-left has-feedback">'+
                      '<button class="btn bg-default">'+
                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                      '</button>'+
                      '<input class="positionfile file_style" type="file"  value="" />'+
                    '</div>'+
                    /*'<div class="swiper-slide btn_slider position-relative">'+
                      '<img src="img/img2.jpg"/>'+
                      '<button class="btn btn-danger position-absolute ab-btn text-center btn-remove">'+
                      '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                      '</button>'+
                    '</div>'+*/
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="panel panel-default">'+
            '<p class="bg-blue" style="background: #f5f5f5;padding-top: 5px !important; padding-bottom:5px !important; padding-left: 30px !important;">其他证件</p>'+
            '<div class="panel-body">'+
              '<div class="row">'+
                '<div class="form-group col-md-12">'+
                  '<label>机构信用代码证</label>'+
                  '<div class="panel panel-default">'+
                    '<div class="panel-body attch clearfix institutionalCreditCodeAttch">'+
                      '<div class="pull-left has-feedback">'+
                        '<button class="btn bg-default">'+
                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                        '</button>'+
                        '<input class="positionfile file_style" type="file"  value="" />'+
                      '</div>'+
                      /*'<div class="swiper-slide btn_slider position-relative">'+
                        '<img src="img/img2.jpg"/>'+
                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                        '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                        '</button>'+
                      '</div>'+*/
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>危化品经营许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix HazardousChemicalsAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>法人身份证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix IdCardAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>开户许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix AccountOpeningPermitAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>安全生产许可证</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix SafetyProductionAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        ' </div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>营业执照</label>'+
                    '<div class="panel panel-default">'+
                      '<div class="panel-body attch clearfix BusinessLicenseAttch">'+
                        '<div class="pull-left has-feedback">'+
                          '<button class="btn bg-default">'+
                            '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                          '</button>'+
                          '<input class="positionfile file_style" type="file"  value="" />'+
                        '</div>'+
                        /*'<div class="swiper-slide btn_slider position-relative">'+
                          '<img src="img/img2.jpg"/>'+
                          '<button class="btn btn-danger position-absolute ab-btn text-center">'+
                            '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                          '</button>'+
                        '</div>'+*/
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(detail_modal);
  $("#enterprise_management_detail_modal").modal("show");
  $("#enterprise_management_detail_modal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

/**
 * 删除企业信息
 * @param 
 */
function enterprise_management_delete_modal(uuid) {
  var delete_modal = 
    '<div class="modal fade bs-example-modal-sm custom_modal" id="enterprise_management_delete_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
      '<div class="modal-dialog modal-sm" role="document">'+
        '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">删除企业确认</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">确认要删除企业吗？</div>'+
          '<div class="modal-footer">'+
            '<button type="button" class="btn btn-danger remove" data-uuid = "' + uuid + '">删除</button>'+
            '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(delete_modal);
  $("#enterprise_management_delete_modal").modal("show");
  $("#enterprise_management_delete_modal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}

function enterprise_management_delete_info(uuid) {
  alert("删除失败");
}