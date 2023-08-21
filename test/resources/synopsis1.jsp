<c:if test="${upper}">
  <h1><c:out value="${fn:toUpperCase(title)}" default="Untitled"/></h1>
</c:if>
