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
        {"material_sub_name":"芳烃", "uuid":"101", "material_uuid":"001"},
        {"material_sub_name":"异构", "uuid":"102", "material_uuid":"001"},
        {"material_sub_name":"轻油", "uuid":"103", "material_uuid":"002"}]
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
        materialListHtml+=
          `<div>
            <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">${this.materialListData.data[i].material_name}<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff add_material_plus" warehouse_uuid = "${this.materialListData.data[i].uuid}"></span></p>
            <div id = "material_type_list${this.materialListData.data[i].uuid}"></div>
          </div>`;
      }
    }
    $("#material_type_list_box").html(materialListHtml);
    //查询列表子集
    if (isJsonObjectHasData(this.materialListSubData)) {
      for (let i = 0; i < this.materialListSubData.data.length; i++) {
        $("#material_type_list" + this.materialListSubData.data[i].material_uuid).append(`<p href = "#" class = "list-group-item clearfix material_type_list_pl30">${this.materialListSubData.data[i].material_sub_name}<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15 delete_material_event" uuid = "${this.materialListSubData.data[i].uuid}"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15 material_edit_event" uuid = "${this.materialListSubData.data[i].uuid}"></span></p>`);
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
    //获取储罐
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, "", false, true, false);
    console.log(warehouseGet)
    console.log(warehouseTypeGet);
    //仓库
    if (1 == warehouseGet.status) {
      if (0 == warehouseGet.count) {
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
      if (0 == warehouseTypeGet.count) {
        this.materialListSubData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseTypeGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"material_sub_name":result[i].name, "uuid":result[i].uuid};
          if ("1" == potGet.status) {
            let potResult = JSON.parse(potGet.result);
            for (let j = 0; j < potResult.length; j++) {
              if (potResult[j].uuid == result[i].pot_uuid) {
                tmpArr[i]["material_uuid"] = potResult[j].warehouse_uuid; 
              }
            }
          } else {
            alert("获取储罐失败！");
          }
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
    //修改弹框
    $(document).on("click", ".material_edit_event", function() {
      currentObj.editModal($(this));
    });
    //修改数据
    $(document).on("click", ".material_type_list_prop_edit_data", function() {
      currentObj.editData($(this));
    });
    //删除
    $(document).on("click", ".delete_material_event", function() {
      currentObj.deleteModal($(this));
    });
    //删除数据
    $(document).on("click", ".material_type_list_delet_data", function() {
      currentObj.deleteData($(this));
    });
  }

  //添加类别列表
  addModal(obj) {
    let warehouseUuid = obj.attr("warehouse_uuid");
    //获取该仓库的储罐
    let potData = {
      "warehouse_uuid":warehouseUuid
    };
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, potData, false, true, false);
    let potHtml = `<option value = "">--请选择--</option>`;
    if ("1" == potGet.status) {
      let potResult = JSON.parse(potGet.result);
      for (let i = 0; i < potResult.length; i++) {
        potHtml += `<option value = "${potResult[i].uuid}">${potResult[i].name}</option>`;
      }
    } else {
      alert("获取储罐失败！");
    }
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
                <label>选择储罐</label>
                <select class = "form-control pot_name" value = "">${potHtml}
                </select>
              </div>
              <div class = "form-group">
                <label>类别名称</label>
                <input type = "text" class = "form-control material_list_name" value = "">
              </div>
            </div>
            <div class = "modal-footer" style = "text-align: center;">
              <button type = "button" class = "btn btn-primary material_type_list_prop_data">添加</button>
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
    let potUuid = obj.parents("#material_type_list_prop").find(".pot_name").val();
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
      "pot_uuid":potUuid,
      "name":materialListName
    };
    // 调用后台添加接口
    let materialAddUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialType";
    let materialAddGet = ajax_assistant(materialAddUrl, materialAddData, false, true, false);
    console.log(materialAddGet)
    if (1 != materialAddGet.status) {
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
  editModal(obj) {
    let materialUuid = obj.attr("uuid");
    //获取类别
    let data = {
      "uuid":materialUuid
    };
    let materialName = "";
    let potCheckUuid = "";
    let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let editGet = ajax_assistant(editUrl, data, false, true, false);
    if(1 == editGet.status){
      let reslutJson = JSON.parse(editGet.result);
      materialName = reslutJson[0].name;
      potCheckUuid = reslutJson[0].pot_uuid;
    } else {
      alert("获取储罐原料类别失败！");
    }
    //获取储罐
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, "", false, true, false);
    let potHtml = "";
    if("1" == potGet.status) {
      let potResult = JSON.parse(potGet.result);
      for(let i = 0; i < potResult.length; i++) {
        if (potCheckUuid == potResult[i].uuid) {
          potHtml += `<option value = "${potResult[i].uuid}">${potResult[i].name}</option>`;
 
        }
      }
    } else {
      alert("获取储罐失败！");
    }

    let materialHtml = 
     `<div class = "modal fade custom_modal" id = "material_type_list_prop_edit" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">
      <div class = "modal-dialog modal-sm" role = "document">
        <div class = "modal-content">
          <div class = "modal-header bg-primary">
            <button type = "button" class = "close"data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
            <h4 class = "modal-title" id = "myModalLabel">修改类别</h4>
          </div>
          <div class = "modal-body nopadding-bottom">
            <div class = "form-group">
              <label>选择储罐</label>
              <select class = "form-control pot_name" value = "" disabled = "disabled">${potHtml}
              </select>
            </div>
            <div class = "form-group">
              <label>类别名称</label>
              <input type="hidden" class = "name_hidden" value="${materialName}">
              <input type = "text" class = "form-control material_list_name" value = "${materialName}">
            </div>
          </div>
          <div class = "modal-footer" style = "text-align: center;">
            <button type = "button" class = "btn btn-warning material_type_list_prop_edit_data" uuid = "${materialUuid}">修改</button>
            <button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>
          </div>
        </div>
      </div>
     </div>`;
    $("body").append(materialHtml);
    $("#material_type_list_prop_edit").modal("show");
    $("#material_type_list_prop_edit").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }

  //修改数据
  editData(obj) {
    let materialUuid = obj.attr("uuid");
    let materialName = obj.parents("#material_type_list_prop_edit").find(".material_list_name").val();
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
    let vleHidden = obj.parents("#material_type_list_prop_edit").find(".name_hidden").val();
    if("1" != materialCheckGet.status) {
      console.log(vleHidden);
      console.log(materialName);
      if (vleHidden != materialName) {
        alert("改类别名已存在！");
        return;
      }
    }
    let editData = {
      "uuid":materialUuid,
      "name":materialName
    };
    // 调用后台添加接口
    let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let editGet = ajax_assistant(editUrl, editData, false, true, false);
    console.log(editGet);
    if ("1" != editGet.status) {
      alert("修改类别名称失败");
    } else {    
      //更新页面数据
      this.clearRawData();
      this.serverDataCover();
      this.fillVariableData();
      $("#material_type_list_prop_edit").modal("hide");
      $("#material_type_list_prop_edit").on("hidden.bs.modal", function (e) {
        $(this).remove();
      });
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
              <button type = "button" class = "btn btn-danger material_type_list_delet_data" uuid = "${uuid}">删除</button>
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
                 <div>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">芳烃<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">异构<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">轻油<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
                 </div>
               </div>
               <div>
                 <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">舟山纳海<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff"></span></p>
                 <div>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">芳烃<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">异构<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
                   <p href = "#" class = "list-group-item clearfix material_type_list_pl30">轻油<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15"></span></p>
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
