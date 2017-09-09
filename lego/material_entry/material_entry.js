"use strict";

class materialEntry {
  //  /**
  //   * 获取uuid
  //   *
  //   * @param removeLine true: 返回不含中划线的uuid；false: 返回带有中划线的uuid。
  //   *
  //   * @return uuid
  //   */
  //  getUuid(removeLine = false) {
  //    let s = [];
  //    let hexDigits = "0123456789abcdef";
  //    for (let i = 0; i < 36; i++) {
  //      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  //    }
  //    s[14] = "4";
  //    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  //    if (!removeLine) {
  //      s[8] = s[13] = s[18] = s[23] = "-";
  //    }
  //    let uuid = s.join("");
  //    return uuid;
  //  }

  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   */
  constructor(outputId) {
    this.outputId = outputId;
    // 选择-选择库区的id
    //  this.selectWarehouseId = "_" + this.getUuid(true);
    //  // 区域-显示公式的id
    //  this.areaFormulaDisplay = "_" + this.getUuid(true);
    //  // 区域-显示公式添加的id
    //  this.areaFormulaAddDisplay = "_" + this.getUuid(true);
    //  //输入-公式名称
    //  this.addFormulaName = "_" + this.getUuid(true);
    //  //输入-公式内容
    //  this.addFormulaContent = "_" + this.getUuid(true);
    //  //输入-修改公式名称
    //  this.addFormulaName = "_" + this.getUuid(true);
    //  //输入-修改公式内容
    //  this.addFormulaContent = "_" + this.getUuid(true);
    //  //原始数据
    this.originalValueData = {
      "R_d_20_t": 1,
      "R_r_o_n": 1,
      "R_h_r_m": 1,
      "R_l_l": 1,
      "R_i_l": 1,
      "R_m_l": 1,
      "R_d_r_10_e_t": 1,
      "R_d_r_50_e_t": 1,
      "R_d_r_90_e_t": 1,
      "R_f_b_p": 1,
      "R_r_l": 1,
      "R_v_p": 1,
      "R_s_w_g": 1,
      "R_u_g": 1,
      "R_o_s": 1,
      "R_s_l": 1,
      "R_d_t": 1,
      "R_m_s_l": 1,
      "R_c_c_3_h_50_t": 1,
      "R_w_s_ph": 1,
      "R_m_i_w": 1,
      "R_b_l": 1,
      "R_a_l": 1,
      "R_t_a": 1,
      "R_a_a": 1,
      "R_o_l": 1,
      "R_carbinol": 1,
      "R_d_v": 1,
      "R_d_p_i": 1,
      "R_ethanol": 1,
      "R_silicon": 1,
      "R_methylaniline": 1,
      "R_formal": 1,
      "R_d_s": 1,
      "R_s_b_a": 1,
      "R_c_l": 1,
    }
    //公式名称
    this.CFData = [
      {"cfName": "公式一", "cfContent": "a+b1"}, 
      {"cfName": "公式二", "cfContent": "a+b"}, 
      {"cfName": "公式一", "cfContent": "a+b2"}, 
      {"cfName": "公式一", "cfContent": "a+b3"} 
    ]
    // 库区数据
    this.warehouseData = [
      {"warehouseName": "库区1", "uuid": "11"},
      {"warehouseName": "库区12", "uuid": "11"},
      {"warehouseName": "库区13", "uuid": "11"},
      {"warehouseName": "库区1", "uuid": "11"},
    ]
  }

  /**
   * 清空原始值
   */
  clearRawData() {
    // 清空原始值
    $("#R_d_20_t").html("");
    $("#R_r_o_n").html("");
    $("#R_h_r_m").html("");
    $("#R_l_l").html("");
    $("#R_i_l").html("");
    $("#R_m_l").html("");
    $("#R_d_r_10_e_t").html("");
    $("#R_d_r_50_e_t").html("");
    $("#R_d_r_90_e_t").html("");
    $("#R_f_b_p").html("");
    $("#R_r_l").html("");
    $("#R_v_p").html("");
    $("#R_s_w_g").html("");
    $("#R_u_g").html("");
    $("#R_o_s").html("");
    $("#R_s_l").html("");
    $("#R_d_t").html("");
    $("#R_m_s_l").html("");
    $("#R_c_c_3_h_50_t").html("");
    $("#R_w_s_ph").html("");
    $("#R_m_i_w").html("");
    $("#R_b_l").html("");
    $("#R_a_l").html("");
    $("#R_t_a").html("");
    $("#R_a_a").html("");
    $("#R_o_l").html("");
    $("#R_carbinol").html("");
    $("#R_d_v").html("");
    $("#R_d_p_i").html("");
    $("#R_ethanol").html("");
    $("#R_silicon").html("");
    $("#R_methylaniline").html("");
    $("#R_formal").html("");
    $("#R_d_s").html("");
    $("#R_s_b_a").html("");
    $("#R_c_l").html("");
    // 清空公式名称
    $(".cfName").html("");
    //清空库区
    $("#selectWarehouseId").html("");
  }
  
