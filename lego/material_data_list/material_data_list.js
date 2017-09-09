/**
 * @author wangdi
 */
"use strict"; 
class MaterialDataListObj {
  constructor() {
    //类别列表
    this.materialDataListData = {
      "data":[
        {"material_name":"舟山纳海", "uuid":"001"},
        {"material_name":"零点库区", "uuid":"002"},
        {"material_name":"泰州锦华", "uuid":"003"}]
    };
    // 类别子集
    this.materialDataListSubData = {
    "data":[
        {"material_sub_name":"芳烃", "weight":"300", "price":"3000", "uuid":"101", "material_uuid":"001"},
        {"material_sub_name":"异构", "weight":"300", "price":"3000", "uuid":"102", "material_uuid":"001"},
        {"material_sub_name":"轻油", "weight":"300", "price":"3000", "uuid":"103", "material_uuid":"002"}]
    };
  } 

  //清空数据
  clearRawData() {
    $("#material_data_list_box").html("");
  }

  //填充覆盖数据
  fillVariableData() {
    //查询列表
    let materialDataListHtml = "";
    if(isJsonObjectHasData(this.materialDataListData)) {
      for (let i = 0; i < this.materialDataListData.data.length; i++) {
        let weightAll = 0;
        materialDataListHtml +=
          `<div class = "warehouse_content_all">
            <p class = "list-group-item clearfix material_data_list_pl30 material_data_list_bgddd">${this.materialDataListData.data[i].material_name}</p>
            <div id = "material_data_list">
              <table class = "table table-bordered">
                <tbody id = "material_body_content" class = "pot_content_body">`;
                if(isJsonObjectHasData(this.materialDataListSubData)) {
                  for (let j = 0; j < this.materialDataListSubData.data.length; j++) {
                    if(this.materialDataListData.data[i].uuid == this.materialDataListSubData.data[j].material_uuid) {
                      weightAll += Number(this.materialDataListSubData.data[j].weight);
                    }
                  }
                  for (let j = 0; j < this.materialDataListSubData.data.length; j++) {
                    if(this.materialDataListData.data[i].uuid == this.materialDataListSubData.data[j].material_uuid) {
                      let weight = 0;
                      let price = 0;
                      let percentage = 0;
                      if("" != this.materialDataListSubData.data[j].weight || "0" != this.materialDataListSubData.data[j].weight) {
                        weight = this.materialDataListSubData.data[j].weight;
                        percentage = ((this.materialDataListSubData.data[j].weight) / weightAll).toFixed(2);
                      }
                      if("" != this.materialDataListSubData.data[j].price) {
                        price = this.materialDataListSubData.data[j].price;
                      }
                      materialDataListHtml += 
                        `<tr>
                           <td width = "40%">${this.materialDataListSubData.data[j].material_sub_name}</td>
                           <td width = "20%">${weight}</td>
                           <td width = "20%">￥${price}</td>
                           <td width = "20%">${percentage}%</td>
                         </tr>`;
                    } 
                  }
                }
                materialDataListHtml +=
               `</tbody>
              </table>
            </div>
          </div>`;
      }
    }
    $("#material_data_list_box").html(materialDataListHtml);
    //查询列表子集
  }

  //服务器数据覆盖
  serverDataCover() {
    this.materialDataListData = {};
    this.materialDataListSubData = {};
    //获取仓库
    let warehouseUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
    let warehouseGet = ajax_assistant(warehouseUrl, "", false, true, false);
    //获取储罐原料类别
    let warehouseTypeUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialType";
    let warehouseTypeGet = ajax_assistant(warehouseTypeUrl, "", false, true, false);
    //获取储罐
    let potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    let potGet = ajax_assistant(potUrl, "", false, true, false);
    //仓库
    if ("1" == warehouseGet.status) {
      if ("0" == warehouseGet.count) {
        this.materialDataListData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"material_name":result[i].name, "uuid":result[i].uuid};
        }
        this.materialDataListData["data"] = tmpArr;
      }
    } else {
      alert("仓库数据获取失败");
    }
    //获取储罐原料类别
    if ("1" == warehouseTypeGet.status) {
      if ("0" == warehouseTypeGet.count) {
        this.materialDataListSubData = {};
      } else {
        let tmpArr = new Array();
        let result = JSON.parse(warehouseTypeGet.result);    
        for (let i = 0; i < result.length; i++) {
          tmpArr[i] = {"material_sub_name":result[i].name, "weight":"2", "price":"", "uuid":result[i].uuid};
          if("1" == potGet.status) {
            let potResult = JSON.parse(potGet.result);
            for(let j = 0; j < potResult.length; j++) {
              if (potResult[j].uuid == result[i].pot_uuid) {
                tmpArr[i]["material_uuid"] = potResult[j].warehouse_uuid; 
              }
            }
          } else {
            alert("获取储罐失败！");
          }
        }
        this.materialDataListSubData["data"] = tmpArr;
      }
    } else {
      alert("储罐原料类别数据获取失败");
    }
  }

  //输出文本
  outPutMaterialContent(contentBoxId) {
    let content = 
      `<div class = "row material_data_list_row">
         <div class = "col-lg-12 material_data_list_col">
           <div class = "list-group">
             <p href = "#" class = "list-group-item clearfix active">数据汇总</p>
             <div id="material_data_list_box">
               <div>
                 <p class = "list-group-item clearfix material_data_list_pl30 material_data_list_bgddd">舟山纳海</p>
                 <div>
                   <table class = "table table-bordered">
                     <tbody>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
                       </tr>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
                       </tr>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div>
                 <p class = "list-group-item clearfix material_data_list_pl30 material_data_list_bgddd">舟山纳海</p>
                 <div>
                   <table class = "table table-bordered">
                     <tbody>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
                       </tr>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
                       </tr>
                       <tr>
                         <td width = "40%">芳烃</td>
                         <td width = "20%">300吨</td>
                         <td width = "20%">￥200</td>
                         <td width = "20%">30%</td>
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
