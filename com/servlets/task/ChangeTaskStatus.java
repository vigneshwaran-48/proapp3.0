package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.databases.task.*;

@MultipartConfig
public class ChangeTaskStatus extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            JSONObject js = (JSONObject) new JSONParser().parse(request.getParameter("taskData"));
            int taskId = Integer.parseInt(String.valueOf(js.get("taskId")));
            int userId = Integer.parseInt(String.valueOf(js.get("userId")));
            JSONObject taskResult=new JSONObject();
            if(new UpdateTask().taskRelationStatusChanger((Connection) getServletContext().getAttribute("Connection"), taskId, userId))
                {
                    taskResult.put("status", true);
                }
                else
                {
                    taskResult.put("status", false);

                }
            response.getWriter().print(taskResult);

        } catch (ParseException e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }

}
