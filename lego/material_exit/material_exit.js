//wangdi
"use strict";
class MaterialExit {
  constructor() {
    //仓库
    this.warehouseData = {
      "data":[
        {"warehouse_name":"舟山纳海", "uuid":"001"},
        {"warehouse_name":"零点库区", "uuid":"002"},
        {"warehouse_name":"泰州锦华", "uuid":"003"}]
    };
    //储罐 
    this.potData = {
    "data":[
        {"pot_name":"E01", "uuid":"101", "warehouse_uuid":"001"},
        {"pot_name":"B01", "uuid":"101", "warehouse_uuid":"001"},
        {"pot_name":"C01", "uuid":"101", "warehouse_uuid":"001"}]
    };
    //类别 
    this.typeData = {
    "data":[
        {"type_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"},
        {"type_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"},
        {"type_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"}]
    };
  }
  //覆盖数据
  fillVariableData() {
    //查询
    let materialHtml = "";
      //仓库选择列表
        materialHtml +=
          `<div class = "row">
            <div class = "col-md-12">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">库区</span>
                <select class = "form-control warehouse_change">
                  <option value = "0">--请选择--</option>`;
                  if(isJsonObjectHasData(this.warehouseData)) {
                    for (let i = 0; i < this.warehouseData.data.length; i++) {
                      materialHtml +=
                      `<option value = "${this.warehouseData.data[i].uuid}">${this.warehouseData.data[i].warehouse_name}</option>`;
                    }
                  }
                  materialHtml +=
                `</select>
              </div>
            </div>
          </div>
          <div class = "row material_exit_mt20">
            <div class = "col-md-12">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">储罐</span>
                <select class = "form-control pot_change" id = "pot_change">
                  <option value = "0">--请选择--</option>`;
                  if(isJsonObjectHasData(this.potData)) {
                    for (let i = 0; i < this.potData.data.length; i++) {
                      materialHtml +=
                      `<option value = "${this.potData.data[i].uuid}">${this.potData.data[i].pot_name}</option>`;
                    }
                  }
                  materialHtml +=
                `</select>
              </div>
            </div>
          </div>
          <div class = "row material_exit_mt20">
            <div class = "col-md-12">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">类别</span>
                <input type="hidden" id = "unit_price_type" value="0" amount = "0" quantity = "0">
                <select class = "form-control type_change" id = "type_change">
                  <option value = "0">--请选择--</option>`;
                  if(isJsonObjectHasData(this.typeData)) {
                    for (let i = 0; i < this.typeData.data.length; i++) {
                      materialHtml +=
                      `<option value = "${this.potData.data[i].uuid}">${this.typeData.data[i].type_name}</option>`;
                    }
                  }
                  materialHtml +=
                `</select>
              </div>
            </div>
          </div>
          <div class = "row material_exit_mt20">
            <div class = "col-md-12">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">出库数量</span>
                <input type="text" class="form-control" id = "exit_quantity_all" value = "0">
                <span class = "input-group-addon">吨</span>
              </div>
            </div>
          </div>
          <div class = "row material_exit_mt20">
            <div class = "col-md-12">
              <div class = "form-group btn-center">
                <button type = "button" class = "btn btn-primary" id = "exit_btn">出库</button>
              </div>
            </div>
          </div>`;
    $("#material_exit_box").html(materialHtml); 
  }

