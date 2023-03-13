package com.databases.notification;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Notification {
    public boolean addNotification(Connection con, JSONObject jsonObject) {
        boolean result = false;
        String message = (String) jsonObject.get("nContent");
        String n_time = (String) jsonObject.get("time");
        String n_date = (String) jsonObject.get("date");
        JSONArray users = (JSONArray) jsonObject.get("users");
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("insert into notification (message, n_time, n_date) values('"+message+"' , '"+n_time+"' , '"+n_date+"')");

            ResultSet rs = stmt.executeQuery("select nid from notification order by nid desc limit 1");
            rs.next();
            int nid = rs.getInt("nid");

            Statement stmt1 = con.createStatement();
            for (Object user_id : users) {
                stmt1.executeUpdate("insert into notification_relation values("+nid+","+user_id+")");
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean deleteNotificationRelation(Connection con, int uid, int nid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from notification_relation where userId = "+uid+" and nid = "+nid);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        deleteNotification(con, nid);
        return result;
    }

    private boolean deleteNotification(Connection con, int nid) {
        boolean result = false;
        if (isNotificationEmpty(con, nid)){
            try {
                Statement stmt = con.createStatement();
                stmt.executeUpdate("delete from notification where nid = "+nid);
                result = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    private boolean isNotificationEmpty(Connection con, int nid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from notification_relation where nid = "+nid);
            if (!rs.next()) {
                result=true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
