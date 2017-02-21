<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>	

<html>
<head>
	<title>북마크</title>
	<%@include file="/WEB-INF/common/head.jsp"%>
</head>
<body>
	<section>
		<form name="favoriteForm" method="POST" onsubmit="return false;">
		<div>
			<div>
				
				<select name="ctg" style="height:3em; padding:0.5em;">
					<option value="">선택하세요</option>
					<option value="keyword" <c:if test="${param.ctg == 'keyword'}">selected</c:if>>키워드</option>
					<option value="title" <c:if test="${param.ctg == 'title'}">selected</c:if>>제목</option>
					<option value="year" <c:if test="${param.ctg == 'year'}">selected</c:if>>제작년도</option>
					<option value="grades" <c:if test="${param.ctg == 'grades'}">selected</c:if>>평점</option>
				</select>
				&nbsp;
				<select name="ord" style="height:3em; padding:0.5em;">
					<option value="">선택하세요</option>
					<option value="asc" <c:if test="${param.ord == 'asc'}">selected</c:if>>오름차순(ASC)</option>
					<option value="desc" <c:if test="${param.ord == 'desc'}">selected</c:if>>내림차순(DESC)</option>
				</select>
				&nbsp;
				<input type="button" onclick="javascript:kakao.movie.favorite.searchOrderBy(document.forms['favoriteForm'], 'favoriteList');" value="정렬" />
			</div>
			
			<div id="favoriteList">
			</div>
			
		</div>
		</form>
		
	</section>
</body>
</html>

<script>
	kakao.movie.favorite.searchList('favoriteList');
</script>