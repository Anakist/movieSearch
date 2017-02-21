var KakaoJQuery = function() {
		var fLocalCallback = null;
		
		this.setLocalCallback = function(_fLocalCallback) {
			fLocalCallback = _fLocalCallback;
		};

		this._beforeSend = function() {
			console.log(">>> _beforeSend");
			try {
				// TODO : before 동작
			} catch (e) {
				console.log("error : " + e.toString());
			}
		};

		this. _error = function(data, httpRequest, textStatus, errorThrown) {
			console.log(">>> _error");
			console.log("error textStatus : " + textStatus);
			var errMsg = "";
			var _tmpData = eval(data).responseJSON;
			
			if( _tmpData.errCd != "0" ) {
				errMsg = _tmpData.errMsg;
			} else {
				if( httpRequest.status == 404 ) {
					errMsg = "페이지를 찾을 수 없습니다.";
				} else if( 500 <= httpRequest.status && httpRequest.status <= 599 ) {
					errMsg = '응답 페이지에 에러가 있습니다.';
				} else if( 0 == httpRequest.status ) {
					errMsg = "?";
				} else {
					errMsg = "응답 오류 입니다. ["+ httpRequest.status + "]";
				}
			}
			
			alert(errMsg);
		};

		this._success = function(requestData) {
			
		};

		this._complete = function(requestData) {
			console.log(">>> _complete");
			if (fLocalCallback != null && fLocalCallback != undefined) {
				fLocalCallback(requestData);
			}
		};
};

KakaoJQuery.prototype = {
		/**
		 * ajax통신
		 */
		ajaxLoad : function(_rUrl, _oForm, _fCallback) {
			
			this.setLocalCallback(_fCallback);
			
			$.ajaxSetup({
				beforeSend : this._beforeSend,
				error : this._error,
				success : this._success,
				complete : this._complete
			});
			$.ajax({
				type : "POST",
				url : _rUrl,
				data : $(_oForm).serialize()
			});
        }, 
        
        /**
         * ajax통신 for jsonp
         * crossdoamin...
         */
        ajaxLoadForJsonp : function(_rUrl, _oForm, _fCallback) {
			
			this.setLocalCallback(_fCallback);
			
			$.ajaxSetup({
				beforeSend : this._beforeSend,
				error : this._error,
				success : this._success,
				complete : this._complete
			});
			$.ajax({
				type : "POST",
				url : _rUrl,
				dataType : "jsonp",
				jsonp : "callback",
				data : $(_oForm).serialize()
			});
        }
};
