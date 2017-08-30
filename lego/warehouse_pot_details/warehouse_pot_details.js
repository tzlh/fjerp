/**
 * @author wangdi
 */
function WarehousePotDetails() {
  // 储罐信息
  this.potDetailsData = {"data":[
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
  }; 

  //清空数据
  this.clearRawData = function(warehouse_breakdown_uuid) {
    //$("#warehouse_breakdown_content" + warehouse_breakdown_uuid).find("#warehouse_pot_details_content_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    $("#warehouse_pot_details_content_box").html('<tr><td colspan = "6" align = "center">没数据</td></tr>');
  };

  //服务器数据覆盖
  this.serverDataCover =function(warehouse_breakdown_uuid) {
    //获取所有原料的入库值总和
    var potMaterialSumUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecordSum";
    //获取原料明细
    var warehousePotData = {
      "pot_uuid":warehouse_breakdown_uuid 
    }
    var warehouse_pot_details_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterial";
    var warehouse_pot_details_get_contract = ajax_assistant(warehouse_pot_details_url, warehousePotData, false, true, false);
    this.potDetailsData = {};
    if (1 == warehouse_pot_details_get_contract.status) {
      if (0 != warehouse_pot_details_get_contract.count) {
        var warehouse_pot_details_result = JSON.parse(warehouse_pot_details_get_contract.result);
        var tmp_arr = new Array();
        for (var i = 0; i < warehouse_pot_details_result.length; i++) {
          var pot_data = {
            "material_uuid":warehouse_pot_details_result[i].uuid
          } 
          var pot_material_sum_get_contract = ajax_assistant(potMaterialSumUrl, pot_data, false, true, false);
          var pot_material_sum_result = JSON.parse(pot_material_sum_get_contract.result);
          console.log(pot_material_sum_result)
          var check_value_all = warehouse_pot_details_result[i].check_value;  
          var difference_c = check_value_all - pot_material_sum_result[0].sum;
          tmp_arr[i] = {"warehouse_uuid":warehouse_pot_details_result[i].pot_uuid, "ingredient_name":warehouse_pot_details_result[i].name,  "put_storage":pot_material_sum_result[0].sum, "cull_value":check_value_all, "difference":difference_c, "uuid":warehouse_pot_details_result[i].uuid};
        }
        this.potDetailsData["data"] = tmp_arr; 
      } else {
        this.potDetailsData = {};
      }
    } else {
      alert("获取原料明细失败");
    }
  };

  //填充数据
  this.fillVariableData = function(warehouse_breakdown_uuid) {
    if (isJsonObjectHasData(this.potDetailsData)) {
     var warehouse_pot_details_html = "";
     for (var i = 0; i < this.potDetailsData.data.length; i++) {
       warehouse_pot_details_html +=
         '<tr class = "warehouse_pot_details_tr">'+
           '<td width = "10%"><button type = "button" class = "btn btn-info btn-xs warehouse_pot_details_open_btn" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid + '"  uuid = "' + this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
           '<td width = "20%" style = "text-align: center;">'+
             '<div class="input-group">'+
               '<input type="text" class="form-control warehouse_pot_ingredient_val" value = "' + this.potDetailsData.data[i].ingredient_name + '">'+
               '<span class="input-group-addon warehouse_pot_ingredient_icon" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' +  this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
             '</div>'+
           '</td>'+
           '<td width = "20%" style = "text-align: center;">' + this.potDetailsData.data[i].put_storage + '</td>'+
           '<td width = "20%" style = "text-align: center;">'+
           '   <div class="input-group">'+
           '     <input type="text" class="form-control warehouse_pot_cull_value" value = "' + this.potDetailsData.data[i].cull_value + '">'+
           '     <span class="input-group-addon warehouse_pot_cull_icon" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' +  this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
           '   </div>'+
           ' </td>'+
           '<td width = "20%" style = "text-align: center;">' + this.potDetailsData.data[i].difference + '</td>'+
           '<td width = "10%"><span class = "glyphicon glyphicon-remove warehouse_pot_details_remove" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' + this.potDetailsData.data[i].uuid + '"></span></td>'+
         '</tr>';
     }
      $("#warehouse_pot_details_content_box").html(warehouse_pot_details_html);
    } else {
      $("#warehouse_pot_details_content_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    }
  };

  //展开库区明细
  this.openInfoFunc = function(obj) {
    var warehouse_pot_details_uuid = obj.attr("uuid");
    var warehouse_pot_details_sub_html =
      '<tr class = "warehouse_pot_details_sub_all">'+
        '<td colspan="11">'+
          '<div class="row">'+
            '<div class="col-lg-12">'+
              '<div id = "warehouse_pot_details_content' + warehouse_pot_details_uuid + '"></div>'+
            '</div>'+
          '</div>'+
        '</td>'+
      '</tr>';
    if (obj.hasClass("active")) {
      obj.find(".glyphicon").removeClass("glyphicon-chevron-up");
      obj.removeClass("active");
      obj.parent().parent().nextUntil(".warehouse_pot_details_tr").remove();
      contract_sales_html = "";
    } else {
      obj.find(".glyphicon").addClass("glyphicon-chevron-up");
      obj.addClass("active");
      obj.parent().parent().after(warehouse_pot_details_sub_html);
    }
//    material_breakdown.material_output("#warehouse_pot_details_content" + warehouse_pot_details_uuid);
//    $("#warehouse_pot_details_content" + warehouse_pot_details_uuid).find("#material_breakdown_plus").attr("warehouse_pot_uuid", warehouse_pot_details_uuid);
 //   $("#warehouse_pot_details_content" + warehouse_pot_details_uuid).find("#material_pages").attr("warehouse_pot_uuid", warehouse_pot_details_uuid);
 //   material_breakdown.material_breakdown_clear_raw_data(warehouse_pot_details_uuid);
 //   material_breakdown.material_breakdown_server_data_cover(warehouse_pot_details_uuid);
 //   material_breakdown.material_breakdown_fill_variable_data(warehouse_pot_details_uuid);
  };

  //添加模态框
  this.addModle = function(obj) {
    var warehouse_uuid = obj.attr("warehouse_uuid");
    var warehouse_pot_delete_html = 
        '<div class = "modal fade custom_modal" id = "warehouse_pot_add_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "document">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">添加原料名称</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom">'+
                 '<div class="form-group has-feedback">'+
                    '<div class="input-group">'+
                       '<span class="input-group-addon">原料名称</span>'+
                       '<input type="text" class="form-control warehouse_pot_material_name">'+
                     '</div>'+
                  '</div>'+
                 '<div class="form-group has-feedback">'+
                    '<div class="input-group">'+
                       '<span class="input-group-addon">检尺值</span>'+
                       '<input type="text" class="form-control warehouse_pot_material_check_value">'+
                     '</div>'+
                  '</div>'+
              '</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-primary" id = "warehouse_pot_add_modle_prop_btn"  warehouse_uuid = "' + warehouse_uuid + '">添加</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(warehouse_pot_delete_html);
    $("#warehouse_pot_add_modle_prop").modal("show");
    $("#warehouse_pot_add_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });  
  };

  //添加数据
  this.addData = function(obj) {
    var warehouse_uuid = obj.attr("warehouse_uuid");
    var warehouse_pot_material_name = obj.parents("#warehouse_pot_add_modle_prop").find(".warehouse_pot_material_name").val();
    var warehouse_pot_material_check_value = obj.parents("#warehouse_pot_add_modle_prop").find(".warehouse_pot_material_check_value").val();
    if (null == warehouse_pot_material_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的原料名称！");
      return;
    }
    if (null == warehouse_pot_material_check_value.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的检尺值！");
      return;
    }
    var warehouse_pot_data = {
       "pot_uuid":warehouse_uuid,
       "name":warehouse_pot_material_name,
       "check_value":warehouse_pot_material_check_value
    }
    console.log(warehouse_uuid)
    //var warehouse_pot_details_add_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterial";
    //var warehouse_pot_details_add_get_contract = ajax_assistant(warehouse_pot_details_add_url, warehouse_pot_data, false, true, false);
    //if ("1" == warehouse_pot_details_add_get_contract.status) {
    if ("abc" == warehouse_pot_material_name) {
      this.clearRawData(warehouse_uuid);
      //this.serverDataCover(warehouse_uuid);
      this.potDetailsData = {"data":[
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
      }; 
      this.fillVariableData(warehouse_uuid);
      $("#warehouse_pot_add_modle_prop").modal("hide");
      $("#warehouse_pot_add_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    } else {
      alert("添加储罐明细失败")
    }
  };

  //修改原料名称
  this.editName = function(obj) {
    var warehouse_uuid = obj.attr("warehouse_uuid"); 
    var uuid = obj.attr("uuid");
    var warehouse_pot_material_name = obj.siblings(".warehouse_pot_ingredient_val").val();
    if(null == warehouse_pot_material_name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的原料名称！");
      return;
    }
    var data = {
      "uuid":uuid,
      "name":warehouse_pot_material_name
    } 
    //var warehouse_pot_details_edit_name_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterial";
    //var warehouse_pot_details_edit_name_delete_data_get = ajax_assistant(warehouse_pot_details_edit_name_data_url, data, false, true, false);
    //if ("1" == warehouse_pot_details_edit_name_delete_data_get.status) {
      if ("abc" == warehouse_pot_material_name) {
      this.clearRawData(warehouse_uuid);
      //this.serverDataCover(warehouse_uuid);
      this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料aaaaaaa", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouse_uuid);
      alert("修改原料名称成功")
    } else {
      alert("修改原料名称失败")
    }
  };

  //修改检尺值
  this.editCull = function(obj) {
    var uuid = obj.attr("uuid");
    var warehouse_uuid = obj.attr("warehouse_uuid");
    var warehouse_pot_edit_cull = obj.siblings(".warehouse_pot_cull_value").val();
    if (null == warehouse_pot_edit_cull.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的检尺值！");
      return;
    }
    var data = {
      "uuid":uuid,
      "check_value":warehouse_pot_edit_cull
    }
    //var warehouse_pot_details_edit_cull_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterial";
    //var warehouse_pot_details_edit_cull_delete_data_get = ajax_assistant(warehouse_pot_details_edit_cull_data_url, data, false, true, false);
    //if ("1" == warehouse_pot_details_edit_cull_delete_data_get.status) {
    if ("123" == warehouse_pot_edit_cull) {
      alert("修改检尺值成功");
      this.clearRawData(warehouse_uuid);
      //this.serverDataCover(warehouse_uuid);
      this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"1888888", "difference":"-200", "uuid":"00000000000000000000000000000001"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouse_uuid);
    } else {
      alert("修改检尺值失败");
    }
  };

  //删除按钮
  this.removeModle = function(obj) {
    var warehouse_pot_uuid = obj.attr("uuid");
    var warehouse_uuid = obj.attr("warehouse_uuid");
    var warehouse_pot_delete_html = 
        '<div class = "modal fade custom_modal" id = "warehouse_pot_delete_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "document">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">删除储罐明细确认</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom"  style = "text-align: center;">确认要删除吗？</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-danger" id = "warehouse_pot_delete_modle_prop_btn" warehouse_uuid = "'+ warehouse_uuid +'" uuid = "' + warehouse_pot_uuid + '">删除</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(warehouse_pot_delete_html);
    $("#warehouse_pot_delete_modle_prop").modal("show");
    $("#warehouse_pot_delete_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  };

  //删除数据
  this.removeData = function(obj) {
    var uuid = obj.attr("uuid");
    var warehouse_uuid = obj.attr("warehouse_uuid");
    var data = {
      "uuid":uuid
    };
    //接口数据
    //var warehouse_pot_details_delete_data_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterial";
    //var warehouse_pot_details_delete_data_get = ajax_assistant(warehouse_pot_details_delete_data_url, data, false, true, false);
    //if ("1" != warehouse_pot_details_delete_data_get.status){
    if ("00000000000000000000000000000001" != uuid) {
      alert("删除储罐失败");
    } else {  
      // 更新页面数据
      this.clearRawData(warehouse_uuid);
      //this.serverDataCover(warehouse_uuid);
       this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouse_uuid);
      $("#warehouse_pot_delete_modle_prop").modal("hide");
      $("#warehouse_pot_delete_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //输出文本
  this.warehousePotOutput = function(content_box_id) {
    var content = 
     '<div class="panel panel-primary ">'+
     '  <div class="panel-heading clearfix">储罐明细<span class = "glyphicon glyphicon-plus pull-right" id = "warehouse_pot_add_plus"></span></div>'+
     '  <div class="panel-body">'+
     '    <table class="table">'+
     '      <thead>'+
     '        <tr>'+
     '          <th>#</th>'+
     '          <th style = "text-align: center;">原料名称</th>'+
     '          <th style = "text-align: center;">入库值</th>'+
     '          <th style = "text-align: center;">检尺值</th>'+
     '          <th style = "text-align: center;">差值</th>'+
     '          <th>删除</th>'+
     '        </tr>'+
     '      </thead>'+
     '      <tbody id = "warehouse_pot_details_content_box">'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td>100</td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%" style = "text-align: center;"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料b" >'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>          </td>'+
     '          <td width = "20%" style = "text-align: center;">3000</td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a" >'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">3000</td>'+
     '          <td width = "20%" style = "text-align: center;" width = "300">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '      </tbody>'+
     '    </table>'+
     '  </div>'+
     '</div>';
   $(content_box_id).html(content); 
  }
};
