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

import com.databases.task.UpdateTask;

@MultipartConfig
public class TaskUpdate extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            JSONObject resultObject = new JSONObject(); 

            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("updateData"));
            if(new UpdateTask().updateTaskData((Connection) request.getServletContext().getAttribute("Connection"), jsonObject)){
                resultObject.put("result", "Success");
            }
            else{
                resultObject.put("result", "Unsuccess");
            }
            response.getWriter().println(resultObject);
        } catch (ParseException e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
