package com.listener;

import java.util.ArrayList;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class ActiveUser implements HttpSessionListener{

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("New user joined" + (ArrayList<Integer>)event.getSession().getServletContext().getAttribute("ActiveUsers"));
    }
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("Old users => " + (ArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers"));
        HttpSessionListener.super.sessionDestroyed(se);
        ArrayList<Integer> users=(ArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers");
        for (Integer integer : users) {
            if(integer==Integer.parseInt(String.valueOf(se.getSession().getAttribute("uid"))))
            {
                users.remove(integer);
            }
        }
        System.out.println("New users 0 => " + users);
        se.getSession().getServletContext().setAttribute("ActiveUsers", users);
        System.out.println("New Users => " + (ArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers"));
    }
}
