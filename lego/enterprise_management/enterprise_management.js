/**
 * @author yangyongxia
 */

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
  "uuid": "11111111111",
  "type": "1"
};

/**
 * 分页变量
 */
var rows = 2;
var current_offset = 0;

/**
 * 全局搜索条件
 */
var enterprise_management_search_condition = {};

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
  $("#enterprise_management_pages").html("");
}

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
 * 获取企业信息
 */
function enterprise_management_server_data_cover() {
  var totalRows = 0;
  var enterprise_management_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  delete enterprise_management_search_condition["rows"];
  delete enterprise_management_search_condition["offset"];  
  var enterprise_management_get_enterprise = ajax_assistant(enterprise_management_url, enterprise_management_search_condition, false, true, false);
  if(1 == enterprise_management_get_enterprise.status) {
    if (0 == enterprise_management_get_enterprise.count) {
      $("#enterprise_management_pages").html("");
    } else {
      var result = JSON.parse(enterprise_management_get_enterprise.result);
      console.log(result);
      totalRows = result.length;
      generate_bootstrap_pagination_ctrl("#enterprise_management_pages", current_offset, rows, 3, totalRows);
      enterprise_management_search_condition["rows"] = rows;
      enterprise_management_search_condition["offset"] = current_offset;
    }
  } else {
    alert("企业信息获取失败");
  }
  //获取企业信息
  var enterprise_management_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  var enterprise_management_get_enterprise = ajax_assistant(enterprise_management_url, enterprise_management_search_condition, false, true, false);
  console.log(enterprise_management_get_enterprise);
  if (1 == enterprise_management_get_enterprise.status) {
    if (0 == enterprise_management_get_enterprise.count) {
      company_data = {};
    } else {
      var result = JSON.parse(enterprise_management_get_enterprise.result);
      console.log(result);
      var company_data_arr = new Array();
      for (var i = 0; i < result.length; i++) {
        //获取开票信息
        var enterprise_management_get_invoice_url = PROJECT_PATH + "lego/lego_certificate?servletName=getInvoiceInformation";
        var uuid = result[i].uuid;
        var enterprise_management_get_invoice_param_data = {};
        enterprise_management_get_invoice_param_data["parent_uuid"] = uuid;
        var enterprise_management_get_invoice = ajax_assistant(enterprise_management_get_invoice_url, enterprise_management_get_invoice_param_data, false, true, false);
        console.log(enterprise_management_get_invoice);
        var result_invoice = "";
        var tax_identification_number = "";
        var address = "";
        var telephone_number = "";
        var bank_name = "";
        var account = "";
        if (1 == enterprise_management_get_invoice.status) {
          result_invoice = JSON.parse(enterprise_management_get_invoice.result);
          console.log(result_invoice);
          tax_identification_number = result_invoice[0].tax_identification_number;
          address = result_invoice[0].address;
          telephone_number = result_invoice[0].telephone_number;
          bank_name = result_invoice[0].bank_name;
          account = result_invoice[0].account;
        }
        var establish_datetime = result[i].establish_datetime.substring(0,result[i].establish_datetime.indexOf(" "));
        
        company_data_arr[i] = {"name": result[i].name,"short_name": result[i].short_name,"registered_capital": result[i].registered_capital,"establish_datetime": establish_datetime,"tax_identification_number": tax_identification_number,"bank_name": bank_name,"account": account,"telephone_number": telephone_number,"address": address,"uuid": result[i].uuid};
      }
      company_data["data"] = company_data_arr;
      console.log(company_data);
    }
  } else {
    alert("企业信息获取失败");
  }
}

/**
 * 点击分页函数
 */
function enterprise_management_pages_fun(obj) {
  current_offset = obj.attr("data-offset");
  enterprise_management_search_condition["offset"] = current_offset;
  enterprise_management_server_data_cover();
  enterprise_management_fill_variable_data();
}

