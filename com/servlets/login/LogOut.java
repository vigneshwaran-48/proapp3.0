package com.servlets.login;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.*;

public class LogOut extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {    
        request.getSession().invalidate();  
        response.setContentType("text/html");  
        response.sendRedirect("login"); 
        ArrayList<Integer> users=(ArrayList<Integer>)request.getServletContext().getAttribute("ActiveUsers");
        for (Integer integer : users) {
            if(integer==Integer.parseInt(String.valueOf(request.getParameter("uid"))))
            {
                users.remove(integer);
            }
        }
        request.getServletContext().setAttribute("ActiveUsers", users);


    }

}