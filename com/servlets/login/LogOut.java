package com.servlets.login;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import org.json.simple.JSONObject;

public class LogOut extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {    
        try{
            request.getSession().invalidate();  
            response.setContentType("text/html");  
            response.sendRedirect("login"); 
            CopyOnWriteArrayList<Integer> users=(CopyOnWriteArrayList<Integer>)request.getServletContext().getAttribute("ActiveUsers");
            for (Integer integer : users) {
                if(integer==Integer.parseInt(String.valueOf(request.getParameter("uid"))))
                {
                    users.remove(integer);
                }
            }
            request.getServletContext().setAttribute("ActiveUsers", users);
        }
        catch(Exception e){
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }

    }

}