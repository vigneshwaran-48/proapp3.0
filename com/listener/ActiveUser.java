package com.listener;

import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class ActiveUser implements HttpSessionListener{

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("New user joined" + (CopyOnWriteArrayList<Integer>)event.getSession().getServletContext().getAttribute("ActiveUsers"));
    }
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("Old users => " + (CopyOnWriteArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers"));
        HttpSessionListener.super.sessionDestroyed(se);
        CopyOnWriteArrayList<Integer> users=(CopyOnWriteArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers");
        for (Integer integer : users) {
            if(integer==Integer.parseInt(String.valueOf(se.getSession().getAttribute("uid"))))
            {
                users.remove(integer);
            }
        }
        System.out.println("New users 0 => " + users);
        se.getSession().getServletContext().setAttribute("ActiveUsers", users);
        System.out.println("New Users => " + (CopyOnWriteArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers"));
    }
}
