"use strict";

class materialEntry {

  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   */
  constructor(outputId) {
    this.outputId = outputId;
    // 原始数据
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
      "quantity": 100
    }
    // 公式名称
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
    // 储罐数据
    this.warehousePotData = [
      {"warehousePotName": "储罐1", "uuid": "11"},
      {"warehousePotName": "储罐12", "uuid": "11"},
      {"warehousePotName": "储罐13", "uuid": "11"},
      {"warehousePotName": "储罐1", "uuid": "11"},
    ]
    // 储罐数据
    this.materialCategoryData = [
      {"materialCategory": "类别1", "uuid": "11"},
      {"materialCategory": "类别12", "uuid": "11"},
      {"materialCategory": "类别13", "uuid": "11"},
      {"materialCategory": "类别1", "uuid": "11"},
    ]
    // 原料类别的原始金额和数量
    this.materialCategoryData = {"quantity": 100,"amount": 100}
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
    // 清空库区
    $("#selectWarehouseId").html(`<option value = "">--请选择--</option>`);
    // 清空储罐
    $("#selectWarehousePotId").html(`<option value = "">--请选择--</option>`);
    // 原料类别
    $("#materialCategoryId").html(`<option value = "">--请选择--</option>`);
    // 清空title
    $("#indexTitle").html("指标数据");
  }
  
  /**
   * 库区赋值
   */
  fillWarehouseData() {
    if (isJsonObjectHasData(this.warehouseData)) {
      let warehouseContent = `<option value = "">--请选择--</option>`;
        for (let i = 0; i < this.warehouseData.length; i++) {
          warehouseContent += `<option value = "${this.warehouseData[i].uuid}">${this.warehouseData[i].warehouseName}</option>`;
        }
      $("#selectWarehouseId").html(warehouseContent);
    } else {
      $("#selectWarehouseId").html(`<option value = "">--请选择--</option>`);
    }
  }
  
  /**
   * 储罐赋值
   */
  fillWarehousePotData() {
    if (isJsonObjectHasData(this.warehousePotData)) {
      let warehousePotContent = `<option value = "">--请选择--</option>`;
        for (let i = 0; i < this.warehousePotData.length; i++) {
          warehousePotContent += `<option value = "${this.warehousePotData[i].uuid}">${this.warehousePotData[i].warehousePotName}</option>`;
        }
      $("#selectWarehousePotId").html(warehousePotContent);
    } else {
      $("#selectWarehousePotId").html(`<option value = "">--请选择--</option>`);
    }
  }

  /**
   * 类别赋值
   */
  fillMaterialCategoryData() {
    if (isJsonObjectHasData(this.materialCategoryData)) {
      let materialCategoryContent = `<option value = "">--请选择--</option>`;
        for (let i = 0; i < this.materialCategoryData.length; i++) {
          materialCategoryContent += `<option value = "${this.materialCategoryData[i].uuid}">${this.materialCategoryData[i].materialCategory}</option>`;
        }
      $("#materialCategoryId").html(materialCategoryContent);
    } else {
      $("#materialCategoryId").html(`<option value = "">--请选择--</option>`);
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
      let warehouse = $("#selectWarehouseId").find("option:selected").text();
      let entryPot = $("#selectWarehousePotId").find("option:selected").text();
      let entryQuantity = this.originalValueData.quantity;
      $("#indexTitle").html(warehouse + '-' + entryPot + '-' + entryQuantity + '吨');
    } else {
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
      let warehouse = $("#selectWarehouseId").find("option:selected").text();
      let entryPot = $("#selectWarehousePotId").find("option:selected").text();
      $("#indexTitle").html(warehouse + '-' + entryPot);
    }
  }

  /** 
   * 公式赋值
   */
  fillFormulaData() {
    if (isJsonObjectHasData(this.CFData)) {
      let cfNameContent = `<option value = "">--请选择--</option>`;
        for (let i = 0; i < this.CFData.length; i++) {
          cfNameContent += `<option value = "${this.CFData[i].cfContent}">${this.CFData[i].cfName}</option>`;
        }
      $(".cfName").html(cfNameContent);
    }
  }

  /**
   * 获取库区
   */
  getWarehouse() {
    let get_warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    let get_warehouse_param_data = {};
    let org_structure_get_warehouse = ajax_assistant(get_warehouse_url, get_warehouse_param_data, false, true, false);
    //console.log(org_structure_get_warehouse);
    if (1 == org_structure_get_warehouse.status) {
      if (0 == org_structure_get_warehouse.count) {
        work_area_data = {};
      } else {
        let warehouse_arr = new Array();
        let result = JSON.parse(org_structure_get_warehouse.result); 
        for (let i = 0; i < result.length; i++) {
          warehouse_arr.push({"warehouseName":result[i].name, "uuid":result[i].uuid});
        }
        this.warehouseData = warehouse_arr;
      }
    } else {
      alert("获取库区失败");
      return;
    } 
  }
  
  /**
   * 获取储罐
   */
  getWarehousePot(warehouse_uuid) {
    let get_warehouse_pot_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let get_warehouse_pot_param_data = {};
    get_warehouse_pot_param_data["warehouse_uuid"] = warehouse_uuid;
    let godown_entry_get_warehouse_pot = ajax_assistant(get_warehouse_pot_url, get_warehouse_pot_param_data, false, true, false);
    // console.log(godown_entry_get_warehouse_pot);
    if (1 == godown_entry_get_warehouse_pot.status) {
      if (0 == godown_entry_get_warehouse_pot.count) {
        this.warehousePotData = {};
      } else {
        let warehouse_pot_arr = new Array();
        let result = JSON.parse(godown_entry_get_warehouse_pot.result); 
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          warehouse_pot_arr.push({"warehousePotName":result[i].name, "uuid":result[i].uuid});
        }
        this.warehousePotData = warehouse_pot_arr;
      }
    } else {
      alert("获取储罐失败");
      return;
    } 
  }

  /**
   * 获取原料类别
   */
  getMaterialCategory(warehouse_uuid) {
    let getMaterialCategoryUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let getMaterialCategoryParam = {};
    getMaterialCategoryParam["warehouse_uuid"] = warehouse_uuid;
    let getMaterialCategoryData = ajax_assistant(getMaterialCategoryUrl, getMaterialCategoryParam, false, true, false);
    console.log(getMaterialCategoryData);
    if (1 == getMaterialCategoryData.status) {
      if (0 == getMaterialCategoryData.count) {
        this.materialCategoryData = {};
      } else {
        let materialCategoryArr = new Array();
        let result = JSON.parse(getMaterialCategoryData.result); 
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          materialCategoryArr.push({"materialCategory":result[i].name, "uuid":result[i].uuid});
        }
        this.materialCategoryData = materialCategoryArr;
      }
    } else {
      alert("获取原料类别失败");
      return;
    } 
  }

  /**
   * 根据uuid获取原料类别的数量和金额
   */
  getMaterialCategoryByUuid(warehouse_uuid) {
    let uuid = $("#materialCategoryId").val();
    if("" == uuid) {
      alert("请选择原料类别");
      return;
    }
    let getMaterialCategoryUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let getMaterialCategoryParam = {};
    getMaterialCategoryParam["warehouse_uuid"] = warehouse_uuid;
    getMaterialCategoryParam["uuid"] = uuid;
    let getMaterialCategoryData = ajax_assistant(getMaterialCategoryUrl, getMaterialCategoryParam, false, true, false);
    console.log(getMaterialCategoryData);
    if (1 == getMaterialCategoryData.status) {
      let result = JSON.parse(getMaterialCategoryData.result);
      this.materialCategoryData = {"quantity": result[0].quantity,"amount": result[0].amount};
    } else {
      alert("获取类别失败");
      return;
    } 
  }

  /**
   * 修改原料类别
   */
  modifyWarehousePotMaterialType(warehouse_uuid, uuid) {
    let quantity = $("#quantity").val();
    let amount = $("#amount").val();
    if("" == quantity) {
      alert("请输入原料数量");
      return;
    } else {
      if(null == quantity.toString().match(/^(\d+)(\.\d+)?$/)) {
        alert("原料数量格式错误");
        return;
      }
    }
    if("" == amount) {
      alert("请输入原料价格");
      return;
    } else {
      if(null == amount.toString().match(/^(\d+)(\.\d+)?$/)) {
        alert("原料价格格式错误");
        return;
      }
    }
    let quantityAll = new Number(quantity) + this.materialCategoryData.quantity;
    let amountAll = new Number(amount) + this.materialCategoryData.amount;
    let modifyWarehousePotMaterialTypeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialType";
    let modifyWarehousePotMaterialTypeParam = {};
    modifyWarehousePotMaterialTypeParam["warehouse_uuid"] = warehouse_uuid;
    modifyWarehousePotMaterialTypeParam["uuid"] = uuid;
    modifyWarehousePotMaterialTypeParam["quantity"] = quantity;
    modifyWarehousePotMaterialTypeParam["amount"] = amount;
    let modifyWarehousePotMaterialTypeData = ajax_assistant(modifyWarehousePotMaterialTypeUrl, modifyWarehousePotMaterialTypeParam, false, true, false);
    console.log(modifyWarehousePotMaterialTypeData);
    if (1 == modifyWarehousePotMaterialTypeData.status) {
      alert("修改原料类别成功");
    } else {
      alert("修改原料类别失败");
      return;
    }
  }
  /**
   * 获取公式
   */
  getFormula() {
    let getFormulaDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialCalculationFormula";
    let getFormulaparam = {};
    let getFormulaData = ajax_assistant(getFormulaDataUrl, getFormulaparam, false, true, false);
    console.log(getFormulaData);
    if (1 == getFormulaData.status) {
      let result = JSON.parse(getFormulaData.result);
      console.log(result);
      let formulaDataArr = new Array();
      for (let i = 0; i < result.length; i++) { 
        formulaDataArr.push({"cfName": result[i].name, "cfContent": result[i].content});
      }
      this.CFData = formulaDataArr;
    } else {
      this.CFData = {};
    }
  }

  /**
   * 获取原料指标
   */
  getWarehousePotMaterialIndex(pot_uuid) {
    let getWarehousePotMaterialIndexUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialIndex";
    let getWarehousePotMaterialIndexParam = {};
    getWarehousePotMaterialIndexParam["pot_uuid"] = pot_uuid;
    let getWarehousePotMaterialIndexData = ajax_assistant(getWarehousePotMaterialIndexUrl, getWarehousePotMaterialIndexParam, false, true, false);
    console.log(getWarehousePotMaterialIndexData);
    if (1 == getWarehousePotMaterialIndexData.status) {
      if (0 == getWarehousePotMaterialIndexData.count) {
        this.originalValueData = {};
        $("#addMaterialEntryBtn").css("display","block");
        $("#modifyMaterialEntryBtn").css("display","none");
        $("thead tr th:nth-child(3)").css("display","none");
        $("thead tr th:nth-child(4)").css("display","none");
        $("thead tr th:nth-child(5)").css("display","none");
        $("tbody tr td:nth-child(3)").css("display","none");
        $("tbody tr td:nth-child(4)").css("display","none");
        $("tbody tr td:nth-child(5)").css("display","none");
      } else {
        let result = JSON.parse(getWarehousePotMaterialIndexData.result); 
        console.log(result);
        $("#addMaterialEntryBtn").css("display","none");
        $("#modifyMaterialEntryBtn").css("display","block");
        $("#modifyMaterialEntryBtn button").attr("uuid",result[0].uuid);
        $("thead tr th:nth-child(3)").css("display","table-cell");
        $("thead tr th:nth-child(4)").css("display","table-cell");
        $("thead tr th:nth-child(5)").css("display","table-cell");
        $("tbody tr td:nth-child(3)").css("display","table-cell");
        $("tbody tr td:nth-child(4)").css("display","table-cell");
        $("tbody tr td:nth-child(5)").css("display","table-cell");
        let R_d_t = "";
        let R_c_c_3_h_50_t = "";
        if (0 == result[0].d_t) {
          R_d_t = "不通过";
        } else {
          R_d_t  = "通过";
        } 
        if (1.1 == result[0].c_c_3_h_50_t) {
          R_c_c_3_h_50_t = "1a";
        } else {
          R_c_c_3_h_50_t  = "1b";
        } 
        this.originalValueData = {
          "R_d_20_t": result[0].d_20_t,
          "R_r_o_n": result[0].r_o_n,
          "R_h_r_m": result[0].h_r_m,
          "R_l_l": result[0].l_l,
          "R_i_l": result[0].i_l,
          "R_m_l": result[0].m_l,
          "R_d_r_10_e_t": result[0].d_r_10_e_t,
          "R_d_r_50_e_t": result[0].d_r_50_e_t,
          "R_d_r_90_e_t": result[0].d_r_90_e_t,
          "R_f_b_p": result[0].f_b_p,
          "R_r_l": result[0].r_l,
          "R_v_p": result[0].v_p,
          "R_s_w_g": result[0].s_w_g,
          "R_u_g": result[0].u_g,
          "R_o_s": result[0].o_s,
          "R_s_l": result[0].s_l,
          "R_d_t": R_d_t,
          "R_m_s_l": result[0].m_s_l,
          "R_c_c_3_h_50_t": R_c_c_3_h_50_t,
          "R_w_s_ph": result[0].w_s_ph,
          "R_m_i_w": result[0].m_i_w,
          "R_b_l": result[0].b_l,
          "R_a_l": result[0].a_l,
          "R_t_a": result[0].t_a,
          "R_a_a": result[0].a_a,
          "R_o_l": result[0].o_l,
          "R_carbinol": result[0].carbinol,
          "R_d_v": result[0].d_v,
          "R_d_p_i": result[0].d_p_i,
          "R_ethanol": result[0].ethanol,
          "R_silicon": result[0].silicon,
          "R_methylaniline": result[0].methylaniline,
          "R_formal": result[0].formal,
          "R_d_s": result[0].d_s,
          "R_s_b_a": result[0].s_b_a,
          "R_c_l": result[0].c_l,
          "quantity": result[0].quantity
        }
      }
    } else {
      alert("获取数据指标失败");
      return;
    }
  }

  /**
   * 公式替换
   */
  replaceCfContent(cfContent) {
    //原始值
    let R_d_20_t = $("#R_d_20_t").html();
    let R_r_o_n = $("#R_r_o_n").html();
    let R_h_r_m = $("#R_h_r_m").html();
    let R_l_l = $("#R_l_l").html();
    let R_i_l = $("#R_i_l").html();
    let R_m_l = $("#R_m_l").html();
    let R_d_r_10_e_t = $("#R_d_r_10_e_t").html();
    let R_d_r_50_e_t = $("#R_d_r_50_e_t").html();
    let R_d_r_90_e_t = $("#R_d_r_90_e_t").html();
    let R_f_b_p = $("#R_f_b_p").html();
    let R_r_l = $("#R_r_l").html();
    let R_v_p = $("#R_v_p").html();
    let R_s_w_g = $("#R_s_w_g").html();
    let R_u_g = $("#R_u_g").html();
    let R_o_s = $("#R_o_s").html();
    let R_s_l = $("#R_s_l").html();
    let R_d_t = $("#R_d_t").html();
    let R_m_s_l = $("#R_m_s_l").html();
    let R_c_c_3_h_50_t = $("#R_c_c_3_h_50_t").html();
    let R_w_s_ph = $("#R_w_s_ph").html();
    let R_m_i_w = $("#R_m_i_w").html();
    let R_b_l = $("#R_b_l").html();
    let R_a_l = $("#R_a_l").html();
    let R_t_a = $("#R_t_a").html();
    let R_a_a = $("#R_a_a").html();
    let R_o_l = $("#R_o_l").html();
    let R_carbinol = $("#R_carbinol").html();
    let R_d_v = $("#R_d_v").html();
    let R_d_p_i = $("#R_d_p_i").html();
    let R_ethanol = $("#R_ethanol").html();
    let R_silicon = $("#R_silicon").html();
    let R_methylaniline = $("#R_methylaniline").html();
    let R_formal = $("#R_formal").html();
    let R_d_s = $("#R_d_s").html();
    let R_s_b_a = $("#R_s_b_a").html();
    let R_c_l = $("#R_c_l").html();
    //入库值
    let E_d_20_t = $("#E_d_20_t").val();
    let E_r_o_n = $("#E_r_o_n").val();
    let E_h_r_m = $("#E_h_r_m").val();
    let E_l_l = $("#E_l_l").val();
    let E_i_l = $("#E_i_l").val();
    let E_m_l = $("#E_m_l").val();
    let E_d_r_10_e_t = $("#E_d_r_10_e_t").val();
    let E_d_r_50_e_t = $("#E_d_r_50_e_t").val();
    let E_d_r_90_e_t = $("#E_d_r_90_e_t").val();
    let E_f_b_p = $("#E_f_b_p").val();
    let E_r_l = $("#E_r_l").val();
    let E_v_p = $("#E_v_p").val();
    let E_s_w_g = $("#E_s_w_g").val();
    let E_u_g = $("#E_u_g").val();
    let E_o_s = $("#E_o_s").val();
    let E_s_l = $("#E_s_l").val();
    let E_d_t = $("#E_d_t").val();
    let E_m_s_l = $("#E_m_s_l").val();
    let E_c_c_3_h_50_t = $("#E_c_c_3_h_50_t").val();
    let E_w_s_ph = $("#E_w_s_ph").val();
    let E_m_i_w = $("#E_m_i_w").val();
    let E_b_l = $("#E_b_l").val();
    let E_a_l = $("#E_a_l").val();
    let E_t_a = $("#E_t_a").val();
    let E_a_a = $("#E_a_a").val();
    let E_o_l = $("#E_o_l").val();
    let E_carbinol = $("#E_carbinol").val();
    let E_d_v = $("#E_d_v").val();
    let E_d_p_i = $("#E_d_p_i").val();
    let E_ethanol = $("#E_ethanol").val();
    let E_silicon = $("#E_silicon").val();
    let E_methylaniline = $("#E_methylaniline").val();
    let E_formal = $("#E_formal").val();
    let E_d_s = $("#E_d_s").val();
    let E_s_b_a = $("#E_s_b_a").val();
    let E_c_l = $("#E_c_l").val();
    cfContent = cfContent.replace(/\$\{R_d_20_t\}/g, R_d_20_t);
    cfContent = cfContent.replace(/\$\{R_r_o_n\}/g, R_r_o_n);
    cfContent = cfContent.replace(/\$\{R_h_r_m\}/g, R_h_r_m);
    cfContent = cfContent.replace(/\$\{R_l_l\}/g, R_l_l);
    cfContent = cfContent.replace(/\$\{R_i_l\}/g, R_i_l);
    cfContent = cfContent.replace(/\$\{R_m_l\}/g, R_m_l);
    cfContent = cfContent.replace(/\$\{R_d_r_10_e_t\}/g, R_d_r_10_e_t);
    cfContent = cfContent.replace(/\$\{R_d_r_50_e_t\}/g, R_d_r_50_e_t);
    cfContent = cfContent.replace(/\$\{R_d_r_90_e_t\}/g, R_d_r_90_e_t);
    cfContent = cfContent.replace(/\$\{R_f_b_p\}/g, R_f_b_p);
    cfContent = cfContent.replace(/\$\{R_r_l\}/g, R_r_l);
    cfContent = cfContent.replace(/\$\{R_v_p\}/g, R_v_p);
    cfContent = cfContent.replace(/\$\{R_s_w_g\}/g, R_s_w_g);
    cfContent = cfContent.replace(/\$\{R_u_g\}/g, R_u_g);
    cfContent = cfContent.replace(/\$\{R_o_s\}/g, R_o_s);
    cfContent = cfContent.replace(/\$\{R_s_l\}/g, R_s_l);
    cfContent = cfContent.replace(/\$\{R_d_t\}/g, R_d_t);
    cfContent = cfContent.replace(/\$\{R_m_s_l\}/g, R_m_s_l);
    cfContent = cfContent.replace(/\$\{R_c_c_3_h_50_t\}/g, R_c_c_3_h_50_t);
    cfContent = cfContent.replace(/\$\{R_w_s_ph\}/g, R_w_s_ph);
    cfContent = cfContent.replace(/\$\{R_m_i_w\}/g, R_m_i_w);
    cfContent = cfContent.replace(/\$\{R_b_l\}/g, R_b_l);
    cfContent = cfContent.replace(/\$\{R_a_l\}/g, R_a_l);
    cfContent = cfContent.replace(/\$\{R_t_a\}/g, R_t_a);
    cfContent = cfContent.replace(/\$\{R_a_a\}/g, R_a_a);
    cfContent = cfContent.replace(/\$\{R_o_l\}/g, R_o_l);
    cfContent = cfContent.replace(/\$\{R_carbinol\}/g, R_carbinol);
    cfContent = cfContent.replace(/\$\{R_d_v\}/g, R_d_v);
    cfContent = cfContent.replace(/\$\{R_d_p_i\}/g, R_d_p_i);
    cfContent = cfContent.replace(/\$\{R_ethanol\}/g, R_ethanol);
    cfContent = cfContent.replace(/\$\{R_silicon\}/g, R_silicon);
    cfContent = cfContent.replace(/\$\{R_methylaniline\}/g, R_methylaniline);
    cfContent = cfContent.replace(/\$\{R_formal\}/g, R_formal);
    cfContent = cfContent.replace(/\$\{R_d_s\}/g, R_d_s);
    cfContent = cfContent.replace(/\$\{R_s_b_a\}/g, R_s_b_a);
    cfContent = cfContent.replace(/\$\{R_c_l\}/g, R_c_l);
    cfContent = cfContent.replace(/\$\{E_d_20_t\}/g, E_d_20_t);
    cfContent = cfContent.replace(/\$\{E_r_o_n\}/g, E_r_o_n);
    cfContent = cfContent.replace(/\$\{E_h_r_m\}/g, E_h_r_m);
    cfContent = cfContent.replace(/\$\{E_l_l\}/g, E_l_l);
    cfContent = cfContent.replace(/\$\{E_i_l\}/g, E_i_l);
    cfContent = cfContent.replace(/\$\{E_m_l\}/g, E_m_l);
    cfContent = cfContent.replace(/\$\{E_d_r_10_e_t\}/g, E_d_r_10_e_t);
    cfContent = cfContent.replace(/\$\{E_d_r_50_e_t\}/g, E_d_r_50_e_t);
    cfContent = cfContent.replace(/\$\{E_d_r_90_e_t\}/g, E_d_r_90_e_t);
    cfContent = cfContent.replace(/\$\{E_f_b_p\}/g, E_f_b_p);
    cfContent = cfContent.replace(/\$\{E_r_l\}/g, E_r_l);
    cfContent = cfContent.replace(/\$\{E_v_p\}/g, E_v_p);
    cfContent = cfContent.replace(/\$\{E_s_w_g\}/g, E_s_w_g);
    cfContent = cfContent.replace(/\$\{E_u_g\}/g, E_u_g);
    cfContent = cfContent.replace(/\$\{E_o_s\}/g, E_o_s);
    cfContent = cfContent.replace(/\$\{E_s_l\}/g, E_s_l);
    cfContent = cfContent.replace(/\$\{E_d_t\}/g, E_d_t);
    cfContent = cfContent.replace(/\$\{E_m_s_l\}/g, E_m_s_l);
    cfContent = cfContent.replace(/\$\{E_c_c_3_h_50_t\}/g, E_c_c_3_h_50_t);
    cfContent = cfContent.replace(/\$\{E_w_s_ph\}/g, E_w_s_ph);
    cfContent = cfContent.replace(/\$\{E_m_i_w\}/g, E_m_i_w);
    cfContent = cfContent.replace(/\$\{E_b_l\}/g, E_b_l);
    cfContent = cfContent.replace(/\$\{E_a_l\}/g, E_a_l);
    cfContent = cfContent.replace(/\$\{E_t_a\}/g, E_t_a);
    cfContent = cfContent.replace(/\$\{E_a_a\}/g, E_a_a);
    cfContent = cfContent.replace(/\$\{E_o_l\}/g, E_o_l);
    cfContent = cfContent.replace(/\$\{E_carbinol\}/g, E_carbinol);
    cfContent = cfContent.replace(/\$\{E_d_v\}/g, E_d_v);
    cfContent = cfContent.replace(/\$\{E_d_p_i\}/g, E_d_p_i);
    cfContent = cfContent.replace(/\$\{E_ethanol\}/g, E_ethanol);
    cfContent = cfContent.replace(/\$\{E_silicon\}/g, E_silicon);
    cfContent = cfContent.replace(/\$\{E_methylaniline\}/g, E_methylaniline);
    cfContent = cfContent.replace(/\$\{E_formal\}/g, E_formal);
    cfContent = cfContent.replace(/\$\{E_d_s\}/g, E_d_s);
    cfContent = cfContent.replace(/\$\{E_s_b_a\}/g, E_s_b_a);
    cfContent = cfContent.replace(/\$\{E_c_l\}/g, E_c_l);
    return cfContent;
  } 
  
  /**
   * 入库
   */
  addWarehousePotMaterialIndex() {
    let pot_uuid = $("#selectWarehousePotId").val();
    let quantity = $("#quantity").val();
    let d_20_t = $("#d_20_t").val();
    let r_o_n = $("#r_o_n").val();
    let h_r_m = $("#h_r_m").val();
    let l_l = $("#l_l").val();
    let i_l = $("#i_l").val();
    let m_l = $("#m_l").val();
    let d_r_10_e_t = $("#d_r_10_e_t").val();
    let d_r_50_e_t = $("#d_r_50_e_t").val();
    let d_r_90_e_t = $("#d_r_90_e_t").val();
    let f_b_p = $("#f_b_p").val();
    let r_l = $("#r_l").val();
    let v_p = $("#v_p").val();
    let s_w_g = $("#s_w_g").val();
    let u_g = $("#u_g").val();
    let o_s = $("#o_s").val();
    let s_l = $("#s_l").val();
    let d_t = $("#d_t").val();
    let m_s_l = $("#m_s_l").val();
    let c_c_3_h_50_t = $("#c_c_3_h_50_t").val();
    let w_s_ph = $("#w_s_ph").val();
    let m_i_w = $("#m_i_w").val();
    let b_l = $("#b_l").val();
    let a_l = $("#a_l").val();
    let t_a = $("#t_a").val();
    let a_a = $("#a_a").val();
    let o_l = $("#o_l").val();
    let carbinol = $("#carbinol").val();
    let d_v = $("#d_v").val();
    let d_p_i = $("#d_p_i").val();
    let ethanol = $("#ethanol").val();
    let silicon = $("#silicon").val();
    let methylaniline = $("#methylaniline").val();
    let formal = $("#formal").val();
    let d_s = $("#d_s").val();
    let s_b_a = $("#s_b_a").val();
    let c_l = $("#c_l").val();
    let addMaterialIndexParam = {};
    addMaterialIndexParam["pot_uuid"] = pot_uuid;
    addMaterialIndexParam["quantity"] = quantity;
    addMaterialIndexParam["d_20_t"] = d_20_t;
    addMaterialIndexParam["r_o_n"] = r_o_n;
    addMaterialIndexParam["h_r_m"] = h_r_m;
    addMaterialIndexParam["l_l"] = l_l;
    addMaterialIndexParam["i_l"] = i_l;
    addMaterialIndexParam["m_l"] = m_l;
    addMaterialIndexParam["d_r_10_e_t"] = d_r_10_e_t;
    addMaterialIndexParam["d_r_50_e_t"] = d_r_50_e_t;
    addMaterialIndexParam["d_r_90_e_t"] = d_r_90_e_t;
    addMaterialIndexParam["f_b_p"] = f_b_p;
    addMaterialIndexParam["r_l"] = r_l;
    addMaterialIndexParam["v_p"] = v_p;
    addMaterialIndexParam["s_w_g"] = s_w_g;
    addMaterialIndexParam["u_g"] = u_g;
    addMaterialIndexParam["o_s"] = o_s;
    addMaterialIndexParam["s_l"] = s_l;
    addMaterialIndexParam["d_t"] = d_t;
    addMaterialIndexParam["m_s_l"] = m_s_l;
    addMaterialIndexParam["c_c_3_h_50_t"] = c_c_3_h_50_t;
    addMaterialIndexParam["w_s_ph"] = w_s_ph;
    addMaterialIndexParam["m_i_w"] = m_i_w;
    addMaterialIndexParam["b_l"] = b_l;
    addMaterialIndexParam["a_l"] = a_l;
    addMaterialIndexParam["t_a"] = t_a;
    addMaterialIndexParam["a_a"] = a_a;
    addMaterialIndexParam["o_l"] = o_l;
    addMaterialIndexParam["carbinol"] = carbinol;
    addMaterialIndexParam["d_v"] = d_v;
    addMaterialIndexParam["d_p_i"] = d_p_i;
    addMaterialIndexParam["ethanol"] = ethanol;
    addMaterialIndexParam["silicon"] = silicon;
    addMaterialIndexParam["methylaniline"] = methylaniline;
    addMaterialIndexParam["formal"] = formal;
    addMaterialIndexParam["d_s"] = d_s;
    addMaterialIndexParam["s_b_a"] = s_b_a;
    addMaterialIndexParam["c_l"] = c_l;
    if ("" == quantity) {
      alert("原料数量不能为空");
      return;
    } else {
      if(null == quantity.match(/^(\d+)(\.\d+)?$/)) {
        alert("原料数量的格式错误");
        return;
      }
    }
    if ("" == d_20_t) {
      alert("20℃密度结果值不能为空");
      return;
    } else {
      if(null == d_20_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("20℃密度的结果值格式错误");
        return;
      }
    }
    if ("" == r_o_n) {
      alert("研究法辛烷值结果值不能为空");
      return;
    } else {
      if(null == r_o_n.match(/^(\d+)(\.\d+)?$/)) {
        alert("研究法辛烷值的结果值格式错误");
        return;
      }
    }
    if ("" == h_r_m) {
      alert("抗爆指数(RON+MON)/2结果值不能为空");
      return;
    } else {
      if(null == h_r_m.match(/^(\d+)(\.\d+)?$/)) {
        alert("抗爆指数(RON+MON)/2的结果值格式错误");
        return;
      }
    }
    if ("" == l_l) {
      alert("铅含量结果值不能为空");
      return;
    } else {
      if(null == l_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("铅含量的结果值格式错误");
        return;
      }
    }
    if ("" == i_l) {
      alert("铁含量结果值不能为空");
      return;
    } else {
      if(null == i_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("铁含量的结果值格式错误");
        return;
      }
    }
    if ("" == m_l) {
      alert("锰含量结果值不能为空");
      return;
    } else {
      if(null == m_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("锰含量的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_10_e_t) {
      alert("馏程10%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_10_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程10%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_50_e_t) {
      alert("馏程50%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_50_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程50%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_90_e_t) {
      alert("馏程90%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_90_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程90%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == f_b_p) {
      alert("终馏点结果值不能为空");
      return;
    } else {
      if(null == f_b_p.match(/^(\d+)(\.\d+)?$/)) {
        alert("终馏点的结果值格式错误");
        return;
      }
    }
    if ("" == r_l) {
      alert("残留量结果值不能为空");
      return;
    } else {
      if(null == r_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("残留量的结果值格式错误");
        return;
      }
    }
    if ("" == v_p) {
      alert("蒸汽压结果值不能为空");
      return;
    } else {
      if(null == v_p.match(/^(\d+)(\.\d+)?$/)) {
        alert("蒸汽压的结果值格式错误");
        return;
      }
    }
    if ("" == s_w_g) {
      alert("溶剂洗胶质结果值不能为空");
      return;
    } else {
      if(null == s_w_g.match(/^(\d+)(\.\d+)?$/)) {
        alert("溶剂洗胶质的结果值格式错误");
        return;
      }
    }
    if ("" == u_g) {
      alert("未洗胶质结果值不能为空");
      return;
    } else {
      if(null == u_g.match(/^(\d+)(\.\d+)?$/)) {
        alert("未洗胶质的结果值格式错误");
        return;
      }
    }
    if ("" == o_s) {
      alert("诱导期（氧化安定性）结果值不能为空");
      return;
    } else {
      if(null == o_s.match(/^(\d+)(\.\d+)?$/)) {
        alert("诱导期（氧化安定性）的结果值格式错误");
        return;
      }
    }
    if ("" == s_l) {
      alert("硫含量结果值不能为空");
      return;
    } else {
      if(null == s_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫含量的结果值格式错误");
        return;
      }
    }
    if ("" == d_t) {
      alert("请选择博士实验的结果值");
      return;
    }
    if ("" == m_s_l) {
      alert("硫醇硫含量结果值不能为空");
      return;
    } else {
      if(null == m_s_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫醇硫含量的结果值格式错误");
        return;
      }
    }
    if ("" == c_c_3_h_50_t) {
      alert("请选择铜片腐蚀（3h,50℃)的结果值");
      return;
    }
    if ("" == w_s_ph) {
      alert("水溶性酸或碱结果值不能为空");
      return;
    } else {
      if(null == w_s_ph.match(/^(\d+)(\.\d+)?$/)) {
        alert("水溶性酸或碱的结果值格式错误");
        return;
      }
    }
    if ("" == m_i_w) {
      alert("机械杂质和水结果值不能为空");
      return;
    } else {
      if(null == m_i_w.match(/^(\d+)(\.\d+)?$/)) {
        alert("机械杂质和水的结果值格式错误");
        return;
      }
    }
    if ("" == b_l) {
      alert("苯含量结果值不能为空");
      return;
    } else {
      if(null == b_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("苯含量的结果值格式错误");
        return;
      }
    }
    if ("" == a_l) {
      alert("芳烃含量结果值不能为空");
      return;
    } else {
      if(null == a_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("芳烃含量的结果值格式错误");
        return;
      }
    }
    if ("" == t_a) {
      alert("总烯烃结果值不能为空");
      return;
    } else {
      if(null == t_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("总烯烃的结果值格式错误");
        return;
      }
    }
    if ("" == a_a) {
      alert("烯烃+芳烃结果值不能为空");
      return;
    } else {
      if(null == a_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("烯烃+芳烃的结果值格式错误");
        return;
      }
    }
    if ("" == o_l) {
      alert("氧含量结果值不能为空");
      return;
    } else {
      if(null == o_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("氧含量的结果值格式错误");
        return;
      }
    }
    if ("" == carbinol) {
      alert("甲醇结果值不能为空");
      return;
    } else {
      if(null == carbinol.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲醇的结果值格式错误");
        return;
      }
    }
    if ("" == d_v) {
      alert("二烯值结果值不能为空");
      return;
    } else {
      if(null == d_v.match(/^(\d+)(\.\d+)?$/)) {
        alert("二烯值的结果值格式错误");
        return;
      }
    }
    if ("" == d_p_i) {
      alert("驾驶性能指数结果值不能为空");
      return;
    } else {
      if(null == d_p_i.match(/^(\d+)(\.\d+)?$/)) {
        alert("驾驶性能指数的结果值格式错误");
        return;
      }
    }
    if ("" == ethanol) {
      alert("乙醇结果值不能为空");
      return;
    } else {
      if(null == ethanol.match(/^(\d+)(\.\d+)?$/)) {
        alert("乙醇的结果值格式错误");
        return;
      }
    }
    if ("" == silicon) {
      alert("硅结果值不能为空");
      return;
    } else {
      if(null == silicon.match(/^(\d+)(\.\d+)?$/)) {
        alert("硅的结果值格式错误");
        return;
      }
    }
    if ("" == methylaniline) {
      alert("甲基苯胺结果值不能为空");
      return;
    } else {
      if(null == methylaniline.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲基苯胺的结果值格式错误");
        return;
      }
    }
    if ("" == formal) {
      alert("甲缩醛结果值不能为空");
      return;
    } else {
      if(null == formal.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲缩醛的结果值格式错误");
        return;
      }
    }
    if ("" == d_s) {
      alert("硫酸二甲酯结果值不能为空");
      return;
    } else {
      if(null == d_s.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫酸二甲酯的结果值格式错误");
        return;
      }
    }
    if ("" == s_b_a) {
      alert("乙酸仲丁酯结果值不能为空");
      return;
    } else {
      if(null == s_b_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("乙酸仲丁酯的结果值格式错误");
        return;
      }
    }
    if ("" == c_l) {
      alert("氯含量结果值不能为空");
      return;
    } else {
      if(null == c_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("氯含量的结果值格式错误");
        return;
      }
    }
    let addWarehousePotMaterialIndexUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialIndex";
    let addWarehousePotMaterialIndexData = ajax_assistant(addWarehousePotMaterialIndexUrl, addMaterialIndexParam, false, true, false);
    console.log(addWarehousePotMaterialIndexData);
    if (1 == addWarehousePotMaterialIndexData.status) {
      $("tbody tr td:nth-child(3)").val("");
      this.getMaterialCategory(pot_uuid);
      this.fillMaterialCategoryData();
      this.getWarehousePotMaterialIndex()
      this.fillVariableData(); 
      $("#quantity").val("");
      $("#materialCategoryId").val("");
      $("#amount").val("");
      alert("原料指标修改成功");
    } else {
      alert("原料指标修改失败");
    }
  }

  /**
   * 修改原料指标
   */
  modifyMaterialIndex() {
    let pot_uuid = $("#selectWarehousePotId").val();
    let uuid = $("#modifyMaterialEntryBtn button").attr("uuid");
    let quantity = $("#quantity").val();
    let d_20_t = $("#d_20_t").val();
    let r_o_n = $("#r_o_n").val();
    let h_r_m = $("#h_r_m").val();
    let l_l = $("#l_l").val();
    let i_l = $("#i_l").val();
    let m_l = $("#m_l").val();
    let d_r_10_e_t = $("#d_r_10_e_t").val();
    let d_r_50_e_t = $("#d_r_50_e_t").val();
    let d_r_90_e_t = $("#d_r_90_e_t").val();
    let f_b_p = $("#f_b_p").val();
    let r_l = $("#r_l").val();
    let v_p = $("#v_p").val();
    let s_w_g = $("#s_w_g").val();
    let u_g = $("#u_g").val();
    let o_s = $("#o_s").val();
    let s_l = $("#s_l").val();
    let d_t = $("#d_t").val();
    let m_s_l = $("#m_s_l").val();
    let c_c_3_h_50_t = $("#c_c_3_h_50_t").val();
    let w_s_ph = $("#w_s_ph").val();
    let m_i_w = $("#m_i_w").val();
    let b_l = $("#b_l").val();
    let a_l = $("#a_l").val();
    let t_a = $("#t_a").val();
    let a_a = $("#a_a").val();
    let o_l = $("#o_l").val();
    let carbinol = $("#carbinol").val();
    let d_v = $("#d_v").val();
    let d_p_i = $("#d_p_i").val();
    let ethanol = $("#ethanol").val();
    let silicon = $("#silicon").val();
    let methylaniline = $("#methylaniline").val();
    let formal = $("#formal").val();
    let d_s = $("#d_s").val();
    let s_b_a = $("#s_b_a").val();
    let c_l = $("#c_l").val();
    let modifyMaterialIndexParam = {};
    modifyMaterialIndexParam["pot_uuid"] = pot_uuid;
    modifyMaterialIndexParam["uuid"] = uuid;
    modifyMaterialIndexParam["d_20_t"] = d_20_t;
    modifyMaterialIndexParam["r_o_n"] = r_o_n;
    modifyMaterialIndexParam["h_r_m"] = h_r_m;
    modifyMaterialIndexParam["l_l"] = l_l;
    modifyMaterialIndexParam["i_l"] = i_l;
    modifyMaterialIndexParam["m_l"] = m_l;
    modifyMaterialIndexParam["d_r_10_e_t"] = d_r_10_e_t;
    modifyMaterialIndexParam["d_r_50_e_t"] = d_r_50_e_t;
    modifyMaterialIndexParam["d_r_90_e_t"] = d_r_90_e_t;
    modifyMaterialIndexParam["f_b_p"] = f_b_p;
    modifyMaterialIndexParam["r_l"] = r_l;
    modifyMaterialIndexParam["v_p"] = v_p;
    modifyMaterialIndexParam["s_w_g"] = s_w_g;
    modifyMaterialIndexParam["u_g"] = u_g;
    modifyMaterialIndexParam["o_s"] = o_s;
    modifyMaterialIndexParam["s_l"] = s_l;
    modifyMaterialIndexParam["d_t"] = d_t;
    modifyMaterialIndexParam["m_s_l"] = m_s_l;
    modifyMaterialIndexParam["c_c_3_h_50_t"] = c_c_3_h_50_t;
    modifyMaterialIndexParam["w_s_ph"] = w_s_ph;
    modifyMaterialIndexParam["m_i_w"] = m_i_w;
    modifyMaterialIndexParam["b_l"] = b_l;
    modifyMaterialIndexParam["a_l"] = a_l;
    modifyMaterialIndexParam["t_a"] = t_a;
    modifyMaterialIndexParam["a_a"] = a_a;
    modifyMaterialIndexParam["o_l"] = o_l;
    modifyMaterialIndexParam["carbinol"] = carbinol;
    modifyMaterialIndexParam["d_v"] = d_v;
    modifyMaterialIndexParam["d_p_i"] = d_p_i;
    modifyMaterialIndexParam["ethanol"] = ethanol;
    modifyMaterialIndexParam["silicon"] = silicon;
    modifyMaterialIndexParam["methylaniline"] = methylaniline;
    modifyMaterialIndexParam["formal"] = formal;
    modifyMaterialIndexParam["d_s"] = d_s;
    modifyMaterialIndexParam["s_b_a"] = s_b_a;
    modifyMaterialIndexParam["c_l"] = c_l;
    if ("" == quantity) {
      alert("原料数量不能为空");
      return;
    } else {
      if(null == quantity.match(/^(\d+)(\.\d+)?$/)) {
        alert("原料数量格式错误");
        return;
      }
    }
    if ("" == d_20_t) {
      alert("20℃密度结果值不能为空");
      return;
    } else {
      if(null == d_20_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("20℃密度的结果值格式错误");
        return;
      }
    }
    if ("" == r_o_n) {
      alert("研究法辛烷值结果值不能为空");
      return;
    } else {
      if(null == r_o_n.match(/^(\d+)(\.\d+)?$/)) {
        alert("研究法辛烷值的结果值格式错误");
        return;
      }
    }
    if ("" == h_r_m) {
      alert("抗爆指数(RON+MON)/2结果值不能为空");
      return;
    } else {
      if(null == h_r_m.match(/^(\d+)(\.\d+)?$/)) {
        alert("抗爆指数(RON+MON)/2的结果值格式错误");
        return;
      }
    }
    if ("" == l_l) {
      alert("铅含量结果值不能为空");
      return;
    } else {
      if(null == l_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("铅含量的结果值格式错误");
        return;
      }
    }
    if ("" == i_l) {
      alert("铁含量结果值不能为空");
      return;
    } else {
      if(null == i_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("铁含量的结果值格式错误");
        return;
      }
    }
    if ("" == m_l) {
      alert("锰含量结果值不能为空");
      return;
    } else {
      if(null == m_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("锰含量的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_10_e_t) {
      alert("馏程10%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_10_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程10%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_50_e_t) {
      alert("馏程50%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_50_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程50%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == d_r_90_e_t) {
      alert("馏程90%蒸发温度结果值不能为空");
      return;
    } else {
      if(null == d_r_90_e_t.match(/^(\d+)(\.\d+)?$/)) {
        alert("馏程90%蒸发温度的结果值格式错误");
        return;
      }
    }
    if ("" == f_b_p) {
      alert("终馏点结果值不能为空");
      return;
    } else {
      if(null == f_b_p.match(/^(\d+)(\.\d+)?$/)) {
        alert("终馏点的结果值格式错误");
        return;
      }
    }
    if ("" == r_l) {
      alert("残留量结果值不能为空");
      return;
    } else {
      if(null == r_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("残留量的结果值格式错误");
        return;
      }
    }
    if ("" == v_p) {
      alert("蒸汽压结果值不能为空");
      return;
    } else {
      if(null == v_p.match(/^(\d+)(\.\d+)?$/)) {
        alert("蒸汽压的结果值格式错误");
        return;
      }
    }
    if ("" == s_w_g) {
      alert("溶剂洗胶质结果值不能为空");
      return;
    } else {
      if(null == s_w_g.match(/^(\d+)(\.\d+)?$/)) {
        alert("溶剂洗胶质的结果值格式错误");
        return;
      }
    }
    if ("" == u_g) {
      alert("未洗胶质结果值不能为空");
      return;
    } else {
      if(null == u_g.match(/^(\d+)(\.\d+)?$/)) {
        alert("未洗胶质的结果值格式错误");
        return;
      }
    }
    if ("" == o_s) {
      alert("诱导期（氧化安定性）结果值不能为空");
      return;
    } else {
      if(null == o_s.match(/^(\d+)(\.\d+)?$/)) {
        alert("诱导期（氧化安定性）的结果值格式错误");
        return;
      }
    }
    if ("" == s_l) {
      alert("硫含量结果值不能为空");
      return;
    } else {
      if(null == s_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫含量的结果值格式错误");
        return;
      }
    }
    if ("" == d_t) {
      alert("请选择博士实验的结果值");
      return;
    }
    if ("" == m_s_l) {
      alert("硫醇硫含量结果值不能为空");
      return;
    } else {
      if(null == m_s_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫醇硫含量的结果值格式错误");
        return;
      }
    }
    if ("" == c_c_3_h_50_t) {
      alert("请选择铜片腐蚀（3h,50℃)的结果值");
      return;
    }
    if ("" == w_s_ph) {
      alert("水溶性酸或碱结果值不能为空");
      return;
    } else {
      if(null == w_s_ph.match(/^(\d+)(\.\d+)?$/)) {
        alert("水溶性酸或碱的结果值格式错误");
        return;
      }
    }
    if ("" == m_i_w) {
      alert("机械杂质和水结果值不能为空");
      return;
    } else {
      if(null == m_i_w.match(/^(\d+)(\.\d+)?$/)) {
        alert("机械杂质和水的结果值格式错误");
        return;
      }
    }
    if ("" == b_l) {
      alert("苯含量结果值不能为空");
      return;
    } else {
      if(null == b_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("苯含量的结果值格式错误");
        return;
      }
    }
    if ("" == a_l) {
      alert("芳烃含量结果值不能为空");
      return;
    } else {
      if(null == a_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("芳烃含量的结果值格式错误");
        return;
      }
    }
    if ("" == t_a) {
      alert("总烯烃结果值不能为空");
      return;
    } else {
      if(null == t_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("总烯烃的结果值格式错误");
        return;
      }
    }
    if ("" == a_a) {
      alert("烯烃+芳烃结果值不能为空");
      return;
    } else {
      if(null == a_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("烯烃+芳烃的结果值格式错误");
        return;
      }
    }
    if ("" == o_l) {
      alert("氧含量结果值不能为空");
      return;
    } else {
      if(null == o_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("氧含量的结果值格式错误");
        return;
      }
    }
    if ("" == carbinol) {
      alert("甲醇结果值不能为空");
      return;
    } else {
      if(null == carbinol.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲醇的结果值格式错误");
        return;
      }
    }
    if ("" == d_v) {
      alert("二烯值结果值不能为空");
      return;
    } else {
      if(null == d_v.match(/^(\d+)(\.\d+)?$/)) {
        alert("二烯值的结果值格式错误");
        return;
      }
    }
    if ("" == d_p_i) {
      alert("驾驶性能指数结果值不能为空");
      return;
    } else {
      if(null == d_p_i.match(/^(\d+)(\.\d+)?$/)) {
        alert("驾驶性能指数的结果值格式错误");
        return;
      }
    }
    if ("" == ethanol) {
      alert("乙醇结果值不能为空");
      return;
    } else {
      if(null == ethanol.match(/^(\d+)(\.\d+)?$/)) {
        alert("乙醇的结果值格式错误");
        return;
      }
    }
    if ("" == silicon) {
      alert("硅结果值不能为空");
      return;
    } else {
      if(null == silicon.match(/^(\d+)(\.\d+)?$/)) {
        alert("硅的结果值格式错误");
        return;
      }
    }
    if ("" == methylaniline) {
      alert("甲基苯胺结果值不能为空");
      return;
    } else {
      if(null == methylaniline.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲基苯胺的结果值格式错误");
        return;
      }
    }
    if ("" == formal) {
      alert("甲缩醛结果值不能为空");
      return;
    } else {
      if(null == formal.match(/^(\d+)(\.\d+)?$/)) {
        alert("甲缩醛的结果值格式错误");
        return;
      }
    }
    if ("" == d_s) {
      alert("硫酸二甲酯结果值不能为空");
      return;
    } else {
      if(null == d_s.match(/^(\d+)(\.\d+)?$/)) {
        alert("硫酸二甲酯的结果值格式错误");
        return;
      }
    }
    if ("" == s_b_a) {
      alert("乙酸仲丁酯结果值不能为空");
      return;
    } else {
      if(null == s_b_a.match(/^(\d+)(\.\d+)?$/)) {
        alert("乙酸仲丁酯的结果值格式错误");
        return;
      }
    }
    if ("" == c_l) {
      alert("氯含量结果值不能为空");
      return;
    } else {
      if(null == c_l.match(/^(\d+)(\.\d+)?$/)) {
        alert("氯含量的结果值格式错误");
        return;
      }
    }
    let modifyMaterialIndexUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterialIndex";
    let modifyMaterialIndexData = ajax_assistant(modifyMaterialIndexUrl, modifyMaterialIndexParam, false, true, false);
    console.log(modifyMaterialIndexData);
    if (1 == modifyMaterialIndexData.status) {
      this.getMaterialCategory(pot_uuid);
      this.fillMaterialCategoryData();
      this.getWarehousePotMaterialIndex()
      this.fillVariableData();
      $("tbody tr td:nth-child(3) input").val("");
      $("tbody tr td:nth-child(4) select").val("");
      $("tbody tr td:nth-child(5) input").val("");
      $("tbody tr td:nth-child(6) input").val("");
      $("#quantity").val("");
      $("#materialCategoryId").val("");
      $("#amount").val("");
      alert("原料指标修改成功");
    } else {
      alert("原料指标修改失败");
    }
  }
  /**
   * 输出
   */
  output() {
    let content = 
      `<div class = "panel panel-default panel-primary">
         <div class = "panel-heading">选择入库储罐</div>
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
                 <select class = "form-control" id = "selectWarehousePotId">
                   <option class = "">--请选择--</option>
                   <option value = "1">A01</option>
                   <option value = "2">A02</option>
                 </select>
               </div>
             </div>
             <div class = "col-md-4">
               <div class = "form-group">
                 <button type = "button" class = "btn btn-primary" id = "searchBtn">查找</button>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class = "panel panel-default panel-primary" id = "entryData">
         <div class = "panel-heading">入库数据</div>
         <div class = "panel-body">
           <div class = "row">
             <div class = "col-md-3">
               <div class = "input-group pull-left">
                 <span class = "input-group-addon">原料类别</span>
                 <select class = "form-control" id = "materialCategoryId">
                   <option class = "">--请选择--</option>
                   <option value = "1">原油</option>
                   <option value = "2">原油</option>
                 </select>
               </div>
             </div>
             <div class = "col-md-3">
               <div class = "input-group pull-left">
                 <span class = "input-group-addon">原料数量</span>
                 <input type="text" class="form-control" id = "quantity">
                 <span class = "input-group-addon">吨</span>
               </div>
             </div>
             <div class = "col-md-3">
               <div class = "input-group pull-left">
                 <span class = "input-group-addon">原料价格</span>
                 <input type="text" class="form-control" id = "amount">
                 <span class = "input-group-addon">元</span>
               </div>
             </div>
             <div class = "col-md-3" id  = "addMaterialEntryBtn" style = "display: none;">
               <div class = "form-group" style = "margin-bottom: 0;">
                 <button type = "button" class = "btn btn-primary">入库</button>
               </div>
             </div>
             <div class = "col-md-3" id  = "modifyMaterialEntryBtn" style = "display: none;">
               <div class = "form-group" style = "margin-bottom: 0;">
                 <button type = "button" class = "btn btn-primary">入库</button>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class = "panel panel-default panel-primary" id = "indexData">
         <div class = "panel-heading text-left" id = "indexTitle">【E01】指标数据</div>
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
                 <td class = "entryValue"> 
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_20_t">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>研究法辛烷值</td>
                 <td id = "R_r_o_n">93.5</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "r_o_n">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>抗爆指数（RON+MON）/2</td>
                 <td id = "R_h_r_m">0</td>
                 <td class = "entryValue">
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
                 
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "h_r_m">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>铅含量</td>
                 <td id = "R_l_l">4.3</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "l_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>铁含量</td>
                 <td id = "R_i_l">1.8</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "i_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>锰含量</td>
                 <td id = "R_m_l">5.9</td>
                 <td class = "entryValue">
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
                 
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "m_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>馏程10%蒸发温度</td>
                 <td id = "R_d_r_10_e_t">59</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_r_10_e_t">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>馏程50%蒸发温度</td>
                 <td id = "R_d_r_50_e_t">108</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_r_50_e_t">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>馏程90%蒸发温度</td>
                 <td id = "R_d_r_90_e_t">179</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_r_90_e_t">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>终馏点</td>
                 <td id = "R_f_b_p">199</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "f_b_p">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>残留量</td>
                 <td id = "R_r_l">1.9</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "r_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>蒸汽压</td>
                 <td id = "R_v_p">50</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "v_p">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>溶剂洗胶质</td>
                 <td id = "R_s_w_g">4.3</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "s_w_g">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>未洗胶质</td>
                 <td id = "R_u_g">28</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "u_g">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>诱导期（氧化安定性）</td>
                 <td id = "R_o_s">479</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "o_s">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>硫含量</td>
                 <td id = "R_s_l">39</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "s_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>博士实验</td>
                 <td id = "R_d_t">通过</td>
                 <td class = "entryValue">
                   <select class = "form-control E_d_t" id = "">
                     <option value = "1">通过</option>
                     <option value = "0">不通过</option>
                   </select>
                 </td>
                 <td>
                   <select class = "form-control cfName" id = "" disabled = "disabled">
                     <option class = "">--请选择--</option>
                     <option value = "1">公式一</option>
                     <option value = "2">公式二</option>
                   </select>
                 </td>
                <td class = "cfContent">
                   <div class="form-group">
                     <input type="text" class="form-control cfContent" id = "" disabled = "disabled">
                   </div>
                 </td>
                 <td class = "endValue">
                   <select class = "form-control E_end_d_t" id = "d_t">
                     <option value = "1">通过</option>
                     <option value = "0">不通过</option>
                   </select>
                 </td>
               </tr>
               <tr>
                 <td>硫醇硫含量</td>
                 <td id = "R_m_s_l">7.9</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "m_s_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>铜片腐蚀（3h，50℃）</td>
                 <td id = "R_c_c_3_h_50_t">1a</td>
                 <td class = "entryValue">
                   <select class = "form-control E_c_c_3_h_50_t" id = "">
                     <option value = "1.1">1a</option>
                     <option value = "1.2">1b</option>
                   </select>
                 </td>
                 <td>
                   <select class = "form-control cfName" id = "" disabled = "disabled">
                     <option class = "">--请选择--</option>
                     <option value = "1">公式一</option>
                     <option value = "2">公式二</option>
                   </select>
                 </td>
                <td class = "cfContent">
                   <div class="form-group">
                     <input type="text" class="form-control cfContent" id = "" disabled = "disabled">
                   </div>
                 </td>
                 <td class = "endValue E_end_c_c_3_h_50_t">
                   <select class = "form-control" id = "c_c_3_h_50_t">
                     <option value = "1.1">1a</option>
                     <option value = "1.2">1b</option>
                   </select>
                 </td>
               </tr>
               <tr>
                 <td>水溶性酸或碱</td>
                 <td id = "R_w_s_ph">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "w_s_ph">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>机械杂质和水</td>
                 <td id = "R_m_i_w">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "m_i_w">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>苯含量</td>
                 <td id = "R_b_l">0.7</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "b_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>芳烃含量</td>
                 <td id = "R_a_l">34</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "a_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>总烯烃</td>
                 <td id = "R_t_a">18</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "t_a">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>烯烃+芳烃</td>
                 <td id = "R_a_a">59</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "a_a">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>氧含量</td>
                 <td id = "R_o_l">1.9</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "o_l">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>甲醇</td>
                 <td id = "R_carbinol">0.18</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "carbinol">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>二烯值</td>
                 <td id = "R_d_v">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_v">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>驾驶性能指数</td>
                 <td id = "R_d_p_i">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_p_i">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>乙醇</td>
                 <td id = "R_ethanol">0.18</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "ethanol">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>硅</td>
                 <td id = "R_silicon">0.09</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "silicon">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>甲基苯胺</td>
                 <td id = "R_methylaniline">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "methylaniline">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>甲缩醛</td>
                 <td id = "R_formal">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "formal">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>硫酸二甲酯</td>
                 <td id = "R_d_s">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "d_s">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>乙酸仲丁酯</td>
                 <td id = "R_s_b_a">0</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "s_b_a">
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>氯含量</td>
                 <td id = "R_c_l">9</td>
                 <td class = "entryValue">
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
                 <td class = "endValue">
                   <div class="form-group">
                     <input type="text" class="form-control" id = "c_l">
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
