package com.chatserver;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import com.apicall.NotificationApiCall;
import com.apicall.UsersApiCall;

import com.databases.message.Message;

@ServerEndpoint("/chat")
public class ChatServer {
    static CopyOnWriteArrayList<User> arr = new CopyOnWriteArrayList<User>();
    Long uid = 0L;

    @OnOpen
    public void connect(Session session) {
        Map<String, List<String>> hashMap = session.getRequestParameterMap();
        uid = Long.parseLong(String.valueOf(hashMap.get("uid").get(0)));
        if (!alreadyExistSession(session)) {
            arr.add(new User(session, uid));
            notifyAllUser("UserJoined", uid);
        }
    }

    @OnMessage
    public void retriveMessage(Session session, String message) throws ParseException {
        JSONObject js = (JSONObject) new JSONParser().parse(message);

        JSONObject notificationObject = new JSONObject();
        String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-dd"));
        notificationObject.put("nContent", js.get("description"));
        notificationObject.put("time", time);
        notificationObject.put("date", date);
        Long userid=new ChatServer().getUserId(session);
        System.out.println("user id ---> " + userid);
        JSONArray array = new JSONArray();//This array is for users to whom the notification to be sent ....
        // notificationObject.put("userId", arrList);
        if (js.get("messageType").equals("projectUpdate")) {
            UsersApiCall api = new UsersApiCall();   
            JSONArray arrayList = null;
            if(Boolean.parseBoolean(String.valueOf(js.get("isDeleted")))){
                arrayList = (JSONArray) js.get("deletedUsers");
            } 
            else if(Boolean.parseBoolean(String.valueOf(js.get("isExited")))){
                arrayList = (JSONArray) js.get("remainingUsers");
            }
            else {
                arrayList = api.getUsersByProjectId(Long.parseLong(String.valueOf(js.get("projectId"))),userid);
            }
            for (Object arrList : arrayList) {
                    for (User user : arr) {
                        if (!arrList.equals(uid) && user.getUserId() != uid) {
                            try {
                                user.getSession().getBasicRemote()
                                        .sendText(js.toJSONString());
                                array.add(arrList);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
            }
            notificationObject.put("users", array);
        } 
        else if (js.get("messageType").equals("taskUpdate")) {
            UsersApiCall api = new UsersApiCall();
            JSONArray arrayList = null;
            if(Boolean.parseBoolean(String.valueOf(js.get("isDeleted")))){
                arrayList = (JSONArray) js.get("deletedUsers");
            }
            else if(Boolean.parseBoolean(String.valueOf(js.get("isExited")))){
                arrayList = (JSONArray) js.get("remainingUsers");
            }
            else {
                arrayList = api.getUsersByTaskId(Long.parseLong(String.valueOf(js.get("taskId"))),userid);
            }
            
            System.out.println("users ----> " + arrayList);
            for (Object arrList : arrayList) {
                    for (User user : arr) {

                        if (!arrList.equals(uid) && user.getUserId() != uid) {
                            try {
                                user.getSession().getBasicRemote()
                                        .sendText(js.toJSONString());
                                
                                // notificationObject.put("userId", js.get("userId"));
                                array.add(arrList);
                    
                                // NotificationApiCall.addNotificationApiCall(notificationObject);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
            }
            
            
            notificationObject.put("users", array);
            JSONArray arrs = (JSONArray) js.get("removedUsers");
            if (arrs != null) {
                for (User userIndi : arr) {
        
                    js.put("description", "You have been removed from the task");
        
                    if (arrs.contains(String.valueOf(userIndi.getUserId()))) {
                        try {
                            userIndi.getSession().getBasicRemote().sendText(js.toJSONString());
                            array.add(userIndi);
                
                            // NotificationApiCall.addNotificationApiCall(notificationObject);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        } else if (js.get("messageType").equals("textMessage")) {
            Message add = new Message();
            add.addMessage(js.toJSONString());

            for (User user : arr) {
                if (user.getUserId() == Long.parseLong(String.valueOf(js.get("toUserId")))
                        && user.getSession().getId() != session.getId()) {
                    try {
                        array.add(user.getUserId());
                        user.getSession().getBasicRemote().sendText(js.toJSONString());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            notificationObject.put("users", array);
        }
        NotificationApiCall.addNotificationApiCall(notificationObject);
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

    public void notifyAllUser(String message, Long uid) {
        JSONArray jArray = new JSONArray();
        for (User user : arr) {
            jArray.add(user.getUserId());
        }
        JSONObject jObj = new JSONObject();
        jObj.put("messageType", message);
        for (User user : arr) {
            if (user.getUserId() != uid) {
                try {
                    user.getSession().getBasicRemote().sendText(jObj.toJSONString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private long getUserId(Session s) {
        for(User user : arr){
            if(user.getSession().getId().equals(s.getId())){
                return user.getUserId();
            }
        }
        return 0;
    }
}