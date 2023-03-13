package com.apicall;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import org.json.simple.JSONObject;

public class NotificationApiCall {
    public static JSONObject addNotificationApiCall(JSONObject jsonObject) {
        try {
            String data = "notificationData=" + jsonObject.toJSONString();
            URL url = new URL("http://localhost:8787/ProApp/notification/add");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();                                             
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            OutputStream out = connection.getOutputStream();
            out.write(data.getBytes());
            Scanner sc = new Scanner(connection.getInputStream());
            while(sc.hasNext()){
                System.out.println(sc.nextLine());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}