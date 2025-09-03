package com.example.notesapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.notesapp.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    
    List<Note> findByTitleContainingIgnoreCase(String title);
    
    List<Note> findByContentContainingIgnoreCase(String content);
}
