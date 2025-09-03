package com.example.notesapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.notesapp.model.ShareNote;

@Repository
public interface ShareNoteRepository extends JpaRepository<ShareNote, Long> {
    
    Optional<ShareNote> findByShareTokenAndIsActiveTrue(String shareToken);
    
    Optional<ShareNote> findByNoteIdAndIsActiveTrue(Long noteId);
}