/**
 * 企业名称搜索
 */
function enterprise_management_search_name() {
  var name = $("#enterprise_management_search .name").val();
  var short_name = $("#enterprise_management_search .short_name").val("");
  if("" == name){
    alert("请输入企业名称");
    return;
  } else {
    if(null == name.match(/^[\u4e00-\u9fffa（）\(\)]{8,32}$/)){
      alert("企业名称格式错误！");
      return;
    }
  }
  current_offset = 0;
  enterprise_management_search_condition = {};
  enterprise_management_search_condition["name"] = name;
  enterprise_management_server_data_cover();
  enterprise_management_fill_variable_data();
  enterprise_management_show_or_hide();
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
  current_offset = 0;
  enterprise_management_search_condition = {};
  enterprise_management_search_condition["short_name"] = short_name;
  enterprise_management_server_data_cover();
  enterprise_management_fill_variable_data();
  enterprise_management_show_or_hide();
}

/**
 * 全部列出
 */
function enterprise_management_search_all() {
  var short_name = $("#enterprise_management_search .short_name").val("");
  var name = $("#enterprise_management_search .name").val("");
  current_offset = 0;
  enterprise_management_search_condition = {};
  enterprise_management_server_data_cover();
  enterprise_management_fill_variable_data();
  enterprise_management_show_or_hide();
}

/**
 * 添加企业信息模态框
 */
