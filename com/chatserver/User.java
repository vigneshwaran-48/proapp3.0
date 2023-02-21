package com.chatserver;

import javax.websocket.Session;

/**
 * User
 */
public class User {

    private Session session;
    private String username;
    private Long userId;

    User(Session session,Long userId){
        this.session=session;
        // this.username=username;
        this.userId=userId;
    }
    public Session getSession() {
        return session;
    }
    public Long getUserId() {
        return userId;
    }
    public String getUsername() {
        return username;
    }
    

}