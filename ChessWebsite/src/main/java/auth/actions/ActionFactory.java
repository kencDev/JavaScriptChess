package auth.actions;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import auth.PackageAccess;

public class ActionFactory {
	private static ActionFactory instance; // singleton pattern
	private Map<String, Action> actions;
	PackageAccess packAccess;
	//private Set<Class> classSet;
	//put all action in ActionFactory via class name 
	public ActionFactory() {
		actions = new HashMap<>();
//		classSet = packAccess.findClasses("actions");
//		
//		for(Class c : classSet) {
//			System.out.println(c.getSimpleName() );
//		}
		actions.put("welcome", new WelcomeAction());
		actions.put("login", new LoginAction());
		actions.put("logout", new LogoutAction());
		actions.put("account", new AccountAction());
		actions.put("chess", new ChessAction());
		
	}
	
	

	//singleton
	public static ActionFactory getInstance() {
		if (instance == null) {
			return new ActionFactory();
		}
		else {
			return instance;
		}
	}
	
	public Action getAction(HttpServletRequest request) {
		System.out.println(request.getPathInfo().substring(0));
		return actions.get(request.getPathInfo().substring(1));
	}
}
