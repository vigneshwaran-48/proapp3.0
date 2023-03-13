package com.databases.notification;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class RetrieveNotification {
    public JSONArray retrieveNotification(Connection con,int uid) {
        JSONArray jsonArray = new JSONArray();

        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from notification inner join notification_relation on notification.nid=notification_relation.nid where userId = "+uid);
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("nId", rs.getInt("nid"));
                jsonObject.put("nContent", rs.getString("message"));
                jsonObject.put("time", rs.getString("n_time"));
                jsonObject.put("date", rs.getString("n_date"));
                jsonArray.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonArray;
    }
}
