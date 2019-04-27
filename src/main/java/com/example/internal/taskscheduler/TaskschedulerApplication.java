package com.example.internal.taskscheduler;

import com.example.internal.taskscheduler.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaskschedulerApplication {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private OwnerRepository ownerRepository;

	@Autowired
	private UserRepository userRepository;

	private static final Logger logger = LoggerFactory.getLogger(TaskschedulerApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TaskschedulerApplication.class, args);
		logger.info("Hello Spring Boot");
	}

	@Bean
	CommandLineRunner runner(){
		return args -> {
			Owner owner1 = new Owner("Srinath" , "Tridandapani");
			Owner owner2 = new Owner("Raghu" , "Thridandapani");
			ownerRepository.save(owner1);
			ownerRepository.save(owner2);
			taskRepository.save(new Task("In Progress", "Build an in-house tracking system", owner1));
			taskRepository.save(new Task("Backlog", "Build an in-house mail client", owner1));
			taskRepository.save(new Task("In Progress", "Testing SSH setup so far", owner2));
			taskRepository.save(new Task("To Discuss", "What infrastructure we need", owner2));
			taskRepository.save(new Task("Backlog", "Build an in-house mail client", owner1));
			taskRepository.save(new Task("Triage", "Figure out SSH setup", owner2));

			// username: user password: user
			userRepository.save(new User("user",
					"$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi",
					"USER"));
			// username: admin password: admin
			userRepository.save(new User("admin",
					"$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG",
					"ADMIN"));

		};
	}

}
