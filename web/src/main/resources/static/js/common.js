kakao = {};

kakao.common = {
		
		/**
		 * Daum API를 이용한 영화 검색
		 * 
		 * @parameter _apiKey(String)
		 * @parameter _searchStr(String)
		 * @parameter _targetId(String)
		 */
		searchMovieList : function(_apiKey, _searchStr, _targetId) {
			var renderBody = "";
			var _pageNo = 1;
			
			if( $("input[name='pageNo']").length > 0 ) {
				_pageNo = $("input[name='pageNo']").val();
			}
			
			_apiKey = "3c5d20b33d93ecb09e64fcb5ccbb0c72";
			
			$.ajax({
			    url : "https://apis.daum.net/contents/movie",
			    dataType : "jsonp",
			    type : "post",
			    jsonp : "callback",
			    data : {
			        apikey : _apiKey,      		  // API KEY
			        q : _searchStr,                 // 검색어
			        result : "10",                 // 한페이지에 출력될 결과수
			        pageno : _pageNo,   // 페이지번호
			        output : "json"                // JSONP 형식으로 호출하기 때문에 결과값 포맷은 json
			    },
			    error : function(e) {
			    	console.log("오류발생");
			    }, 
			    success : function(r){
			        //검색결과 처리
			    	var tCnt = r.channel.totalCount;
			    	if( tCnt > 0 ) {
			    		var _url = "/add";
			    		r = r.channel;
			    		
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
			    						movieId = kakao.common.parseUrl(movieLink, "movieId");
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
			    						+ "<input type=\"hidden\" name=\"\" value=\"\" />"
			    						+ "<li>"
		    							+ "	<dl onclick=\"javascript:kakao.common.showDetail(" + movieId + ");\">"
		    							+ movieTitle + "(" + movieKword + ")"
		    							+ "	</dl>"
		    							+ "	<dl name=\"movieDetail\" id=\"" + movieId + "\" style='display:none;'>"
		    							+ "		<div>" + "<input type=\"button\" id=\"fav_" + movieId + "\" "
		    							+ "					onclick=\"javascript:kakao.common.callAjax('" + _url + "', document.forms['movie_" + movieId + "']);\" value=\"북마크\" />"
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
			    					+ "	<dl>" + "\"" + _searchStr + "\""
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
//						$('input[id^="fav_"]').bind( "click", function() {
//							
//						});
					}
			    }
			    
			});
			
		},
		
		/**
		 * 영화ID에 해당하는 상세정보 show & hide
		 * 
		 * @parameter _movieId(String)
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
		
		/**
		 * ajax로 Data전송 - POST방식
		 * 
		 * @parameter _sRequestUrl(String)	대상URL
		 * @parameter _oForm(form Object)	전송할 Form Object
		 */
		callAjax : function(_sRequestUrl, _oForm) {
			var _tmpForm = _oForm;
			var _tmpUrl = _sRequestUrl;
			
			if( _tmpUrl == "" ) {
				_tmpUrl = "/add";
			}
			
			$.ajax({
				type : "POST",
				url : _tmpUrl,
				data : $(_tmpForm).serialize(),
//				beforeSend : _beforeSend,
				error : function _error(e) {
					
				},
				success :function _success(s) {
					if( s.errCd == "0" ) {
						alert("정상적으로 등록되었습니다.");
					} else {
						alert(s.errMsg);
					}
				},
				complete : function _complete(c) {
					console.log("c : " + c);
				}
			});
		}, 
		
		/**
		 * URL Parameter Parsing
		 * 
		 * @parameter _url(String)
		 * @parameter _key(String)
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