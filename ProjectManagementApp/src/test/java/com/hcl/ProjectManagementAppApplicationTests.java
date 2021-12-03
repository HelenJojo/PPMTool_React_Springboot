package com.hcl;

import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.runner.RunWith;

@RunWith(JUnitPlatform.class)
@SelectPackages({"com.hcl.serviceTests", "com.hcl.controllerTests"})
public class ProjectManagementAppApplicationTests {

}
