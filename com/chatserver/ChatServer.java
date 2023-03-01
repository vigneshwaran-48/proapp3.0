package com.chatserver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

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

import com.databases.message.Message;
import com.mysql.cj.xdevapi.JsonParser;

/**
 * ChatServer
 */
@ServerEndpoint("/chat")
public class ChatServer {
    static CopyOnWriteArrayList<User> arr = new CopyOnWriteArrayList<User>();
    Long uid = 0L;

    @OnOpen
    public void connect(Session session) {
        Map<String, List<String>> hashMap = session.getRequestParameterMap();
        // System.out.println("Connected Successfully");
        System.out.println("hashmap:" + hashMap);
        uid = Long.parseLong(String.valueOf(hashMap.get("uid").get(0)));
        if (!alreadyExistSession(session)) {
            arr.add(new User(session, uid));
        }
        notifyAllUser("UserJoined",uid);
    }

    @OnMessage
    public void retriveMessage(Session session, String message) throws ParseException {
        System.out.println("From front end:" + message);
        JSONObject js = (JSONObject) new JSONParser().parse(message);

        if (js.get("messageType").equals("projectUpdate")) {
            UsersApiCall api = new UsersApiCall();
            ArrayList<Long> arrayList = api.getUsersByProjectId((Long) js.get("projectId"));

            for (Long arrList : arrayList) {
                if (alreadyExist(arrList)) {
                    for (User user : arr) {
                        System.out.println(
                                arrayList + ", " + js.get("userId") + " ==> " + (arrayList == js.get("userId")));
                        if (arrList.equals(user.getUserId()) && user.getUserId() != uid) {

                            try {
                                user.getSession().getBasicRemote()
                                        .sendText(js.toJSONString());
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        } 
                    }
                }
            }
        } else if (js.get("messageType").equals("taskUpdate")) {
            UsersApiCall api = new UsersApiCall();
            ArrayList<Long> arrayList = api.getUsersByTaskId((Long) js.get("taskId"));

            for (Long arrList : arrayList) {
                if (alreadyExist(arrList)) {
                    for (User user : arr) {

                        if (arrList.equals(user.getUserId()) && user.getUserId() != uid) {
                            try {
                                user.getSession().getBasicRemote()
                                        .sendText(js.toJSONString());
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        } 
                    }
                }
            }
            JSONArray arrs=(JSONArray)js.get("removedUsers");
            System.out.println(arrs);
            if(arrs != null){
                for (User userIndi : arr) {
                    System.out.println(userIndi.getUsername());
                    if(arrs.contains(userIndi.getUserId()))
                    {
                        try {
                            userIndi.getSession().getBasicRemote().sendText("You have Been Removed");
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        else if (js.get("messageType").equals("textMessage")) {
            Message add = new Message();
            add.addMessage(js.toJSONString());

            for (User user : arr) {
                System.out.println("user.getUserId:" + (user.getUserId()));
                System.out.println("long:" + Long.parseLong(String.valueOf(js.get("toUserId"))));

                if (user.getUserId() == Long.parseLong(String.valueOf(js.get("toUserId")))
                        && user.getSession().getId() != session.getId()) {
                    try {
                        user.getSession().getBasicRemote().sendText(js.toJSONString());
                    } catch (IOException e) {
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
    public void closing(Session session) throws IOException {
        

        for (User user : arr) {
            if (user.getSession().getId().equals(session.getId())) {
                arr.remove(user);
            }
            
        }
        notifyAllUser("UserLeft", -8L);
        
    }

    public boolean alreadyExist(Long uid) {
        boolean result = false;
        try {
            for (User chatServer : arr) {
                System.out.println("from method" + chatServer.getUserId());
                if (chatServer.getUserId() == uid) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean alreadyExistSession(Session session) {
        boolean result = false;
        try {
            for (User chatServer : arr) {
                if (chatServer.getSession().getId() == session.getId()) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public void notifyAllUser(String message,Long uid) {
        // String responseText="";
        JSONArray jArray = new JSONArray();
        for (User user : arr) {
            jArray.add(user.getUserId());
        }
        JSONObject jObj = new JSONObject();
        jObj.put("messageType", message);
        for (User user : arr) {
            if(user.getUserId()!=uid)
            {
                try {
                    user.getSession().getBasicRemote().sendText(jObj.toJSONString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    
    
}