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
        {"pot_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"},
        {"pot_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"},
        {"pot_name":"芳烃", "uuid":"101", "warehouse_uuid":"001"}]
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
                <input type="hidden" id = "pot_all_length" value="0" material_uuid = "">
                <input type="hidden" id = "pot_all_quantitye" value="0">
                <input type="hidden" id = "pot_all_price" value="0">
                <input type="hidden" id = "unit_price" value="0"> 
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
                <span class = "input-group-addon">出库数量</span>
                <input type="text" class="form-control" id = "exit_quantity_all" value = "0">
                <span class = "input-group-addon">吨</span>
              </div>
            </div>
          </div>
          <div class = "row material_exit_mt20">
            <div class = "col-md-12">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">合计价格</span>
                <input type="text" class="form-control" id = "price_all" value = "0">
                <span class = "input-group-addon">元</span>
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
    //获取仓库
    let warehouseUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    let warehouseGet = ajax_assistant(warehouseUrl, "", false, true, false); 
    //获取储罐
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, "", false, true, false);
    //仓库
    if (1 == warehouseGet.status) {
      if (0 == warehouseGet.count) {
        this.warehouseData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"warehouse_name":result[i].name, "uuid":result[i].uuid};
        }
        this.warehouseData["data"] = tmpArr;
        console.log(tmpArr)
      }
    } else {
      alert("仓库数据获取失败");
    }
    //储罐
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
        console.log(tmpArr)
      }
    } else {
      alert("储罐数据获取失败");
    }
  }

  //储罐服务器
  severPot(warehouseUuid) {
    this.potData = {};
    let potData = {
      "warehouse_uuid":warehouseUuid
    }
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
        console.log(tmpArr)
      }
    } else {
      alert("储罐数据获取失败");
    }
 
  }
  //事件初始化
  initEvent() {
    let currentObj = this;
    $(document).on("change", ".warehouse_change", function(obj) {
      currentObj.warehouseChangeFunc($(this));
    }); 
    $(document).on("change", ".pot_change", function(obj) {
      currentObj.potChangeFunc($(this));
    }); 
    $(document).on("blur", "#exit_quantity_all", function(obj) {
      currentObj.quantityBlurFunc($(this));
    });
    $(document).on("click", "#exit_btn", function(obj) {
      currentObj.exitBtnFunc($(this));
    });
  }

  //仓库发生改变
  warehouseChangeFunc(obj) {
    let warehouseUuid = obj.val();
    console.log(warehouseUuid)
    if ("0" != warehouseUuid) {
      this.severPot(warehouseUuid);
    }
    let potHtml = `<option class = "" value = "">--请选择--</option>`;
    if(isJsonObjectHasData(this.potData)) {
      for (let i = 0; i < this.potData.data.length; i++) {
        potHtml +=
       `<option value = "${this.potData.data[i].uuid}">${this.potData.data[i].pot_name}</option>`;
       }
    }
    $("#pot_change").html(potHtml);
  }

  //储罐发生改变
  potChangeFunc(obj) {
    let potUuid = obj.val();
    //获取储罐原料类别的数量金额
    let typeData = {
      "pot_uuid":potUuid
    };
    let potType = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let typeGet = ajax_assistant(potType, typeData, false, true, false);  
    if ("1" == typeGet.status) {
      if ("0" == typeGet.count) {
        $("#price_all,#exit_quantity_all,#exit_btn").prop("disabled",true); 
        $("#price_all,#exit_quantity_all").val("0");
      } else {
        $("#pot_all_length").val("0");
        $("#pot_all_quantitye").val("0");
        $("#pot_all_price").val("0");
        $("#unit_price").val("0");
        $("#price_all,#exit_quantity_all,#exit_btn").prop("disabled",false);
        $("#price_all,#exit_quantity_all").val("0");
        let quantityAll = 0; 
        let priceAll = 0;
        let materialUuid = "";
        let typeResult = JSON.parse(typeGet.result);
        for(let i = 0; i < typeResult.length; i++) {
          quantityAll += Number(typeResult[i].quantity); 
          priceAll += Number(typeResult[i].amount);
          materialUuid += typeResult[i].uuid +";";
        }
        console.log(typeResult);
        let unitPrice = (Number(priceAll) / Number(quantityAll)).toFixed(2);
        $("#pot_all_length").val(typeResult.length);
        $("#pot_all_length").attr("material_uuid",materialUuid);

        $("#pot_all_quantitye").val(quantityAll);
        $("#pot_all_price").val(priceAll);
        $("#unit_price").val(unitPrice);
      console.log(typeResult); 
      }
    } else {
      alert("获取原料类别失败！");
    }
  }

  //出库数量
  quantityBlurFunc(obj) {
    let unitPrice = $("#unit_price").val();
    let quantityVal = obj.val();
    if ("" != unitPrice) {
      if("" != quantityVal) {
        let total = Number(quantityVal) * Number(unitPrice);
        $("#price_all").val(total.toFixed(2)); 
        console.log(quantityVal) 
        console.log(unitPrice)
        console.log(total)
      } else {
        $("#quantityVal").val("0"); 
      } 
    } else {
         $("#quantityVal").val("0");
      }

  } 
  //出库按钮
  exitBtnFunc() {
    let priceVal = $("#price_all").val();
    let quantityVal = $("#exit_quantity_all").val();
    let potAllQuantitye = $("#pot_all_quantitye").val();
    let potAllPrice = $("#pot_all_price").val();
    let potMaterialLength = $("#pot_all_length").val();
    let materialUuid = $("#pot_all_length").attr("material_uuid");
    materialUuid = materialUuid.substring(0, materialUuid.length - 1).split(";"); 
    if ("" == priceVal) {
      priceVal = "0";
    }
    if ("" == quantityVal) {
      quantityVal = "0";
    }
    let exitQuantity = Number(potAllQuantitye) - Number(quantityVal);
    let exitPrice = Number(potAllPrice) - Number(priceVal);
    //比例
    let proportionQ = (Number(quantityVal) / Number(potAllQuantitye)).toFixed(2);
    let proportionPrice = (Number(priceVal) / Number(potAllPrice)).toFixed(2);
    let conut = 0;
    for (let i = 0; i < materialUuid.length; i++) {
      let getData = {
        "uuid":materialUuid[i]
      };
      let typeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
      let typeGet = ajax_assistant(typeUrl, getData, false, true, false); 
      let typeResult = JSON.parse(typeGet.result);
      let data = {
        "uuid":materialUuid[i],
        "quantity":typeResult[0].quantity - (typeResult[0].quantity * proportionQ).toFixed(2),
        "amount":typeResult[0].amount - (typeResult[0].amount * proportionPrice).toFixed(2)
      }; 
      let exitUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
      let exitGet = ajax_assistant(exitUrl, data, false, true, false); 
      console.log(exitGet)
      if ("1" == exitGet.status) {
      } else {
        conut = 1;
      }
    }
    if ("1" == conut) {
      alert("出库修改失败");
    } else {
      alert("出库修改成功");
    }
  }
}
