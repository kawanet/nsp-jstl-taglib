<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setLocale value="en"/>

<ul>
    <li><fmt:formatNumber value="12345.6789"/></li>
    <li><fmt:formatNumber value="12345.6789" type="number"/></li>
    <li><fmt:formatNumber value="12345.6789" type="number" maxFractionDigits="2"/></li>
    <li><fmt:formatNumber value="12345.6789" type="number" minFractionDigits="6"/></li>
    <li><fmt:formatNumber value="12345.6789" type="number" minIntegerDigits="7"/></li>
    <li><fmt:formatNumber value="12345.6789" type="percent"/></li>
    <li><fmt:formatNumber value="12345.6789" type="percent" maxFractionDigits="1"/></li>
    <li><fmt:formatNumber value="12345.6789" type="percent" minFractionDigits="3"/></li>
    <li><fmt:formatNumber value="12345.6789" type="currency" currencyCode="USD" maxFractionDigits="2"/></li>
    <li><fmt:formatNumber value="12345.6789" type="currency" currencyCode="EUR" maxFractionDigits="2"/></li>
    <li><fmt:formatNumber value="12345.6789" type="currency" currencyCode="JPY" maxFractionDigits="0"/></li>
    <li><fmt:formatNumber minIntegerDigits="6" minFractionDigits="5"> 12345.6789 </fmt:formatNumber></li>
    <li>
        [<fmt:formatNumber var="foo"> 12345.6789 </fmt:formatNumber>]
        [${foo}]
    </li>
</ul>
