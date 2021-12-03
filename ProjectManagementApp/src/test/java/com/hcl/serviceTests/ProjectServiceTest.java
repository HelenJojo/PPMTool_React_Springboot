package com.hcl.serviceTests;

import com.hcl.domain.Project;
import com.hcl.repositories.ProjectRepository;
import com.hcl.services.ProjectService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootTest
public class ProjectServiceTest {
    @Autowired
    private ProjectService projectService;

    @MockBean
    private ProjectRepository projectRepository;

    @Test
    public void testFindAllProjects() {
        String myUsername = "Test@mytest.com";
        Project myProject = new Project((long) 1, "My Project Name", "MOCK1", "My Project Description", myUsername);
        Project yourProject = new Project((long) 2, "Your Project Name", "MOCK2", "Your Project Description", myUsername);

        when(projectRepository.findAllByProjectLeader(myUsername)).thenReturn(Stream
                .of(myProject, yourProject).collect(Collectors.toList()));

        String herUsername = "Test@hertest.com";
        Project herProject = new Project((long) 3, "Her Project Name", "MOCK3", "Her Project Description", herUsername);
        Project hisProject = new Project((long) 4, "His Project Name", "MOCK4", "His Project Description", herUsername);

        when(projectRepository.findAllByProjectLeader(herUsername)).thenReturn(Stream
                .of(herProject, hisProject).collect(Collectors.toList()));

        Iterable<Project> myList = projectService.findAllProjects(myUsername);
        for (Project u : myList) {
            System.out.println(u.getProjectName());
        }

        Iterable<Project> herList = projectService.findAllProjects(herUsername);
        for (Project u : herList) {
            System.out.println(u.getProjectName());
        }
    }

    @Test
    public void testFindProjectByIdentifier() {
        //Arrange
        String myPID = "MOCK1";
        String yourPID = "JUNIT";
        String myUsername = "Test@mytest.com";
        String yourUsername = "Test@mytest.com";
        Project myProject = new Project((long) 1, "My Project Name", myPID, "My Project Description", myUsername);
        Project yourProject = new Project((long) 2, "Your Project Name", yourPID, "Your Project Description", yourUsername);

        //Act
        when(projectRepository.findByProjectIdentifier(myPID)).thenReturn(myProject);
        when(projectRepository.findByProjectIdentifier(yourPID)).thenReturn(yourProject);

        //Assert
        Assertions.assertEquals(projectService.findProjectByIdentifier(myPID, myUsername), myProject);
        Assertions.assertEquals(projectService.findProjectByIdentifier(yourPID, yourUsername), yourProject);
    }


}
