<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setLocale value="en"/>
<fmt:timeZone value="GMT">
    <ul>
        <li>DEFAULT: <fmt:formatDate value="${ date }"/></li>
        <li>DATE: <fmt:formatDate value="${ date }" type="DATE"/></li>
        <li>TIME: <fmt:formatDate value="${ date }" type="TIME"/></li>
        <li>BOTH: <fmt:formatDate value="${ date }" type="BOTH"/></li>
    </ul>
    <ul>
        <li>YY: <fmt:formatDate value="${ date }" pattern="YY"/></li>
        <li>YYYY: <fmt:formatDate value="${ date }" pattern="YYYY"/></li>
        <li>M: <fmt:formatDate value="${ date }" pattern="M"/></li>
        <li>MM: <fmt:formatDate value="${ date }" pattern="MM"/></li>
        <li>MMM: <fmt:formatDate value="${ date }" pattern="MMM"/></li>
        <li>MMMM: <fmt:formatDate value="${ date }" pattern="MMMM"/></li>
        <li>EEE: <fmt:formatDate value="${ date }" pattern="EEE"/></li>
        <li>EEEE: <fmt:formatDate value="${ date }" pattern="EEEE"/></li>
    </ul>
    <ul>
        <li>GMT: <fmt:formatDate value="${ date }" pattern="yyyy-MM-dd'T'HH:mm:ssZZZ" timeZone="GMT"/></li>
        <li>Asia/Tokyo: <fmt:formatDate value="${ date }" pattern="yyyy-MM-dd'T'HH:mm:ssZZZ" timeZone="Asia/Tokyo"/></li>
        <li>America/Los_Angeles: <fmt:formatDate value="${ date }" pattern="yyyy-MM-dd'T'HH:mm:ssZZZ" timeZone="America/Los_Angeles"/></li>
    </ul>
</fmt:timeZone>
