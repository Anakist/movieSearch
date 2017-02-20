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
		<form name="favoriteForm" method="POST" action="/order">
		<div>
			<div>
				
				<select name="ctg" style="height:3em; padding:0.5em;">
					<option value="keyword" <c:if test="${param.ctg == 'keyword'}">selected</c:if>>키워드</option>
					<option value="title" <c:if test="${param.ctg == 'title'}">selected</c:if>>제목</option>
					<option value="year" <c:if test="${param.ctg == 'year'}">selected</c:if>>제작년도</option>
					<option value="grades" <c:if test="${param.ctg == 'grades'}">selected</c:if>>평점</option>
				</select>
				&nbsp;
				<select name="ord" style="height:3em; padding:0.5em;">
					<option value="asc" <c:if test="${param.ord == 'asc'}">selected</c:if>>오름차순(ASC)</option>
					<option value="desc" <c:if test="${param.ord == 'desc'}">selected</c:if>>내림차순(DESC)</option>
				</select>
				&nbsp;
				<input type="button" onclick="javascript:document.forms['favoriteForm'].submit();" value="정렬" />
			</div>
			
			<c:choose>
				<c:when test="${movieList.size() > 0}">
					<c:forEach var="data" items="${movieList}">
						<ul>
							<%--
							<li>${data.id}</li>
							--%>
							<li>제목 : ${data.title}</li>
							<li>키워드 : ${data.keyword}</li>
							<li>제작년도 : ${data.year}</li>
							<li>평점 : ${data.grades}</li>
						</ul>
					</c:forEach>
				</c:when>
				<c:when test="${movieList.size() <= 0}">
					<ul>
						<li>등록된 북마크가 없습니다.</li>
					</ul>
				</c:when>
			</c:choose>
		</div>
		</form>
		
	</section>
</body>
</html>
