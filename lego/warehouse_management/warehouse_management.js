//库区
var warehouse_data = {
  "data":[
    {"warehouse_name":"舟山纳海", "warehouse_uuid":"001"},
    {"warehouse_name":"零点库区", "warehouse_uuid":"002"},
    {"warehouse_name":"泰州锦华", "warehouse_uuid":"003"},
    {"warehouse_name":"鹏程万里", "warehouse_uuid":"004"},
    {"warehouse_name":"大展宏图", "warehouse_uuid":"005"}]
};
/**
 * storage_tank_name: 储罐名称
 * uuid: 储罐uuid
 * type: 储罐类型(0:原料罐;1:生产罐)
 * warehouse_uuid: 仓库的uuid 
 */
var warehouse_pot_data = {
"data":[
    {"storage_tank_name":"E01", "uuid":"101", "type":"0", "warehouse_uuid":"001"},
    {"storage_tank_name":"E02", "uuid":"102", "type":"1", "warehouse_uuid":"001"},
    {"storage_tank_name":"E03", "uuid":"103", "type":"0", "warehouse_uuid":"002"},
    {"storage_tank_name":"E04", "uuid":"104", "type":"1", "warehouse_uuid":"002"},
    {"storage_tank_name":"E05", "uuid":"105", "type":"0", "warehouse_uuid":"003"}]
};

function clear_raw_data() {
  $("#warehouse_management_box").html("");
};

function fill_variable_data() {
  //查询仓库
  var warehouse_html = "";
  if(isJsonObjectHasData(warehouse_data)) {
    for(var i = 0; i < warehouse_data.data.length; i++) {
      warehouse_html+='<div>'+
                        '<p href = "#" class = "list-group-item clearfix warehouse_management_pl30 warehouse_management_bgddd warehouse_management_border_radiue">' + warehouse_data.data[i].warehouse_name + 
                          '<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_management_colorfff warehouse_management_remove" uuid="'+warehouse_data.data[i].warehouse_uuid+'"></span>'+
                          '<span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_management_colorfff warehouse_management_edit_pencil" uuid="'+warehouse_data.data[i].warehouse_uuid+'"></span>'+
                          '<span class = "glyphicon glyphicon-plus pull-right warehouse_management_colorfff warehouse_management_add_tank"></span>'+
                        '</p>'+
                        '<div id="warehouse_management' + warehouse_data.data[i].warehouse_uuid + '"></div>'+
                      '</div>';
    };
  };  
  $("#warehouse_management_box").html(warehouse_html);
  //查询储罐
  if(isJsonObjectHasData(warehouse_pot_data)){
    for (var i = 0; i < warehouse_pot_data.data.length; i++) {
      if (0 == warehouse_pot_data.data[i].type) {
        $("#warehouse_management" + warehouse_pot_data.data[i].warehouse_uuid).append('<p href = "#" class = "list-group-item clearfix warehouse_management_pl30 warehouse_management_border_radiue">'+
                            '<span class = "glyphicon glyphicon-cd  warehouse_management_mr15"></span>'+warehouse_pot_data.data[i].storage_tank_name+
                            '<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_management_tank_remove" uuid="' + warehouse_pot_data.data[i].uuid + '"></span>'+
                            '<span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_management_tank_pencil" uuid = "' + warehouse_pot_data.data[i].uuid + '"></span>'+
                            '</p>');
      } else {
        $("#warehouse_management" + warehouse_pot_data.data[i].warehouse_uuid).append('<p href = "#" class = "list-group-item clearfix warehouse_management_pl30 warehouse_management_border_radiue">'+
                            '<span class = "glyphicon glyphicon-record  warehouse_management_mr15"></span>'+warehouse_pot_data.data[i].storage_tank_name+
                            '<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_management_tank_remove" uuid="' + warehouse_pot_data.data[i].uuid + '"></span>'+
                            '<span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_management_tank_pencil" uuid = "' + warehouse_pot_data.data[i].uuid + '"></span>'+
                            '</p>');
      };
    };
  };  
};

function warehouse_management_add_warehouse_modal() {
  var warehouse_management_html  =  '<div class = "modal fade" id = "warehouse_management_prop" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
                                    '<div class = "modal-dialog modal-sm" role = "document">'+
                                      '<div class = "modal-content">'+
                                        '<div class = "modal-header bg-primary">'+
                                          '<button type = "button" class = "close"  data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                                          '<h4 class = "modal-title" id = "myModalLabel">添加库区</h4>'+
                                        '</div>'+
                                        '<div class = "modal-body">'+
                                          '<div class = "form-group">'+
                                            '<label>库区名称</label>'+
                                            '<input type = "text" class = "form-control warehouse_name" value = "">'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class = "modal-footer" style = "text-align: center;">'+
                                          '<button type = "button" class = "btn btn-primary warehouse_management_prop_data">添加</button>'+
                                          '<button type = "button" class = "btn btn-default"  data-dismiss="modal">取消</button>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>';
    $("body").append(warehouse_management_html);
    $("#warehouse_management_prop").modal("show");
    $("#warehouse_management_prop").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
}

