package com.servlets.notification;

import java.io.IOException;
import java.sql.Connection;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.databases.notification.Notification;


public class AddNotification extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            Scanner sc = new Scanner(request.getInputStream());
            String responseString = "";
            while(sc.hasNext()){
                responseString += sc.nextLine();
            }
            String refactored = responseString.split("=")[1];
            System.out.println(refactored);
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(refactored);
            // System.out.println("notification from servlet ="+request.getParameter("notificationData"));
            response.getWriter().println(new Notification().addNotification(con, jsonObject));
        } catch (ParseException e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
