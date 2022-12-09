<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" href="../css/style.css">
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div >
	    <form class = "form" action = "login" method = "POST">
	        <h1>Login</h1>
	
	        <input type = "text" name = "uname" placeholder = "Username" class = "inFields" ><br/>
	        <input type = "password" name = "pass" placeholder = "Password" class = "inFields"><br/> <br/>
	        <input type = "submit" class = "login" value = "Log in"><br/>
	        Forgotten password?<br/>
	    </form>
	    
	     <a href ="register"> <input type = "submit"  value = "New User" class = "new_user"> </a> 
    </div>
</body>
</html>