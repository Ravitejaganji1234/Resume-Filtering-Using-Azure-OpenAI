package com.example.resume_ai_backend.service;

import com.example.resume_ai_backend.model.ResumeEntity;
import com.example.resume_ai_backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumePersistenceService {

    private final ResumeRepository repository;

    public ResumePersistenceService(ResumeRepository repository) {
        this.repository = repository;
    }

    /**
     * OPTION 2 LOGIC:
     * - If resume with same fileName exists → UPDATE it
     * - Else → INSERT new record
     */
    public void saveResume(String fileName, String blobUrl, String extractedText) {

        repository.findByFileName(fileName)
                .ifPresentOrElse(
                        existing -> {
                            // 🔁 Update existing resume
                            existing.setBlobUrl(blobUrl);
                            existing.setExtractedText(extractedText);
                            repository.save(existing);
                        },
                        () -> {
                            // ➕ Insert new resume
                            repository.save(
                                    new ResumeEntity(fileName, blobUrl, extractedText)
                            );
                        }
                );
    }

    public List<ResumeEntity> getAllResumes() {
        return repository.findAll();
    }
}
