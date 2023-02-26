package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.project.Project;

public class DeleteProject extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=(Connection)getServletContext().getAttribute("Connection");
        JSONObject result = new JSONObject();
        try {
            if(new Project().deleteProject(conn,Integer.parseInt(request.getParameter("projectId")))){
                result.put("status", "success");
            }
            else {
                result.put("status", "unsuccess");
            }
            response.getWriter().println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