  /**
   * 库区赋值
   */
  fillWarehouseData() {
    debugger;
    if (isJsonObjectHasData(this.warehouseData)) {
      let warehouseContent = `<option class = "">--请选择--</option>`;
        for (let i = 0; i < this.warehouseData.length; i++) {
          warehouseContent += `<option value = "${this.warehouseData[i].uuid}">${this.warehouseData[i].warehouseName}</option>`;
        }
      $("#selectWarehouseId").html(warehouseContent);
    }
  }
  /*
   * 赋值
   */
  fillVariableData() {
    if (isJsonObjectHasData(this.originalValueData)) {
      $("#R_d_20_t").html(this.originalValueData.R_d_20_t);
      $("#R_r_o_n").html(this.originalValueData.R_r_o_n);
      $("#R_h_r_m").html(this.originalValueData.R_h_r_m);
      $("#R_l_l").html(this.originalValueData.R_l_l);
      $("#R_i_l").html(this.originalValueData.R_i_l);
      $("#R_m_l").html(this.originalValueData.R_m_l);
      $("#R_d_r_10_e_t").html(this.originalValueData.R_d_r_10_e_t);
      $("#R_d_r_50_e_t").html(this.originalValueData.R_d_r_50_e_t);
      $("#R_d_r_90_e_t").html(this.originalValueData.R_d_r_90_e_t);
      $("#R_f_b_p").html(this.originalValueData.R_f_b_p);
      $("#R_r_l").html(this.originalValueData.R_r_l);
      $("#R_v_p").html(this.originalValueData.R_v_p);
      $("#R_s_w_g").html(this.originalValueData.R_s_w_g);
      $("#R_u_g").html(this.originalValueData.R_u_g);
      $("#R_o_s").html(this.originalValueData.R_o_s);
      $("#R_s_l").html(this.originalValueData.R_s_l);
      $("#R_d_t").html(this.originalValueData.R_d_t);
      $("#R_m_s_l").html(this.originalValueData.R_m_s_l);
      $("#R_c_c_3_h_50_t").html(this.originalValueData.R_c_c_3_h_50_t);
      $("#R_w_s_ph").html(this.originalValueData.R_w_s_ph);
      $("#R_m_i_w").html(this.originalValueData.R_m_i_w);
      $("#R_b_l").html(this.originalValueData.R_b_l);
      $("#R_a_l").html(this.originalValueData.R_a_l);
      $("#R_t_a").html(this.originalValueData.R_t_a);
      $("#R_a_a").html(this.originalValueData.R_a_a);
      $("#R_o_l").html(this.originalValueData.R_o_l);
      $("#R_carbinol").html(this.originalValueData.R_carbinol);
      $("#R_d_v").html(this.originalValueData.R_d_v);
      $("#R_d_p_i").html(this.originalValueData.R_d_p_i);
      $("#R_ethanol").html(this.originalValueData.R_ethanol);
      $("#R_silicon").html(this.originalValueData.R_silicon);
      $("#R_methylaniline").html(this.originalValueData.R_methylaniline);
      $("#R_formal").html(this.originalValueData.R_formal);
      $("#R_d_s").html(this.originalValueData.R_d_s);
      $("#R_s_b_a").html(this.originalValueData.R_s_b_a);
      $("#R_c_l").html(this.originalValueData.R_c_l);
    }
    if (isJsonObjectHasData(this.CFData)) {
      let cfNameContent = `<option class = "">--请选择--</option>`;
        for (let i = 0; i < this.CFData.length; i++) {
          cfNameContent += `<option value = "${this.CFData[i].cfContent}">${this.CFData[i].cfName}</option>`;
        }
      $(".cfName").html(cfNameContent);
    }
  }

  /**
   * 公式内容
   */
  cfContent(content) {
     $
  }
  
