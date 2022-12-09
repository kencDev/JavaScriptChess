package auth;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import auth.actions.Action;
import auth.actions.ActionFactory;


@WebServlet("/pages/*")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public FrontController() {
        super();
    }

    //frontcontroller
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	try {
    		Action action = ActionFactory.getInstance().getAction(request);
    		if (action == null) System.out.println(request.getRequestURL());
    		String view = action.execute(request,response);
    		
    		System.out.println(view);
    		if (view.equals(request.getPathInfo().substring(1))) {
    			System.out.println("/WEB-INF/" + view + ".jsp");
    			request.getRequestDispatcher("/WEB-INF/" + view + ".jsp").forward(request, response);
    		}
    		else {
    			response.sendRedirect(view); //redirect to error page
    		}	
    	}
    	catch(Exception e) {
    		throw new ServletException("Executing action failed.", e);
    	}
    	
    	
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
