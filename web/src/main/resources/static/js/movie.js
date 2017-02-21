kakao.movie = {
		/**
		 * 영화검색어 검증 & 검색
		 * 
		 * @parameter _targetId(String)
		 */
		checkSearchStr : function(_apiKey, oForm, _targetId) {
			var _searchStr = "";
			if( $('input[name="q"]').length > 0 ) {
				_searchStr = $('input[name="q"]').val();
				_tStr = $.trim(_searchStr);
				
				if( _tStr.length > 0 ) {
					kakao.movie.searchMovieList(_apiKey, oForm, _targetId);
				} else {
					alert("검색할 영화를 입력해주세요.");
				}
			}
			
		}, 
		
		/**
		 * Daum API를 이용한 영화 검색
		 * 
		 * @param _apiKey(String)
		 * @param oForm(Form)
		 * @param _targetId(String)
		 */
		searchMovieList : function(_apiKey, oForm, _targetId) {
			var renderBody = "";
			var _pageNo = 1;
			
			if( $("input[name='pageNo']").length > 0 ) {
				_pageNo = $("input[name='pageNo']").val();
			}
			
			kakao.util.createHiddenField(oForm, "apiKey", _apiKey);
			kakao.util.createHiddenField(oForm, "output", "json");
			
			var kakaoJQuery = new KakaoJQuery();
			kakaoJQuery.ajaxLoadForJsonp("https://apis.daum.net/contents/movie", oForm, function(requestData) {
//				var jsonData = jQuery.parseJSON(httpRequest.responseText);
				var _tmpData = eval(requestData);
				var jsonData = _tmpData.responseJSON;
				
		        //검색결과 처리
		    	var tCnt = jsonData.channel.totalCount;
		    	console.log("tCnt : " + tCnt);
		    	var _url = "/favorite/add";
		    	
		    	if( tCnt > 0 ) {
		    		var r = jsonData.channel;
		    		
		    		var movieKword = "";
		    		var movieTitle = "";
		    		var actor = "";
		    		var director = "";
		    		var story = "";
		    		var movieId = "";
		    		var grades = "";
		    		var year = "";
		    		
		    		$.each(r.item, function(i, data){
		    			// keyword
		    			$.each(data.kword, function(j, kwordData) {
		    				if( movieKword != "" ) {
		    					movieKword += ", ";
		    				}
		    				movieKword += kwordData.content;
		    			});
		    			// title & movieId
		    			$.each(data.title, function(j, titleData) {
		    				if( movieTitle != "" ) {
		    					movieTitle += "(" + titleData.content + ")";
		    				} else {
		    					movieTitle += titleData.content;
		    				}
		    				
		    				var movieLink = titleData.link;
		    				if( j == 0 ) {
		    					if( movieLink.indexOf("movieId") > 0 ) {
		    						movieId = kakao.util.parseUrl(movieLink, "movieId");
		    					}
		    				}
		    			});
		    			// actor
		    			$.each(data.actor, function(j, actorData) {
		    				if( actor != "" ) {
		    					actor += ", ";
		    				}
		    				actor += actorData.content;
		    			});
		    			// director
		    			$.each(data.director, function(j, directData) {
		    				if( director != "" ) {
		    					director += ", ";
		    				}
		    				director += directData.content;
		    			});
		    			// story
		    			$.each(data.story, function(j, storyData) {
		    				story += storyData.content;
		    			});
		    			// 평점
		    			$.each(data.grades, function(j, gradesData) {
		    				if( j == 0 ) {
		    					grades += gradesData.content;
		    				}
		    			});
		    			// 제작년도
		    			$.each(data.year, function(j, yearData) {
		    				year += yearData.content;
		    			});
		    			
		    			// html 구성
		    			renderBody += "<form name=\"movie_" + movieId + "\" id=\"frm_" + movieId + "\" onsubmit=\"return false\">"
		    						+ "<input type=\"hidden\" name=\"title\" value=\"" + movieTitle + "\" />"
		    						+ "<input type=\"hidden\" name=\"keyword\" value=\"" + movieKword + "\" />"
		    						+ "<input type=\"hidden\" name=\"movieId\" value=\"" + movieId + "\" />"
		    						+ "<input type=\"hidden\" name=\"grades\" value=\"" + grades + "\" />"
		    						+ "<input type=\"hidden\" name=\"actor\" value=\"" + actor + "\" />"
		    						+ "<input type=\"hidden\" name=\"year\" value=\"" + year + "\" />"
		    						+ "<input type=\"hidden\" name=\"director\" value=\"" + director + "\" />"
		    						+ "<input type=\"hidden\" name=\"\" value=\"\" />"
		    						+ "<li>"
	    							+ "	<dl onclick=\"javascript:kakao.movie.showDetail(" + movieId + ");\">"
	    							+ movieTitle + "(" + movieKword + ")"
	    							+ "	</dl>"
	    							+ "	<dl name=\"movieDetail\" id=\"" + movieId + "\" style='display:none;'>"
	    							+ "		<div>" + "<input type=\"button\" id=\"fav_" + movieId + "\" "
	    							+ "					data=\"" + movieId + "\" value=\"북마크\" />"
	    							+ "		</div>"
	    							+ "		<div>감독 : " + actor + "</div>"
	    							+ "		<div>배우 : " + director + "</div>"
	    							+ "		<div>평점 : " + grades + "</div>"
	    							+ "		<div>제작년도 : " + year + "</div>"
	    							+ "		<div>스토리 : " + story + "</div>"
	    							+ "	</dl>"
	    							+ "</li>"
	    							+ "</form>";
	    				
	    				movieKword = "";
	    				movieTitle = "";
	    				actor = "";
	    				director = "";
	    				story = "";
	    				movieId = "";
	    				grades = "";
	    				year = "";
		    		});
		    		
		    	} else {
		    		
		    		// html 구성
		    		renderBody += "<li>"
		    					+ "	<dl>" + "\"" + oForm.q.value + "\""
		    					+ "검색결과가 존재하지 않습니다."
	    						+ "	</dl>"
	    						+ "</li>";
		    	}
		    	
		    	var renderHtml = "<ul>"
					   + renderBody
					   + "</ul>";
				
		    	if( $('div[id="' + _targetId + '"]').children().length > 0 ) {
		    		$('div[id="' + _targetId + '"]').children().remove();
		    	}
		    	
				$('div[id="' + _targetId + '"]').append(renderHtml);
				
				if( tCnt > 0 ) {
					$('input[id^="fav_"]').bind( "click", function() {
						var _movieId = $(this).attr("data");
						kakao.movie.addMovie(_url, _movieId);
					});
				}
			});
			
		},
		
		/**
		 * 영화ID에 해당하는 상세정보 show & hide
		 * 
		 * @param _movieId(String)
		 */
		showDetail : function(_movieId) {
			if( $('dl[id="' + _movieId + '"]').length > 0 ) {
				if( $('dl[id="' + _movieId + '"]').is(":visible") == false ) {
					$('dl[name="movieDetail"]').hide();
					$('dl[id="' + _movieId + '"]').show();
				} else {
					$('dl[id="' + _movieId + '"]').hide();
				}
			}
		}, 
		
		addMovie : function(_url, _movieId) {
			console.log("_movieId : " + _movieId);
			var kakaoJQuery = new KakaoJQuery();
			var oForm = document.forms['movie_' + _movieId];
			console.log(oForm);
			kakaoJQuery.ajaxLoad(_url, document.forms['movie_' + _movieId], function(requestData) {
				var _tmpData = eval(requestData);
				var jsonData = _tmpData.responseJSON;
				
				if( jsonData.errCd == "0" ) {
					alert("북마크에 등록되었습니다.");
				} else {
					alert(jsonData.errMsg);
				}
			});
		}
};
