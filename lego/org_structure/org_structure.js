function clear_raw_data() {
  $("#org_structure_list").html("");
};
var root_department = {"data": [
{"name": "腾智联合","uuid": "0"},
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
                          '<span class="glyphicon glyphicon-remove pull-right deleteDepartment" title="删除部门" aria-hidden="true" data-toggle="modal" data-target="#deleteDepartment"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 editDepartment" title="修改部门" aria-hidden="true" data-toggle="modal" data-target="#editDepartment"></span>'+
                          '<span class="glyphicon glyphicon-asterisk pull-right mr20 addPosition" title="添加岗位" aria-hidden="true" data-toggle="modal" data-target="#addPosition"></span>'+
                          '<span class="glyphicon glyphicon-plus pull-right mr20 addDepartment" title="添加子部门" aria-hidden="true" data-toggle="modal" data-target="#org_structure_add_department"></span>'+
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
                          '<span class="glyphicon glyphicon-remove pull-right deleteDepartment" title="删除部门" aria-hidden="true" data-toggle="modal" data-target="#deleteDepartment"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 editDepartment" title="修改部门" aria-hidden="true" data-toggle="modal" data-target="#editDepartment"></span>'+
                          '<span class="glyphicon glyphicon-asterisk pull-right mr20 addPosition" title="添加岗位" aria-hidden="true" data-toggle="modal" data-target="#addPosition"></span>'+
                          '<span class="glyphicon glyphicon-plus pull-right mr20 addDepartment" title="添加子部门" aria-hidden="true" data-toggle="modal" data-target="#org_structure_add_department"></span>'+
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
                          '<span class="glyphicon glyphicon-remove pull-right deleteDepartment" title="删除部门" aria-hidden="true" data-toggle="modal" data-target="#deleteDepartment"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 editDepartment" title="修改部门" aria-hidden="true" data-toggle="modal" data-target="#editDepartment"></span>'+
                          '<span class="glyphicon glyphicon-user pull-right mr20 addEmployee" title="添加员工" aria-hidden="true" data-toggle="modal" data-target="#addEmployee"></span>'+
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
                          '<span class="glyphicon glyphicon-remove pull-right deleteDepartment" title="删除部门" aria-hidden="true" data-toggle="modal" data-target="#deleteDepartment"></span>'+
                          '<span class="glyphicon glyphicon-pencil pull-right mr20 editDepartment" title="修改部门" aria-hidden="true" data-toggle="modal" data-target="#editDepartment"></span>'+
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
                          '<span class="glyphicon glyphicon-plus pull-right mr20 addDepartment" title="添加子部门" aria-hidden="true" data-toggle="modal" data-target="#addDepartment"></span>'+
                        '</p>'+
                      '</li>'+
                    '</ul>';
    $("#org_structure_list").append(content);  
  }
};
