"use strict";

class calculationFormulaManagement {
  /**
   * 获取uuid
   *
   * @param removeLine true: 返回不含中划线的uuid；false: 返回带有中划线的uuid。
   *
   * @return uuid
   */
  getUuid(removeLine = false) {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    if (!removeLine) {
      s[8] = s[13] = s[18] = s[23] = "-";
    }
    let uuid = s.join("");
    return uuid;
  }

  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   */
  constructor(outputId) {
    this.outputId = outputId;
    // 按钮-添加公式的id
    this.buttonFormulaAddId = "_" + this.getUuid(true);
    // 区域-显示公式的id
    this.areaFormulaDisplay = "_" + this.getUuid(true);
    // 区域-显示公式添加的id
    this.areaFormulaAddDisplay = "_" + this.getUuid(true);
    //输入-公式名称
    this.addFormulaName = "_" + this.getUuid(true);
    //输入-公式内容
    this.addFormulaContent = "_" + this.getUuid(true);
    //输入-修改公式名称
    this.addFormulaName = "_" + this.getUuid(true);
    //输入-修改公式内容
    this.addFormulaContent = "_" + this.getUuid(true);
    //公式数据
    this.formulaData = [
      {"formulaName": "加权平均1", "formulaContent": "a+b","uuid": "123"}, 
      {"formulaName": "加权平均2", "formulaContent": "a+b","uuid": "123"}, 
      {"formulaName": "加权平均3", "formulaContent": "a+b","uuid": "123"}, 
      {"formulaName": "加权平均4", "formulaContent": "a+b","uuid": "123"}, 
      {"formulaName": "加权平均5", "formulaContent": "a+b","uuid": "123"}, 
      {"formulaName": "加权平均6", "formulaContent": "a+b","uuid": "123"} 
    ]
  }

  /**
   * 清空原始数据
   */
  clearRawData() {
    $(`#${this.areaFormulaDisplay}`).html("");
  }

  /*
   * 赋值
   */
  fillVariableData() {
    if (isJsonObjectHasData(this.formulaData)) {
      let formulaContent = "";
      for (let i = 0; i < this.formulaData.length; i++) {
        formulaContent += 
          `<div class = "row calculation_formula_management_mt20">
             <div class = "col-md-3">
               <div class="input-group">
                 <input type="text" class="form-control" value = "${this.formulaData[i].formulaName}">
                 <span class="input-group-addon modifyFormulaName" data-uuid = "${this.formulaData[i].uuid}"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
               </div>
             </div>
             <div class = "col-md-8">
               <div class="input-group">
                 <input type="text" class="form-control" value = "${this.formulaData[i].formulaContent}">
                 <span class="input-group-addon modifyFormulaContent" data-uuid = "${this.formulaData[i].uuid}"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
               </div>
             </div>
             <div class = "col-md-1">
               <button class = "btn btn-danger deleteFormula" data-uuid = "${this.formulaData[i].uuid}">
                 <span class = "glyphicon glyphicon-remove"></span>
               </button>
             </div>
           </div>`;
      }
      $(`#${this.areaFormulaDisplay}`).html(formulaContent);
    } else {
      $(`#${this.areaFormulaDisplay}`).html("");
    }
  }
  
  /**
   * 获取服务器数据并覆盖
   */
  serverDataCover() {
    //获取计算公式
    let getFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialCalculationFormula";
    let getFormulaparam = {};
    let getFormulaData = ajax_assistant(getFormulaDataUrl, getFormulaparam, false, true, false);
    console.log(getFormulaData);
    if (1 == getFormulaData.status) {
      let result = JSON.parse(getFormulaData.result);
      console.log(result);
      let formulaDataArr = new Array();
      for (let i = 0; i < result.length; i++) {
        formulaDataArr.push({"formulaName": result[i].name, "formulaContent": result[i].content, "uuid": result[i].uuid});
      }
      this.formulaData = formulaDataArr;
    } else {
      this.formulaData = {};
    }
  }

  /**
   * 添加公式显示
   */
  formulaAddDisplay() {
    let formulaAddContent = 
      `<div class = "row calculation_formula_management_mt20">
         <div class = "col-md-3">
           <div class="form-group">
             <input type="text" class="form-control" id = "${this.addFormulaName}" value = "">
           </div>
         </div>
         <div class = "col-md-8">
           <div class="form-group">
             <input type="text" class="form-control" id = "${this.addFormulaContent}"value = "">
           </div>
         </div>
         <div class = "col-md-1">
           <button class = "btn btn-primary" id = "addFormula">
             <span class = "glyphicon glyphicon-floppy-saved"></span>
           </button>
         </div>
       </div>`;
    $(`#${this.areaFormulaAddDisplay}`).html(formulaAddContent);
  }
  
  /**
   * 添加公式
   */
  formulaAdd() {
    let name = $(`#${this.addFormulaName}`).val();
    let content = $(`#${this.addFormulaContent}`).val();
    if ("" == name) {
      alert("请输入公式名称");
      return;
    } else {
      if (null == name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
        alert("公式名称格式错误");
        return;
      }
    }
    if ("" == content) {
      alert("请输入公式内容");
      return;
    } else {
      if (null == content.match(/^.{1,256}$/)) {
        alert("公式内容格式错误");
        return;
      }
    }
    //检查公式是否重名
    let checkFormulNameUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialCalculationFormulaNameExist";
    let checkFormulNameParam = {
      "name": name,
      "uuid": "00000000000000000000000000000000"
    };
    let checkFormulNameData = ajax_assistant(checkFormulNameUrl, checkFormulNameParam, false, true, false);
    console.log(checkFormulNameData);
    if (1 != checkFormulNameData.status) {
      alert("该公式名称已存在");
      return;
    }
    //添加公式
    let addFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialCalculationFormula";
    let addFormulaparam = {
      "name": name,
      "content": content
    };
    let addFormulaData = ajax_assistant(addFormulaDataUrl, addFormulaparam, false, true, false);
    console.log(addFormulaData);
    if (1 == addFormulaData.status) {
      this.serverDataCover();
      this.fillVariableData();
      $(`#${this.areaFormulaAddDisplay}`).children().remove();
    } else {
      alert("添加失败");
    }
  }

