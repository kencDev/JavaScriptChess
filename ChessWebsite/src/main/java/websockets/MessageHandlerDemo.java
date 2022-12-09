package websockets;

import java.io.IOException;
import java.util.Iterator;

import javax.websocket.MessageHandler;
import javax.websocket.Session;

public class MessageHandlerDemo implements MessageHandler.Whole<String> {

	private Session userSession = null;
	
	//constructor for MessageHandlerDemo which takes in a session demo.
	public MessageHandlerDemo(Session session) {
		this.userSession = session;
	}
	
	@Override
	public void onMessage(String message) {
		String username = (String) userSession.getUserProperties().get("username");
		if (username == null) {
			userSession.getUserProperties().put("username", message);
			
			try {
				userSession.getBasicRemote()
						   .sendText(EndpointServer
						   .buildJsonMessageData("System", "you are now connected as " + message));
				
				System.out.println(message);
				Iterator<Session> iterator = EndpointServer.chatroomUsers.iterator();
				while(iterator.hasNext()) {
					(iterator.next()).getBasicRemote().sendText(EndpointServer.buildJsonUserData());
				}
			} 
			catch (IOException e) {
				e.printStackTrace();
			}
		}
		else {
			Iterator<Session> iterator = EndpointServer.chatroomUsers.iterator();
			while (iterator.hasNext())
				try {
					iterator.next().getBasicRemote().sendText(EndpointServer.buildJsonMessageData(username, message));
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}

}
