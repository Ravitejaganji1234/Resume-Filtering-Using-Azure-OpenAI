package com.example.resume_ai_backend.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimilarityService {

    public double cosineSimilarity(List<Double> v1, List<Double> v2) {

        double dot = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < v1.size(); i++) {
            dot += v1.get(i) * v2.get(i);
            normA += Math.pow(v1.get(i), 2);
            normB += Math.pow(v2.get(i), 2);
        }

        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}

