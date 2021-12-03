package com.hcl.serviceTests;

import com.hcl.domain.User;
import com.hcl.repositories.UserRepository;
import com.hcl.services.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.mockito.Mockito.when;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @MockBean
    private UserRepository userRepository;

    @Test
    public void testFindAllUsers() {

        User testUser = new User((long) 1, "Test@test.com", "Test User", "password");
        User userTested = new User((long) 2, "Tested@test.com", "User Tested", "password");
        User testingUser = new User((long) 3, "Testing@test.com", "Testing User", "no-password");

        when(userRepository.findAll()).thenReturn(Stream
                .of(testUser, userTested, testingUser).collect(Collectors.toList()));

        Iterable<User> list = userService.findAll();
        for (User u : list) {
            System.out.println(u.getUsername());
        }

        Assertions.assertEquals("Test@test.com", testUser.getUsername());
        Assertions.assertEquals("User Tested", userTested.getFullName());
        Assertions.assertEquals("no-password", testingUser.getPassword());

    }

    @Test
    public void testSaveUser() {
        //Arrange
        String password = "no-password";
        User testUser = new User((long) 1, "Test@test.com", "Test User", password);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        //Act
        when(userRepository.save(testUser)).thenReturn(testUser);

        User myUser = userService.saveUser(testUser);

        //Assert
        Assertions.assertEquals("Test@test.com", myUser.getUsername());
        //asserting that password that gets saved to User is the encoded one and it matches the original string
        boolean isPasswordMatch = passwordEncoder.matches(password, myUser.getPassword());
        Assertions.assertEquals(isPasswordMatch, true);
    }
}