function warehouse_management_add_warehouse_data() {
  var warehouse_name=$(this).parents("#warehouse_management_prop").val();
    $("#warehouse_management_prop").modal("hide");
    $("#warehouse_management_prop").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
}
function warehouse_management_edit_warehouse_modal() {
  var warehouse_uuid = $(this).attr("uuid");
  var warehouse_name = "";
      for(var i = 0;i < warehouse_data.data.length; i++) {
        if(warehouse_uuid == warehouse_data.data[i].warehouse_uuid) {
          warehouse_name = warehouse_data.data[i].warehouse_name;
        };
      };
  var warehouse_management_html = '<div class = "modal fade" id = "warehouse_management_prop_edit" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
            '<div class = "modal-dialog modal-sm" role = "document">'+
              '<div class = "modal-content">'+
                '<div class = "modal-header bg-primary">'+
                  '<button type = "button" class = "close"data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                  '<h4 class = "modal-title" id = "myModalLabel">修改库区</h4>'+
                '</div>'+
                '<div class = "modal-body">'+
                  '<div class = "form-group">'+
                    '<label>库区名称</label>'+
                    '<input type = "text" class = "form-control warehouse_name" value = "' + warehouse_name + '">'+
                  '</div>'+
                '</div>'+
                '<div class = "modal-footer" style = "text-align: center;">'+
                  '<button type = "button" class = "btn btn-warning warehouse_management_prop_edit_data">修改</button>'+
                  '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';
  $("body").append(warehouse_management_html);
  $("#warehouse_management_prop_edit").modal("show");
  $("#warehouse_management_prop_edit").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};
function warehouse_management_edit_warehouse_data() {
  var warehouse_name = $(this).parents("#warehouse_management_prop_edit").val();
    $("#warehouse_management_prop_edit").modal("hide");
    $("#warehouse_management_prop_edit").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
}
function warehouse_management_delet_warehouse_modal() {
  var uuid=$(this).attr("uuid");
  var warehouse_management_html = '<div class = "modal fade bs-example-modal-sm" id = "warehouse_management_delet" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
                                    '<div class = "modal-dialog  modal-sm" role = "document">'+
                                      '<div class = "modal-content">'+
                                        '<div class = "modal-header bg-primary">'+
                                          '<button type = "button" class = "close" data-dismiss = "modal" aria-label="Close"><span aria-hidden = "true">&times;</span></button>'+
                                          '<h4 class = "modal-title" id="myModalLabel">删除库区确认</h4>'+
                                        '</div>'+
                                        '<div class = "modal-body text-center">确定要删除库区吗？</div>'+
                                        '<div class = "modal-footer" style = "text-align: center;">'+
                                          '<button type = "button" class = "btn btn-danger warehouse_management_delet_data" uuid = "' + uuid + '">删除</button>'+
                                          '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>';
  $("body").append(warehouse_management_html);
  $("#warehouse_management_delet").modal("show");
  $("#warehouse_management_delet").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};
function warehouse_management_delete_warehouse_data() {
  var uuid=$(this).attr("uuid");
  $("#warehouse_management_delet").modal("hide");
  $("#warehouse_management_delet").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};
function warehouse_management_add_warehouse_pot_modal() {
  var warehouse_management_html = '<div class = "modal fade" id = "warehouse_management_tank_prop" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
                                    '<div class = "modal-dialog" role = "document">'+
                                      '<div class = "modal-content">'+
                                        '<div class = "modal-header bg-primary">'+
                                          '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                                          '<h4 class = "modal-title" id="myModalLabel">添加储罐</h4>'+
                                        '</div>'+
                                        '<div class = "modal-body">'+
                                          '<div class = "row">'+
                                            '<div class = "col-lg-6">'+
                                              '<div class = "form-group">'+
                                                '<label>储罐类型</label>'+
                                                '<select class = "form-control storage_tank_style" value = "">'+
                                                  '<option value = "0">原料罐</option>'+
                                                  '<option value = "1">生产罐</option>'+
                                                '</select>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class = "col-lg-6">'+
                                              '<div class = "form-group">'+
                                                '<label>储罐名称</label>'+
                                                '<input type = "text" class = "form-control storage_tank_name" value = "">'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                          '<div class = "row">'+
                                            '<div class = "col-lg-6">'+
                                              '<div class = "form-group">'+
                                                '<label>有效容量(吨)</label>'+
                                                '<input type = "text" class = "form-control effective_capacity" value = "">'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class = "col-lg-6">'+
                                              '<div class = "form-group">'+
                                                '<label>计费容量(吨)</label>'+
                                                '<input type = "text" class = "form-control billing_capacity" value = "">'+
                                              '</div>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class = "modal-footer" style = "text-align: center;">'+
                                          '<button type = "button" class = "btn btn-primary warehouse_management_add_tank_data">添加</button>'+
                                          '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>';
    $("body").append(warehouse_management_html);
    $("#warehouse_management_tank_prop").modal("show");
    $("#warehouse_management_tank_prop").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
};
function warehouse_management_add_warehouse_pot_data() {
  var storage_tank_style=$(this).parents("#warehouse_management_tank_prop").find(".storage_tank_style").val();//储罐类型
  var storage_tank_name=$(this).parents("#warehouse_management_tank_prop").find(".storage_tank_name").val();//储罐名称
  var effective_capacity=$(this).parents("#warehouse_management_tank_prop").find(".effective_capacity").val();//有效容量
  var billing_capacity=$(this).parents("#warehouse_management_tank_prop").find(".billing_capacity").val();//计费容量
  $("#warehouse_management_tank_prop").modal("hide");
  $("#warehouse_management_tank_prop").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}
