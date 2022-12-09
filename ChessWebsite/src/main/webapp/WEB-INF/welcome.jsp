<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" href="../css/style.css">
<meta charset="ISO-8859-1">
<title>Welcome</title>
</head>
<body>

	<%
	
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");// works on HTTP 1.1
		response.setHeader("Pragma", "no-cache"); //for older versions of HTTP HTTP 1.0
		response.setHeader("Expires", "0"); //for proxy server to delete cache

	%>
	
	
	Welcome ${username}
	<a href ="logout"> <input type = "submit"  value = "logout" class = "new_user"> </a> 
	
	<br/><br/>
	
	<textarea id = "messagesTextArea" rows = "10" cols = "46"> </textarea>
	<textarea id = "usersTextArea" rows = "10" cols = "10" readonly = "readonly"> </textarea>
	<input id = "textMessage" size = "60" type = "text"> 
	<input type = "button" onclick = "sendMessage();" value = "Send">

	<script type = "text/javascript">
		var websocket = new WebSocket("ws://localhost:8080/ChessWebsite/endpointserver");
		var messagesTextArea = document.getElementById("messagesTextArea");
		
		websocket.onopen = function(e) {
			  alert("[open] Connection established");
			  alert("Sending name to server");
			  alert('${username}');
			  websocket.send('${username}');
			  
			};
			
		websocket.onmessage = function processMessage(message) {
			var jsonData = JSON.parse(message.data);
			if(jsonData.message != null ) messagesTextArea.value  += jsonData.message + "\n";
			if (jsonData.users != null) {
				usersTextArea.value = "";
				var i = 0;
				while (i < jsonData.users.length) usersTextArea.value += jsonData.users[i++] + "\n";
			}
		}
		
		function sendMessage() {
			websocket.send(textMessage.value);
			textMessage.value = "";
		}
		window.onbeforeunload = function () {
			websocket.onclose = function() {};
			websocket.close();
		}
	</script>
	
</body>
</html>