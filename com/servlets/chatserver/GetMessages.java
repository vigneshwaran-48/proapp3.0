package com.servlets.chatserver;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databases.message.Message;

@MultipartConfig
 
public class GetMessages extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection c = (Connection) getServletContext().getAttribute("Connection");
        response.getWriter().println(new Message().getMessagesByUid(c, Integer.parseInt(request.getParameter("userId"))));
    }
}