function enterprise_management_add_modal() {
  var add_modal = 
    '<div class="modal fade custom_modal" id="enterprise_management_add_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content" style="height: 700px;width:640px;">'+
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
                '<div class="panel panel-default" id = "enterprise_management_invoice_attch">'+
                  // '<div class="panel-body attch clearfix invoice_attch">'+
                  //   '<div class="pull-left has-feedback">'+
                  //     '<button class="btn bg-default">'+
                  //       '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                  //     '</button>'+
                  //     '<input class="positionfile file_style" type="file"  value="" />'+
                  //   '</div>'+
                  //   /*'<div class="swiper-slide btn_slider position-relative">'+
                  //     '<img src="img/img2.jpg"/>'+
                  //     '<button class="btn btn-danger position-absolute ab-btn text-center btn-remove">'+
                  //     '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                  //     '</button>'+
                  //   '</div>'+*/
                  // '</div>'+
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
                  '<div class="panel panel-default" id = "enterprise_management_institutional_attch">'+
//                  '<div class="panel-body attch clearfix institutionalCreditCodeAttch">'+
//                    '<div class="pull-left has-feedback">'+
//                      '<button class="btn bg-default">'+
//                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                      '</button>'+
//                      '<input class="positionfile file_style" type="file"  value="" />'+
//                    '</div>'+
//                    /*'<div class="swiper-slide btn_slider position-relative">'+
//                      '<img src="img/img2.jpg"/>'+
//                      '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                      '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                      '</button>'+
//                    '</div>'+*/
//                  '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>危化品经营许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_hazardous_attch">'+
//                    '<div class="panel-body attch clearfix HazardousChemicalsAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>法人身份证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_idcard_attch">'+
//                    '<div class="panel-body attch clearfix IdCardAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>开户许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_account_attch">'+
//                    '<div class="panel-body attch clearfix AccountOpeningPermitAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>安全生产许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_safety_attch">'+
//                    '<div class="panel-body attch clearfix SafetyProductionAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      ' </div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>营业执照</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_business_attch">'+
//                    '<div class="panel-body attch clearfix BusinessLicenseAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
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
  upload_attachment_edit_output("#enterprise_management_invoice_attch");
  upload_attachment_btn_event_bind("#enterprise_management_invoice_attch");
  upload_attachment_edit_output("#enterprise_management_institutional_attch");
  upload_attachment_btn_event_bind("#enterprise_management_institutional_attch");
  upload_attachment_edit_output("#enterprise_management_hazardous_attch");
  upload_attachment_btn_event_bind("#enterprise_management_hazardous_attch");
  upload_attachment_edit_output("#enterprise_management_idcard_attch");
  upload_attachment_btn_event_bind("#enterprise_management_idcard_attch");
  upload_attachment_edit_output("#enterprise_management_account_attch");
  upload_attachment_btn_event_bind("#enterprise_management_account_attch");
  upload_attachment_edit_output("#enterprise_management_safety_attch");
  upload_attachment_btn_event_bind("#enterprise_management_safety_attch");
  upload_attachment_edit_output("#enterprise_management_business_attch");
  upload_attachment_btn_event_bind("#enterprise_management_business_attch");
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
  var invoice_cluster_li = $("#enterprise_management_invoice_attch ul").children("li");
  var invoice_cluster_list = "";
  for (var i = 0; i < invoice_cluster_li.length; i++) {
    var obj = invoice_cluster_li[i];
    var invoice_cluster = $(obj).find("a").attr("data-cluster");
    if (undefined != invoice_cluster) {
     invoice_cluster_list += invoice_cluster + ";"; 
    }    
  }
  console.log(invoice_cluster_list);
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
    alert("请输入开银行！");
    return;
  } else {
    if(null == bank_name.match(/^[\u4e00-\u9fffa]{8,64}$/)){
      alert("开户银行格式错误！");
      return;
    }
  }
  if("" == account){
    alert("请输入银行账号");
    return;
  } else {
    if(null == account.match(/^[0-9]{10,30}$/)){
      alert("银行账号格式错误！");
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
  var enterprise_management_add_info_url = PROJECT_PATH + "lego/lego_crm?servletName=addEnterpriseAndInvoiceInformation";
  var enterprise_management_add_info_param_data = {};
  enterprise_management_add_info_param_data["name"] = enterprise_name;
  enterprise_management_add_info_param_data["type"] = enterprise_type;
  enterprise_management_add_info_param_data["short_name"] = enterprise_short_name;
  enterprise_management_add_info_param_data["registered_capital"] = registered_capital;
  enterprise_management_add_info_param_data["establish_datetime"] = establish_datetime;
  enterprise_management_add_info_param_data["telephone_number"] = telephone_number;
  enterprise_management_add_info_param_data["tax_identification_number"] = tax_identification_number;
  enterprise_management_add_info_param_data["address"] = address;
  enterprise_management_add_info_param_data["bank_name"] = bank_name;
  enterprise_management_add_info_param_data["account"] = account;
  if ("" != invoice_cluster_list) {
    enterprise_management_add_info_param_data["cluster_list"] = invoice_cluster_list;
  }
  var enterprise_management_add_info = ajax_assistant(enterprise_management_add_info_url, enterprise_management_add_info_param_data, false, true, false);
  console.log(enterprise_management_add_info);
  if (1 == enterprise_management_add_info.status) {
    var result = JSON.parse(enterprise_management_add_info.result);
    var enterprise_name = result[0].name;
    var parent_uuid = result[0].uuid;
    //添加机构信用代码证
    var institutional_cluster_li = $("#enterprise_management_institutional_attch ul").children("li");
    var institutional_cluster_list = "";
    for (var i = 0; i < institutional_cluster_li.length; i++) {
      var obj = institutional_cluster_li[i];
      var institutional_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != institutional_cluster) {
       institutional_cluster_list += institutional_cluster + ";"; 
      }    
    }
    var enterprise_management_add_institutional_url = PROJECT_PATH + "lego/lego_certificate?servletName=addInstitutionalCreditCode";
    var enterprise_management_add_institutional_param_data = {};
    enterprise_management_add_institutional_param_data["enterprise_name"] = enterprise_name;
    enterprise_management_add_institutional_param_data["parent_uuid"] = parent_uuid;
    if ("" != institutional_cluster_list) {
      enterprise_management_add_institutional_param_data["cluster_list"] = institutional_cluster_list;
    }
    var enterprise_management_add_institutional = ajax_assistant(enterprise_management_add_institutional_url, enterprise_management_add_institutional_param_data, false, true, false);
    console.log(enterprise_management_add_institutional);
    if (1 != enterprise_management_add_institutional.status) {
      alert("机构信用代码证添加失败！")
    }
    //添加危化品经营许可证
    var hazardous_cluster_li = $("#enterprise_management_hazardous_attch ul").children("li");
    var hazardous_cluster_list = "";
    for (var i = 0; i < hazardous_cluster_li.length; i++) {
      var obj = hazardous_cluster_li[i];
      var hazardous_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != hazardous_cluster) {
       hazardous_cluster_list += hazardous_cluster + ";"; 
      }    
    }
    var enterprise_management_add_hazardous_url = PROJECT_PATH + "lego/lego_certificate?servletName=addHazardousChemicalsBusinessLicense";
    var enterprise_management_add_hazardous_param_data = {};
    enterprise_management_add_hazardous_param_data["enterprise_name"] = enterprise_name;
    enterprise_management_add_hazardous_param_data["parent_uuid"] = parent_uuid;
    if ("" != hazardous_cluster_list) {
      enterprise_management_add_hazardous_param_data["cluster_list"] = hazardous_cluster_list;
    }
    var enterprise_management_add_hazardous= ajax_assistant(enterprise_management_add_hazardous_url, enterprise_management_add_hazardous_param_data, false, true, false);
    console.log(enterprise_management_add_hazardous);
    if (1 != enterprise_management_add_hazardous.status) {
      alert("危化品经营许可证添加失败！")
    }
    //添加法人身份证
    var idcard_cluster_li = $("#enterprise_management_idcard_attch ul").children("li");
    var idcard_cluster_list = "";
    for (var i = 0; i < idcard_cluster_li.length; i++) {
      var obj = idcard_cluster_li[i];
      var idcard_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != idcard_cluster) {
       idcard_cluster_list += idcard_cluster + ";"; 
      }    
    }
    var enterprise_management_add_idcard_url = PROJECT_PATH + "lego/lego_certificate?servletName=addIdCard";
    var enterprise_management_add_idcard_param_data = {};
    enterprise_management_add_idcard_param_data["parent_uuid"] = parent_uuid;
    if ("" != idcard_cluster_list) {
      enterprise_management_add_idcard_param_data["cluster_list"] = idcard_cluster_list;
    }
    var enterprise_management_add_idcard= ajax_assistant(enterprise_management_add_idcard_url, enterprise_management_add_idcard_param_data, false, true, false);
    console.log(enterprise_management_add_idcard);
    if (1 != enterprise_management_add_idcard.status) {
      alert("法人身份证添加失败！")
    }
    //添加开户许可证
    var account_cluster_li = $("#enterprise_management_account_attch ul").children("li");
    var account_cluster_list = "";
    for (var i = 0; i < account_cluster_li.length; i++) {
      var obj = account_cluster_li[i];
      var account_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != account_cluster) {
       account_cluster_list += account_cluster + ";"; 
      }    
    }
    var enterprise_management_add_account_url = PROJECT_PATH + "lego/lego_certificate?servletName=addAccountOpeningPermit";
    var enterprise_management_add_account_param_data = {};
    enterprise_management_add_account_param_data["enterprise_name"] = enterprise_name;
    enterprise_management_add_account_param_data["parent_uuid"] = parent_uuid;
    if ("" != account_cluster_list) {
      enterprise_management_add_account_param_data["cluster_list"] = account_cluster_list;
    }
    var enterprise_management_add_account= ajax_assistant(enterprise_management_add_account_url, enterprise_management_add_account_param_data, false, true, false);
    console.log(enterprise_management_add_account);
    if (1 != enterprise_management_add_account.status) {
      alert("开户许可证添加失败！")
    }
    //添加安全生产许可证
    var safety_cluster_li = $("#enterprise_management_safety_attch ul").children("li");
    var safety_cluster_list = "";
    for (var i = 0; i < safety_cluster_li.length; i++) {
      var obj = safety_cluster_li[i];
      var safety_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != safety_cluster) {
       safety_cluster_list += safety_cluster + ";"; 
      }    
    }
    var enterprise_management_add_safety_url = PROJECT_PATH + "lego/lego_certificate?servletName=addSafetyProductionLicense";
    var enterprise_management_add_safety_param_data = {};
    enterprise_management_add_safety_param_data["enterprise_name"] = enterprise_name;
    enterprise_management_add_safety_param_data["parent_uuid"] = parent_uuid;
    if ("" != safety_cluster_list) {
      enterprise_management_add_safety_param_data["cluster_list"] = safety_cluster_list;
    }
    var enterprise_management_add_safety= ajax_assistant(enterprise_management_add_safety_url, enterprise_management_add_safety_param_data, false, true, false);
    console.log(enterprise_management_add_safety);
    if (1 != enterprise_management_add_safety.status) {
      alert("安全生产许可证添加失败！")
    }
    //添加营业执照
    var business_cluster_li = $("#enterprise_management_business_attch ul").children("li");
    var business_cluster_list = "";
    for (var i = 0; i < business_cluster_li.length; i++) {
      var obj = business_cluster_li[i];
      var business_cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != business_cluster) {
       business_cluster_list += business_cluster + ";"; 
      }    
    }
    var enterprise_management_add_business_url = PROJECT_PATH + "lego/lego_certificate?servletName=addBusinessLicense";
    var enterprise_management_add_business_param_data = {};
    enterprise_management_add_business_param_data["enterprise_name"] = enterprise_name;
    enterprise_management_add_business_param_data["parent_uuid"] = parent_uuid;
    if ("" != business_cluster_list) {
      enterprise_management_add_business_param_data["cluster_list"] = business_cluster_list;
    }
    var enterprise_management_add_business= ajax_assistant(enterprise_management_add_business_url, enterprise_management_add_business_param_data, false, true, false);
    console.log(enterprise_management_add_business);
    if (1 != enterprise_management_add_business.status) {
      alert("营业执照添加失败！")
    }
    $("#enterprise_management_add_modal").modal("hide");
    current_offset = 0;
    enterprise_management_search_condition = {};
    enterprise_management_server_data_cover();
    enterprise_management_fill_variable_data();
    enterprise_management_show_or_hide();
  } else {
    alert("企业信息添加失败！")
  }
}

