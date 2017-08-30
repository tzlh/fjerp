/**
 * @author wangdi
 */
function MaterialDetails(rows, show_rows) {
  //分页material_pages
  this.rows = rows;
  this.show_rows = show_rows;
  this.current_offset = 0;
  this.material_condition = {};
  // 原料数据 
  this.material_details_data = {"data":[
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
  ]}; 

  //清空数据
  this.material_details_clear_raw_data = function(tank_breakdown_uuid) {
   $("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
   //$("#tank_breakdown_content" + tank_breakdown_uuid).find("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
  };

  //数据库数据覆盖
  this.material_details_server_data_cover = function(tank_breakdown_uuid) {
    //获取储罐原料记录分页
    var totalRows = 0;
    delete this.material_condition["rows"];
    delete this.material_condition["offset"];
    this.material_condition["material_uuid"] = tank_breakdown_uuid;
    var material_details_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecord&data_count=1";
    var material_details_get_contract = ajax_assistant(material_details_url, this.material_condition, false, true, false);
    if(1 == material_details_get_contract.status) {
      if (0 == material_details_get_contract.count) {
        $("#material_pages").html("");
      } else {
        var material_details_total_result = JSON.parse(material_details_get_contract.result);
        totalRows = material_details_get_contract.count;      
        generate_bootstrap_pagination_ctrl("#material_pages", this.current_offset, this.rows, this.show_rows, totalRows);
        this.material_condition["rows"] = this.rows;
        this.material_condition["offset"] = this.current_offset;
      }
    } else {
      alert("储罐原料记录数据获取失败");
      return;
    } 
    //获取储罐原料记录
    var material_details_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecord";
    var material_details_get_contract = ajax_assistant(material_details_url, this.material_condition, false, true, false);
    console.log(material_details_get_contract);
    this.material_details_data = {};
    if (1 == material_details_get_contract.status) {
      if (0 == material_details_get_contract.count) {
        this.material_details_data = {};
      } else {
        var tmp_arr = new Array();
        var material_details_get_result = JSON.parse(material_details_get_contract.result);  
        console.log(material_details_get_result);
        for (var i = 0; i < material_details_get_result.length; i++) {
          tmp_arr[i] = {"tank_uuid":material_details_get_result[i].material_uuid, "put_time":material_details_get_result[i].entry_datetime, "put_storage":material_details_get_result[i].entry_value, "uuid":material_details_get_result[i].uuid};
        }
        this.material_details_data["data"] = tmp_arr;
      }
    } else {
      alert("采购对账单数据获取失败");
    } 
  };

  //填充数据
  this.material_details_fill_variable_data = function(tank_breakdown_uuid) {
    if (isJsonObjectHasData(this.material_details_data)) {
     var material_details_html = "";
     for (var i = 0; i < this.material_details_data.data.length; i++) {
       var material_details_put_time = this.material_details_data.data[i].put_time;
       material_details_put_time = material_details_put_time.substring(0, material_details_put_time.indexOf(' '));
       material_details_html +=
         '<tr >'+
           '<td>' + i + '</td>'+
           '<td>' + material_details_put_time + '</td>'+
           '<td>' + this.material_details_data.data[i].put_storage + '</td>'+
           '<td><span class = "glyphicon glyphicon-remove material_details_remove" tank_uuid = "' + this.material_details_data.data[i].tank_uuid + '" uuid = "' + this.material_details_data.data[i].uuid + '"></span></td>'+
         '</tr>';
     }
      $("#material_details_content_box").html(material_details_html);
    } else {
      $("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
    }
  };

  //点击分页
  this.material_pages_func = function(obj) {
    this.current_offset = obj.attr("data-offset");
    var tank_uuid = obj.parent().parent().parent().attr("tank_uuid");
    this.material_condition["offset"] = this.current_offset;
    this.material_details_server_data_cover(tank_uuid);
    this.material_details_fill_variable_data(tank_uuid); 
  };

  //添加模态框
  this.material_details_add_modle = function(obj) {
    var tank_uuid = obj.attr("tank_uuid");
    var material_delete_html = 
        '<div class = "modal fade custom_modal" id = "material_add_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "document">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">添加入库明细</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom">'+
                 '<div class = "form-group has-feedback">'+
  '              <div class = "input-group">'+
  '                <span class = "input-group-addon">入库时间</span>'+
  '                <input type = "text" class = "form-control widget_datepicker material_details_time"  value = "">'+
  '              </div>'+
  '              <span class = "glyphicon glyphicon-calendar form-control-feedback" ></span>'+
  '            </div>'+ 
                  '<div class="form-group has-feedback">'+
                     '<div class="input-group">'+
                       '<span class="input-group-addon">入库值</span>'+
                       '<input type="text" class="form-control material_details_put_val">'+
                     '</div>'+
                  '</div>'+
              '</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-primary" id = "material_add_modle_prop_btn"  tank_uuid = "' + tank_uuid + '">添加</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(material_delete_html);
    $("#material_add_modle_prop").modal("show");
    $("#material_add_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    }); 
  };

  //添加数据
  this.material_details_add_data = function(obj) {
    var tank_uuid = obj.attr("tank_uuid");
    var material_details_time = obj.parents("#material_add_modle_prop").find(".material_details_time").val();
    if (0 < material_details_time.length) {
      material_details_time += ' 00:00:00';
    }
    var material_details_put_val = obj.parents("#material_add_modle_prop").find(".material_details_put_val").val();
    if (null == material_details_time.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      alert("请选择入库时间！");
      return;
    }
    if (null == material_details_put_val.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的入库值！");
      return;
    }
    var material_data = {
       "material_uuid":tank_uuid,
       "entry_value":material_details_put_val,
       "entry_datetime":material_details_time
    };
    //var material_details_add_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialRecord";
    //var material_details_add_get_contract = ajax_assistant(material_details_add_url, material_data, false, true, false);
    //if ("1" != material_details_add_get_contract.status) {
    if ("123" != material_details_put_val) {
      alert("添加原料失败");
    } else {  
      // 更新页面数据
      this.material_details_clear_raw_data(tank_uuid);
      //this.material_details_server_data_cover(tank_uuid);
      
      this.material_details_data = {"data":[
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
      ]}; 
      this.material_details_fill_variable_data(tank_uuid);
      $("#material_add_modle_prop").modal("hide");
      $("#material_add_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //删除按钮
  this.material_details_remove_modle = function(obj) {
    var material_uuid = obj.attr("uuid");
    var tank_uuid = obj.attr("tank_uuid");
    var material_delete_html = 
        '<div class = "modal fade custom_modal" id = "material_delete_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "documeint">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">删除原料明细确认</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom"  style = "text-align: center;">确认要删除吗？</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-danger" id = "material_delete_modle_prop_btn" tank_uuid = "' + tank_uuid + '" uuid = "' + material_uuid + '">删除</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(material_delete_html);
    $("#material_delete_modle_prop").modal("show");
    $("#material_delete_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  };

  //删除数据
  this.material_details_remove_data = function(obj) {
    var uuid = obj.attr("uuid");
    var tank_uuid = obj.attr("tank_uuid");
    var data = {
      "uuid":uuid
    };
    //接口数据
    //var material_details_delete_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterialRecord";
    //var material_details_delete_data_get = ajax_assistant(material_details_delete_data_url, data, false, true, false);
    //if ("1" != material_details_delete_data_get.status){
    if ("11111111111" != uuid){
      alert("删除储罐失败");
    } else {  
      // 更新页面数据
      this.material_details_clear_raw_data(tank_uuid);
      //this.material_details_server_data_cover(tank_uuid);
      this.material_details_data = {"data":[
         {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
         {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
       ]}; 
      this.material_details_fill_variable_data(tank_uuid);
      $("#material_delete_modle_prop").modal("hide");
      $("#material_delete_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //输出文本
  this.material_output = function(content_box) {
    var content = 
     '<div class="panel panel-primary ">'+
     '  <div class="panel-heading clearfix">原料明细<span class = "glyphicon glyphicon-plus pull-right" id = "material_details_plus"></span></div>'+
     '  <div class="panel-body">'+
     '    <table class="table">'+
     '      <thead>'+
     '        <tr>'+
     '          <th>#</th>'+
     '          <th>入库时间</th>'+
     '          <th>入库值</th>'+
     '          <th>删除</th>'+
     '        </tr>'+
     '      </thead>'+
     '      <tbody id = "material_details_content_box">'+
     '        <tr>'+
     '          <td>1</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td>2</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '          <td>3</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '      </tbody>'+
     '    </table>'+
     '  </div>'+
     '  <div id = "material_pages" class = " clearfix">'+
     '    <nav aria-label="Page navigation" style="text-align: right;">'+
     '      <ul class="pagination">'+
     '        <li class="active"><span href="#">1</span></li>'+
     '      </ul>'+
     '    </nav>'+
     '  </div>'
     '</div>';
   $(content_box).html(content); 
  };
};
