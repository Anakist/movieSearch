kakao.movieSearch = {
		
		/**
		 * 영화검색어 검증 & 검색
		 * 
		 * @parameter _targetId(String)
		 */
		checkSearchStr : function(_targetId) {
			var _searchStr = "";
			if( $('input[name="searchStr"]').length > 0 ) {
				_searchStr = $('input[name="searchStr"]').val();
				_tStr = $.trim(_searchStr);
				
				if( _tStr.length > 0 ) {
					kakao.common.searchMovieList("", _searchStr, _targetId);
				} else {
					alert("검색할 영화를 입력해주세요.");
				}
			}
			
		}
};