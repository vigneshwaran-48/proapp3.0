package com.databases.project;

import java.sql.*;
import java.util.ArrayList;

import org.json.simple.*;

import com.databases.task.RetrieveTask;
import com.databases.users.RetrieveUser;

/**
 * This class contains methods to retrieve projects.
 */
public class RetrieveProject {
    /**
     * This method is used to return the percentage of the give project 
     * @param con Used to connect to the DB
     * @param pid The project id for which the percentage needed
     * @param uid This is for getting percentage for that given person id
     * @return Returns the percentage as an int
     */
    public int returnPercentage(Connection con,int pid,int uid) {
        int result=0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = "+pid);

            int completedCount=0;
            int totalCount=0;
            String status="";
            while (rs.next()) {
                status=rs.getString("status");
                if (rs.getString("status").equals("Completed")){
                    completedCount++;
                }
                totalCount++;

            }
            // System.out.println("total count 1 = "+totalCount);
         if (totalCount>0) {
            if  (totalCount > 1)
            {
                result = (completedCount*100)/totalCount;
            }
            else if(status.equals("On Progress")&& totalCount==1)
            {
                
                int completedCount2=0;
                int totalCount2=0;
                Statement stmt2 = con.createStatement();
                ResultSet rs2=stmt2.executeQuery("select IsCompleted from tasks inner join task_relation on tasks.tid = task_relation.tid where pid =  "+pid);
                while (rs2.next()) {
                    if (rs2.getString("IsCompleted").equals("true")) {
                        completedCount2++;
                    }
                    totalCount2++;
                }
                result=(completedCount2*100)/totalCount2;
                // System.err.println("result:"+result);

            }
            else if(completedCount==totalCount)
            {
                result=100;
            }
        }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    /**
     * This method is to retrieve projects
     * @param con Used to connect to the DB
     * @param uid Used to get projects of the particular user
     * @return returns a JSONArray contains all projects of the given user
     */
    public JSONArray retrieveProject(Connection con, int uid) {
        JSONArray jsArr = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from project_relation inner join projects on project_relation.pid = projects.pid where project_relation.uid ="+ uid);

            UpdateProject up = new UpdateProject();
            RetrieveUser ru = new RetrieveUser();
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                int pid = rs.getInt("pid");
                up.changeProjectStatus(con, pid);
                jsonObject.put("id", pid);
                jsonObject.put("projectName", rs.getString("pname"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("users", ru.getUserDetailByPid(con, pid));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectDesc", rs.getString("comment"));
                jsonObject.put("percentage", returnPercentage(con, pid, uid));
                jsonObject.put("status", rs.getString("status"));
                jsArr.add(jsonObject);
            }
            // System.out.println("projects = "+jsArr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }

    /*For retriving the pid from tid */
    public int retrievePidByTid(Connection con,int tid) {
        int result=0;
        try {
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select pid from tasks where tid="+tid);
            rs.next();
            result=rs.getInt("pid");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean isCompleted(Connection con, int pid, int uid) {
        boolean result = false;
        try {
            RetrieveTask rt = new RetrieveTask();
            ArrayList<Integer> tids = rt.retreiveTidByUid(con, uid, pid);
            int totalCount = 0;
            int completedCount = 0;
            for (int tid : tids) {
                if (rt.isCompleted(con, uid, tid)) {
                    completedCount++;
                }
                totalCount++;
            }
            if (totalCount>0) {
                if (totalCount==completedCount) {
                    result=true;
                }
            }
        } catch (Exception e) {
           e.printStackTrace();
        }

        return result;
    }
}
