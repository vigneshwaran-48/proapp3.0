package com.servlets.notification;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.notification.RetrieveNotification;

public class GetNotifications extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       try{
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            int uid = Integer.parseInt(request.getParameter("userId"));
            response.getWriter().println(new RetrieveNotification().retrieveNotification(con, uid));
       }catch(Exception e){
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
