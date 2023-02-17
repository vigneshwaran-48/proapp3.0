package com.servlets.user;

import javax.servlet.http.HttpServlet;
import java.io.IOException;
import java.sql.Connection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.databases.users.*;

public class RetrieveUsersFromProject extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con =(Connection) request.getServletContext().getAttribute("Connection");
        String tid=request.getParameter("id");
        int id=Integer.parseInt(tid);
        response.getWriter().print(new RetrieveUser().getUserDetailByPid(con, id));
    }
}
