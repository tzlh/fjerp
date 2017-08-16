function vehicle_information_open_info_func(obj) {
  var vehicle_information_contract_code = obj.attr("contract_code");
  var vehicle_information_html = 
  '<tr>'+
    '<td colspan="11">'+
      '<div class="row">'+
        '<div class="col-lg-12">'+
          '<div id = "contract_logistics_content' + contract_logistics_contract_code_uuid + '">'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</td>'+
  '</tr>';
  if (obj.hasClass("active")) {
    obj.find(".glyphicon").removeClass("glyphicon-chevron-down");
    obj.removeClass("active");
    obj.parent().parent().nextUntil(".vehicle_information_tr").remove();
    vehicle_information_html = "";
  } else {
    obj.find(".glyphicon").addClass("glyphicon-chevron-down");
    obj.addClass("active");
    obj.parent().parent().after(vehicle_information_html);
  }
  
  
  
  
}
