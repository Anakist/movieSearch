kakao.movie.favorite = {
		
		searchList : function( _targetDiv) {
			var _url = "/favorite/list";
			var kakaoJQuery = new KakaoJQuery();
			
			kakaoJQuery.ajaxLoad(_url, null, function(responseData) {
				var htmlRendering = "";
				var _tmpData = eval(responseData);
				var jsonData = _tmpData.responseJSON;
				
				if( jsonData != null && jsonData.errCd == "0" ) {
					$.each(jsonData.movieList, function(i, data){
						htmlRendering += "<ul>"
									  + "	<li>제목 : " + data.title + "</li>"
									  + "	<li>키워드 : " + data.keyword + "</li>"
									  + "	<li>제작년도 : " + data.year + "</li>"
									  + "	<li>평점 : " + data.grades + "</li>"
									  + "</ul>";
					});
				} else {
					htmlRendering += "<ul>"
								  +  "	<li>등록된 북마크가 없습니다.</li>"
								  +  "</ul>";
				}
				
				if( $('div[id="' + _targetDiv + '"]').children().length > 0 ) {
		    		$('div[id="' + _targetDiv + '"]').children().remove();
		    	}
				
				$('div[id="' + _targetDiv + '"]').append(htmlRendering);
			});
		}, 
		
		searchOrderBy : function( oForm, _targetDiv) {
			var _url = "/favorite/order";
			
			if( $('select[name="ctg"]').length > 0 && $('select[name="ctg"] :selected').val() == "" ) {
				alert("조건을 선택해주세요.");
				return;
			}
			
			if( $('select[name="ord"]').length > 0 && $('select[name="ord"] :selected').val() == "" ) {
				alert("정렬조건을 선택해주세요.");
				return;
			}
			
			var kakaoJQuery = new KakaoJQuery();
			
			kakaoJQuery.ajaxLoad(_url, oForm, function(responseData) {
				var htmlRendering = "";
				var _tmpData = eval(responseData);
				var jsonData = _tmpData.responseJSON;
				
				if( jsonData != null && jsonData.errCd == "0" ) {
					$.each(jsonData.movieList, function(i, data){
						htmlRendering += "<ul>"
									  + "	<li>제목 : " + data.title + "</li>"
									  + "	<li>키워드 : " + data.keyword + "</li>"
									  + "	<li>제작년도 : " + data.year + "</li>"
									  + "	<li>평점 : " + data.grades + "</li>"
									  + "</ul>";
					});
				} else {
					htmlRendering += "<ul>"
								  +  "	<li>등록된 북마크가 없습니다.</li>"
								  +  "</ul>";
				}
				
				if( $('div[id="' + _targetDiv + '"]').children().length > 0 ) {
		    		$('div[id="' + _targetDiv + '"]').children().remove();
		    	}
				
				$('div[id="' + _targetDiv + '"]').append(htmlRendering);
			});
		}
};