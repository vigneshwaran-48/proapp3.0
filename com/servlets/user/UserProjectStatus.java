package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.project.RetrieveProject;

public class UserProjectStatus extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int uid = Integer.parseInt(request.getParameter("userId"));
        int pid = Integer.parseInt(request.getParameter("projectId"));
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");

        JSONObject resultObject = new JSONObject();
        resultObject.put("result", new RetrieveProject().isCompleted(con, uid, pid));

        response.getWriter().println(resultObject);
    }
}
