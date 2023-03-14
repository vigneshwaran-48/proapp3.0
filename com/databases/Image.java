package com.databases;
import java.io.*;
import java.sql.*;

import javax.servlet.http.Part;
/**
 * This class contains the methods to add, update profile photo.
 */
public class Image {

    /**
     * This method updates the existing profile photo.
     * @param c Connection object used to connect to the database.
     * @param part This is used to get and save images in DB
     * @param uid This id is used to save the image in DB for that particular user.
     * @param imageType like --> .jpg, .png etc,.
     * @param location only folder location ends with '/' to save the image
     * @return returns a boolean value, true if process completed successfully or false.
     */
    public boolean updatePhoto(Connection c, Part part, int uid,String imageType, String location) {
        boolean result=false;

        try {
            deletePreviousImage(uid, location);

            Statement st = c.createStatement();

            InputStream in = part.getInputStream();
            File f = new File(location + uid + imageType);
    
            FileOutputStream out = new FileOutputStream(f);
            int readingValue = 0;
            byte[] b = new byte[1024];

            while((readingValue = in.read(b)) != -1){
                out.write(b, 0, readingValue);
            }
            out.close();

            st.executeUpdate("update users set imagePath = '" + uid + imageType + "' where uid = " + uid);
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * This method is used to delete the previous image
     * @param id With this user id the image will be deleted
     * @param location Images in this location will be deleted
     */
    private void deletePreviousImage(int id, String location){
        try{
            File f = new File(location);
            if(f.isDirectory()){
                File[] allFiles = f.listFiles();
                for(File file : allFiles){
                    String[] splittedFileName = file.getName().split("\\.");
                    if(splittedFileName[0].equals(String.valueOf(id))){
                        file.delete();
                    } 
                }
            }
            else {
                System.out.println("Check the location path it is not a directory");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}