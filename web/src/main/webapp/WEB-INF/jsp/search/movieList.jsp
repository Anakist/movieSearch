<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
	<title>영화검색</title>
	<%@include file="/WEB-INF/common/head.jsp"%>
</head>
<body>
<section>
		<div id="main">
			<form name="searchForm" id="searchForm" onsubmit="return false">
				<ul>
					<li>
						<input type="text" name="searchStr" id="searchStr" size="10" maxlength="10" alt="검색어" value="" />
						<input type="button"  onclick="javascript:kakao.movieSearch.checkSearchStr('searchResult');" alt="검색" value="검색" />
						<input type="hidden" name="pageNo" id="pageNo" alt="페이지번호" value="1" />
					</li>
				</ul>
			</form>
			
			<div>
				<div>검색결과</div>
				<div id="searchResult">
				</div>
			</div>
		</div>
	</section>
</body>
</html>
