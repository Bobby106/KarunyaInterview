$(document).ready(function(){
	
	$('#login').click(function(){
		
		$('#loginType').change(function(){
			var loginType = $('#loginType').val();
			if(loginType !== ''){
				$('.valid-error').css("display","none");
			}
		});
		var loginType = $('#loginType').val();
		
		if(loginType !== ""){
			localStorage.setItem('loginType',loginType);
			window.location.href = 'page2.html';
		}
		else{
			$('.valid-error').css("display","block");
		}
	});
	
	var loginType = localStorage.getItem('loginType');
	var setOfCount = (loginType == 0)?5:10;
	
	function checkBtn(){
		var setCount = $('.setOfinput').length;
		
		if(setCount == 1 && $('.input-elem').val() == ''){
			$('.btn-minus').attr("disabled", 'disabled');
			$('.btn-minus').css("color", "#ccc");
		}else{
			$('.btn-minus').removeAttr("disabled");
			$('.btn-minus').css("color", "red");
		}
	}
	checkBtn();
	
	$(document).on('keyup', '.input-elem', function(){
		
		var setCount = $('.setOfinput').length;
		if(setCount == 1){
			var inputValue = $(this).val();
			var actBtn = $(this).parent().parent('.setOfinput').find('.btn-minus');
			if(inputValue != ''){
				actBtn.removeAttr("disabled").css("color", "red");
			}
			else{
				actBtn.attr("disabled", 'disabled').css("color", "#ccc");
			}
		}
		
		if($(this).val() == '' || ValidateIPaddress($(this).val()) == true){
			$(this).parent().find('span.ip-error').css("display", "none");
		}else{
			$(this).parent().find('span.ip-error').css("display", "block");
		}
		checkSaveBtn();
	});
	
	$(document).on('click', '.btn-minus', function(){
		
		var setCount = $('.setOfinput').length;
		var actInput = $(this).parent().parent('.setOfinput').find('.input-elem');
		var inputValue = actInput.val();
		if(setCount > 1){
			$(this).parent().parent('.setOfinput').remove();
			$('.btn-plus').removeAttr("disabled");
			$('.btn-plus').css("color", "green");
		}else{
			actInput.val('');
		}
		checkBtn();
		checkSaveBtn();
	});
	$(document).on('click', '.btn-plus', function(){
		
		var html = '<div class="setOfinput">'+
						'<div class="input-div">'+
							'<input type="text" class="input-elem" />'+
							'<span class="valid-error ip-error">Invalid Ip address</span>'+
						'</div>'+
						'<div class="btn-div">'+
							'<button class="btn-minus" style="margin-left:4px;"> - </button>'+
							'<button class="btn-plus" style="margin-left:4px;"> + </button>'+
						'</div>'+
					'</div>';
		var setCount = $('.setOfinput').length + 1;
		if(setCount <= setOfCount){
			$('.btn-plus').removeAttr("disabled");
			$('.btn-plus').css("color", "green");
			$('.loginbox').prepend(html);
			if(setCount == setOfCount){
				$('.btn-plus').attr("disabled", 'disabled');
				$('.btn-plus').css("color", "#ccc");
			}
		}else{
			$('.btn-plus').attr("disabled", 'disabled');
			$('.btn-plus').css("color", "#ccc");
		}
		checkBtn();//192.168.0.1
		checkSaveBtn();
	});
	
	$('#save').click(function(){
		var inputElem = $('.input-elem');
		var ipAddr = [];
		var result = {};
		$.each(inputElem, function(key, val){
			
			var nth = key + 1;
			var thisValue = $(this).val();
			if(thisValue != ''){
				
				if(ValidateIPaddress(thisValue)){
					ipAddr.push(thisValue);
				}else{
					$('.setOfinput:nth-child('+nth+')').find('span.ip-error').css("display", "block");
				}
			}
		});
		
		result = {
			"loginType": loginType,
			"ipAddr":ipAddr
		}
		localStorage.setItem('ipAddress',JSON.stringify(result))
	});
	
	function checkSaveBtn(){
		var inputElem = $('.input-elem');
		var flag = 0;//enable
		var flagArr = new Array();
		var setCount = $('.setOfinput').length;
			
		if(setCount == 1){
			if(inputElem.val() == ''){
				flagArr.push(1);
			}else{
				if(ValidateIPaddress(inputElem.val()) != true){
					flagArr.push(1);
					$('.setOfinput:nth-child(1)').find('span.ip-error').css("display", "block");
				}else{
					flagArr.push(0);
					$('.setOfinput:nth-child(1)').find('span.ip-error').css("display", "none");
				}
			}
		}else{
			var count = 0;
			$.each(inputElem, function(key, val){
			
				var nth = key + 1;
				if($(this).val() != ''){
					if(ValidateIPaddress($(this).val()) != true){
						flagArr.push(1);
						$('.setOfinput:nth-child('+nth+')').find('span.ip-error').css("display", "block");
					}else{
						flagArr.push(0);
						$('.setOfinput:nth-child('+nth+')').find('span.ip-error').css("display", "none");
					}
				}else{
					count += 1;
				}
			});
			
			if(count == setCount){
				flagArr.push(1);
			}
		}
		
		var res = flagArr.some(checkflag);
		//console.log('res..', res);
		if(res){
			$("#save").attr("disabled", 'disabled');
			$("#save").css('background-color', '#ccc');
			$("#save").css('border', '1px solid #ccc');
		}
		else{
			$("#save").removeAttr("disabled");
			$("#save").css('background-color', '#0fafaa');
			$("#save").css('border', '1px solid #0fafaa');
		}
	}
	checkSaveBtn();
	function ValidateIPaddress(inputText) {
	
		var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		if(inputText.match(ipformat)){
			return true;
		}
	}
	
	function checkflag(flag){//192.168.0.1
		if(flag == 1){
			return true;
		}
	}
});