var project_path = "http://192.168.1.131:8080/lego/";
	$(document).on('change','.positionfile',function(){
			var $this = $(this);
			var formData = new FormData();
			formData.append('file', $this[0].files[0]);
			var uploadFileData = ajax_assistant(project_path+"/lego/lego_storage?servletName=c_uploadTemporaryFile",formData, false, true, true)
			//console.log(uploadFileData);
			var uploadFileDataObj = JSON.parse(uploadFileData.result);
			var fileName = uploadFileDataObj.file_name;
       		var cluster_name = uploadFileDataObj.cluster_name;
       		var url = project_path+"upload/"+fileName;
       		var file_type = uploadFileDataObj.file_name.split(".")[1].toLowerCase();
			if("png" == file_type || "jpg" == file_type || "jpeg" == file_type || "gif" == file_type || "psd" == file_type){
	
				var file = '<div class=" pull-left file_name has-feedback contract_warehouse_ml15">'+
	       				   	'<img url="'+url+'" width="60" height="60" uuid="'+cluster_name+'" src="'+url+'" class="img-rounded"/>'+
						   	'<button class="btn btn-danger text-center delet_file_btn">'+
						   		'<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
						   	'</button>'+
					   '</div>';
       			$this.parents(".attch").append(file);
			}else{
				var file = '<div class=" pull-left file_name has-feedback contract_warehouse_ml15">'+
	       				   	'<img url="'+url+'" width="60" height="60"  src="img/aa.jpg" class="img-rounded"/>'+
						   	'<button class="btn btn-danger text-center delet_file_btn">'+
						   		'<span class="glyphicon glyphicon-remove  btn-danger fon12"></span>'+
						   	'</button>'+
					   '</div>';
				$this.parents(".attch").append(file);
			}

       		$('.positionfile').val("");


			
	});
	$(document).on("click",".delet_file_btn",function(){
//		console.log(1)
		$(this).parents(".file_name").remove();
	});
	$(document).on("click",".file_name img",function(){
		url = $(this).attr("url");
		window.open(url);
	});
	


