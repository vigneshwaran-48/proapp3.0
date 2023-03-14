package com.filters;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.users.User;

public class ApiKeyFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        // TODO Auto-generated method stub
        // super.doFilter(req, res, chain);
        Connection conn=(Connection) req.getServletContext().getAttribute("Connection");
        long uid=Long.parseLong(req.getParameter("userId"));
        String api=req.getHeader("ApiKey");
        
        if(api!=null && new User().apiverification(conn, uid, api))
        {
            System.out.println("filter passed");
            chain.doFilter(req, res);
        }
        else{
            System.out.println("i am from filter else");
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("status", "Error");
            res.getWriter().println(jsonObject.toJSONString());
        }
        
    }
}
