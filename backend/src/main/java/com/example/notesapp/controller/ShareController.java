package com.example.notesapp.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.notesapp.model.Note;
import com.example.notesapp.model.ShareNote;
import com.example.notesapp.repository.NoteRepository;
import com.example.notesapp.repository.ShareNoteRepository;

@RestController
@RequestMapping("/api/share")
@CrossOrigin(origins = "${frontend.url:http://localhost:3000}")
public class ShareController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private ShareNoteRepository shareNoteRepository;

    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @PostMapping("/{noteId}")
    public ResponseEntity<Map<String, String>> createShareLink(@PathVariable("noteId") Long noteId) {
        try {
            Optional<Note> noteData = noteRepository.findById(noteId);
            
            if (!noteData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
            Note note = noteData.get();
            
            Optional<ShareNote> existingShare = shareNoteRepository.findByNoteIdAndIsActiveTrue(noteId);
            if (existingShare.isPresent()) {
                ShareNote share = existingShare.get();
                if (!share.isExpired()) {
                    Map<String, String> response = new HashMap<>();
                    response.put("shareToken", share.getShareToken());
                    response.put("shareUrl", frontendUrl + "/shared/" + share.getShareToken());
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    share.setIsActive(false);
                    shareNoteRepository.save(share);
                }
            }
            
            ShareNote shareNote = new ShareNote(note);
            ShareNote savedShare = shareNoteRepository.save(shareNote);
            
            Map<String, String> response = new HashMap<>();
            response.put("shareToken", savedShare.getShareToken());
            response.put("shareUrl", frontendUrl + "/shared/" + savedShare.getShareToken());
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{shareToken}")
    public ResponseEntity<Note> getSharedNote(@PathVariable("shareToken") String shareToken) {
        try {
            Optional<ShareNote> shareData = shareNoteRepository.findByShareTokenAndIsActiveTrue(shareToken);
            
            if (!shareData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
            ShareNote share = shareData.get();
            
            if (share.isExpired()) {
                share.setIsActive(false);
                shareNoteRepository.save(share);
                return new ResponseEntity<>(HttpStatus.GONE);
            }
            
            return new ResponseEntity<>(share.getNote(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{noteId}")
    public ResponseEntity<HttpStatus> revokeShareLink(@PathVariable("noteId") Long noteId) {
        try {
            Optional<ShareNote> shareData = shareNoteRepository.findByNoteIdAndIsActiveTrue(noteId);
            
            if (shareData.isPresent()) {
                ShareNote share = shareData.get();
                share.setIsActive(false);
                shareNoteRepository.save(share);
            }
            
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
