package websockets;

import java.util.HashSet;
import java.util.Set;

import javax.websocket.Endpoint;
import javax.websocket.server.ServerApplicationConfig;
import javax.websocket.server.ServerEndpointConfig;

public class ServerApplicationConfigDemo implements ServerApplicationConfig {

	
	@Override
	public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> arg0) {
		Set<ServerEndpointConfig>  serverEndpointConfigSet= new HashSet<ServerEndpointConfig>();
		//add a server end point for The EndpointServerDemo class
		serverEndpointConfigSet.add(ServerEndpointConfig.Builder.create(EndpointServer.class, "/endpointserver"). build());
		
		return serverEndpointConfigSet;
	}
	
	@Override
	public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> arg0) {
		return null;
	}

	

}
