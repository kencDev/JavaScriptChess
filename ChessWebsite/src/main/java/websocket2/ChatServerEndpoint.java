package websocket2;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint( value = "/chatServerEndpoint",
				encoders = { ChatMessageEncoder.class },
				decoders = { ChatMessageDecoder.class})
public class ChatServerEndpoint {
	
	static Set<Session> chatroomUsers = Collections.synchronizedSet(new HashSet<Session>());
	
	@OnOpen
	public void handleOpen(Session userSession) {
		chatroomUsers.add(userSession);
		
	}
	
	@OnMessage
	public void handleMessage(ChatMessage incomingMessage, Session userSession) throws IOException, EncodeException {
		String username = (String) userSession.getUserProperties().get("username");
		ChatMessage outgoingMessage = new ChatMessage();
		System.out.println("in message");
		if(username == null) {
			System.out.println("handling message - null username");
			
			userSession.getUserProperties().put("username", incomingMessage.getMessage());
			outgoingMessage.setName("System");
			outgoingMessage.setMessage("You are now connected as " + incomingMessage.getMessage());
			userSession.getBasicRemote().sendObject(outgoingMessage);
		}
		else {
			System.out.println("handling message - valid username");
			outgoingMessage.setName(username);
			outgoingMessage.setMessage(incomingMessage.getMessage());
			
			//broadcast message to all users in chat room
			Iterator<Session> iterator = chatroomUsers.iterator();
			while(iterator.hasNext()) {
				iterator.next()
				.getBasicRemote()
				.sendObject(outgoingMessage);
			}
		}
	}
	
	@OnClose
	public void handleClose(Session userSession) {
		chatroomUsers.remove(userSession);
	}
	
	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();
	}
}
