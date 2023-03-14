package com.servlets.login;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import org.json.simple.JSONObject;
import com.databases.users.RetrieveUser;

public class ApiKey extends HttpServlet {
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject object  = new JSONObject();
        try{
            // Connection con = (Connection) getServletContext().getAttribute("Connection");
            RetrieveUser retrieveUser = new RetrieveUser();
            String apiKey = retrieveUser.getUserApiKey((Integer) request.getSession().getAttribute("uid"));

            if(apiKey != null){
                object.put("apiKey", apiKey);
                object.put("status", "success");
            }
            else {
                object.put("status", "Error");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
        response.getWriter().println(object);
    }
}
