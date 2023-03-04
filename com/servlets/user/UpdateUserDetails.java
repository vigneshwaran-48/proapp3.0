package com.servlets.user;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.Image;
import com.databases.users.*;
import java.sql.*;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 40,
 maxFileSize = 1024 * 1024 * 80,
 maxRequestSize = 1024 * 1024 * 100)

public class UpdateUserDetails extends HttpServlet{

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        try{
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(req.getParameter("updateData"));
            String result=new UpdateUser().updateUser(c, jsonObject);
            JSONObject resultObject = new JSONObject();

            if(result.equals("Success"))
            {
                if(Boolean.valueOf((String.valueOf(jsonObject.get("isPhotoAvailable")))))
                {
                    String location = "/home/vigneshwaran/ApacheTerminal/apache-tomcat-8.5.86/webapps/ProApp/assets/images/usersImages/";
                    new Image().updatePhoto(c, req.getPart("userImage") , Integer.parseInt(String.valueOf(jsonObject.get("uid"))), (String) jsonObject.get("imageType"), location);
                    resultObject.put("result","Success");
                    // resp.getWriter().print(result);
                }
            }
            else 
            {
                resultObject.put("result", result);
            }
            resp.getWriter().print(resultObject);

        }
        catch(Exception e){
            e.printStackTrace();
        }

   }
}
