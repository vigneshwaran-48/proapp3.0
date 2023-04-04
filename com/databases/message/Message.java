package com.databases.message;

import java.sql.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class Message {
    
    public boolean addMessage(String jsonObject) {
        boolean result = false;
        System.out.println(" i am form add");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
        }
        try (Connection c = DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "todoadmins", "todo@111")){
            System.out.println("json:" + jsonObject);
            JSONObject jsonObject2 = (JSONObject) new JSONParser().parse(jsonObject);

            Long from = Long.parseLong(String.valueOf(jsonObject2.get("fromUserId")));
            Long to = Long.parseLong(String.valueOf(jsonObject2.get("toUserId")));
            String messageTime = String.valueOf(jsonObject2.get("time"));
            String messageDate = String.valueOf(jsonObject2.get("date"));
            String message = (String) jsonObject2.get("messageContent");
            messageDate=changeDateFormat(messageDate);
            Statement statement = c.createStatement();

            statement.executeUpdate("insert into messages(messageTime,messageDate,fromUser,toUser,message)values('"
                    + messageTime + "' , '" + messageDate + "' , " + from + " , " + to + " , aes_encrypt('"+message+"','secret_key') )");
            System.out.println("i am form addmessage");
            result = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return result;
    }

    public String changeDateFormat(String date) {
        String[] array = date.split("/");
        return array[2] + "-" + array[1] + "-" + array[0];
    }
    public JSONArray getMessagesByUid(Connection c, int userId) {
        JSONArray jarray = new JSONArray();
        try {
            Statement stmt = c.createStatement();
            ResultSet rs = stmt
                    .executeQuery("select mid, messageDate, messageTime, fromUser, toUser, cast( aes_decrypt(message,'secret_key') as char) as message from messages  where fromUser=" + userId + " or toUser =" + userId);
            while (rs.next()) {
                JSONObject jsObj = new JSONObject();
                jsObj.put("messageDate", rs.getString("messageDate"));
                jsObj.put("messageTime", rs.getString("messageTime"));
                jsObj.put("fromUser", rs.getString("fromUser"));
                jsObj.put("toUser", rs.getString("toUser"));
                jsObj.put("message", rs.getString("message"));
                jsObj.put("messageId", rs.getInt("mid"));
                jarray.add(jsObj);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jarray;
        
    }
}