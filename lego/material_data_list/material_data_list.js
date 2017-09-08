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
        {"material_sub_name":"芳烃", "weight":"300", "percentage":"30", "uuid":"101", "material_uuid":"001"},
        {"material_sub_name":"异构", "weight":"300", "percentage":"30", "uuid":"102", "material_uuid":"001"},
        {"material_sub_name":"轻油", "weight":"300", "percentage":"30", "uuid":"103", "material_uuid":"002"}]
    };
  } 

  //清空数据
  clearRawData() {
    $("#material_data_list_box").html("");
  }

  //填充复该数据
  fillVariableData() {
    //查询列表
    let materialDataListHtml = "";
    if(isJsonObjectHasData(this.materialDataListData)) {
      for (let i = 0; i < this.materialDataListData.data.length; i++) {
        materialDataListHtml+=
          `<div>
            <p href = "#" class = "list-group-item clearfix material_data_list_pl30 material_data_list_bgddd">${this.materialDataListData.data[i].material_name}</p>
            <div id = "material_data_list${this.materialDataListData.data[i].uuid}">
              <table class = "table table-bordered">
                <tbody id = "material_body_content">
                </tbody>
              </table>
            </div>
          </div>`;
      }
    }
    $("#material_data_list_box").html(materialDataListHtml);
    //查询列表子集
    if(isJsonObjectHasData(this.materialDataListSubData)) {
      for (let i = 0; i < this.materialDataListSubData.data.length; i++) {
        $("#material_data_list" + this.materialDataListSubData.data[i].material_uuid).find("#material_body_content").append(`
          <tr>
            <td>${this.materialDataListSubData.data[i].material_sub_name}</td>
            <td>${this.materialDataListSubData.data[i].weight}</td>
            <td>${this.materialDataListSubData.data[i].percentage}%</td>
          </tr>`);
      }
    }
  }
}
