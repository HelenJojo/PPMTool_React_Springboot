package com.hcl.serviceTests;

import com.hcl.domain.Backlog;
import com.hcl.domain.Project;
import com.hcl.domain.ProjectTask;
import com.hcl.repositories.ProjectRepository;
import com.hcl.repositories.ProjectTaskRepository;
import static org.mockito.Mockito.when;
import com.hcl.services.ProjectTaskService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class ProjectTaskServiceTest {
    @Autowired
    private ProjectTaskService projectTaskService;

    @MockBean
    private ProjectTaskRepository projectTaskRepository;

    @MockBean
    private ProjectRepository projectRepository;

    @Test
    public void testaddProjectTask() {
        /* Arrange */
        //Just some data to fill the Project Task with
        String pID = "TSTP1";
        String pSequence = "TSTP1-1";
        String ptSummary = "Great summary!";
        long id = 1;

        //Set up the Project Task
        ProjectTask myPT = new ProjectTask();
        myPT.setProjectIdentifier(pID);
        myPT.setProjectSequence(pSequence);
        myPT.setId(id);
        myPT.setSummary(ptSummary);

        String myPID = "TSTP1";
        String myUsername = "Test@mytest.com";
        Project myProject = new Project((long) 1, "My Project Name", myPID, "My Project Description", myUsername);
        Backlog myBacklog = new Backlog();
        myBacklog.setPTSequence(1);
        myProject.setBacklog(myBacklog); //very important!!!!

        /* Act */
        when(projectRepository.findByProjectIdentifier(myPID)).thenReturn(myProject);
        when(projectTaskRepository.save(myPT)).thenReturn(myPT);

        /* Assert */
        ProjectTask ptFromService = projectTaskService.addProjectTask(pID, myPT, myUsername);
        Assertions.assertEquals(ptFromService, myPT);

    }

} //end of ProjectTaskServiceTest.java