  //服务器数据
  serverDataCover() {
    this.warehouseData = {}; 
    this.potData = {};
    this.typeData = {};
    //获取仓库
    let warehouseUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    let warehouseGet = ajax_assistant(warehouseUrl, "", false, true, false); 
    //获取储罐
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, "", false, true, false);
    //类别
    let typeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let typeGet = ajax_assistant(typeUrl, "", false, true, false);
    //仓库
    if ("1" == warehouseGet.status) {
      if ("0" == warehouseGet.count) {
        this.warehouseData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"warehouse_name":result[i].name, "uuid":result[i].uuid};
        }
        this.warehouseData["data"] = tmpArr;
        //console.log(tmpArr)
      }
    } else {
      alert("仓库数据获取失败");
    }
    //储罐
    if ("1" == potGet.status) {
      if ("0" == potGet.count) {
        this.potData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(potGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"pot_name":result[i].name, "warehouse_uuid":result[i].warehouse_uuid, "uuid":result[i].uuid};
        }
        this.potData["data"] = tmpArr;
        //console.log(tmpArr)
      }
    } else {
      alert("储罐数据获取失败");
    }
    //类别
    if ("1" == typeGet.status) {
      if ("0" == typeGet.count) {
        this.typeData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(typeGet.result); 
        //console.log(result);
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"type_name":result[i].name, "warehouse_uuid":result[i].warehouse_uuid, "uuid":result[i].uuid};
        }
        this.typeData["data"] = tmpArr;
        //console.log(tmpArr)
      }
    } else {
      alert("类别数据获取失败");
    }
  }

  //储罐服务器
  severPot(potData) {
    this.potData = {};
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, potData, false, true, false);
    if (1 == potGet.status) {
      if (0 == potGet.count) {
        this.potData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(potGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"pot_name":result[i].name, "warehouse_uuid":result[i].warehouse_uuid, "uuid":result[i].uuid};
        }
        this.potData["data"] = tmpArr;
        //console.log(tmpArr)
      }
    } else {
      alert("储罐数据获取失败");
    }
  }
  //类别服务器
  severType(Data) {
    this.typeData = {};
    let typeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let typeGet = ajax_assistant(typeUrl, Data, false, true, false);
    if ("1" == typeGet.status) {
      if ("0" == typeGet.count) {
        this.typeData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(typeGet.result); 
        //console.log(result);
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"type_name":result[i].name, "warehouse_uuid":result[i].warehouse_uuid, "uuid":result[i].uuid};
        }
        this.typeData["data"] = tmpArr;
        //console.log(tmpArr)
      }
    } else {
      alert("类别数据获取失败");
    }
  }

  //事件初始化
  initEvent() {
    let currentObj = this;
    $(document).on("change", ".warehouse_change", function(obj) {
      currentObj.warehouseChangeFunc($(this));
    }); 
    $(document).on("change", "#type_change", function(obj) {
      currentObj.typeChangeFunc($(this));
    }); 
    $(document).on("click", "#exit_btn", function(obj) {
      currentObj.exitBtnFunc($(this));
    });
  }

  //仓库发生改变
  warehouseChangeFunc(obj) {
    let warehouseUuid = obj.val();
    //console.log(warehouseUuid)
    if ("0" != warehouseUuid) {
      let potData = {
        "warehouse_uuid":warehouseUuid
      }
      this.severPot(potData);
      this.severType(potData);
    } else {
      this.severPot("");
      this.severType("");
    }
    let potHtml = `<option class = "" value = "0">--请选择--</option>`;
    if(isJsonObjectHasData(this.potData)) {
      for (let i = 0; i < this.potData.data.length; i++) {
        potHtml +=
       `<option value = "${this.potData.data[i].uuid}">${this.potData.data[i].pot_name}</option>`;
       }
    }
    let typeHtml = `<option class = "" value = "0">--请选择--</option>`;
    if(isJsonObjectHasData(this.typeData)) {
      for (let i = 0; i < this.typeData.data.length; i++) {
        typeHtml +=
       `<option value = "${this.typeData.data[i].uuid}">${this.typeData.data[i].type_name}</option>`;
       }
    }
    $("#type_change").html(typeHtml);
    $("#pot_change").html(potHtml);
  }

  //类别发生改变
  typeChangeFunc(obj) {
    let typeUuid = obj.val();
    //获取 
    let typeData = "";
    if ("0" != typeUuid) {
      typeData = {
        "uuid":typeUuid
      };
    } else {
      typeData = "";
    }
    let typeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let typeGet = ajax_assistant(typeUrl, typeData, false, true, false);  
    if ("1" == typeGet.status) {
      if ("0" == typeGet.count) {
//        $("#price_all,#exit_quantity_all,#exit_btn").prop("disabled",true); 
//        $("#price_all,#exit_quantity_all").val("0");
      } else {
        let typeResult = JSON.parse(typeGet.result);
        //单价
        let unitPrice = 0;
        let amount = 0;
        let quantity = 0;
        if ("0" != typeUuid) {
          if ("0" != typeResult[0].amount) {
            unitPrice = Number(typeResult[0].amount) / Number(typeResult[0].quantity);
            amount = typeResult[0].amount;
            quantity = typeResult[0].quantity;
          } else {
            unitPrice = 0;
            amount = 0;
            quantity = 0;
          }
        } else {
          unitPrice = 0;
          amount = 0;
          quantity = 0;
        }
        //console.log(quantity);
        //console.log(unitPrice);
        $("#unit_price_type").attr("quantity", quantity);
        $("#unit_price_type").val(unitPrice);
      }
    } else {
      alert("获取原料类别失败！");
    }
  }

  //出库按钮
  exitBtnFunc() {
    if ("0" == $(".warehouse_change").val()) {
      alert("请选择仓库");
      return;
    }
    if ("0" == $("#pot_change").val()) {
      alert("请选择储罐");
      return;
    }
    if ("0" == $("#type_change").val()) {
      alert("请选择类别");
      return;
    }
    if ("" == $("#exit_quantity_all").val()) {
      alert("请输入出库数量");
      return;
    }
    if ("0" == $("#exit_quantity_all").val()) {
      alert("出库数量不能为0");
      return;
    }
    let warehouseUuid = $(".warehouse_change").val();
    let typeUuid = $("#type_change").val();
    let unitPrice = $("#unit_price_type").val();
    let quantityVal = $("#exit_quantity_all").val();
    let quantity = $("#unit_price_type").attr("quantity");
    let quantityData = Number(quantity) - Number(quantityVal);
    let amountData = Number(quantityData) * Number(unitPrice);
    let offOn = 0; 
    //原料类别
    let typeData = {
      "uuid":typeUuid,
      "warehouse_uuid":warehouseUuid,
      "quantity":quantityData,
      "amount":amountData
    };
    let exitUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let exitGet = ajax_assistant(exitUrl, typeData, false, true, false);
    //console.log(exitGet)
    if ("1" == exitGet.status) {
      offOn = 0;
    } else {
      offOn = 1;
    }
    //原料指标
    let potUuid = $("#pot_change").val();
    let indexUuid = "";
    let indxQuantity = 0;
    let getData = {
      "pot_uuid":potUuid
    };
    //获取指标的uuid
    let indexUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialIndex";
    let indexGet = ajax_assistant(indexUrl, getData, false, true, false);
    if ("1" == indexGet.status) {
      let result = JSON.parse(indexGet.result);
      indexUuid = result[0].uuid;
      indxQuantity = result[0].quantity;
    } else {
      alert("指标获取失败");
      return;
    }
    let indexQuantityData = Number(indxQuantity) - Number(quantityVal);
    let materialData = {
      "uuid":indexUuid,
      "pot_uuid":potUuid,
      "quantity":indexQuantityData
    };
    //修改指标的
    let indexEditUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialIndex";
    let indexEditGet = ajax_assistant(indexEditUrl, materialData, false, true, false);
    //console.log(indexEditGet)
    if ("1" == indexEditGet.status) {
      offOn = 0;
    } else {
      offOn = 1;
    }
    if ("0" == offOn) {
      alert("出库成功");
    } else {
      alert("出库失败");
    }
  }

  //输出文本
  outPutMaterialEixt (contentId) {
    let content = 
      `<div class = "row" id = "material_exit_content">
         <div class = "panel panel-default panel-primary">
           <div class = "panel-heading">原料出库</div>
           <div class = "panel-body" id = "material_exit_box" style="padding-bottom: 0;">
             <div class = "row">
               <div class = "col-md-12">
                 <div class = "input-group pull-left">
                   <span class = "input-group-addon">库区</span>
                   <select class = "form-control">
                     <option class = "">--请选择--</option>
                     <option value = "1">舟舟山纳海舟山纳海舟山纳海舟山纳海山纳海</option>
                     <option value = "2">泰州锦华</option>
                   </select>
                 </div>
               </div>
             </div>
             <div class = "row material_exit_mt20">
               <div class = "col-md-12">
                 <div class = "input-group pull-left">
                   <span class = "input-group-addon">储罐</span>
                   <select class = "form-control">
                     <option class = "">--请选择--</option>
                     <option value = "1">A01</option>
                     <option value = "2">A02</option>
                   </select>
                 </div>
               </div>
             </div>
             <div class = "row material_exit_mt20">
               <div class = "col-md-12">
                 <div class = "input-group pull-left">
                   <span class = "input-group-addon">出库数量</span>
                   <input type="text" class="form-control">
                   <span class = "input-group-addon">吨</span>
                 </div>
               </div>
             </div>
             <div class = "row material_exit_mt20">
               <div class = "col-md-12">
                 <div class = "input-group pull-left">
                   <span class = "input-group-addon">合计价格</span>
                   <input type="text" class="form-control">
                   <span class = "input-group-addon">元</span>
                 </div>
               </div>
             </div>
             <div class = "row material_exit_mt20">
               <div class = "col-md-12">
                 <div class = "form-group btn-center">
                   <button type = "button" class = "btn btn-primary">出库</button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>`;
    $(contentId).html(content);
  }
}
