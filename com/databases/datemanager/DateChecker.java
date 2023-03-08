package com.databases.datemanager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

public class DateChecker {
    public void projectExpiryDateChecker(Connection con) {
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select now() as date");
            rs.next();
            String[] datetime = rs.getString("date").split(" ")[0].split("-");
            String date = datetime[2]+"/"+datetime[1]+"/"+datetime[0];
            System.out.println(date);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        try (Connection c = DriverManager.getConnection("jdbc:mysql://10.52.0.38:3306/proapp", "vicky", "vi99g@NESH");){
            new DateChecker().projectExpiryDateChecker(c);   
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}