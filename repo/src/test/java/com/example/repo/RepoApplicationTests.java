package com.example.repo;

import com.example.repo.dto.ToDoListDTO;
import com.example.repo.entity.ToDoList;
import com.example.repo.service.MainService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class RepoApplicationTests {

	@Autowired
	private MainService mainService;

	@Test
	void index() {
		ToDoList a = new ToDoList(3L, 3, 6, "친구와 약속");
		ToDoList b = new ToDoList(4L, 3, 18, "집안 청소");
		List<ToDoList> targetList = new ArrayList<>(Arrays.asList(a, b));
		List<ToDoList> list = mainService.toDoList(3);
		assertEquals(targetList.toString(), list.toString()); // assertEquals(예상값, 실제값);
		assertEquals(targetList.size(), list.size()); // assertEquals(예상값, 실제값);
	}

	@Test
	void add() {
		int month = 3;
		int day = 20;
		String content = "책상 고치기";
		ToDoListDTO toDoListDTO = new ToDoListDTO(null, month, day, content);
		ToDoList toDo = new ToDoList(21L, month, day, content);
		ToDoList toDoList = mainService.createToDoList(toDoListDTO);
		assertEquals(toDo.toString(), toDoList.toString()); // assertEquals(예상값, 실제값);
	}

	@Test
	void update() {
		Long id = 2L;
		int month = 2;
		int day = 25;
		String content = "영화 감상";
		ToDoListDTO toDoListDTO = new ToDoListDTO(id, month, day, content);
		ToDoList toDoList = new ToDoList(id, month, day, content);
		ToDoList toDo = mainService.editToDoList(toDoListDTO);
		assertEquals(toDoList.toString(), toDo.toString()); // assertEquals(예상값, 실제값);
	}

	@Test
	void delete() {
		int month = 3;
		int day = 20;
		ToDoList a = new ToDoList(15L, 3, 20, "책상 고치기");
		ToDoList b = new ToDoList(21L, 3, 20, "책상 고치기");
		List<ToDoList> target = new ArrayList<>(Arrays.asList(a, b));
		List<ToDoList> list = mainService.deleteToDoList(month, day);
		assertEquals(target.toString(), list.toString()); // assertEquals(예상값, 실제값);
	}

}
