package com.databases.users;

import java.sql.*;
import org.json.simple.JSONObject;


/**
 * This class is used to update user details.
 */
public class UpdateUser {
    /**
     * This method is used to update existing user detail
     * @param con Used to connect to the DB
     * @param updatedUserData contains newFirstName, newLastName, newEmailId, uid
     * @return returns success or failed in a JSONObject
     */
    public String updateUser(Connection con, JSONObject updatedUserData) {
        String result="";
        try {
            String newUserName=(String) updatedUserData.get("newName");
            String newemailid = (String) updatedUserData.get("newEmailId");
            boolean isPhotoAvailable = Boolean.valueOf((String.valueOf(updatedUserData.get("isPhotoAvailable"))));
            String oldPassword = (String) updatedUserData.get("oldPassword");
            String newPassword = (String) updatedUserData.get("newPassword");
            String newimagePath = (String) updatedUserData.get("imageType");
            Long uid = (Long) updatedUserData.get("uid");
            

            Statement stmt = con.createStatement();

            if(verifyOldPassword(oldPassword, uid, con)){
                if(isPhotoAvailable){
                    stmt.executeUpdate("update users set uname = '" + newUserName + "', emailid = '"+newemailid + "', password = aes_encrypt('"+newPassword+"','secret_key') , imagePath = '"+String.valueOf(uid)+newimagePath+"' where uid = " + uid);
                }
                else{
                    stmt.executeUpdate("update users set uname = '" + newUserName + "', emailid = '"+newemailid + "', password = aes_encrypt('"+newPassword+"','secret_key') where uid = " + uid);
                }
                result="Success";
            }
            else{
                result="Invalid Password";
            }
            

        } catch (Exception e) {
            result="Error";
            e.printStackTrace();
        }
        return result;
    }

    private boolean verifyOldPassword(String oldPassword, long uid, Connection con){
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select cast( aes_decrypt(password,'secret_key') as char) as password from users where uid = "+uid);
            rs.next();
            if(oldPassword.equals(rs.getString("password"))){
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}
