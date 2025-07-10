package com.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.entities.Task;
import com.task.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepository;
	
	public List<Task> getAllTask(){
		return taskRepository.findAll();
	}
	
	public Task createTask(Task task) {
		return taskRepository.save(task);
	}
	
	public void deleteTask(int id) {
	 taskRepository.deleteById(id);
	}
	
	public Task updateTask(long id,Task taskDetails) {
		Task task=taskRepository.findById((int) id).orElseThrow();
		task.setTitle(taskDetails.getTitle());
		task.setDescription(taskDetails.getDescription());
		task.setCompleted(taskDetails.isCompleted());
		
		return taskRepository.save(task);
	}
	
	

}
