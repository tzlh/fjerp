/**
 * @author yangyongxia
 */

var warehouse_payment_detail_data = [
  {"start_sign_datetime": "2017-02-21","receipt": "2000000","payment": "2000000","capital_occupying": "200000","interest": "25000"},
  {"start_sign_datetime": "2017-02-21","receipt": "2000000","payment": "2000000","capital_occupying": "200000","interest": "25000"},
  {"start_sign_datetime": "2017-02-21","receipt": "2000000","payment": "2000000","capital_occupying": "200000","interest": "25000"},
  {"start_sign_datetime": "2017-02-21","receipt": "2000000","payment": "2000000","capital_occupying": "200000","interest": "25000"},
  {"start_sign_datetime": "2017-02-21","receipt": "2000000","payment": "2000000","capital_occupying": "200000","interest": "25000"}
];

function warehouse_payment_detail_clear_raw_data() {
  $("#contact_management_list tbody").html("");
}

function warehouse_payment_detail_fill_variable_data() {
  if (isJsonObjectHasData(warehouse_payment_detail_data)) {
    var content = "";
    for (var i = 0; i < warehouse_payment_detail_data.length; i++){
      content += 
        '<tr>'+
          '<td>' + warehouse_payment_detail_data[i].start_sign_datetime + '</td>'+
          '<td>' + warehouse_payment_detail_data[i].receipt + '</td>'+
          '<td>' + warehouse_payment_detail_data[i].payment + '</td>'+
          '<td>' + warehouse_payment_detail_data[i].capital_occupying + '</td>'+
          '<td>' + warehouse_payment_detail_data[i].interest + '</td>'+
        '</tr>';
      $("#contact_management_list tbody").html(content);
    }
  } else {
    $("#contact_management_list tbody").html('<tr><td  colspan = "5">没有数据</td></tr>');
  }
}

/**
 * 获取自运营企业
 */
function warehouse_payment_detail_get_enterprise() {
  var get_enterprise_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  var get_enterprise_param_data = {};
  get_enterprise_param_data["type"] = "1";
  var get_enterprise = ajax_assistant(get_enterprise_url, get_enterprise_param_data, false, true, false);
  console.log(get_enterprise);
  if(1 == get_enterprise.status) {
    var result = JSON.parse(get_enterprise.result);
    console.log(result);
      
   
  } else {
    alert("企业信息获取失败");
  }
}

/**
 * 获取合同
 */
function warehouse_payment_detail_get_contract() {
  var get_contract_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getContractTrade";
  var get_contract_param_data = {};
  var get_contract = ajax_assistant(get_contract_url, get_contract_param_data, false, true, false);
  console.log(get_contract);
  if(1 == get_contract.status) {
    var result = JSON.parse(get_contract.result);
    console.log(result);
      
   
  } else {
    alert("合同获取失败");
  }
}
