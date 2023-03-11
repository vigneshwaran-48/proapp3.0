package com.databases.notification;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONObject;

public class Notification {
    public JSONObject addNotification(Connection con, JSONObject jsonObject) {
        
        JSONObject resultObject = new JSONObject();
        String message = (String) jsonObject.get("nContent");
        String n_time = (String) jsonObject.get("time");
        String n_date = (String) jsonObject.get("date");
        long user_id = Long.parseLong(String.valueOf(jsonObject.get("userId")));
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("insert into notification (message, n_time, n_date, user_id) values('"+message+"' , '"+n_time+"' , '"+n_date+"' , '"+user_id+"')");

            Statement stmt1 = con.createStatement();
            ResultSet rs = stmt1.executeQuery("select * from notification order by nid desc limit 1");
            rs.next();

            resultObject.put("nId", rs.getInt("nid"));
            resultObject.put("nContent", rs.getString("message"));
            resultObject.put("time", rs.getString("n_time"));
            resultObject.put("date", rs.getString("n_date"));
            resultObject.put("userId", rs.getString("user_id"));
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultObject;
    }

    public boolean deleteNotification(Connection con, int uid, int nid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from notification where user_id = "+uid+" and nid = "+nid);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
