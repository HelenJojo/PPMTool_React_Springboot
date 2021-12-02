package com.hcl;

import com.hcl.domain.User;
import com.hcl.repositories.UserRepository;
import com.hcl.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootTest
public class ProjectManagementAppApplicationTests {

	@Autowired
	private UserService userServiceTest;
	@MockBean
	private UserRepository userRepositoryTest;

	@Test
	public void findAllUserTest(){
		long userTestId = 1;
		User testUser = new User();
		testUser.setId(userTestId);
		testUser.setUsername("Test@test.com");
		testUser.setFullName("Test User");
		testUser.setPassword("password");
		when(userRepositoryTest.findAll()).thenReturn(Stream
				.of(testUser).collect(Collectors.toList()));
		Iterable<User> list=userServiceTest.findAll();
		for (User u:list) {
			System.out.println(u.getUsername());
		}

	}
}
