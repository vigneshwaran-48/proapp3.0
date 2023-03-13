package com.databases.users;

import java.sql.*;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.*;
import com.authorize.IsExist;

/**
 * This class has method to add user
 */
public class User {
    /**
     * This method is used to insert user data 
     * @param con Used to connect to the DB
     * @param userData contains firstName, lastName, emailId, password
     * @param request
     * @return returns success or failed in a JSONObject
     */
    public JSONObject insertUserData(Connection con, JSONObject userData, HttpServletRequest request) {
        Statement stmt = null;
        JSONObject resultObject = new JSONObject();
        try {
            String uname =  (String)userData.get("firstName");
            String firstname = (String)userData.get("firstName"); 
            String lastname =  (String)userData.get("lastName");
            String emailid = (String) userData.get("emailId");
            String password = (String)userData.get("password");
            
            IsExist isObj=new IsExist();
            if(isObj.isRegisteredDetailsExists(con, emailid, uname).equals("Email Id Already Exsist"))
            {
                resultObject.put("result", "Email Id Already Exsist");
            }
            else if(isObj.isRegisteredDetailsExists(con, emailid, uname).equals("Username Already Exsist"))
            {
                resultObject.put("result", "Username Already Exsist");
            }
            else
            {
                stmt = con.createStatement();
                stmt.executeUpdate("insert into users (uname,firstname,lastname,emailid,password) values(" + "'" + uname + "','" + firstname + "','" + lastname + "','" + emailid + "', aes_encrypt('"+password+"','secret_key') )");
                ResultSet rs = stmt.executeQuery("select uid from users order by uid desc limit 1");
                rs.next();
                resultObject.put("result", "Success");
                int uid=new RetrieveUser().getUidByEmail(con, emailid);
                HttpSession session = request.getSession();
                session.setAttribute("emailId", emailid);
                session.setAttribute("password", password);
                session.setAttribute("uid", uid);
                session.setAttribute("userName", new RetrieveUser().getUnameByEmail(con, emailid));
                session.setMaxInactiveInterval(60);
                ArrayList<Integer> activeUsers=(ArrayList<Integer>)request.getServletContext().getAttribute("ActiveUsers");
                activeUsers.add(uid);
                System.out.println(activeUsers);
                request.getServletContext().setAttribute("ActiveUsers",activeUsers);
                
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
        return resultObject;
    }
}
