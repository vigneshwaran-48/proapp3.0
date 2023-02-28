package com.listener;

import java.util.ArrayList;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class ActiveUser implements HttpSessionListener{
    // public void sessionDestory() {
        
    // }
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        // TODO Auto-generated method stub
        HttpSessionListener.super.sessionDestroyed(se);
        ArrayList<Integer> users=(ArrayList<Integer>)se.getSession().getServletContext().getAttribute("ActiveUsers");
        for (Integer integer : users) {
            if(integer==Integer.parseInt(String.valueOf(se.getSession().getAttribute("uid"))))
            {
                users.remove(integer);
            }
        }
        se.getSession().getServletContext().setAttribute("ActiveUsers", users);
    }
}
