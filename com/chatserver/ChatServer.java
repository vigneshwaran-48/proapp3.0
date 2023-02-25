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

import com.databases.message.AddMessage;

/**
 * ChatServer
 */
@ServerEndpoint("/chat")
public class ChatServer {
    static Set<User> arr = new HashSet<>();

    @OnOpen
    public void connect(Session session) {
        Map<String, List<String>> hashMap = session.getRequestParameterMap();
        System.out.println("Connected Successfully");
        System.out.println("hashmap:" + hashMap);
        if (!alreadyExist(Long.parseLong(String.valueOf(hashMap.get("uid").get(0))))) {
            arr.add(new User(session, Long.parseLong(hashMap.get("uid").get(0))));
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
                if (alreadyExist(arrList)) {
                    for (User user : arr) {

                        if (arrList.equals(user.getUserId()) && arrList != js.get("userId")) {
                            System.out.println("i am from if proupdate");

                            try {
                                user.getSession().getBasicRemote()
                                        .sendText(js.toJSONString());
                            } catch (IOException e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                            }
                        } else {
                            System.out.println("i am from pu else");
                        }
                    }
                }
            }
        }
        // else if (js.get("messageType").equals("taskUpdate")) {
        //     UsersApiCall api = new UsersApiCall();
        //     ArrayList<Long> arrayList = api.getUsersByProjectId((Long) js.get("projectId"));

        //     for (Long arrList : arrayList) {
        //         if (alreadyExist(arrList)) {
        //             for (User user : arr) {

        //                 if (arrList.equals(user.getUserId()) && arrList != js.get("userId")) {
        //                     System.out.println("i am from if proupdate");

        //                     try {
        //                         user.getSession().getBasicRemote()
        //                                 .sendText(js.toJSONString());
        //                     } catch (IOException e) {
        //                         // TODO Auto-generated catch block
        //                         e.printStackTrace();
        //                     }
        //                 } else {
        //                     System.out.println("i am from pu else");
        //                 }
        //             }
        //         }
        //     }
        // }


        else if (js.get("messageType").equals("userAdded")) {
            System.out.println("called");
            notifyUsers("userAdded");
        } else if (js.get("messageType").equals("textMessage")) {
            // JSONObject jsObj =new JSONObject();
            // jsObj.put("messageType", "textMessage");
            // jsObj.put("messageContent", js.get("messageContent"));
            // jsObj.put("from", js.get("from"));
            AddMessage add = new AddMessage();

            for (User user : arr)
             {
                System.out.println("user.getUserId:" + (user.getUserId()));
                System.out.println("long:" + Long.parseLong(String.valueOf(js.get("toUserId"))));

                if (user.getUserId() == Long.parseLong(String.valueOf(js.get("toUserId")))
                        && user.getSession().getId() != session.getId()) {
                    try {
                        user.getSession().getBasicRemote().sendText(js.toJSONString());
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                } else {
                    // System.out.println(" io am form else");
                    add.addMessage(js.toJSONString());
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
            if (user.getSession().getId().equals(session.getId())) {
                arr.remove(user);
            }
        }
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

    public void notifyUsers(String type) {
        // String responseText="";
        JSONArray jArray = new JSONArray();
        for (User user : arr) {
            jArray.add(user.getUserId());
        }
        JSONObject jObj = new JSONObject();
        jObj.put("messageType", type);
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