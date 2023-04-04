package com.filters;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.authorize.LoginChecker;
import com.databases.users.RetrieveUser;

/**
 * Login Filter Is to Evaluate user Email and password
 */

@MultipartConfig
public class LoginFilter extends HttpFilter{
    /**
     * 
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String userData = request.getParameter("userData");
        try {
            
            JSONObject jsObj = (JSONObject) new JSONParser().parse(userData);
            String email = (String) jsObj.get("emailId");
            String password = (String) jsObj.get("password");
            LoginChecker loginChecker = new LoginChecker();

            try {
                if (loginChecker.validater(email, password)) {
                    HttpServletRequest sessionVar = (HttpServletRequest) request; // changing the servlet Requet to https // servelt Request
                    HttpSession session = sessionVar.getSession(); // making a session Var
                    
                    session.setAttribute("emailId", email);
                    session.setAttribute("password", password);

                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn= DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "todoadmins", "todo@111");
                    int uid=new RetrieveUser().getUidByEmail(conn, email);
                    session.setAttribute("uid", uid);
                    session.setAttribute("userName", new RetrieveUser().getUnameByEmail(conn, email));
                    CopyOnWriteArrayList<Integer> activeUsers=(CopyOnWriteArrayList<Integer>)request.getServletContext().getAttribute("ActiveUsers");
                    activeUsers.add(uid);
                    request.getServletContext().setAttribute("ActiveUsers",activeUsers);
                    response.getWriter().append("Success");
                }
                else{
                    response.getWriter().append("Invalid Email or Password");

                }
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }

    }

}