  //  
  //  /**
  //   * 获取服务器数据并覆盖
  //   */
  //  serverDataCover() {
  //    //获取计算公式
  //    let getFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialCalculationFormula";
  //    let getFormulaparam = {};
  //    let getFormulaData = ajax_assistant(getFormulaDataUrl, getFormulaparam, false, true, false);
  //    console.log(getFormulaData);
  //    if (1 == getFormulaData.status) {
  //      let result = JSON.parse(getFormulaData.result);
  //      console.log(result);
  //      let formulaDataArr = new Array();
  //      for (let i = 0; i < result.length; i++) {
  //        formulaDataArr.push({"formulaName": result[i].name, "formulaContent": result[i].content, "uuid": result[i].uuid});
  //      }
  //      this.formulaData = formulaDataArr;
  //    } else {
  //      this.formulaData = {};
  //    }
  //  }

  //  /**
  //   * 添加公式显示
  //   */
  //  formulaAddDisplay() {
  //    let formulaAddContent = 
  //      `<div class = "row calculation_formula_management_mt20">
  //         <div class = "col-md-3">
  //           <div class="form-group">
  //             <input type="text" class="form-control" id = "${this.addFormulaName}" value = "">
  //           </div>
  //         </div>
  //         <div class = "col-md-8">
  //           <div class="form-group">
  //             <input type="text" class="form-control" id = "${this.addFormulaContent}"value = "">
  //           </div>
  //         </div>
  //         <div class = "col-md-1">
  //           <button class = "btn btn-primary" id = "addFormula">
  //             <span class = "glyphicon glyphicon-floppy-saved"></span>
  //           </button>
  //         </div>
  //       </div>`;
  //    $(`#${this.areaFormulaAddDisplay}`).html(formulaAddContent);
  //  }
  //  
  //  /**
  //   * 添加公式
  //   */
  //  formulaAdd() {
  //    let name = $(`#${this.addFormulaName}`).val();
  //    let content = $(`#${this.addFormulaContent}`).val();
  //    if ("" == name) {
  //      alert("请输入公式名称");
  //      return;
  //    } else {
  //      if (null == name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
  //        alert("公式名称格式错误");
  //        return;
  //      }
  //    }
  //    if ("" == content) {
  //      alert("请输入公式内容");
  //      return;
  //    } else {
  //      if (null == content.match(/^.{1,256}$/)) {
  //        alert("公式内容格式错误");
  //        return;
  //      }
  //    }
  //    //检查公式是否重名
  //    let checkFormulNameUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialCalculationFormulaNameExist";
  //    let checkFormulNameParam = {
  //      "name": name,
  //      "uuid": "00000000000000000000000000000000"
  //    };
  //    let checkFormulNameData = ajax_assistant(checkFormulNameUrl, checkFormulNameParam, false, true, false);
  //    console.log(checkFormulNameData);
  //    if (1 != checkFormulNameData.status) {
  //      alert("该公式名称已存在");
  //      return;
  //    }
  //    //添加公式
  //    let addFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialCalculationFormula";
  //    let addFormulaparam = {
  //      "name": name,
  //      "content": content
  //    };
  //    let addFormulaData = ajax_assistant(addFormulaDataUrl, addFormulaparam, false, true, false);
  //    console.log(addFormulaData);
  //    if (1 == addFormulaData.status) {
  //      this.serverDataCover();
  //      this.fillVariableData();
  //      $(`#${this.areaFormulaAddDisplay}`).children().remove();
  //    } else {
  //      alert("添加失败");
  //    }
  //  }

  //  /**
  //   * 修改公式名称
  //   */
  //  modifyFormulaName(uuid, name) {
  //    if ("" == name) {
  //      alert("请输入公式名称");
  //      return;
  //    } else {
  //      if (null == name.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
  //        alert("公式名称格式错误");
  //        return;
  //      }
  //    }
  //    //检查公式是否重名
  //    let checkFormulNameUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=checkWarehousePotMaterialCalculationFormulaNameExist";
  //    let checkFormulNameParam = {
  //      "name": name,
  //      "uuid": uuid
  //    };
  //    let checkFormulNameData = ajax_assistant(checkFormulNameUrl, checkFormulNameParam, false, true, false);
  //    console.log(checkFormulNameData);
  //    if (1 != checkFormulNameData.status) {
  //      alert("该公式名称已存在");
  //      return;
  //    }
  //    //修改公式名称
  //    let modifyFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialCalculationFormula";
  //    let modifyFormulaparam = {
  //      "uuid": uuid,
  //      "name": name
  //    };
  //    let modifyFormulaData = ajax_assistant(modifyFormulaDataUrl, modifyFormulaparam, false, true, false);
  //    console.log(modifyFormulaData);
  //    if (1 == modifyFormulaData.status) {
  //      this.serverDataCover();
  //      this.fillVariableData();
  //      alert("修改成功");
  //    } else {
  //      alert("修改失败");
  //    }
  //  }

