package com.example.resume_ai_backend.service;

import com.example.resume_ai_backend.model.RecommendationLevel;
import com.example.resume_ai_backend.model.ResumeEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ResumeMatchingService {

    private final EmbeddingService embeddingService;
    private final SimilarityService similarityService;
    private final ResumePersistenceService resumePersistenceService;
    private final ExplanationService explanationService;

    public ResumeMatchingService(
            EmbeddingService embeddingService,
            SimilarityService similarityService,
            ResumePersistenceService resumePersistenceService,
            ExplanationService explanationService) {

        this.embeddingService = embeddingService;
        this.similarityService = similarityService;
        this.resumePersistenceService = resumePersistenceService;
        this.explanationService = explanationService;
    }

    public List<Map<String, Object>> matchResumes(String jobDescription) {

        // 1️⃣ Create embedding for Job Description
        List<Double> jdEmbedding =
                embeddingService.getEmbedding(jobDescription);

        List<Map<String, Object>> tempResults = new ArrayList<>();

        // 2️⃣ Loop through resumes from DB
        List<ResumeEntity> resumes =
                resumePersistenceService.getAllResumes();

        for (ResumeEntity resume : resumes) {

            List<Double> resumeEmbedding =
                    embeddingService.getEmbedding(resume.getExtractedText());

            // Raw cosine similarity (0–1)
            double rawScore =
                    similarityService.cosineSimilarity(jdEmbedding, resumeEmbedding);

            // ✅ Convert ONCE to percentage (0–100)
            double percentageScore = Math.round(rawScore * 100);

            RecommendationLevel level =
                    getRecommendationLevel(percentageScore);

            tempResults.add(Map.of(
                    "fileName", resume.getFileName(),
                    "score", percentageScore,   // <-- already percentage
                    "recommendation", level,
                    "resumeText", resume.getExtractedText()
            ));
        }

        // 3️⃣ Sort by percentage score DESC
        tempResults.sort((a, b) ->
                Double.compare(
                        (double) b.get("score"),
                        (double) a.get("score")
                )
        );

        // 4️⃣ Generate explanation & improvements for TOP 2 only
        List<Map<String, Object>> finalResults = new ArrayList<>();

        tempResults.stream()
                .limit(2)
                .forEach(r -> {

                    String explanation =
                            explanationService.generateExplanation(
                                    jobDescription,
                                    r.get("resumeText").toString()
                            );

                    String improvements =
                            explanationService.generateImprovementSuggestions(
                                    jobDescription,
                                    r.get("resumeText").toString()
                            );

                    finalResults.add(Map.of(
                            "fileName", r.get("fileName"),
                            "score", r.get("score"),
                            "recommendation", r.get("recommendation"),
                            "explanation", explanation,
                            "improvementSuggestions", improvements
                    ));
                });

        return finalResults;
    }

    // =========================
    // Recommendation Thresholds (PERCENTAGE BASED)
    // =========================
    private RecommendationLevel getRecommendationLevel(double score) {
        if (score >= 65) {
            return RecommendationLevel.STRONG_MATCH;
        } else if (score >= 45) {
            return RecommendationLevel.PARTIAL_MATCH;
        } else {
            return RecommendationLevel.WEAK_MATCH;
        }
    }
}
