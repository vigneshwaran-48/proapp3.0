package com.filters;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.users.User;

@MultipartConfig
public class ApiKeyFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        try {
            Connection conn = (Connection) req.getServletContext().getAttribute("Connection");
            long uid = 0;

            String apikey = "";

            try {
                try {
                    uid = Long.parseLong(String.valueOf(req.getSession().getAttribute("uid")));
                } catch (Exception e) {
                    uid = Long.parseLong(String.valueOf(req.getParameter("userId")));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                apikey = req.getHeader("ApiKey");
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                if (uid == 0) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("status", "UserId Not Found");
                    res.getWriter().println(jsonObject.toJSONString());
                } else if (apikey == null) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("status", "ApiKey Not Found");
                    res.getWriter().println(jsonObject.toJSONString());
    
                } else if (apikey != null && uid!=0) {
                    if (new User().apiverification(conn, uid, apikey)) {
                        // System.out.println("filter passed");
                        chain.doFilter(req, res);
                    } else {
                        // System.out.println("i am from filter else");
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("status", "Invalid ApiKey or UserId ");
                        res.getWriter().println(jsonObject.toJSONString());
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}