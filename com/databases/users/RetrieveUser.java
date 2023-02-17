package com.databases.users;

import java.sql.*;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.*;
import com.databases.Image;

public class RetrieveUser {
    /**
     * This method is used to get the users.
     * @param con Used connect to the DB
     * @param pid Used to get that particular task's users
     * @return returns a JSONArray contains user information
     */
    public JSONArray getUserDetailByTid(Connection con , int tid){
        Statement stmt = null;
        ResultSet rs = null;

        JSONArray jsArr=new JSONArray();
        try {
            stmt = con.createStatement();
            rs = stmt.executeQuery("select * from task_relation inner join users on task_relation.uid=users.uid where tid ="+tid);
            
            while(rs.next()){
                JSONObject jsObject=new JSONObject();
                jsObject.put("userId",rs.getString("uid") );
                jsObject.put("userName",rs.getString("uname"));
                String imagePath = new Image().getImagePath(rs.getInt("uid"), con);
                jsObject.put("imagePath", imagePath);
                jsArr.add(jsObject);
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }
    /**
     * This method is used to get the users.
     * @param con Used connect to the DB
     * @param pid Used to get that particular project's users
     * @return returns a JSONArray contains user information
     */
    public JSONArray getUserDetailByPid(Connection con,int pid) {

        Statement stmt = null;
        ResultSet rs = null;

        JSONArray jsArr=new JSONArray();
        try {
            stmt = con.createStatement();
            rs = stmt.executeQuery("select * from project_relation inner join users on project_relation.uid=users.uid where pid ="+pid);
            while(rs.next()){
                JSONObject jsObject=new JSONObject();
                jsObject.put("userId",rs.getString("uid") );
                jsObject.put("userName",rs.getString("uname"));
                String imagePath = new Image().getImagePath(rs.getInt("uid"), con);
                jsObject.put("imagePath", imagePath);
                jsArr.add(jsObject);
            } 
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }
    /**
     * This method is used to get the user.
     * @param c Used connect to the DB
     * @param email Used to get that particular user
     * @return returns a int contains user id.
     */
    public int getUidByEmail(Connection c,String email) {
        int id = -1;
        try{
            Statement stmt=c.createStatement();
            ResultSet rs = stmt.executeQuery("select uid from users where emailid='"+email+"'");
            rs.next();
            id = rs.getInt("uid");
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return id;
    }
    /**
     * This method is used to get the user.
     * @param c Used connect to the DB
     * @param email Used to get that particular user name
     * @return returns a int contains user name.
     */
    public String getUnameByEmail(Connection c,String email)  {
        String name = "";
        try{
            Statement stmt=c.createStatement();  
            ResultSet rs=stmt.executeQuery("select uname from users where emailid='"+email+"'");
            rs.next();
            name = rs.getString("uname");
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return name;
    }
    /**
     * This method is used to get current user info.
     * @param request
     * @return return a JSONObject contains user details
     */
    public JSONObject getCurrentUser(ServletRequest request) {
        HttpServletRequest req=(HttpServletRequest) request;
        HttpSession sess=req.getSession();
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("currentUserId", sess.getAttribute("uid"));
        jsonObject.put("currentUserName", sess.getAttribute("userName"));
        // 
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        String imagePath = new Image().getImagePath((int) sess.getAttribute("uid"), con);
        jsonObject.put("imagePath", imagePath);
        
        return jsonObject;
    }
    /**
     * This method is used to get all users
     * @param c This is used to connect to DB
     * @return return JSONArray contains all user details
     */
    public JSONArray getAllUser(Connection c) {
        JSONArray jsonArray=new JSONArray();
        try {
            ResultSet rs;
            Statement statement=c.createStatement();
            rs=statement.executeQuery("select * from users");
            while(rs.next()){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("userId", rs.getInt("uid"));
                jsonObject.put("userName", rs.getString("uname"));
                String imagePath = new Image().getImagePath(rs.getInt("uid"), c);
                jsonObject.put("imagePath", imagePath);
                jsonArray.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonArray;
    }
    /**
     * This method is used to get a particular user detail.
     * @param c This is used to connect to the DB
     * @param val This is used to get that particular user.
     * @return return a JSONObject contains user detail
     */
    public JSONObject getUserDetails(Connection c,String val) {
        int uid=Integer.parseInt(val);
        JSONObject jsonObject=new JSONObject();
        try {
            ResultSet rs;
            Statement statement=c.createStatement();
            rs=statement.executeQuery("select * from users where uid="+uid);
            rs.next();

            jsonObject.put("userId", rs.getInt("uid"));
            jsonObject.put("userName", rs.getString("uname"));
            String imagePath = new Image().getImagePath(rs.getInt("uid"), c);
            jsonObject.put("imagePath", imagePath);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
