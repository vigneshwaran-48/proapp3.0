package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.users.RetrieveUser;

public class GetUserByTid extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            System.out.println("From GetUserByTid servlet, id ----> " + request.getParameter("id"));
            response.getWriter().println(new RetrieveUser().getUserDetailByTid(con, Integer.parseInt(request.getParameter("id"))));
        } 
        catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}