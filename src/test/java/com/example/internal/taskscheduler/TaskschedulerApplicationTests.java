package com.example.internal.taskscheduler;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.internal.taskscheduler.web.TaskController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskschedulerApplicationTests {

	@Autowired
	private TaskController controller;

	@Test
	public void contextLoads() {
		assertThat(controller).isNotNull();
	}

}
