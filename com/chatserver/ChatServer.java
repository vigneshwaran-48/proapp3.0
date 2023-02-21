package com.chatserver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.apicall.UsersApiCall;

/**
 * ChatServer
 */
@ServerEndpoint("/chat")
public class ChatServer {
    static Set<User> arr = new HashSet<>();

    @OnOpen
    public void connect(Session s) {
        Map<String, List<String>> hashMap = s.getRequestParameterMap();
        System.out.println("Connected Successfully");
        System.out.println("hashmap:" + hashMap);
        if (!alreadyExist(Long.parseLong(String.valueOf(hashMap.get("uid").get(0))))) {
            arr.add(new User(s,Long.parseLong(hashMap.get("uid").get(0))));
        }

    }

    @OnMessage
    public void retriveMessage(Session session, String message) throws ParseException {
        System.out.println("From front end:" + message);
        JSONObject js = (JSONObject) new JSONParser().parse(message);
     

        if (js.get("messageType").equals("projectUpdate")) {
            System.out.println("going to call api");
            UsersApiCall api = new UsersApiCall();
            ArrayList<Long> arrayList = api.getUsersByProjectId((Long) js.get("projectId"));
            System.out.println("Array list = " + arrayList);

           
            for (Long arrList : arrayList) {
                if(alreadyExist(arrList))
                {
                    for (User user : arr) {
                        if(arrList.equals(user.getUserId()) && arrList!=js.get("userId"))
                        {
                            System.out.println("inside if");
                            try {
                                user.getSession().getBasicRemote().sendText(JSONObject.toJSONString(js));
                            } catch (IOException e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                            }
                        }
                        else {
                            System.out.println(user.getUserId() + " is not avaliable");
                        }
                    }
                }
            }
        }
    }

    @OnError
    public void error(Throwable cause) {
        cause.printStackTrace();
        // e.printStackTrace();
    }

    @OnClose
    public void closing(Session session) {
        for (User user : arr) {
            if(user.getSession().getId().equals(session.getId()))
            {
                arr.remove(user);
            }
        }
    }

    public boolean alreadyExist(Long uid) {
        boolean result = false;
        try {
            for (User chatServer : arr) {
                System.out.println("from method"+chatServer.getUserId());
                if (chatServer.getUserId()==uid) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}