package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.task.RetrieveTask;

@MultipartConfig
public class UserTaskStatus extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try{
            int uid = Integer.parseInt(request.getParameter("userId"));
            int tid = Integer.parseInt(request.getParameter("taskId"));
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");

            JSONObject resultObject = new JSONObject();
            resultObject.put("result", new RetrieveTask().isCompleted(con, uid, tid));
            response.getWriter().println(resultObject);
        }catch (Exception e){
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
