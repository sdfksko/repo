package com.example.repo.repository;

import com.example.repo.entity.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {
    @NativeQuery("SELECT * From to_do_list WHERE month = :month")
    List<ToDoList> findAllByQueryMonth(@Param("month") int month);

    @NativeQuery("SELECT * From to_do_list WHERE month = :month AND day = :day")
    List<ToDoList> findAllByQuery(@Param("month") int month, @Param("day") int day);
}