/**
 * 获取企业证件
 */
function enterprise_management_get_certificate(uuid) {
  var enterprise_management_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  enterprise_management_search_condition = {};
  delete enterprise_management_search_condition["rows"];
  delete enterprise_management_search_condition["offset"];  
  enterprise_management_search_condition["uuid"] = uuid; 
  var enterprise_management_get_enterprise = ajax_assistant(enterprise_management_url, enterprise_management_search_condition, false, true, false);
  console.log(enterprise_management_get_enterprise);
  if (1 == enterprise_management_get_enterprise.status) {
    var result = JSON.parse(enterprise_management_get_enterprise.result);
    var parent_uuid = result[0].uuid;
    //获取开票信息
    var enterprise_management_get_invoice_url = PROJECT_PATH + "lego/lego_certificate?servletName=getInvoiceInformation";
    var enterprise_management_get_invoice_param_data = {};
    enterprise_management_get_invoice_param_data["parent_uuid"] = parent_uuid;
    var enterprise_management_get_invoice = ajax_assistant(enterprise_management_get_invoice_url, enterprise_management_get_invoice_param_data, false, true, false);
    console.log(enterprise_management_get_invoice);
    if (1 == enterprise_management_get_invoice.status) {
      var invoice_result = JSON.parse(enterprise_management_get_invoice.result);
      console.log(invoice_result);
      var invoice_cluster_list  = invoice_result[0].cluster_list;
      if (null != invoice_cluster_list){
        var invoice_cluster  = invoice_cluster_list.substring(0,invoice_cluster_list.lastIndexOf(";")).split(";");
        console.log(invoice_cluster);
        var invoice_file = "";
        for (var i = 0; i < invoice_cluster.length; i++) {
          var enterprise_management_get_invoice_file_url = PROJECT_PATH + "lego/lego_storage?servletName=getFileByClusterName";
          var enterprise_management_get_invoice_file_param_data = {};
          enterprise_management_get_invoice_file_param_data["cluster_name"] = invoice_cluster[i];
          var enterprise_management_get_invoice_file = ajax_assistant(enterprise_management_get_invoice_file_url, enterprise_management_get_invoice_file_param_data, false, true, false);
          console.log(enterprise_management_get_invoice_file);
          var invoice_file_arr = new Array();
          if (1 == enterprise_management_get_invoice_file.status) {
            var invoice_file_result = JSON.parse(enterprise_management_get_invoice_file.result);
            console.log(invoice_file_result);
          }
        }
      } else {
        
      }
      
      
    }
  }
}
/**
 * 修改企业模态框
 */
