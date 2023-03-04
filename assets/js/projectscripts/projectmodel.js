let ProjectModel = (() => {

    let projectsArray = [];

    let Project = function(id, projectName, projectDesc, status, fromDate, toDate, users, createdBy, percentage){
        this.id = id;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.status = status;
        this.percentage = percentage;
        this.users = users;
        this.createdBy = createdBy;
    }
    let changeServerObject = function(serverObject){        
        return new Project(serverObject.id, serverObject.projectName, serverObject.projectDesc, serverObject.status, serverObject.fromDate, serverObject.toDate, serverObject.users, serverObject.createdBy, serverObject.percentage);
    }
    //This method will send data to server and push it to local projectArray
    let addProjectToServer = (projectName, projectDesc, fromDate, toDate, users) => {
        return new Promise(async (passes, rejected) => {
            let formData = new FormData();
            let tempCreated = USERID;
            let tempObj = {
                projectName : projectName,
                projectDesc : projectDesc,
                fromDate : fromDate,
                toDate : toDate,
                users : users,
                createdBy : tempCreated
            }
            formData.append("data", JSON.stringify(tempObj));
            let response = await sendPostRequest("/ProApp/project/add", formData);
            response.status = "Yet To Start";
            let project = changeServerObject(response);
            console.log(project);
            projectsArray.push(project);
            MainView.showSuccessMessage("project added succesfully");
            passes("success");
            sendMessage(JSON.stringify({
                messageType: "projectUpdate",
                projectId : project.id,
                userId : USERID,
                description :USERNAME+ " has Added you in Project"
            }));
        });
    }
    
    let getProjectsArray = () => projectsArray.slice();
    
    let getIndexOfProject = id => projectsArray.findIndex(elem => elem.id == id);
    
    let resetProject = () => projectsArray = [];
    
    let removeProject = id => projectsArray.splice(getIndexOfProject(id), 1);

    //This method split the object and give details to addProjectToServer.
    let addProject = (projectDetails, isNew) => {
        return new Promise(async (passed, rejected) => {
            if(isNew){
                await addProjectToServer(projectDetails.name, projectDetails.description, projectDetails.fromDate, projectDetails.toDate, projectDetails.people);
                passed("success");
            }
            else {
                projectsArray.push(projectDetails);
                passed("success");
            }
        });
    }

    let getDataById = id => projectsArray.find(elem => elem.id == id);
    
    let changeStatus = (status, id) => projectsArray[getIndexOfProject(id)].status = status;

    let getTotalCount = () => projectsArray.length;

    let getStatCount = constraint => projectsArray.filter(elem => elem.status == constraint).length;
    
    let getSectionName = () => "Projects";
    
    return {
        getProjectsArray : getProjectsArray,
        changeServerObject : changeServerObject,
        removeProject : removeProject,
        changeStatus : changeStatus,
        addProject : addProject,
        getIndexOfProject : getIndexOfProject,
        resetProject : resetProject,
        getSectionName : getSectionName,
        getTotalCount :  getTotalCount,
        getStatCount : getStatCount,
        getDataById : getDataById
    }
})();