  //  /**
  //   * 修改公式内容
  //   */
  //  modifyFormulaContent(uuid, content) {
  //    if ("" == content) {
  //      alert("请输入公式名称");
  //      return;
  //    } else {
  //      if (null == content.match(/^.{1,256}$/)) {
  //        alert("公式名称格式错误");
  //        return;
  //      }
  //    }
  //    //修改公式内容
  //    let modifyFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialCalculationFormula";
  //    let modifyFormulaparam = {
  //      "uuid": uuid,
  //      "content": content
  //    };
  //    let modifyFormulaData = ajax_assistant(modifyFormulaDataUrl, modifyFormulaparam, false, true, false);
  //    console.log(modifyFormulaData);
  //    if (1 == modifyFormulaData.status) {
  //      this.serverDataCover();
  //      this.fillVariableData();
  //      alert("修改成功");
  //    } else {
  //      alert("修改失败");
  //    }
  //  }
  //  
  //  /**
  //   * 删除提示
  //   */
  //  deleteFormulaModal(uuid) {
  //    let deleteModal = 
  //      '<div class="modal fade bs-example-modal-sm custom_modal" id="calculation_formula_management_delete_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
  //        '<div class="modal-dialog modal-sm" role="document">'+
  //          '<div class="modal-content">'+
  //            '<div class="modal-header bg-primary">'+
  //              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
  //              '<h4 class="modal-title" id="myModalLabel">删除公式确认</h4>'+
  //            '</div>'+
  //            '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">确认要删除公式吗？</div>'+
  //            '<div class="modal-footer">'+
  //              '<button type="button" class="btn btn-danger removeFormulaButton" data-uuid = "' + uuid + '">删除</button>'+
  //              '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
  //            '</div>'+
  //          '</div>'+
  //        '</div>'+
  //      '</div>';
  //    $("body").append(deleteModal);
  //    $("#calculation_formula_management_delete_modal").modal("show");
  //    $("#calculation_formula_management_delete_modal").on("hidden.bs.modal", function (e) {
  //      $(this).remove();
  //    });
  //  }
  //  
  //  /**
  //   * 删除公式
  //   */
  //  deleteFormula(uuid) {
  //    uuid = uuid;
  //    let deleteFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterialCalculationFormula";
  //    let deleteFormulaparam = {
  //      "uuid": uuid,
  //    };
  //    let deleteFormulaData = ajax_assistant(deleteFormulaDataUrl, deleteFormulaparam, false, true, false);
  //    console.log(deleteFormulaData);
  //    if (1 == deleteFormulaData.status) {
  //      $("#calculation_formula_management_delete_modal").modal("hide");
  //      this.serverDataCover();
  //      this.fillVariableData();
  //    } else {
  //      alert("删除失败");
  //    }
  //  }

