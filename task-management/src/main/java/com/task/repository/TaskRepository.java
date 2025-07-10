package com.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.task.entities.Task;
import com.task.entities.User;
@Repository
public interface TaskRepository extends JpaRepository<Task,Integer>{
	List<Task> findByUser(User user);
	

}
