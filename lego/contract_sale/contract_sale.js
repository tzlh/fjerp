/**
 * @author wangdi
 */

/**
 * 分页变量
 */
var rows = 2;
var current_offset = 0;

/**
 * 企业
 */
var enterprise_data={"data":[
  {"short_name":"腾智联合", "uuid":"77777777777777777777777777777771"},
  {"short_name":"腾智联", "uuid":"77777777777777777777777777777772"},
  {"short_name":"腾智", "uuid":"77777777777777777777777777777773"},
  {"short_name":"腾智联合有限公司", "uuid":"77777777777777777777777777777774"},
  {"short_name":"金莲", "uuid":"77777777777777777777777777777775"},
  {"short_name":"云谷", "uuid":"77777777777777777777777777777776"}]  
};

/**
 * 储罐租赁合同
 * contract_code:合同编号
 * lessor_uuid:出租方
 * leaser_uuid:承租方
 */
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

/**
 * 全局搜索条件
 */
var search_condition = {};

function clear_raw_data() {
  $("#contract_warehouse_pages").html("");
  $("#contract_warehouse_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
}

/**
 * 服务器数据
 */
function new_server_data_fill() {
  var totalRows = 0;
  var contract_warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  delete search_condition["rows"];
  delete search_condition["offset"];  
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, search_condition, false, true, false);
  if(1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      $("#contract_warehouse_pages").html("");
    } else {
      var result = JSON.parse(warehouse_pot_get_contract.result);  
      totalRows = result.length;
      generate_bootstrap_pagination_ctrl("#contract_warehouse_pages", current_offset, rows, 6, totalRows);
      search_condition["rows"] = rows;
      search_condition["offset"] = current_offset;
    }
  } else {
    alert("储罐合同数据获取失败");
  }
  
  //获取储罐合同
  var contract_warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getContractWarehousePot";
  var warehouse_pot_get_contract = ajax_assistant(contract_warehouse_url, search_condition, false, true, false);
  //获取企业
  var contract_warehouse_enterprise_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  var warehouse_pot_get_contract_enterprise = ajax_assistant(contract_warehouse_enterprise_url, "", false, true, false);
  contract_warehouse_data = {};
  if (1 == warehouse_pot_get_contract.status) {
    if (0 == warehouse_pot_get_contract.count) {
      contract_warehouse_data = {};
    } else {
      var tmp_arr = new Array();
      var result = JSON.parse(warehouse_pot_get_contract.result);  
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        tmp_arr[i] = {"contract_code":result[i].contract_code, "lessor_uuid":result[i].lessor_uuid, "leaser_uuid":result[i].leaser_uuid, "start_datetime":result[i].start_datetime, "end_datetime":result[i].end_datetime, "uuid":result[i].uuid};
      }
      contract_warehouse_data["data"] = tmp_arr;
    }
  } else {
    alert("储罐合同数据获取失败");
  }
  //企业
  enterprise_data = {};
  if (1 == warehouse_pot_get_contract_enterprise.status) {
      if (0 == warehouse_pot_get_contract_enterprise.count) {
        enterprise_data = {};
      } else {
        var tmp_arr_pot = new Array();
        var result_enterprise = JSON.parse(warehouse_pot_get_contract_enterprise.result);  
       console.log(result_enterprise);
        for (var i = 0; i < result_enterprise.length; i++) {
          // name id uuid
          tmp_arr_pot[i] = {"short_name":result_enterprise[i].short_name, "uuid":result_enterprise[i].uuid};
        }
        enterprise_data["data"] = tmp_arr_pot;
      }
  } else {
      alert("企业信息数据获取失败");
  }
}

function contract_warehouse_pages_fun(obj) {
  current_offset = obj.attr("data-offset");
  search_condition["offset"] = current_offset;
  new_server_data_fill();
  fill_variable_data();
}

