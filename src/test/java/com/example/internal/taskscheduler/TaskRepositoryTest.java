package com.example.internal.taskscheduler;

import static org.assertj.core.api.Assertions.*;

import com.example.internal.taskscheduler.domain.Task;
import com.example.internal.taskscheduler.domain.TaskRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TaskRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void testSaveCar(){
        Task car = new Task("In Progress", "First task", null);
        testEntityManager.persistAndFlush(car);
        assertThat(car.getId()).isNotNull();
    }

    @Test
    public void testDeleteCars() {
        Task entity = new Task("In Progress", "Some task", null);
        testEntityManager.persistAndFlush(entity);

        Task entity1 = new Task("back", "Could not implement this task", null);
        testEntityManager.persistAndFlush(entity1);

        /*carRepository.deleteAll();
        assertThat(carRepository.findAll()).isEmpty();*/

        taskRepository.delete(entity);
        assertThat(taskRepository.findByStatus("back").get(0)).isEqualTo(entity1);
    }
}
