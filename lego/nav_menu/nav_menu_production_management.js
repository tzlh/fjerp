/**
 * @author wangdi
 */

/**
 * 输出top_nav
 * @param output_id 输出内容id
 */
function nav_menu_production_management_output(output_id) {
  var content = 
    '<div class  =  "row nav_row">'+
    '    <div class  =  "col-lg-12 nav_col">'+
    '      <div class = "list-group">'+
    '        <a class = "list-group-item clearfix active nav_radius">生产管理<span class = "glyphicon glyphicon-chevron-down pull-right"></span></a>'+
    '        <a class = "list-group-item clearfix nav_pl30 nav_bgddd">库区原料类别管理<span class = "glyphicon glyphicon-chevron-down pull-right nav_colorfff"></span></a>'+
    '        <a href = "../index/material_type_list.html" target = "_blank"  class = "list-group-item clearfix nav_pl45">类别列表</a>'+
    '        <a href = "../index/material_type_list.html" target = "_blank"  class = "list-group-item clearfix nav_pl30 nav_bgddd">计算公式<span class = "glyphicon glyphicon-chevron-down pull-right nav_colorfff"></span></a>'+
    '        <a href = "../index/index_variable_table.html" target = "_blank"  class = "list-group-item clearfix nav_pl45">指标参数变量对照表</a>'+
    '        <a href = "../index/calculation_formula_management.html" target = "_blank"  class = "list-group-item clearfix nav_pl45">计算公式管理</a>'+
    '        <a class = "list-group-item clearfix nav_pl30 nav_bgddd">生产数据管理<span class = "glyphicon glyphicon-chevron-down pull-right nav_colorfff"></span></a>'+
    '        <a href = "../index/material_entry.html" target = "_blank"  class = "list-group-item clearfix nav_pl45">原料入库</a>'+
    '        <a href = "../index/material_exit.html" target = "_blank"  class = "list-group-item clearfix nav_pl45">原料出库</a>'+
    '        <a href = "../index/material_transfer.html" target = "_blank" class = "list-group-item clearfix nav_pl45">原料导罐</a>'+
    '        <a href = "../index/modify_material_index.html" target = "_blank" class = "list-group-item clearfix nav_pl45">修改原料指标</a>'+
    '        <a class = "list-group-item active text-center nav_radius">Copyright &copy; 2017</a>'+
    '      </div>'+
    '    </div>'+
    '   </div>';
    $(output_id).html(content);
}
