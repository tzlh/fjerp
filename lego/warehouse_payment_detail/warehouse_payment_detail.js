/**
 * @author yangyongxia
 */
// 自运营企业变量
var owner_enterprise_uuid_list = null;

// 合同数据变量
var contact_search_list = null;

var warehouse_payment_detail_data = [
  {"sign_datetime": "2017-02-21", "receipt": "2000000", "payment": "2000000", "capital_occupying": "200000", "interest": "25000"},
  {"sign_datetime": "2017-02-21", "receipt": "2000000", "payment": "2000000", "capital_occupying": "200000", "interest": "25000"},
  {"sign_datetime": "2017-02-21", "receipt": "2000000", "payment": "2000000", "capital_occupying": "200000", "interest": "25000"},
  {"sign_datetime": "2017-02-21", "receipt": "2000000", "payment": "2000000", "capital_occupying": "200000", "interest": "25000"},
  {"sign_datetime": "2017-02-21", "receipt": "2000000", "payment": "2000000", "capital_occupying": "200000", "interest": "25000"}
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
          '<td>' + warehouse_payment_detail_data[i].sign_datetime + '</td>'+
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
  if(1 == get_enterprise.status) {
    var result = JSON.parse(get_enterprise.result);
    owner_enterprise_uuid_list = new Array();
    for (var i = 0; i < result.length; i++) {
      owner_enterprise_uuid_list.push(result[i].uuid);
    }
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
  // console.log(get_contract);
  if(1 == get_contract.status) {
    var result = JSON.parse(get_contract.result);
    contact_search_list = new Array();
    for (var i = 0; i < result.length; i++) {
      contact_search_list.push({
        "uuid": result[i].uuid,
        "buyer_uuid": result[i].buyer_uuid,
        "seller_uuid": result[i].seller_uuid,
        "contract_code": result[i].contract_code,
        "total": (result[i].price * result[i].quantity),
        "sign_datetime": result[i].sign_datetime,
        "type": result[i].type,
      });
    }
    // console.log(contact_search_list);
  } else {
    alert("合同获取失败");
  }
}

// 根据uuid获取合同的json对象
function get_contract_uuid(uuid) {
    for (var i = 0; i < contact_search_list.length; i++) {
      if (contact_search_list[i].uuid == uuid) {
        return contact_search_list[i];
      }
    }
}

/**
 * 计算数据
 */
function calc_data(loan_capital, start_sign_datetime, end_sign_datetime) {
  warehouse_payment_detail_data = new Array();
  // 根据开始时间和结束时间填充json数组中对象的sign_datetime
  for (var i = new Date(start_sign_datetime); i < new Date(end_sign_datetime); i.setDate(i.getDate() + 1)) {
    var timestamp = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate();
    warehouse_payment_detail_data.push({
      "sign_datetime": timestamp,
      "receipt": 0,
      "payment": 0,
      "capital_occupying": 0,
      "interest": 0
    });
  }
  // 自营企业的所有合同
  var owner_enterpirse_contract = new Array();
  // 找到合同中所有销售方为“自营企业”的数据，填充收款数据receipt
  for (var i = 0; i < contact_search_list.length; i++) {
    for (var j = 0; j < owner_enterprise_uuid_list.length; j++) {
      if (contact_search_list[i].buyer_uuid == owner_enterprise_uuid_list[j]) {
        owner_enterpirse_contract.push(contact_search_list[i].uuid);
        break;
      }
      if (contact_search_list[i].seller_uuid == owner_enterprise_uuid_list[j]) {
        owner_enterpirse_contract.push(contact_search_list[i].uuid);
        break;
      }
    }
  }
  // 找到自营企业合同数据中，所有销售合同且添加至receipt，所有采购合同且添加至payment
  for (var i = 0; i < owner_enterpirse_contract.length; i++) {
    var contract_datetime = new Date(get_contract_uuid(owner_enterpirse_contract[i]).sign_datetime);
    console.log(contract_datetime.toLocaleDateString());
    for (var j = 0; j < warehouse_payment_detail_data.length; j++) {
      var display_datetime = new Date(warehouse_payment_detail_data[j].sign_datetime);
      console.log(display_datetime.toLocaleDateString());
      if ((display_datetime.getFullYear() == contract_datetime.getFullYear()) && (display_datetime.getMonth() == contract_datetime.getMonth()) && (display_datetime.getDate() == contract_datetime.getDate())) {
        // 时间节点相同的情况下
        if (1 == get_contract_uuid(owner_enterpirse_contract[i]).type) {
          warehouse_payment_detail_data[j]["receipt"] += get_contract_uuid(owner_enterpirse_contract[i]).total;
        } else if (0 == get_contract_uuid(owner_enterpirse_contract[i]).type) {
          warehouse_payment_detail_data[j]["payment"] += get_contract_uuid(owner_enterpirse_contract[i]).total;
        }
      }
    }
  }
  // 计算“占用资金”和“利息”
  for (var i = 0; i < warehouse_payment_detail_data.length; i++) {
    if (0 == i) {
      warehouse_payment_detail_data[i]["capital_occupying"] = loan_capital;
    } else {
      warehouse_payment_detail_data[i]["capital_occupying"] = warehouse_payment_detail_data[i - 1]["capital_occupying"] + warehouse_payment_detail_data[i]["payment"] - warehouse_payment_detail_data[i]["receipt"];
    }
    warehouse_payment_detail_data[i]["interest"] = warehouse_payment_detail_data[i]["capital_occupying"] * 0.1 / 12 / 30;
  }
}
