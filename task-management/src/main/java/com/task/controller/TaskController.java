package com.task.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task.entities.Task;
import com.task.entities.User;
import com.task.repository.TaskRepository;
import com.task.repository.UserRepository;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TaskRepository taskRepository;

   

    
    @GetMapping
    public List<Task> getUserTasks(Principal principal) {
        User user = userRepo.findByUsername(principal.getName()).orElseThrow();
        return taskRepository.findByUser(user);
    }

    
    @PostMapping
    public Task addTask(@RequestBody Task task, Principal principal) {
        User user = userRepo.findByUsername(principal.getName()).orElseThrow();
        task.setUser(user);
        return taskRepository.save(task);
    }


    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable long id) {
        return taskRepository.findById((int) id).orElseThrow();
    }

  
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable long id, @RequestBody Task updatedTask, Principal principal) {
        Task existing = taskRepository.findById((int) id).orElseThrow();

      
        if (!existing.getUser().getUsername().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(existing);
    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id, Principal principal) {
        Task task = taskRepository.findById(id).orElseThrow();

        
        if (!task.getUser().getUsername().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.deleteById(id);
    }
}
