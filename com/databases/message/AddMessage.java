package com.databases.message;

import java.sql.*;
import java.util.Date;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class AddMessage {
    public static Connection c;

    public boolean addMessage(String jsonObject) {
        boolean result = false;
        System.out.println(" i am form add");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "vicky", "vi99g@NESH");
            System.out.println("json:" + jsonObject);
            JSONObject jsonObject2 = (JSONObject) new JSONParser().parse(jsonObject);

            Long from = Long.parseLong(String.valueOf(jsonObject2.get("fromUserId")));
            Long to = Long.parseLong(String.valueOf(jsonObject2.get("toUserId")));
            String messageTime = String.valueOf(jsonObject2.get("time"));
            String messageDate = String.valueOf(jsonObject2.get("date"));
            String message = (String) jsonObject2.get("messageContent");
            messageDate=changeDateFormat(messageDate);
            Statement statement = c.createStatement();
            // statement.executeUpdate("insert into
            // messages(messagetime,fromUser,toUser,message,)
            // values('"+time+"','"+from+"','"+to+"','"+message+"')");
            statement.executeUpdate("insert into messages(messageTime,messageDate,fromUser,toUser,message)values('"
                    + messageTime + "' , '" + messageDate + "' , " + from + " , " + to + " , '" + message + "')");
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
}