function enterprise_management_edit_modal(uuid) {
  var edit_modal = 
    '<div class="modal fade custom_modal" id="enterprise_management_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content" style="height: 700px;width:640px;">'+
          '<div class="modal-header bg-primary">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">修改企业信息</h4>'+
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
                '<div class="panel panel-default" id = "enterprise_management_edit_invoice_attch">'+
                  // '<div class="panel-body attch clearfix invoice_attch">'+
                  //   '<div class="pull-left has-feedback">'+
                  //     '<button class="btn bg-default">'+
                  //       '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
                  //     '</button>'+
                  //     '<input class="positionfile file_style" type="file"  value="" />'+
                  //   '</div>'+
                  //   /*'<div class="swiper-slide btn_slider position-relative">'+
                  //     '<img src="img/img2.jpg"/>'+
                  //     '<button class="btn btn-danger position-absolute ab-btn text-center btn-remove">'+
                  //     '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
                  //     '</button>'+
                  //   '</div>'+*/
                  // '</div>'+
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
                  '<div class="panel panel-default" id = "enterprise_management_edit_institutional_attch">'+
//                  '<div class="panel-body attch clearfix institutionalCreditCodeAttch">'+
//                    '<div class="pull-left has-feedback">'+
//                      '<button class="btn bg-default">'+
//                        '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                      '</button>'+
//                      '<input class="positionfile file_style" type="file"  value="" />'+
//                    '</div>'+
//                    /*'<div class="swiper-slide btn_slider position-relative">'+
//                      '<img src="img/img2.jpg"/>'+
//                      '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                      '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                      '</button>'+
//                    '</div>'+*/
//                  '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>危化品经营许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_edit_hazardous_attch">'+
//                    '<div class="panel-body attch clearfix HazardousChemicalsAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>法人身份证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_edit_idcard_attch">'+
//                    '<div class="panel-body attch clearfix IdCardAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>开户许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_edit_account_attch">'+
//                    '<div class="panel-body attch clearfix AccountOpeningPermitAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>安全生产许可证</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_edit_safety_attch">'+
//                    '<div class="panel-body attch clearfix SafetyProductionAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      ' </div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>营业执照</label>'+
                    '<div class="panel panel-default" id = "enterprise_management_edit_business_attch">'+
//                    '<div class="panel-body attch clearfix BusinessLicenseAttch">'+
//                      '<div class="pull-left has-feedback">'+
//                        '<button class="btn bg-default">'+
//                          '<span class="glyphicon glyphicon-plus" style="font-size:40px;margin-right:0;color:#fff;"></span>'+
//                        '</button>'+
//                        '<input class="positionfile file_style" type="file"  value="" />'+
//                      '</div>'+
//                      /*'<div class="swiper-slide btn_slider position-relative">'+
//                        '<img src="img/img2.jpg"/>'+
//                        '<button class="btn btn-danger position-absolute ab-btn text-center">'+
//                          '<span class="glyphicon glyphicon-remove  btn-danger font-size12"></span>'+
//                        '</button>'+
//                      '</div>'+*/
//                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-warning edit_btn">修改</button>'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $("body").append(edit_modal);
  upload_attachment_edit_output("#enterprise_management_edit_invoice_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_invoice_attch");
  upload_attachment_edit_output("#enterprise_management_edit_institutional_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_institutional_attch");
  upload_attachment_edit_output("#enterprise_management_edit_hazardous_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_hazardous_attch");
  upload_attachment_edit_output("#enterprise_management_edit_idcard_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_idcard_attch");
  upload_attachment_edit_output("#enterprise_management_edit_account_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_account_attch");
  upload_attachment_edit_output("#enterprise_management_edit_safety_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_safety_attch");
  upload_attachment_edit_output("#enterprise_management_edit_business_attch");
  upload_attachment_btn_event_bind("#enterprise_management_edit_business_attch");
  $("#enterprise_management_edit_modal").modal("show");
  $("#enterprise_management_edit_modal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
  //企业类型
  for(var i = 0; i < $("#enterprise_management_edit_modal select option").length; i++){
    var type = current_company_detail_data.type;
    console.log(type);
    if($("#enterprise_management_edit_modal select option").eq(i).val() == type) {
      $("#enterprise_management_edit_modal select option").eq(i).prop('selected','selected');
      break;
    }
  }
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
        '<div class="modal-content" style="height: 700px;width:640px;">'+
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
                    '<input type="text" class="form-control enterprise_name"  readonly="readonly" value = "' + current_company_detail_data.name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业简称</label>'+
                    '<input type="text" class="form-control enterprise_short_name" readonly="readonly" value = "' + current_company_detail_data.short_name + '">'+
                  '</div>'+
                  '<div class="form-group col-md-3">'+
                    '<label>企业类型</label>'+
                    '<select class="form-control enterprise_type" disabled="disabled">'+
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
                    '<input type="text" class="form-control registered_capital" readonly="readonly" value = "' + current_company_detail_data.registered_capital + '">'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<div class="form-group has-feedback">'+
                      '<label>成立时间</label>'+
                      '<input type="text" class="form-control data_cha establish_datetime" readonly="readonly" value = "' + current_company_detail_data.establish_datetime + '">'+
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
                    '<input type="text" class="form-control tax_identification_number" readonly="readonly" value = "' + current_company_detail_data.tax_identification_number + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>开户银行</label>'+
                    '<input type="text" class="form-control bank_name" readonly="readonly" value = "' + current_company_detail_data.bank_name + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-6">'+
                    '<label>银行账号</label>'+
                    '<input type="text" class="form-control account" readonly="readonly" value = "' + current_company_detail_data.account + '">'+
                  '</div>'+
                  '<div class="form-group col-md-6">'+
                    '<label>联系电话</label>'+
                    '<input type="text" class="form-control telephone_number" readonly="readonly" value = "' + current_company_detail_data.telephone_number + '">'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                  '<div class="form-group col-md-12">'+
                    '<label>地址</label>'+
                    '<input type="text" class="form-control address" readonly="readonly" value = "' + current_company_detail_data.address + '">'+
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
  for(var i = 0; i < $("#enterprise_management_detail_modal select option").length; i++){
    var type = current_company_detail_data.type;
    console.log(type);
    if($("#enterprise_management_detail_modal select option").eq(i).val() == type) {
      $("#enterprise_management_detail_modal select option").eq(i).prop('selected','selected');
      break;
    }
  }
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