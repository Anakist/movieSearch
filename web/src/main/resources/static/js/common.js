kakao = {};

kakao.util = {
		
		/**
		 * 
		 * @param formObj
		 * @param fieldId
		 * @param value
		 */
		createHiddenField : function( formObj, fieldId, value ) {
			if( formObj[fieldId] ) {
				formObj[fieldId].value = value;
			} else {
				var fieldObj = document.createElement('input');

				fieldObj.type = 'hidden';
				fieldObj.id = fieldId;
				fieldObj.name = fieldId;
				fieldObj.value = value;

				formObj.appendChild(fieldObj);
			}
		}, 
		
		/**
		 * URL Parameter Parsing
		 * 
		 * @param _url(String)
		 * @param _key(String)
		 */
		parseUrl : function(_url, _key) {
			var urlQuery = unescape(_url);
			var result = "";
		    var parameters = (urlQuery.slice(urlQuery.indexOf("?")+1, urlQuery.length)).split("&");
		    
		    for(var i = 0 ; i < parameters.length ; i++){
		        var varName = parameters[i].split("=")[0];
		 
		        if( _key == varName ) {
		        	result = parameters[i].split("=")[1];
			        break;
		        }
		    }
		    return result;
		}
	
};
