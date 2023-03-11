package com.chatserver;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * connect
 */
public class connect {

    public static void main(String[] args) {
        LocalDateTime time = LocalDateTime.now();  
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("YYYY-MM-dd");  
        String timeformat=time.format(myFormatObj);
        System.out.println(timeformat);
    }

}