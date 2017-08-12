//复选框 icheck
function checkbox() {
  $("input").iCheck({
    checkboxClass: 'icheckbox_square-blue',
  });
}
//初始化
function clear_raw_data() {
  $("#company_management_list").html("");
}
//企业信息列表变量
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
function fill_variable_data() {
  if (isJsonObjectHasData(company_data)) {
    
  }
}