  /**
   * 输出计算公式
   */
  output() {
    let content = 
      `<div class = "panel panel-default panel-primary">
        <div class = "panel-heading">原料入库</div>
        <div class = "panel-body" style="padding-bottom: 0;">
          <div class = "row">
            <div class = "col-md-4">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">库区</span>
                <select class = "form-control" id = "selectWarehouseId">
                  <option class = "">--请选择--</option>
                  <option value = "1">舟山纳海</option>
                  <option value = "2">泰州锦华</option>
                </select>
              </div>
            </div>
            <div class = "col-md-4">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">储罐</span>
                <select class = "form-control">
                  <option class = "">--请选择--</option>
                  <option value = "1">A01</option>
                  <option value = "2">A02</option>
                </select>
              </div>
            </div>
            <div class = "col-md-4">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">原料类别</span>
                <select class = "form-control">
                  <option class = "">--请选择--</option>
                  <option value = "1">原油</option>
                  <option value = "2">原油</option>
                </select>
              </div>
            </div>
          </div>
          <div class = "row material_entry_mt20">
            <div class = "col-md-4">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">原料数量</span>
                <input type="text" class="form-control">
                <span class = "input-group-addon">吨</span>
              </div>
            </div>
            <div class = "col-md-4">
              <div class = "input-group pull-left">
                <span class = "input-group-addon">原料价格</span>
                <input type="text" class="form-control">
                <span class = "input-group-addon">元</span>
              </div>
            </div>
            <div class = "col-md-4">
              <div class = "form-group">
                <button type = "button" class = "btn btn-primary" style = "width: 100px;">入库</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class = "panel panel-default panel-primary">
        <div class = "panel-heading text-left">【E01】指标数据</div>
        <div class = "panel-body table-responsive material_entry_pd0">
          <table  class = "table contact_management_mt20" id = "">
            <thead>
              <tr>
                <th>指标名称</th>
                <th>原始值</th>
                <th>入库值</th>
                <th>公式名称</th>
                <th>公式内容</th>
                <th>结果值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20℃密度</td>
                <td id = "R_d_20_t">738</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_20_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td> 
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>研究法辛烷值</td>
                <td id = "R_r_o_n">93.5</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_r_o_n">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td> 
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>抗爆指数（RON+MOn）/2</td>
                <td id = "R_h_r_m">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_h_r_m">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>铅含量</td>
                <td id = "R_l_l">4.3</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_l_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>铁含量</td>
                <td id = "R_i_l">1.8</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_i_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>锰含量</td>
                <td id = "R_m_l">5.9</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_m_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>馏程10%蒸发温度</td>
                <td id = "R_d_r_10_e_t">59</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_r_10_e_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>馏程50%蒸发温度</td>
                <td id = "R_d_r_50_e_t">108</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_r_50_e_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td> 
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>馏程90%蒸发温度</td>
                <td id = "R_d_r_90_e_t">179</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_r_90_e_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>终馏点</td>
                <td id = "R_f_b_p">199</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_f_b_p">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>残留量</td>
                <td id = "R_r_l">1.9</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_r_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>蒸汽压</td>
                <td id = "R_v_p">50</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_v_p">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>溶剂洗胶质</td>
                <td id = "R_s_w_g">4.3</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_s_w_g">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>未洗胶质</td>
                <td id = "R_u_g">28</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_u_g">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>诱导期（氧化安定性）</td>
                <td id = "R_o_s">479</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_o_s">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>硫含量</td>
                <td id = "R_s_l">39</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_s_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>博士实验</td>
                <td id = "R_d_t">通过</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>硫醇硫含量</td>
                <td id = "R_m_s_l">7.9</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_m_s_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>铜片腐蚀（3h，50℃）</td>
                <td id = "R_c_c_3_h_50_t">1a</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_c_c_3_h_50_t">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>水溶性酸或碱</td>
                <td id = "R_w_s_ph">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_w_s_ph">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>机械杂质和水</td>
                <td id = "R_m_i_w">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_m_i_w">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>苯含量</td>
                <td id = "R_b_l">0.7</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_b_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>芳烃含量</td>
                <td id = "R_a_l">34</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_a_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>总烯烃</td>
                <td id = "R_t_a">18</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_t_a">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>烯烃+芳烃</td>
                <td id = "R_a_a">59</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_a_a">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>氧含量</td>
                <td id = "R_o_l">1.9</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_o_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>甲醇</td>
                <td id = "R_carbinol">0.18</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_carbinol">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>二烯值</td>
                <td id = "R_d_v">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_v">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>驾驶性能指数</td>
                <td id = "R_d_p_i">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_p_i">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>乙醇</td>
                <td id = "R_ethanol">0.18</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_ethanol">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>硅</td>
                <td id = "R_silicon">0.09</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_silicon">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>甲基苯胺</td>
                <td id = "R_methylaniline">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_methylaniline">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>甲缩醛</td>
                <td id = "R_formal">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_formal">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>硫酸二甲酯</td>
                <td id = "R_d_s">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_d_s">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>乙酸仲丁酯</td>
                <td id = "R_s_b_a">0</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_s_b_a">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
              <tr>
                <td>氯含量</td>
                <td id = "R_c_l">9</td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "E_c_l">
                  </div>
                </td>
                <td>
                  <select class = "form-control cfName" id = "">
                    <option class = "">--请选择--</option>
                    <option value = "1">公式一</option>
                    <option value = "2">公式二</option>
                  </select>
                </td>
               <td class = "cfContent">
                  <div class="form-group">
                    <input type="text" class="form-control cfContent" id = "">
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" class="form-control" id = "">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
    $(this.outputId).html(content);
  }
}
