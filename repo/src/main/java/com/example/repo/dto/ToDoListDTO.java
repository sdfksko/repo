package com.example.repo.dto;

import com.example.repo.entity.ToDoList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ToDoListDTO {
    private Long id;
    private int month;
    private int day;
    private String content;

    public ToDoList createToDoList(ToDoListDTO toDoListDTO) {
        return new ToDoList(id, month, day, content);
    }
}
