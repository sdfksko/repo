package com.example.repo.restcontroller;

import com.example.repo.dto.ToDoListDTO;
import com.example.repo.entity.ToDoList;
import com.example.repo.service.MainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
public class MainRestController {
    @Autowired
    private MainService mainService;

    @GetMapping("/dayList")
    public ResponseEntity<List<Integer>> dayList(@RequestParam(defaultValue = "0", name = "newMonth") int newMonth) {
        List<Integer> list = new ArrayList<>();
        list = mainService.dayList(newMonth);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/toDoList")
    public ResponseEntity<List<ToDoList>> toDoList(@RequestParam(defaultValue = "0", name = "month") int month) {
        List<ToDoList> list = new ArrayList<>();
        list = mainService.toDoList(month);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/toDoList/add")
    public ResponseEntity<String> toDoListAdd(@RequestBody ToDoListDTO toDoListDTO) {
        ToDoList toDoList = mainService.createToDoList(toDoListDTO);
        return ResponseEntity.ok("등록에 성공하였습니다.");
    }

    @PostMapping("/toDoList/del")
    public ResponseEntity<String> toDoListDel(@RequestBody ToDoListDTO toDoListDTO) {
        List<ToDoList> toDoList = mainService.deleteToDoList(toDoListDTO.getMonth(), toDoListDTO.getDay());
        if(toDoList.isEmpty()) {
            return ResponseEntity.ok("일정이 존재하지 않습니다");
        }
        return ResponseEntity.ok("삭제에 성공하였습니다.");
    }

    @GetMapping("/editDayList")
    public ResponseEntity<List<Integer>> editDayList(@RequestParam(defaultValue = "0", name = "month") int month, @RequestParam(defaultValue = "0", name = "day") int day) {
        List<Integer> list = new ArrayList<>();
        list = mainService.editDayList(month, day);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/editToDoList")
    public ResponseEntity<String> editToDoList(@RequestBody ToDoListDTO toDoListDTO) {
        ToDoList toDoList = mainService.editToDoList(toDoListDTO);
        return ResponseEntity.ok("수정에 성공하였습니다.");
    }
}
