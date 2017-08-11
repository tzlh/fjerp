
/**
 * 输出top_nav
 * @param output_id 输出内容id
 */
function header_output(output_id) {
  var content = 
    '<div class = "row header_row">'+
    '    <div class = "col-lg-12 header_col">'+
    '      <div class = "panel panel-primary header_radius header_mb0">'+
    '        <div class = "panel-heading clearfix header_radius">'+
    '          <div class="pull-left ">'+
    '            <img src = "../../img/fjerp_logo_white.png" width = "24" class = "header_mr15">'+
    '            <span class="header_line">系统管理</span>'+
    '          </div>'+
    '          <div class = "pull-right">'+
    '            <div class = "btn-group">'+
    '              <button class = "btn btn-default dropdown-toggle" type = "button" data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false">'+
    '                管理员<span class = "caret"></span>'+
    '              </button>'+
    '              <ul class = "dropdown-menu header_menu">'+
    '                <li><a href = "#">修改密码</a></li>'+
    '                <li><a href = "#">退出</a></li>'+
    '              </ul>'+
    '            </div>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '    </div>'+
    '   </div>';
    $(output_id).html(content);
}