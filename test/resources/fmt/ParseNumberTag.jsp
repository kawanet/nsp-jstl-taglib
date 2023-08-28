<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<ul>
    <li>[<fmt:parseNumber value="123.456789"/>]</li>
    <li><fmt:parseNumber var="num" value="1,234.56789"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="12,345.6789" type="NUMBER"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="123,456.789" type="NUMBER" integerOnly="false"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="1,234,567.89" type="NUMBER" integerOnly="true"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="123.456%" type="PERCENT"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="12.345%" type="PERCENT"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value="1.234%" type="PERCENT"/>[${num}]</li>
    <li><fmt:parseNumber var="num" value=".123%" type="PERCENT"/>[${num}]</li>
</ul>
