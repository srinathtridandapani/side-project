package com.example.internal.taskscheduler.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    // Fetch cars by brand using SQL
    @Query(value = "select c from Task c where c.status = ?1")
    List<Task> findByStatus(@Param("status") String status);
}
