var reservoir_data={//库区
  "data":[
    {"warehouse_name":"舟山纳海", "warehouse_uuid":"001"},
    {"warehouse_name":"零点库区", "warehouse_uuid":"002"},
    {"warehouse_name":"泰州锦华", "warehouse_uuid":"003"},
    {"warehouse_name":"鹏程万里", "warehouse_uuid":"004"},
    {"warehouse_name":"大展宏图", "warehouse_uuid":"005"}]
};
//storage_tank_name   储罐名称
//storage_tank_uuid   储罐uuid
//storage_tank_type   储罐类型
//warehouse_uuid   储罐所在仓库
var storage_tank_data={//储罐//0:原料罐 1：
  "data":[
    {"storage_tank_name":"E01", "uuid":"101", "type":"0", "warehouse_uuid":"001"},
    {"storage_tank_name":"E02", "uuid":"102", "type":"1", "warehouse_uuid":"001"},
    {"storage_tank_name":"E03", "uuid":"103", "type":"0", "warehouse_uuid":"002"},
    {"storage_tank_name":"E04", "uuid":"104", "type":"1", "warehouse_uuid":"002"},
    {"storage_tank_name":"E05", "uuid":"105", "type":"0", "warehouse_uuid":"003"}]
};
function clear_raw_data(){
  $("#warehouse_box").html("");
};
function ready_data(){
  //查询仓库
  console.log(reservoir_data.data);
  var warehouse_html='';
  for(var i = 0; i < reservoir_data.data.length; i++){
      warehouse_html+='<div>'+
                        '<p href = "#" class = "list-group-item clearfix warehouse_management_pl30 warehouse_management_bgddd">' + reservoir_data.data[i].warehouse_name + '<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_management_colorfff warehouse_remove" uuid="'+reservoir_data.data[i].warehouse_uuid+'"></span><span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_management_colorfff warehouse_edit_pencil" uuid="'+reservoir_data.data[i].warehouse_uuid+'"></span><span class = "glyphicon glyphicon-plus pull-right warehouse_management_colorfff add_tank"></span></p>'+
                        '<div id="warehouse' + reservoir_data.data[i].warehouse_uuid + '"></div>'+
                      '</div>';
  };
  $("#warehouse_box").html(warehouse_html);
  //查询储罐
  for(var i = 0; i < storage_tank_data.data.length; i++){
    if(0 == storage_tank_data.data[i].type){
      $("#warehouse"+storage_tank_data.data[i].warehouse_uuid).append('<p href = "#" class = "list-group-item clearfix warehouse_management_pl30"><span class = "glyphicon glyphicon-cd  warehouse_management_mr15"></span>E01<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_tank_remove" uuid="'+storage_tank_data.data[i].uuid+'"></span><span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_tank_pencil" uuid="'+storage_tank_data.data[i].uuid+'"></span></p>');
    }else{
      $("#warehouse"+storage_tank_data.data[i].warehouse_uuid).append('<p href = "#" class = "list-group-item clearfix warehouse_management_pl30"><span class = "glyphicon glyphicon-record  warehouse_management_mr15"></span>E01<span class = "glyphicon glyphicon-remove pull-right warehouse_management_ml15 warehouse_tank_remove" uuid="'+storage_tank_data.data[i].uuid+'"></span><span class = "glyphicon glyphicon-pencil pull-right warehouse_management_ml15 warehouse_tank_pencil" uuid="'+storage_tank_data.data[i].uuid+'"></span></p>');
    };
  };
};
$(document).ready(function(){
  clear_raw_data();//初始化
  ready_data();//加载数据
  //添加仓库
  
  $("#add_warehouse").click(function(){
    var warehouse_name=$("#warehouse_prop").find(".warehouse_name").val();
    var data={
      "":warehouse_name
    };
    $("#warehouse_prop").modal("show");
  });
  //修改
  $(document).on("click",".warehouse_edit_pencil",function(){
    var warehouse_uuid=$(this).attr("uuid");
    var warehouse_name='';
        for(var i=0;i<reservoir_data.data.length;i++){
          if(warehouse_uuid == reservoir_data.data[i].warehouse_uuid){
            warehouse_name=reservoir_data.data[i].warehouse_name;
          }
        }
    var edit_html='<div class="modal-header bg-primary">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '<h4 class="modal-title" id="myModalLabel">修改库区</h4>'+
                  '</div>'+
                  '<div class="modal-body">'+
                    '<div class="form-group">'+
                      '<label>库区名称</label>'+
                      '<input type="text" class="form-control warehouse_name" value="'+warehouse_name+'">'+
                    '</div>'+
                  '</div>'+
                  '<div class="modal-footer" style="text-align: center;">'+
                    '<button type="button" class="btn btn-warning">修改</button>'+
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                  '</div>';
    $("#warehouse_prop_edit .modal-content").html(edit_html);
    $("#warehouse_prop_edit").modal("show");
  });
  //删除仓库
  $(document).on("click",".warehouse_remove",function(){
    $("#warehouse_delet").modal("show");
  });
  //添加储罐
  $(document).on("click",".add_tank",function(){
    $("#tank_prop").modal("show");
  });
  //修改
  var warehouse_tank_uuid=null;
  $(document).on("click",".warehouse_tank_pencil",function(){
        warehouse_tank_uuid=$(this).attr("uuid");
    var tank_html='<div class="modal-header bg-primary">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '<h4 class="modal-title" id="myModalLabel">修改储罐</h4>'+
                  '</div>'+
                  '<div class="modal-body">'+
                    '<div class="row">'+
                      '<div class="col-lg-6">'+
                        '<div class="form-group">'+
                          '<label>库区名称</label>'+
                          '<select class="form-control">'+
                            '<option>1</option>'+
                            '<option>2</option>'+
                            '<option>3</option>'+
                            '<option>4</option>'+
                            '<option>5</option>'+
                          '</select>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-lg-6">'+
                        '<div class="form-group">'+
                          '<label>储罐名称</label>'+
                          '<input type="text" class="form-control">'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="row">'+
                      '<div class="col-lg-6">'+
                        '<div class="form-group">'+
                          '<label>有效容量(吨)</label>'+
                          '<input type="text" class="form-control">'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-lg-6">'+
                        '<div class="form-group">'+
                          '<label>计费容量(吨)</label>'+
                          '<input type="text" class="form-control">'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="modal-footer" style="text-align: center;">'+
                    '<button type="button" class="btn btn-warning">修改</button>'+
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                  '</div>';
    $("#tank_prop_edit .modal-content").html(tank_html);
    $("#tank_prop_edit").modal("show");
  });
  //删除储罐
  $(document).on("click",".warehouse_tank_remove",function(){
    $("#warehouse_tank_delet").modal("show");
  });
});

