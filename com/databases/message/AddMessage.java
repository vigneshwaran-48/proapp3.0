package com.databases.message;



import java.sql.*;
import java.util.Date;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class AddMessage{
    public static Connection c;
    public boolean addMessage(String jsonObject){
        boolean result=false;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            c =DriverManager.getConnection("jdbc:mysql://10.52.0.131:3306/proapp", "todoadmins", "todo@111");
            System.out.println("json:"+jsonObject);
            JSONObject jsonObject2=(JSONObject) new JSONParser().parse(jsonObject);
        
            String time="2023-02-22 16:16:16";
            Long from=Long.parseLong(String.valueOf( jsonObject2.get("from")));
            Long to=Long.parseLong(String.valueOf(jsonObject2.get("to")));
            String message=(String)jsonObject2.get("messageContent");

            // Stirng sql=
            // System.out.println("con:"+con);
            Statement statement=c.createStatement();
            statement.executeUpdate("insert into messages(messagetime,fromUser,toUser,message) values('"+time+"','"+from+"','"+to+"','"+message+"')");
            result=true;
            
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return result;
    }
}