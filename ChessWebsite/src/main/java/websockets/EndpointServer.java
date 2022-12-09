package websockets;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonWriter;
import javax.websocket.CloseReason;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

public class EndpointServer extends Endpoint {

	static Set<Session> chatroomUsers = Collections.synchronizedSet(new HashSet<Session>());
	
	
	public void onOpen(Session session, EndpointConfig endpointConfig) {
		chatroomUsers.add(session);
		
		//connect this session to the MessageHandlerDemo class' session.
		session.addMessageHandler(new MessageHandlerDemo(session));
	}
	
	public void onClose(Session session, CloseReason closeReason) {
		chatroomUsers.remove(session); //remove session from set of users
		//update all other user's that user has been removed
		try {
			Iterator<Session> iterator = chatroomUsers.iterator();
			while(iterator.hasNext()) {
				(iterator.next()).getBasicRemote().sendText(EndpointServer.buildJsonUserData());
			}
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void onError(Session session, Throwable t) {
		t.printStackTrace();
	}

	//returns json string of user data
	public static String buildJsonUserData() {
		Iterator<String> iterator = getUserNames().iterator();
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
		while (iterator.hasNext()) jsonArrayBuilder.add( (String) iterator.next());
		
		return Json.createObjectBuilder().add("users", jsonArrayBuilder).build().toString();
	}
	
	//returns a json string of messages 
	public static String buildJsonMessageData(String username, String message ) {
		//build a jsonObject with the user and message
		JsonObject jsonObject = Json.createObjectBuilder().add("message", username + ": " + message). build();
		StringWriter stringWriter = new StringWriter();
		//try with resources block to write the json object to string object
		try (JsonWriter jsonWriter = Json.createWriter(stringWriter)) {
			jsonWriter.write(jsonObject);
		}
		
		return stringWriter.toString();
	}
	
	//returns a list of Usernames
	public static Set<String> getUserNames() {
		Set<String> returnSet = new HashSet<String>();
		Iterator<Session> iterator = chatroomUsers.iterator();
		
		while(iterator.hasNext()) returnSet.add(iterator.next().getUserProperties().get("username").toString());
		
		return returnSet;
	}
}
