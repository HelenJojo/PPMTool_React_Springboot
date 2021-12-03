package com.hcl.controllerTests;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.context.annotation.Configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcl.domain.Project;
import com.hcl.domain.User;
import com.hcl.repositories.UserRepository;
import com.hcl.services.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ProjectControllerTest {
    ObjectMapper mapper;
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    ProjectService projectService;

    public ProjectControllerTest() {
    }

    @BeforeEach
    public void contextLoads() {
        userRepository.save(new User(1l, "john_doe@gmail.com", "John Doe", "password"));
        userRepository.save(new User(2l, "jane_doe@gmail.com", "Jane Doe", "password"));

        mapper = new ObjectMapper();
    }

    @Test
    public void testGetAllProjects() throws Exception {
        ArrayList<Project> arr = new ArrayList<>();
        Project myProject = new Project((long) 1, "no-name", "TSTP", "Blah", "john_doe@gmail.com");
        Project yourProject = new Project((long) 1, "name", "TSTP1", "Blah blah", "john_doe@gmail.com");

        arr.add(myProject);
        arr.add(yourProject);

        when(projectService.findAllProjects("john_doe@gmail.com")).thenReturn(arr);

        mockMvc.perform(get("/api/project/all")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer "))
                .andExpect(jsonPath("$.username").value("Invalid Username"))
                .andExpect(jsonPath("$.password").value("Invalid Password"));
    }
}