function warehouse_management_edit_warehouse_pot_modal() {
  var warehouse_tank_uuid = $(this).attr("uuid");
    var warehouse_management_html = '<div class = "modal fade" id = "warehouse_management_tank_prop_edit" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
              '<div class = "modal-dialog" role = "document">'+
                '<div class = "modal-content">'+
                  '<div class = "modal-header bg-primary">'+
                    '<button type = "button" class = "close" data-dismiss = "modal" aria-label="Close"><span aria-hidden = "true">&times;</span></button>'+
                    '<h4 class = "modal-title" id = "myModalLabel">修改储罐</h4>'+
                  '</div>'+
                  '<div class = "modal-body">'+
                    '<div class = "row">'+
                      '<div class = "col-lg-6">'+
                        '<div class = "form-group">'+
                          '<label>储罐类型</label>'+
                          '<select class = "form-control storage_tank_style" value = "">'+
                            '<option value = "0">原料罐</option>'+
                            '<option value = "1">生产罐</option>'+
                          '</select>'+
                        '</div>'+
                      '</div>'+
                      '<div class = "col-lg-6">'+
                        '<div class = "form-group">'+
                          '<label>储罐名称</label>'+
                          '<input type = "text" class = "form-control storage_tank_name" value = "">'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '<div class = "row">'+
                      '<div class = "col-lg-6">'+
                        '<div class = "form-group">'+
                          '<label>有效容量(吨)</label>'+
                          '<input type = "text" class = "form-control effective_capacity" value = "">'+
                        '</div>'+
                      '</div>'+
                      '<div class = "col-lg-6">'+
                        '<div class = "form-group">'+
                          '<label>计费容量(吨)</label>'+
                          '<input type = "text" class = "form-control billing_capacity" value = "">'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class = "modal-footer" style = "text-align: center;">'+
                    '<button type = "button" class = "btn btn-warning warehouse_management_tank_pencil_data">修改</button>'+
                    '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>';
    $("body").append(warehouse_management_html);
    $("#warehouse_management_tank_prop_edit").modal("show");
    $("#warehouse_management_tank_prop_edit").on("hidden.bs.modal", function (e) {
      $(this).remove();
    });
};
function warehouse_management_edit_warehouse_pot_data() {
  var storage_tank_style = $(this).parents("#warehouse_management_tank_prop_edit").find(".storage_tank_style").val();//储罐类型
  var storage_tank_name = $(this).parents("#warehouse_management_tank_prop_edit").find(".storage_tank_name").val();//储罐名称
  var effective_capacity = $(this).parents("#warehouse_management_tank_prop_edit").find(".effective_capacity").val();//有效容量
  var billing_capacity = $(this).parents("#warehouse_management_tank_prop_edit").find(".billing_capacity").val();//计费容量
  $("#warehouse_management_tank_prop_edit").modal("hide");
  $("#warehouse_management_tank_prop_edit").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};
function warehouse_management_delete_warehouse_pot_modal() {
  var uuid = $(this).attr("uuid");
  var warehouse_management_html = '<div class = "modal fade bs-example-modal-sm" id = "warehouse_management_tank_delet" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel">'+
                                  '<div class = "modal-dialog  modal-sm" role = "document">'+
                                    '<div class = "modal-content">'+
                                      '<div class = "modal-header bg-primary">'+
                                        '<button type = "button" class = "close" data-dismiss = "modal" aria-label="Close"><span aria-hidden = "true">&times;</span></button>'+
                                        '<h4 class = "modal-title" id = "myModalLabel">删除储罐确认</h4>'+
                                      '</div>'+
                                      '<div class = "modal-body text-center">确定要删除储罐吗？</div>'+
                                      '<div class = "modal-footer" style = "text-align: center;">'+
                                        '<button type = "button" class = "btn btn-danger warehouse_management_tank_remove_data" uuid="'+uuid+'">删除</button>'+
                                        '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>';
  $("body").append(warehouse_management_html);
  $("#warehouse_management_tank_delet").modal("show");
  $("#warehouse_management_tank_delet").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};
function warehouse_management_delete_warehouse_pot_data() {
  var uuid=$(this).attr("uuid");
  $("#warehouse_management_tank_delet").modal("hide");
  $("#warehouse_management_tank_delet").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
};