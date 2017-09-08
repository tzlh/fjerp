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

  //填充复该数据
  fillVariableData() {
    //查询列表
    let materialListHtml = "";
    if(isJsonObjectHasData(this.materialListData)) {
      for (let i = 0; i < this.materialListData.data.length; i++) {
        materialListHtml+=
          `<div>
            <p href = "#" class = "list-group-item clearfix material_type_list_pl30 material_type_list_bgddd">${this.materialListData.data[i].material_name}<span class = "glyphicon glyphicon-plus pull-right material_type_list_colorfff add_material_plus"></span></p>
            <div id = "material_type_list${this.materialListData.data[i].uuid}"></div>
          </div>`;
      }
    }
    $("#material_type_list_box").html(materialListHtml);
    //查询列表子集
    if(isJsonObjectHasData(this.materialListSubData)) {
      for (let i = 0; i < this.materialListSubData.data.length; i++) {
        $("#material_type_list" + this.materialListSubData.data[i].material_uuid).append(`<p href = "#" class = "list-group-item clearfix material_type_list_pl30">${this.materialListSubData.data[i].material_sub_name}<span class = "glyphicon glyphicon-remove pull-right material_type_list_ml15 delete_material_event" uuid = "${this.materialListSubData.data[i].uuid}"></span><span class = "glyphicon glyphicon-pencil pull-right material_type_list_ml15 material_edit_event" uuid = "${this.materialListSubData.data[i].uuid}"></span></p>`);
      }
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
  addModal() {
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
    let materialListName = obj.parents("#material_type_list_prop").find(".material_list_name").val();
    if(null == materialListName.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的类别名称");
      return;
    }
    let materialAddData = {
      "name":materialListName
    };
    // 调用后台添加接口
    //let materialAddUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehouse";
    //let materialAddGet = ajax_assistant(materialAddUrl, materialAddData, false, true, false);
    //if (1 != materialAddGet.status) {
    if ("abc" != materialListName) {
      alert("添加类别名称失败");
    } else {
    // 更新页面数据
      this.clearRawData();
      //serverDataCover();
      this.materialListSubData = {
        "data":[
            {"material_sub_name":"芳烃", "uuid":"101", "material_uuid":"001"},
            {"material_sub_name":"芳烃1", "uuid":"101", "material_uuid":"001"},
            {"material_sub_name":"异构", "uuid":"102", "material_uuid":"001"},
            {"material_sub_name":"轻油", "uuid":"103", "material_uuid":"002"}]
        }
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
    let data = {
      "uuid":materialUuid
    };
    let materialName = "好的";
    //let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    //let editGet = ajax_assistant(editUrl, data, false, true, false);
    //if(1 == editGet.status){
    //if("001" == editGet.status){
      //let reslutJson = JSON.parse(editGet.result);
    //}
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
              <label>类别名称</label>
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
    let editData = {
      "uuid":materialUuid,
      "name":materialName
    };
    // 调用后台添加接口
    //let editUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehouse";
    //let editGet = ajax_assistant(editUrl, editData, false, true, false);
    //console.log(warehouse_edit_get_warehouse);
    //if (1 != editGet.status) {
    if ("abc" != materialName) {
      alert("修改类别名称失败");
    } else {    
    // 更新页面数据
      this.clearRawData();
      //this.serverDataCover();
      this.materialListSubData = {
        "data":[
            {"material_sub_name":"abc", "uuid":"101", "material_uuid":"001"},
            {"material_sub_name":"异构", "uuid":"102", "material_uuid":"001"},
            {"material_sub_name":"轻油", "uuid":"103", "material_uuid":"002"}]
        }
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
    let deleteUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehouse";
    let deleteGet = ajax_assistant(deleteUrl, data, false, true, false);
    //if (1 != deleteGet.status) {
    if ("101" != uuid) { 
      alert("删除仓库失败");
    } else {    
    // 更新页面数据
      this.clearRawData();
      //this.serverDataCover();
      this.materialListSubData = {
        "data":[
            {"material_sub_name":"异构", "uuid":"102", "material_uuid":"001"},
            {"material_sub_name":"轻油", "uuid":"103", "material_uuid":"002"}]
        }
      this.fillVariableData();
    }
    $("#material_type_list_delet").modal("hide");
    $("#material_type_list_delet").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }
}

//服务器数据
//function serverDataCover() {
//  this.materialListData = {};
//  this.materialListSubData = {};
//  //获取仓库
//  let warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
//  let warehouse_get_warehouse = ajax_assistant(warehouse_url, "", false, true, false);
//  //获取储罐
//  let warehouse_pot_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
//  let warehouse_pot_get_warehouse = ajax_assistant(warehouse_pot_url, "", false, true, false);
////console.log(ajax_assistant);
//  if (1 == warehouse_get_warehouse.status) {
//    if (0 == warehouse_get_warehouse.count) {
//      this.materialListData = {};
//    } else {
//      let tmp_arr = new Array();
//      let result = JSON.parse(warehouse_get_warehouse.result);    
//      for (let i = 0; i < result.length; i++) {
//        // name id uuid
//        tmp_arr[i] = {"material_name":result[i].name, "uuid":result[i].uuid};
//      }
//      this.materialListData["data"] = tmp_arr;
//    }
//    
//  } else {
//    alert("库区数据获取失败");
//  }
//  //储罐
//  if (1 == warehouse_pot_get_warehouse.status) {
//    if (0 == warehouse_pot_get_warehouse.count) {
//      this.materialListSubData = {};
//    } else {
//      let tmp_arr_pot = new Array();
//      let result_pot = JSON.parse(warehouse_pot_get_warehouse.result);  
//      //console.log(result_pot);
//      for (let i = 0; i < result_pot.length; i++) {
//        // name id uuid
//        tmp_arr_pot[i] = {"storage_tank_name":result_pot[i].name, "uuid":result_pot[i].uuid, "type":result_pot[i].type, "uuid":result_pot[i].uuid, "effective_capacity":result_pot[i].effective_capacity, "charge_capacity":result_pot[i].charge_capacity};
//      }
//      this.materialListSubData["data"] = tmp_arr_pot;
//    }
//    
//  } else {
//    alert("储罐数据获取失败");
//  }
//}
