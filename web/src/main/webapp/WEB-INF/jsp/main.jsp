<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
	<title>영화</title>
	<%@include file="/WEB-INF/common/head.jsp"%>
</head>
<body>
	<section>
		<div id="main">
			<ul>
				<li>
					<a href="/search">영화검색</a>
				</li>
				<li>
					<a href="/list">북마크</a>
				</li>
			</ul>
		</div>
	</section>
</body>
</html>