  /**
   * 修改公式名称
   */
  modifyFormulaName(uuid, name) {
    if ("" == name) {
      alert("请输入公式名称");
      return;
    } else {
      if (null == name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
        alert("公式名称格式错误");
        return;
      }
    }
    //检查公式是否重名
    let checkFormulNameUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialCalculationFormulaNameExist";
    let checkFormulNameParam = {
      "name": name,
      "uuid": uuid
    };
    let checkFormulNameData = ajax_assistant(checkFormulNameUrl, checkFormulNameParam, false, true, false);
    console.log(checkFormulNameData);
    if (1 != checkFormulNameData.status) {
      alert("该公式名称已存在");
      return;
    }
    //修改公式名称
    let modifyFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialCalculationFormula";
    let modifyFormulaparam = {
      "uuid": uuid,
      "name": name
    };
    let modifyFormulaData = ajax_assistant(modifyFormulaDataUrl, modifyFormulaparam, false, true, false);
    console.log(modifyFormulaData);
    if (1 == modifyFormulaData.status) {
      this.serverDataCover();
      this.fillVariableData();
      alert("修改成功");
    } else {
      alert("修改失败");
    }
  }

  /**
   * 修改公式内容
   */
  modifyFormulaContent(uuid, content) {
    if ("" == content) {
      alert("请输入公式名称");
      return;
    } else {
      if (null == content.match(/^.{1,256}$/)) {
        alert("公式名称格式错误");
        return;
      }
    }
    //修改公式内容
    let modifyFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialCalculationFormula";
    let modifyFormulaparam = {
      "uuid": uuid,
      "content": content
    };
    let modifyFormulaData = ajax_assistant(modifyFormulaDataUrl, modifyFormulaparam, false, true, false);
    console.log(modifyFormulaData);
    if (1 == modifyFormulaData.status) {
      this.serverDataCover();
      this.fillVariableData();
      alert("修改成功");
    } else {
      alert("修改失败");
    }
  }
  
  /**
   * 删除提示
   */
  deleteFormulaModal(uuid) {
    let deleteModal = 
      '<div class="modal fade bs-example-modal-sm custom_modal" id="calculation_formula_management_delete_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
        '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
            '<div class="modal-header bg-primary">'+
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
              '<h4 class="modal-title" id="myModalLabel">删除公式确认</h4>'+
            '</div>'+
            '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">确认要删除公式吗？</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-danger removeFormulaButton" data-uuid = "' + uuid + '">删除</button>'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    $("body").append(deleteModal);
    $("#calculation_formula_management_delete_modal").modal("show");
    $("#calculation_formula_management_delete_modal").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
  }
  
  /**
   * 删除公式
   */
  deleteFormula(uuid) {
    uuid = uuid;
    let deleteFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterialCalculationFormula";
    let deleteFormulaparam = {
      "uuid": uuid,
    };
    let deleteFormulaData = ajax_assistant(deleteFormulaDataUrl, deleteFormulaparam, false, true, false);
    console.log(deleteFormulaData);
    if (1 == deleteFormulaData.status) {
      $("#calculation_formula_management_delete_modal").modal("hide");
      this.serverDataCover();
      this.fillVariableData();
    } else {
      alert("删除失败");
    }
  }

  /**
   * 输出计算公式
   */
  output() {
    let content = 
      `<div class = "panel panel-default panel-primary">
        <div class = "panel-heading text-left clearfix">
          <h3 class = "panel-title pull-left">计算公式管理</h3>
          <span class = "glyphicon glyphicon-plus pull-right" id = "caclulation_formula_add_button"></span>
        </div>
          <div class = "panel-body table-responsive modify_material_index_pd0">
            <div id = "${this.areaFormulaDisplay}">
              <div class = "row calculation_formula_management_mt20">
                <div class = "col-md-3">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "加权平均">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-8">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-1">
                  <button class = "btn btn-danger">
                    <span class = "glyphicon glyphicon-remove"></span>
                  </button>
                </div>
              </div>
              <div class = "row calculation_formula_management_mt20">
                <div class = "col-md-3">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "加权平均">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-8">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-1">
                  <button class = "btn btn-danger">
                    <span class = "glyphicon glyphicon-remove"></span>
                  </button>
                </div>
              </div>
              <div class = "row calculation_formula_management_mt20">
                <div class = "col-md-3">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "加权平均">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-8">
                  <div class="input-group">
                    <input type="text" class="form-control" value = "">
                    <span class="input-group-addon"><button class = "btn btn-primary"><span class = "glyphicon glyphicon-floppy-disk"></span></button></span>
                  </div>
                </div>
                <div class = "col-md-1">
                  <button class = "btn btn-danger">
                    <span class = "glyphicon glyphicon-remove"></span>
                  </button>
                </div>
              </div>
            </div> 
            <div id = "${this.areaFormulaAddDisplay}"></div> 
          </div>
        </div>
      </div>`;
    $(this.outputId).html(content);
  }
}
