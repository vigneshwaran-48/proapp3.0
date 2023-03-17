package com.apicall;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.users.RetrieveUser;

public class UsersApiCall {
    public JSONArray getUsersByProjectId(Long pid,Long uid) {
        JSONArray userArray = new JSONArray();
        try {
            System.out.println(pid + ", -----> " + uid);
            URL url = new URL("http://localhost:8787/ProApp/user/getusers/project?uid="+uid+"&id="+ pid);// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpURLConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpURLConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            }
            else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                JSONArray jsonArray = (JSONArray) new JSONParser().parse(String.valueOf(sb));
                
                for (Object obj : jsonArray) {
                    JSONObject jsonObject = (JSONObject) obj;
                    userArray.add(Long.parseUnsignedLong(String.valueOf(jsonObject.get("userId"))));
                }
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return userArray;
    }

    public JSONArray getUsersByTaskId(Long tid,Long uid) {
        JSONArray userArray = new JSONArray();
        try {
            URL url = new URL("http://localhost:8787/ProApp/user/getusers/task?uid="+uid+ "&id=" + tid);// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpURLConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpURLConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            }
            else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                JSONArray jsonArray = (JSONArray) new JSONParser().parse(String.valueOf(sb));
                
                for (Object obj : jsonArray) {
                    JSONObject jsonObject = (JSONObject) obj;
                    userArray.add(Long.parseUnsignedLong(String.valueOf(jsonObject.get("userId"))));
                }
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return userArray;
    }
}
