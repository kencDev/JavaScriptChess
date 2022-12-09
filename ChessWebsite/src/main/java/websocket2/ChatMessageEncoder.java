package websocket2;

import javax.json.Json;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ChatMessageEncoder implements Encoder.Text<ChatMessage> {

	@Override
	public void init(EndpointConfig arg0) {
		
	}
	
	@Override
	public String encode(ChatMessage message) throws EncodeException {
		return Json.createObjectBuilder().add("name", message.getName())
										 .add("message", message.getMessage())
										 .build().toString();
	}

	@Override
	public void destroy() {
		
	}
}
