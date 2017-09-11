/**
 * @author wangdi
 */
"use strict"; 
class MaterialListObj {
  constructor() {
    //类别列表
    this.materialListData = {
      "data":[
        {"material_name":"舟山纳海", "uuid":"001"},
        {"material_name":"零点库区", "uuid":"002"},
        {"material_name":"泰州锦华", "uuid":"003"}]
    };
    // 类别子集
    this.materialListSubData = {
    "data":[
        {"material_sub_name":"芳烃", "uuid":"101", "material_uuid":"001", "quantity":"1000", "amount":"100"},
        {"material_sub_name":"异构", "uuid":"102", "material_uuid":"001", "quantity":"1000", "amount":"100"},
        {"material_sub_name":"轻油", "uuid":"103", "material_uuid":"002", "quantity":"1000", "amount":"100"}]
    };
  }

  //清空数据
  clearRawData() {
    $("#material_type_list_box").html("");
  }

  //填充覆盖数据
  fillVariableData() {
    //查询列表
    let materialListHtml = "";
    if(isJsonObjectHasData(this.materialListData)) {
      for (let i = 0; i < this.materialListData.data.length; i++) {
        materialListHtml +=
          `<div>
            <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">${this.materialListData.data[i].material_name}<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff add_material_plus" warehouse_uuid = "${this.materialListData.data[i].uuid}"></span></p>
            <div id = "material_type_list${this.materialListData.data[i].uuid}">
            </div>
          </div>`;
      }
    }
    $("#material_type_list_box").html(materialListHtml);
    //查询列表子集
    if (isJsonObjectHasData(this.materialListSubData)) {
      for (let i = 0; i < this.materialListSubData.data.length; i++) {
        $("#material_type_list" + this.materialListSubData.data[i].material_uuid).append(`
          <div class = "row material_type_list_row">
            <table collspan = "0" rowspan = "0" width = "100%">
              <tbody>
                <tr>
                  <td width = "30%">
                    <div class="form-group material_type_b">
                      <div class="input-group">
                        <div class="input-group-addon">类别名称</div>
                        <input type="hidden" class="material_name_val_hidden" value = "${this.materialListSubData.data[i].material_sub_name}">

                        <input type="text" class="form-control material_name_val" value = "${this.materialListSubData.data[i].material_sub_name}">
                        <div class="input-group-addon material_bg_primary mareial_edit_name" uuid = "${this.materialListSubData.data[i].uuid}" warehouse_uuid = "${this.materialListSubData.data[i].material_uuid}"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                      </div>
                    </div>
                  </td>
                  <td width = "30%">
                    <div class="form-group material_type_b">
                      <div class="input-group">
                        <div class="input-group-addon">数量</div>

                        <input type="hidden" class="material_quantity_val_hidden" value = "${this.materialListSubData.data[i].quantity}">
                        <input type="text" class="form-control material_quantity_val" value = "${this.materialListSubData.data[i].quantity}">
                        <div class="input-group-addon material_bg_primary mareial_edit_quantity" uuid = "${this.materialListSubData.data[i].uuid}" warehouse_uuid = "${this.materialListSubData.data[i].material_uuid}"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                      </div>
                    </div>
                  </td>
                  <td width = "30%"> 
                    <div class="form-group material_type_b">
                      <div class="input-group">
                        <div class="input-group-addon">金额</div>
                        <input type="hidden" class="material_amount_val_hidden" value = "${this.materialListSubData.data[i].amount}">
                        <input type="text" class="form-control material_amount_val" value = "${this.materialListSubData.data[i].amount}">
                        <div class="input-group-addon material_bg_primary mareial_edit_amount" uuid = "${this.materialListSubData.data[i].uuid}" warehouse_uuid = "${this.materialListSubData.data[i].material_uuid}"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                      </div>
                    </div>
                  </td>
                  <td width = "10%">
                    <button class = "btn btn-danger material_type_list_delet_data" uuid = "${this.materialListSubData.data[i].uuid}">
                      <span class = "glyphicon glyphicon-remove"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>`);
      }
    }
  }
  
