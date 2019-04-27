package com.example.internal.taskscheduler.web;

import com.example.internal.taskscheduler.domain.Task;
import com.example.internal.taskscheduler.domain.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping("/tasks")
    public Iterable<Task> getTasks() {
        return taskRepository.findAll();
    }
}
