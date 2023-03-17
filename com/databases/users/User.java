package com.databases.users;

import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

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
        Statement st2 = null;
        JSONObject resultObject = new JSONObject();
        try {
            String uname =  (String)userData.get("firstName");
            String firstname = (String)userData.get("firstName"); 
            String lastname =  (String)userData.get("lastName");
            String emailid = (String) userData.get("emailId");
            String password = (String)userData.get("password");
            String apiKey;
            long time = System.currentTimeMillis();
            UUID uuid = UUID.nameUUIDFromBytes((uname + emailid + password + time).getBytes(StandardCharsets.UTF_8));
            apiKey = uuid.toString().replaceAll("-", "");
            System.out.println(apiKey);

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
                st2 = con.createStatement();
                stmt.executeUpdate("insert into users (uname,firstname,lastname,emailid,password) values(" + "'" + uname + "','" + firstname + "','" + lastname + "','" + emailid + "', aes_encrypt('"+password+"','secret_key') )");
                ResultSet rs = stmt.executeQuery("select uid from users order by uid desc limit 1");
                rs.next();
                resultObject.put("result", "Success");
                int uid=new RetrieveUser().getUidByEmail(con, emailid);
                st2.executeUpdate("insert into api_key (uid, a_key) values (" + uid + ", aes_encrypt('" + apiKey + "', 'secret_key'))");
                HttpSession session = request.getSession();
                session.setAttribute("emailId", emailid);
                session.setAttribute("password", password);
                session.setAttribute("uid", uid);
                session.setAttribute("userName", new RetrieveUser().getUnameByEmail(con, emailid));
                session.setAttribute("apiKey", apiKey);
                // session.setMaxInactiveInterval(60);
                CopyOnWriteArrayList<Integer> activeUsers=(CopyOnWriteArrayList<Integer>)request.getServletContext().getAttribute("ActiveUsers");
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

    public boolean apiverification(Connection conn,Long uid,String apikey) {
        boolean result=false;
        try (Statement stmt = conn.createStatement()) {
            ResultSet rs=stmt.executeQuery("select cast(aes_decrypt (a_key, 'secret_key') as char) as apikey from api_key where uid="+uid);
            rs.next();
            String apikeyDb = rs.getString("apikey");
            System.out.println("apikeydb:"+apikeyDb);
            System.out.println("apikey:"+apikey);
            if(apikey.equals(apikeyDb))
            {
                result=true;
                
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        System.out.println("result:"+result);
        return result;
    }
}
