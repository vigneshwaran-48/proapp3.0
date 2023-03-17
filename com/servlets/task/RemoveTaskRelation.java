package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.task.*;
import com.databases.users.RetrieveUser;


@MultipartConfig
public class RemoveTaskRelation extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        try {
            System.out.println(request.getParameter("userData"));
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("userData"));
            int tid = Integer.parseInt(String.valueOf(jsonObject.get("taskId")));
            int uid = Integer.parseInt(String.valueOf(jsonObject.get("userId")));
            JSONArray remainingUsers = new RetrieveUser().getUserDetailByTid(con, tid);
            JSONObject result = new JSONObject();
            if (new UpdateTask().deleteUserFromTask(con, uid, tid)){
                result.put("status", "success");
                result.put("remainingUsers", remainingUsers);
                response.getWriter().println(result);
            }
            else{
                result.put("status", "failed");
                response.getWriter().println(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
