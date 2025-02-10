package com.example.repo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ToDoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int month;

    @Column
    private int day;

    @Column
    private String content;

    public void updateToDoList(ToDoList toDoList) {
        if(toDoList.getContent() != null) {
            this.content = toDoList.getContent();
        }
        if(toDoList.getMonth() != 0) {
            this.month = toDoList.getMonth();
        }
        if(toDoList.getDay() != 0) {
            this.day = toDoList.getDay();
        }
    }
}
