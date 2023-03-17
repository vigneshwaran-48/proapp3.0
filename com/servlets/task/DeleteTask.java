package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.databases.task.*;
import com.databases.users.RetrieveUser;

public class DeleteTask extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=(Connection)getServletContext().getAttribute("Connection");
        try {
            JSONArray deletedUsers = new RetrieveUser().getUserDetailByTid(conn, Integer.parseInt(request.getParameter("taskId")));
            String result = new Task().deleteTask(conn,Integer.parseInt(request.getParameter("taskId")));
            JSONObject status = new JSONObject();
            if(result.equals("Success")){
                status.put("status", "success");
                status.put("deletedUsers", deletedUsers);
                response.getWriter().print(status);
            }
            else {
                status.put("status", "failed");
                response.getWriter().print(status);
            }  
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
