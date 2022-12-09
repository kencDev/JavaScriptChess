package auth.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import auth.AuthDao;
import auth.User;

public class LoginAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String uname = request.getParameter("uname");
		String pass = request.getParameter("pass");
		System.out.println("in Login action");
		User user = new User(uname, pass);
		AuthDao dao = new AuthDao();
		
		//if name and pass is in database
		HttpSession session = request.getSession();
		if (dao.check(user.getUserName(),user.getPassword())) {
			session.setAttribute("username", uname); //login user
			return "welcome"; //redirect to home page
		}
		else {
			session.setAttribute("error", "Unknown username/password. Please try again."); 
			return "login" ; //redirect to login page.
		}
	}

}