function contract_sale_output(output_id) {
  var content = 
    '<div class="panel panel-primary">'+
'     <div class="panel-heading clearfix">销售合同管理<span class="glyphicon glyphicon-plus pull-right" data-toggle="modal" data-target="#add_sales"></span></div>'+
'   <div class="container-fluid">'+
'     <div class="row mt20">'+
'         <div class="col-lg-2">'+
'           <div class="form-inline">'+
'             <div class="form-group" style="width: 100%;">'+
'                 <label class="sr-only">合同编号</label>'+
'                 <div class="input-group" style="width: 100%;">'+
'                   <div class="input-group-addon">合同编号</div>'+
'                   <input type="text" class="form-control" id="contract_input" placeholder="">'+
'                   <span class="input-group-btn">'+
'                     <button class="btn btn-primary " type="button" id="contract_search"><span class="glyphicon glyphicon-search"></span></button>'+
'                   </span>'+
'                 </div>'+
'             </div>'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-2">'+
'           <div class="input-group">'+
'             <div class="input-group-addon">购买方</div>'+
'             '+
'                 '+
'                   <select class="form-control" value="" id="buyer_a">'+
'                   '+
'                 </select>'+
'                 '+
'               '+
'             </div>'+
'         </div>'+
'         <div class="col-lg-2">'+
'           <div class="input-group">'+
'             <div class="input-group-addon">销售方</div>'+
'                   <select class="form-control" value="" id="sale_a">'+
'                 </select>'+
'             </div>'+
'         </div>'+
'         <div class="col-lg-3">'+
'           <div class="input-group">'+
'               <span class="input-group-addon" id="">名称</span>'+
'               <input type="text" id="product_name" class="form-control" placeholder="">'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-3">'+
'           <div class="input-group">'+
'               <span class="input-group-addon" id="">品类</span>'+
'               <input type="text" id="real_name" class="form-control" placeholder="">'+
'           </div>'+
'         </div>'+
'       </div>'+
'       <div class="row mt20">'+
'         <div class="col-lg-2">'+
'           <div class="input-group">'+
'               <span class="input-group-addon" >来源库区</span>'+
'               <select class="form-control" value="">'+
'               </select>'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-2">'+
'           <div class="input-group">'+
'               <span class="input-group-addon">发票状态</span>'+
'               <select class="form-control" value="" id="invoice_a">'+
'                 <option value="">--请选择--</option>'+
'                 <option value="1">已收到</option>'+
'                 <option value="0">未收到</option>'+
'               </select>'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-3">'+
'           <div class="input-group">'+
'               <div class="form-group has-feedback">'+
'               <div class="input-group">'+
'                 <span class="input-group-addon">签署时间（起）</span>'+
'                 <input type="text" class="form-control data_cha" id="start_sign_datetime" value="">'+
'               </div>'+
'               <span class="glyphicon glyphicon-calendar form-control-feedback" ></span>'+
'             </div>'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-3">'+
'           <div class="input-group">'+
'               <div class="form-group has-feedback">'+
'               <div class="input-group">'+
'                 <span class="input-group-addon">签署时间（止）</span>'+
'                 <input type="text" class="form-control data_cha" id="end_sign_datetime" value="">'+
'               </div>'+
'               <span class="glyphicon glyphicon-calendar form-control-feedback" ></span>'+
'             </div>'+
'           </div>'+
'         </div>'+
'         <div class="col-lg-2">'+
'           <button type="button" class="btn btn-primary" id="contract_search_all">搜索</button>'+
'         </div>'+
'       </div>'+
'       <div class="row">'+
'         <div class="col-lg-12">'+
'           <div class="panel panel-primary">'+
'               <div class="panel-heading">数据显示筛选</div>'+
'               <table class="table" width="100%" border="0" cellpadding="0" cellspacing="0">'+
'                 <tr class="companyInfo">'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input tabindex="2" type="checkbox" checked class="check_btn" id="collection_record_c">'+
'                     </div>'+
'                     <label for="collection_record_c">收款记录</label>'+
'                   </td>'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input  type="checkbox" checked class="check_btn" id="logistics_contract_c">'+
'                     </div>'+
'                     <label for="logistics_contract_c">物流合同</label>'+
'                   </td>'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input  type="checkbox" checked class="check_btn" id="vessel_information_c">'+
'                     </div>'+
'                     <label for="vessel_information_c">车船信息</label>'+
'                   </td>'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input  type="checkbox" checked class="check_btn" id="lading_c">'+
'                     </div>'+
'                     <label for="lading_c">提货委托函</label>'+
'                   </td>'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input type="checkbox" checked class="check_btn" id="acknowledgement_c">'+
'                     </div>'+
'                     <label for="acknowledgement_c">货物确认函</label>'+
'                   </td>'+
'                   <td  align="center">'+
'                     <div class="icheckbox_square-blue">'+
'                       <input type="checkbox" checked class="check_btn" id="sales_settlement_c">'+
'                     </div>'+
'                     <label for="sales_settlement_c">销售结算函</label>'+
'                   </td>'+
'                 </tr>'+
'               </table>'+
'           </div>'+
'         </div>'+
'       </div>'+
'       <div class="row mt20">'+
'         <div class="col-lg-12">'+
'           <table cellpadding="0" cellspacing="0" border="0" width="100%" class="table">'+
'             <thead>'+
'               <tr>'+
'                 <th>展开详情</th>'+
'                 <th>合同编号</th>'+
'                 <th>购买方</th>'+
'                 <th>销售方</th>'+
'                 <th>名称</th>'+
'                 <th>品类</th>'+
'                 <th>单价</th>'+
'                 <th>数量（吨）</th>'+
'                 <th>合计</th>'+
'                 <th>交货时间</th>'+
'                 <th>&nbsp;</th>'+
'               </tr>'+
'             </thead>'+
'             <tbody id="contract_content">'+
'             </tbody>'+
'           </table>'+
'         </div>'+
'       </div>'+
'       <div></div>'+
'   </div>'+
' </div>';
    $(output_id).html(content);
}
