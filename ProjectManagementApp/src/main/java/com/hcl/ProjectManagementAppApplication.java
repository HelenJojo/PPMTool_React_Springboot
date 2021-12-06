package com.hcl;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjectManagementAppApplication {
    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static Logger myLog = Logger.getLogger(ProjectManagementAppApplication.class.getName());

    public static void main(String[] args) {
        myLog.debug("Debug");
        myLog.info("Information");
        myLog.warn("Warning");
        SpringApplication.run(ProjectManagementAppApplication.class, args

        );
    }


}
