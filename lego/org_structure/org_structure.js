function clear_raw_data() {
  $("#org_structure_list").html("");
};
var root_department = {"data": [
{"name": "腾智联合","uuid": "0","parent_uuid": "00"},
]};
var department_data = {"data": [
  {"department_name": "技术部","uuid": "1","parent_uuid": "0"},
  {"department_name": "财务部","uuid": "2","parent_uuid": "0"},
  {"department_name": "总裁办","uuid": "3","parent_uuid": "0"},
  {"department_name": "市场部","uuid": "4","parent_uuid": "0"},
  {"department_name": "商务支持部","uuid": "5","parent_uuid": "0"},
  {"department_name": "技术1部","uuid": "11","parent_uuid": "1"},
  {"department_name": "技术2部","uuid": "12","parent_uuid": "1"},
  {"department_name": "财务1部","uuid": "21","parent_uuid": "2"},
  {"department_name": "财务2部","uuid": "22","parent_uuid": "2"},
  {"department_name": "市场1部","uuid": "41","parent_uuid": "4"},
  {"department_name": "市场2部","uuid": "42","parent_uuid": "4"},
]};
var position_data = {"data": [
  {"position_name": "董事长","uuid": "000","department_uuid": "0"},
  {"position_name": "总经理","uuid": "111","department_uuid": "1"},
  {"position_name": "经理","uuid": "112","department_uuid": "1"},
  {"position_name": "副经理","uuid": "112","department_uuid": "11"},
  {"position_name": "主任","uuid": "113","department_uuid": "11"},
  {"position_name": "副主任","uuid": "211","department_uuid": "21"},
  {"position_name": "职员","uuid": "212","department_uuid": "21"},
  {"position_name": "副主任","uuid": "221","department_uuid": "22"},
  {"position_name": "职员","uuid": "222","department_uuid": "22"},
]};
var employee_data = {"data": [
  {"employee_name": "张三","uuid": "0000","position_uuid": "000"},
  {"employee_name": "李四","uuid": "1111","position_uuid": "111"},
  {"employee_name": "王五","uuid": "1121","position_uuid": "112"},
  {"employee_name": "赵六","uuid": "1122","position_uuid": "112"},
  {"employee_name": "张一","uuid": "1131","position_uuid": "113"},
  {"employee_name": "李二","uuid": "2111","position_uuid": "211"},
  {"employee_name": "王三","uuid": "2121","position_uuid": "212"},
  {"employee_name": "赵四","uuid": "2211","position_uuid": "221"},
  {"employee_name": "张二","uuid": "2221","position_uuid": "222"},
]};
var current_employee_detail_data = {
  "uuid": "asdfadsf",
  "name": "zhangsan",
  "sex": "男",
  "password": "!@#$%^&*()",
  "telphone_number": "13133333333",
  "real_name": "张三",
  "email": "zhangsan@163.com",
  "wechat": "3s222222",
  "work_area_uuid": "3",
};
var work_area_data = {"data": [
  {"work_area_name": "库区1","work_area_uuid": "1"},
  {"work_area_name": "库区2","work_area_uuid": "2"},
  {"work_area_name": "库区3","work_area_uuid": "3"},
  {"work_area_name": "库区4","work_area_uuid": "4"},
  {"work_area_name": "库区5","work_area_uuid": "5"},
  {"work_area_name": "库区6","work_area_uuid": "6"},
  {"work_area_name": "库区7","work_area_uuid": "7"},
]};
function fill_variable_data() {
  var content  = "";
  //debugger;
  if(0 < root_department.data.length){
    for(var i = 0; i < root_department.data.length; i++) {
      content = '<ul class="list-group">'+
                      '<li class="list-group-item org_structure_lh40 cuuid_' + root_department.data[i].uuid + '">'+
                        '<p class="oli clearfix bgd8d8d8" style="margin-top:2px;">'+
                          '<span class="glyphicon glyphicon-menu-hamburger pull-left mr20" aria-hidden="true"></span>'+
                          '<span>' + root_department.data[i].name + '</span>'+
                          '<span class="glyphicon glyphicon-remove pull-right org_structure_department_delete" data_parent_uuid = "' + root_department.data[i].uuid + '" title="删除部门" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 org_structure_root_department_edit" data_parent_uuid = "' + root_department.data[i].uuid + '" data_parent_uuid = "' + root_department.data[i].parent_uuid + '" title="修改部门" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-asterisk pull-right mr20 org_structure_position_add" data_parent_uuid = "' + root_department.data[i].uuid + '" title="添加岗位" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-plus pull-right mr20 org_structure_department_add" data_parent_uuid = "' + root_department.data[i].uuid + '" title="添加子部门" aria-hidden="true"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
      $("#org_structure_list").append(content);  
    }
    for(var i = 0; i < department_data.data.length; i++) {
      content = '<ul class="list-group">'+
                      '<li class="list-group-item org_structure_lh40 cuuid_' + department_data.data[i].uuid + '">'+
                        '<p class="oli clearfix org_structure_bgd8d8d8" style="margin-top:2px;">'+
                          '<span class="glyphicon glyphicon-menu-hamburger pull-left mr20" aria-hidden="true"></span>'+
                          '<span>' + department_data.data[i].department_name + '</span>'+
                          '<span class="glyphicon glyphicon-remove pull-right org_structure_department_delete" data_parent_uuid = "' + department_data.data[i].uuid + '" title="删除部门" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 org_structure_department_edit" data_parent_uuid = "' + department_data.data[i].uuid + '" data_parent_uuid = "' + department_data.data[i].parent_uuid + '" title="修改部门" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-asterisk pull-right mr20 org_structure_position_add" data_parent_uuid = "' + department_data.data[i].uuid + '" title="添加岗位" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-plus pull-right mr20 org_structure_department_add" data_parent_uuid = "' + department_data.data[i].uuid + '" title="添加子部门" aria-hidden="true"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
      $("#org_structure_list .cuuid_"+ department_data.data[i].parent_uuid).append(content);
    }
    //for(var i = 0; i < position_data.data.length; i++) {
  //debugger;
    for(var i = position_data.data.length - 1; i >= 0; i--) {
      content = '<ul class="list-group">'+
                      '<li class="list-group-item org_structure_lh40 cuuid_' + position_data.data[i].uuid + '">'+
                        '<p class="oli clearfix" style="margin-top:2px;">'+
                          '<span class="glyphicon glyphicon-menu-hamburger pull-left mr20" aria-hidden="true"></span>'+
                          '<span>' + position_data.data[i].position_name + '</span>'+
                          '<span class="glyphicon glyphicon-remove pull-right org_structure_position_delete" data_parent_uuid = "' + position_data.data[i].uuid + '" title="删除岗位" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 org_structure_position_edit" data_parent_uuid = "' + position_data.data[i].uuid + '" title="修改岗位" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-user pull-right mr20 org_structure_employee_add" title="添加员工" aria-hidden="true"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
      $("#org_structure_list .cuuid_" + position_data.data[i].department_uuid + " >p").after(content);
    }
    for(var i = position_data.data.length - 1; i >= 0; i--) {
      content = '<ul class="list-group">'+
                      '<li class="list-group-item org_structure_lh40 cuuid_' + employee_data.data[i].uuid + '">'+
                        '<p class="oli clearfix" style="margin-top:2px;">'+
                          '<span class="glyphicon glyphicon-menu-hamburger pull-left mr20" aria-hidden="true"></span>'+
                          '<span>' + employee_data.data[i].employee_name + '</span>'+
                          '<span class="glyphicon glyphicon-remove pull-right org_structure_employee_delete" title="删除员工" aria-hidden="true"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 org_structure_employee_edit" title="修改员工" aria-hidden="true"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
      $("#org_structure_list .cuuid_" + employee_data.data[i].position_uuid + " >p").after(content);
    }
  } else{
    content = '<ul class="list-group">'+
                      '<li class="list-group-item org_structure_lh40">'+
                        '<p class="oli clearfix bgd8d8d8" style="margin-top:2px;">'+
                          '<span class="glyphicon glyphicon-menu-hamburger pull-left mr20" aria-hidden="true"></span>'+
                          '<span>请先添加企业</span>'+
                          '<span class="glyphicon glyphicon-plus pull-right mr20 addDepartment" title="添加子部门" aria-hidden="true"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
    $("#org_structure_list").append(content);  
  }
};   
//添加部门弹窗
$(document).on("click", ".org_structure_department_add", function() {
  var org_structure_add_department = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_add_department" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">添加部门</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom">'+
          '<div class="form-group">'+
          '<label>部门名称</label>'+
          '<input type="text" class="form-control department_name">'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-primary add_btn">添加</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_add_department);
  $("#org_structure_add_department").modal("show");
});
//修改根部门弹窗
$(document).on("click", ".org_structure_root_department_edit", function() {
  var org_structure_edit_department = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_edit_root_department" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">修改部门</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom">'+
          '<div class="form-group">'+
          '<label>部门名称</label>'+
          '<input type="text" class="form-control department_name">'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-warning add_btn">修改</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_edit_department);
  $("#org_structure_edit_root_department").modal("show");
});
//修改部门弹窗
$(document).on("click", ".org_structure_department_edit", function() {
  var org_structure_edit_department = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_edit_department" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">修改部门</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom">'+
          '<div class="form-group">'+
          '<label>部门名称</label>'+
          '<input type="text" class="form-control department_name">'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-warning add_btn">修改</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_edit_department);
  $("#org_structure_edit_department").modal("show");
});
//删除部门弹窗
$(document).on("click", ".org_structure_department_delete", function() {
  var org_structure_delete_department = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_delete_department" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">删除部门确认</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">'+
          '确认要删除部门吗？'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-danger remove">删除</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_delete_department);
  $("#org_structure_delete_department").modal("show");
});
//添加岗位
$(document).on("click", ".org_structure_position_add", function() {
  var org_structure_add_position = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_add_position" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">添加岗位</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom">'+
          '<div class="form-group">'+
          '<label>岗位名称</label>'+
          '<input type="text" class="form-control position_name">'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-primary add_btn">添加</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_add_position);
  $("#org_structure_add_position").modal("show");
});
//修改岗位
$(document).on("click", ".org_structure_position_edit", function() {
  var org_structure_edit_position = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_edit_position" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">修改岗位</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom">'+
          '<div class="form-group">'+
          '<label>岗位名称</label>'+
          '<input type="text" class="form-control position_name">'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-warning add_btn">修改</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_edit_position);
  $("#org_structure_edit_position").modal("show");
});
//删除岗位弹窗
$(document).on("click", ".org_structure_position_delete", function() {
  var org_structure_delete_position = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_delete_position" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">删除岗位确认</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">'+
          '确认要删除岗位吗？'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-danger remove">删除</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_delete_position);
  $("#org_structure_delete_position").modal("show");
});
//添加员工
$(document).on("click", ".org_structure_employee_add", function() {
  var org_structure_add_employee = '<div class="modal fade popup_style" id="org_structure_add_employee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
          '<div class="modal-dialog" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">添加用户</h4>'+
          '</div>'+
          '<div class="modal-body">'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">用户名</label>'+
          '<input type="text" class="form-control name" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group sex" style="margin-top: 30px;">'+
          '<label>'+
          '<input id="check_men" type="radio" style="height: 22px;width: 22px;" name="flat-radio" value="男">'+
          '<span>男</span>'+
          '</label>'+
          '<label>'+
          '<input id="check_women" type="radio" style="height: 22px;width: 22px;" name="flat-radio"  value="女">'+
          '<span>女</span>'+
          '</label>'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">密码</label>'+
          '<input type="password" class="form-control password" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">联系电话</label>'+
          '<input type="text" class="form-control telephone_number" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">姓名</label>'+
          '<input type="text" class="form-control employee_name" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">Email</label>'+
          '<input type="text" class="form-control email" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">微信编号</label>'+
          '<input type="text" class="form-control wechat_openid" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">所在库区</label>'+
          '<select class="form-control work_area_uuid">'+
          '<option>--请选择--</option>'+
          '</select>'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-primary add_btn">保存</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_add_employee);
  $("#org_structure_add_employee").modal("show");
});
//修改员工
$(document).on("click", ".org_structure_employee_edit", function() {
  var org_structure_edit_employee = '<div class="modal fade popup_style" id="org_structure_edit_employee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
          '<div class="modal-dialog" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">修改用户</h4>'+
          '</div>'+
          '<div class="modal-body">'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">用户名</label>'+
          '<input type="text" class="form-control name" value = "' + current_employee_detail_data.name + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group sex" style="margin-top: 30px;">'+
          '<label>'+
          '<input id="check_men" type="radio" style="height: 22px;width: 22px;" name="flat-radio" value="男">'+
          '<span>男</span>'+
          '</label>'+
          '<label>'+
          '<input id="check_women" type="radio" style="height: 22px;width: 22px;" name="flat-radio"  value="女">'+
          '<span>女</span>'+
          '</label>'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">密码</label>'+
          '<input type="password" class="form-control password" value = "' + current_employee_detail_data.password + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">联系电话</label>'+
          '<input type="text" class="form-control telephone_number" value = "' + current_employee_detail_data.telphone_number + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">姓名</label>'+
          '<input type="text" class="form-control employee_name" value = "' + current_employee_detail_data.real_name + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">Email</label>'+
          '<input type="text" class="form-control email" value = "' + current_employee_detail_data.email + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">微信编号</label>'+
          '<input type="text" class="form-control wechat_openid" value = "' + current_employee_detail_data.wechat + '" />'+
          '</div>'+
          '</form>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<form>'+
          '<div class="form-group">'+
          '<label for="">所在库区</label>'+
          '<select class="form-control work_area_uuid">'+
          '<option>--请选择--</option>'+
          '</select>'+
          '</div>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-warning add_btn" data-work_area_uuid = "' + current_employee_detail_data.work_area_uuid + '">修改</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_edit_employee);
  $("#org_structure_edit_employee").modal("show");
});
$(document).on("click", ".org_structure_employee_edit", function() {
  var work_area_select = "<option>--请选择--</option>";
  for(var i = 0; i < work_area_data.data.length; i++) {
    work_area_select += '<option value = "' + work_area_data.data[i].work_area_uuid + '">' + work_area_data.data[i].work_area_name + '</option>'
    $("#org_structure_add_employee select").html(work_area_select);
    $("#org_structure_edit_employee select").html(work_area_select);
  }
  for(var i = 0; i < $("#org_structure_edit_employee select option").length; i++){
    var work_area_uuid = current_employee_detail_data.work_area_uuid;
    var value = $("#org_structure_edit_employee select option").eq(i).val();
    console.log(work_area_uuid);
    if($("#org_structure_edit_employee select option").eq(i).val() == work_area_uuid) {
      $("#org_structure_edit_employee select option").eq(i).prop('selected','selected');
      break;
    }
  }
})

//删除员工弹窗
$(document).on("click", ".org_structure_employee_delete", function() {
  var org_structure_delete_employee = '<div class="modal fade bs-example-modal-sm popup_style" id="org_structure_delete_employee" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
          '<div class="modal-dialog modal-sm" role="document">'+
          '<div class="modal-content">'+
          '<div class="modal-header bg-primary">'+
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<h4 class="modal-title" id="myModalLabel">删除员工确认</h4>'+
          '</div>'+
          '<div class="modal-body nopadding-bottom" style="text-align: center;margin-bottom: 15px;">'+
          '确认要删除员工吗？'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-danger remove">删除</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $("body").append(org_structure_delete_employee);
  $("#org_structure_delete_employee").modal("show");
});