  //数据库数据覆盖
  serverDataCover() {
    this.materialListData = {};
    this.materialListSubData = {};
    //获取仓库
    let warehouseUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    let warehouseGet = ajax_assistant(warehouseUrl, "", false, true, false);
    //获取储罐原料类别
    let warehouseTypeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let warehouseTypeGet = ajax_assistant(warehouseTypeUrl, "", false, true, false);
    console.log(warehouseGet)
    console.log(warehouseTypeGet);
    //仓库
    if ("1" == warehouseGet.status) {
      if ("0" == warehouseGet.count) {
        this.materialListData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"material_name":result[i].name, "uuid":result[i].uuid};
        }
        this.materialListData["data"] = tmpArr;
        console.log(tmpArr)
      }
    } else {
      alert("仓库数据获取失败");
    }
    //获取储罐原料类别
    if ("1" == warehouseTypeGet.status) {
      if ("0" == warehouseTypeGet.count) {
        this.materialListSubData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseTypeGet.result); 
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"material_sub_name":result[i].name, "material_uuid":result[i].warehouse_uuid, "quantity":result[i].quantity, "amount":result[i].amount, "uuid":result[i].uuid};
        }
        this.materialListSubData["data"] = tmpArr;
        console.log(tmpArr)
      }
    } else {
      alert("储罐原料类别数据获取失败");
    }
  }

  //初始化事件
  initEvent() {
    let currentObj = this;
    //添加模态框
    $(document).on("click", ".add_material_plus", function() {
      currentObj.addModal($(this));
    });
    //添加数据
    $(document).on("click", ".material_type_list_prop_data", function() {
      currentObj.addData($(this));
    });
    //修改名称
    $(document).on("click", ".mareial_edit_name", function() {
      currentObj.editName($(this));
    });
    //修改数量
    $(document).on("click", ".mareial_edit_quantity", function() {
      currentObj.editQuantity($(this));
    });
    //修改金额
    $(document).on("click", ".mareial_edit_amount", function() {
      currentObj.editAmount($(this));
    });
    //删除
    $(document).on("click", ".material_type_list_delet_data", function() {
      currentObj.deleteModal($(this));
    });
    //删除数据
    $(document).on("click", ".material_delet_btn", function() {
      currentObj.deleteData($(this));
    });
  }

  //添加类别列表
  addModal(obj) {
    let warehouseUuid = obj.attr("warehouse_uuid");
    //弹框文本
    let materialHtml  =  
      `<div class = "modal fade custom_modal custom_modal" id = "material_type_list_prop" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">
        <div class = "modal-dialog modal-sm" role = "document">
          <div class = "modal-content">
            <div class = "modal-header bg-primary">
              <button type = "button" class = "close"  data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
              <h4 class = "modal-title" id = "myModalLabel">添加类别</h4>
            </div>
            <div class = "modal-body nopadding-bottom">
              <div class = "form-group">
                <label>类别名称</label>
                <input type = "text" class = "form-control material_list_name" value = "">
              </div>
            </div>
            <div class = "modal-footer" style = "text-align: center;">
              <button type = "button" class = "btn btn-primary material_type_list_prop_data" warehouse_uuid = "${warehouseUuid}">添加</button>
              <button type = "button" class = "btn btn-default"  data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>`;
    $("body").append(materialHtml);
    $("#material_type_list_prop").modal("show");
    $("#material_type_list_prop").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }

  //添加数据
  addData(obj) {
    let warehouseUuid = obj.attr("warehouse_uuid");
    let materialListName = obj.parents("#material_type_list_prop").find(".material_list_name").val();
    if(null == materialListName.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的类别名称");
      return;
    }
    //判断原料类别是否重名
    let materialCheckData = {
      "name":materialListName
    };
    let materialCheckUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialType";
    let materialCheckGet = ajax_assistant(materialCheckUrl, materialCheckData, false, true, false);
    if("1" != materialCheckGet.status) {
      alert("改类别名已存在！");
      return;
    }
    let materialAddData = {
      "warehouse_uuid":warehouseUuid,
      "name":materialListName
    };
    // 调用后台添加接口
    let materialAddUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialType";
    let materialAddGet = ajax_assistant(materialAddUrl, materialAddData, false, true, false);
    console.log(materialAddGet)
    if ("1" != materialAddGet.status) {
      alert("添加类别名称失败");
    } else {
      //更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData(); 
      $("#material_type_list_prop").modal("hide");
      $("#material_type_list_prop").on("hidden.bs.modal", function (e) {
        $(this).remove();
      });
    }
  }

  //修改类别列表
  editName(obj) {
    let materialUuid = obj.attr("uuid");
    let warehouseUuid = obj.attr("warehouse_uuid");
    let materialName = obj.siblings(".material_name_val").val();
    console.log(materialName)
    if(null == materialName.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)){
      alert("请输入正确的类别名称");
      return;
    };
    //判断原料类别是否重名
    let materialCheckData = {
      "name":materialName
    };
    let materialCheckUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialType";
    let materialCheckGet = ajax_assistant(materialCheckUrl, materialCheckData, false, true, false);
    let materialHiddenName = obj.siblings(".material_name_val_hidden").val();
    if("1" != materialCheckGet.status) {
      if (materialHiddenName != materialName) {
        alert("改类别名已存在！");
        obj.siblings(".material_name_val").val(materialHiddenName);
        return;
      }
    }
    materialName = obj.siblings(".material_name_val").val();
    //修改类别
    let editData = {
      "warehouse_uuid":warehouseUuid,
      "uuid":materialUuid,
      "name":materialName
    };
    // 调用后台添加接口
    let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let editGet = ajax_assistant(editUrl, editData, false, true, false);
    console.log(editGet);
    if ("1" != editGet.status) {
      alert("修改类别名称失败");
      obj.siblings(".material_name_val").val(materialHiddenName);
    } else {    
      //更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData();
      alert("修改类别成功");
    } 
  }

  //修改数据
  editQuantity(obj) {
    let materialUuid = obj.attr("uuid");
    let warehouseUuid = obj.attr("warehouse_uuid");
    let materialQuantity = obj.siblings(".material_quantity_val").val();
    if(null == materialQuantity.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){
      alert("请输入正确的数量");
      return;
    };
    //修改类别
    let editData = {
      "warehouse_uuid":warehouseUuid,
      "uuid":materialUuid,
      "quantity":materialQuantity
    };
    // 调用后台添加接口
    let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let editGet = ajax_assistant(editUrl, editData, false, true, false);
    let materialHiddenQuantity = obj.siblings(".material_quantity_val_hidden").val();
    console.log(editGet);
    if ("1" != editGet.status) {
      alert("修改类别数量失败");
      obj.siblings(".material_quantity_val").val(materialHiddenQuantity);
    } else {    
      //更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData();
      alert("修改类别数量成功");
    }   
  }
  //修改金额
  editAmount(obj) {
    let materialUuid = obj.attr("uuid");
    let warehouseUuid = obj.attr("warehouse_uuid");
    let materialAmount = obj.siblings(".material_amount_val").val();
    if(null == materialAmount.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)){
      alert("请输入正确的金额");
      return;
    };
    //修改类别
    let editData = {
      "warehouse_uuid":warehouseUuid,
      "uuid":materialUuid,
      "amount":materialAmount
    };
    // 调用后台添加接口
    let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let editGet = ajax_assistant(editUrl, editData, false, true, false);
    let materialHiddenAmount = obj.siblings(".material_amount_val_hidden").val();

    console.log(editGet);
    if ("1" != editGet.status) {
      alert("修改类别金额失败");
      obj.siblings(".material_quantity_val").val(materialHiddenQuantity);
    } else {    
      //更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData();
      alert("修改类别金额成功");
    }   
  }

  //删除
  deleteModal(obj) {
    let uuid = obj.attr("uuid");
    let materialHtml = 
      `<div class = "modal fade bs-example-modal-sm custom_modal" id = "material_type_list_delet" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">
        <div class = "modal-dialog  modal-sm" role = "document">
          <div class = "modal-content">
            <div class = "modal-header bg-primary">
              <button type = "button" class = "close" data-dismiss = "modal" aria-label="Close"><span aria-hidden = "true">&times;</span></button>
              <h4 class = "modal-title" id="myModalLabel">删除类别确认</h4>
            </div>
            <div class = "modal-body text-center nopadding-bottom material_type_list_center">确定要删除类别吗？</div>
            <div class = "modal-footer" style = "text-align: center;">
              <button type = "button" class = "btn btn-danger material_delet_btn" uuid = "${uuid}">删除</button>
              <button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>
            </div>
          </div>
        </div>
      </div>`;
    $("body").append(materialHtml);
    $("#material_type_list_delet").modal("show");
    $("#material_type_list_delet").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }

  //删除数据
  deleteData(obj) {
    let uuid = obj.attr("uuid");
    let data = {
      "uuid":uuid
    };
    let deleteUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterialType";
    let deleteGet = ajax_assistant(deleteUrl, data, false, true, false);
    if ("1" != deleteGet.status) {
      alert("删除仓库失败");
    } else {    
    // 更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData();
    }
    $("#material_type_list_delet").modal("hide");
    $("#material_type_list_delet").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }

  //文本输出
  outPutTypeList(contentBoxId) {
    let content = 
      `<div class = "row material_type_list_row">
         <div class = "col-lg-12 material_type_list_col">
           <div class = "list-group">
             <p href = "#" class = "list-group-item clearfix active">类别列表</p>
             <div id="material_type_list_box">
               <div>
                 <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">舟山纳海<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff"></span></p>
                 <div class = "row material_type_list_row">
                   <table collspan = "0" rowspan = "0" width = "100%">
                     <tbody>
                       <tr>
                         <td width = "30%">
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">类别名称</div>
                               <input type="text" class="form-control" value = "芳烃">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "30%">
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">数量</div>
                               <input type="text" class="form-control" value = "200">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "30%"> 
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">金额</div>
                               <input type="text" class="form-control" value = "1000">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "10%">
                           <button class = "btn btn-danger">
                             <span class = "glyphicon glyphicon-remove"></span>
                           </button>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div>
                 <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">舟山纳海<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff"></span></p>
                 <div class = "row material_type_list_row">
                   <table collspan = "0" rowspan = "0" width = "100%">
                     <tbody>
                       <tr>
                         <td width = "30%">
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">类别名称</div>
                               <input type="text" class="form-control" value = "芳烃">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "30%">
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">数量</div>
                               <input type="text" class="form-control" value = "200">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "30%"> 
                           <div class="form-group material_type_b">
                             <div class="input-group">
                               <div class="input-group-addon">金额</div>
                               <input type="text" class="form-control" value = "1000">
                               <div class="input-group-addon material_bg_primary"><span class = "glyphicon glyphicon-floppy-disk"></span></div>
                             </div>
                           </div>
                         </td>
                         <td width = "10%">
                           <button class = "btn btn-danger">
                             <span class = "glyphicon glyphicon-remove"></span>
                           </button>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
             <p class="list-group-item active text-center">&nbsp;</p>
           </div>
         </div>
       </div>`;
    $(contentBoxId).html(content);
  }
}
