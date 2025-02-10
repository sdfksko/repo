package com.example.repo.service;

import com.example.repo.dto.ToDoListDTO;
import com.example.repo.entity.ToDoList;
import com.example.repo.repository.ToDoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
public class MainService {
    @Autowired
    private ToDoListRepository toDoListRepository;

    public List<Integer> dayList(int newMonth) {
        List<Integer> list = new ArrayList<>();
        int year = LocalDateTime.now().getYear();
        int month = 0;
        if(newMonth == 0) {
            month = LocalDateTime.now().getMonthValue();
        } else {
            month = newMonth;
        }
        int lastDay = YearMonth.of(year, month).lengthOfMonth();
        int firstDay = LocalDate.of(year, month, 1).getDayOfWeek().getValue();
        int day = LocalDateTime.now().getDayOfMonth();
        list.add(year);
        list.add(month);
        list.add(lastDay);
        list.add(firstDay);
        list.add(day);
        return list;
    }

    public List<ToDoList> toDoList(int month) {
        return toDoListRepository.findAllByQueryMonth(month);
    }

    public ToDoList createToDoList(ToDoListDTO toDoListDTO) {
        ToDoList toDoList = toDoListDTO.createToDoList(toDoListDTO);
        toDoListRepository.save(toDoList);
        return toDoList;
    }


    public List<ToDoList> deleteToDoList(int month, int day) {
        List<ToDoList> list = toDoListRepository.findAllByQuery(month, day);
        toDoListRepository.deleteAll(list);
        return list;
    }

    public List<Integer> editDayList(int month, int day) {
        List<Integer> list = new ArrayList<>();
        int year = LocalDateTime.now().getYear();
        int lastDay = YearMonth.of(year, month).lengthOfMonth();
        int firstDay = LocalDate.of(year, month, day).getDayOfWeek().getValue();
        list.add(year);
        list.add(lastDay);
        list.add(firstDay);
        return list;
    }

    public ToDoList editToDoList(ToDoListDTO toDoListDTO) {
        ToDoList target = toDoListDTO.createToDoList(toDoListDTO);
        ToDoList toDoList = toDoListRepository.findById(toDoListDTO.getId()).orElse(null);
        toDoList.updateToDoList(target);
        toDoListRepository.save(toDoList);
        return toDoList;
    }
}
