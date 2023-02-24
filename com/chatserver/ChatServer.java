package com.chatserver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
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
import com.databases.*;
import com.databases.message.AddMessage;

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
        if (!alreadyExist(s)) {
            System.out.println("user " + hashMap.get("uid") +" added");
            arr.add(new User(s,Long.parseLong(hashMap.get("uid").get(0))));
        }
        
        // notifyUsers(session);


    }

    @OnMessage
    public void retriveMessage(Session session, String message) throws ParseException {
        System.out.println("From front end:" + message);
        JSONObject js = (JSONObject) new JSONParser().parse(message);
     
        if (js.get("messageType").equals("projectUpdate")) {
            UsersApiCall api = new UsersApiCall();
            ArrayList<Long> arrayList = api.getUsersByProjectId((Long) js.get("projectId"));

           
            for (Long arrList : arrayList) {
                if(alreadyExist(session))
                {
                    for (User user : arr) {
                        if(arrList.equals(user.getUserId()) && arrList!=js.get("userId"))
                        {
                            try {
                                user.getSession().getBasicRemote().sendText(JSONObject.toJSONString(js));
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }
        }

        else if(js.get("messageType").equals("userAdded"))
        {
            System.out.println("called");
            notifyUsers("userAdded");
        }
        else if(js.get("messageType").equals("textMessage"))
        {
            JSONObject jsObj =new JSONObject();
            jsObj.put("messageType", "textMessage");
            jsObj.put("messageContent", js.get("messageContent"));
            jsObj.put("from", js.get("from"));
            AddMessage add=new AddMessage();
            
            for (User user : arr) {
                if(user.getUserId()==Long.parseLong(String.valueOf(js.get("to"))) && user.getSession().getId()!=session.getId())
                {
                    try {
                        user.getSession().getBasicRemote().sendText(jsObj.toJSONString());
                        add.addMessage(js.toJSONString());
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
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

    public boolean alreadyExist(Session s) {
        boolean result = false;
        try {
            for (User chatServer : arr) {
                System.out.println("from method"+chatServer.getUserId());
                 // System.out.println("from method"+chatServer.getUserId());
                 if (chatServer.getSession().getId()==s.getId()) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    public void notifyUsers(String type)
    {
        // String responseText="";
        JSONArray jArray=new JSONArray();
        for (User user : arr) {
            jArray.add(user.getUserId());
        }
        JSONObject jObj=new JSONObject();
        jObj.put("messageType",type);
        jObj.put("users", jArray);

        
        for (User user : arr) {
            try {
                user.getSession().getBasicRemote().sendText(jObj.toJSONString());
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}