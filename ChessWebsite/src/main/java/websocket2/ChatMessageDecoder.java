package websocket2;

import java.io.StringReader;

import javax.json.Json;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class ChatMessageDecoder implements Decoder.Text<ChatMessage> {

	
	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public boolean willDecode(String message) {
		boolean flag = true; 
		try {
			Json.createReader(new StringReader(message)).readObject();
		} catch( Exception e) {
			flag = false;
		}
		
		return flag;
	}
	
	@Override
	public ChatMessage decode(String message) throws DecodeException {
		ChatMessage chatMessage = new ChatMessage();
		chatMessage.setMessage(
				Json.createReader(new StringReader(message))
				.readObject().getString("message"));
		
		return chatMessage;
	}
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}







}
