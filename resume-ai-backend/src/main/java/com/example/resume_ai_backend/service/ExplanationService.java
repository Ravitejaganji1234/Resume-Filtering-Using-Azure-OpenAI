package com.example.resume_ai_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.Map;

@Service
public class ExplanationService {

    @Value("${azure.openai.endpoint}")
    private String endpoint;

    @Value("${azure.openai.api-key}")
    private String apiKey;

    @Value("${azure.openai.chat-deployment}")
    private String deployment;

    @Value("${azure.openai.chat-api-version}")
    private String apiVersion;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public String generateExplanation(String jobDescription, String resumeText) {

        String url = endpoint +
                "/openai/deployments/" + deployment +
                "/chat/completions?api-version=" + apiVersion;

        String prompt = """
        You are an HR assistant.
        Explain why the following resume matches the given job description.
        Give 3–5 concise bullet points.
        Be factual and only use information from the resume.

        Job Description:
        %s

        Resume:
        %s
        """.formatted(jobDescription, resumeText);

        Map<String, Object> requestBody = Map.of(
                "messages", List.of(
                        Map.of("role", "system", "content", "You are a professional HR assistant."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.2,
                "max_tokens", 250
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        Map<String, Object> response =
                restTemplate.postForObject(url, entity, Map.class);

        List<Map<String, Object>> choices =
                (List<Map<String, Object>>) response.get("choices");

        Map<String, Object> message =
                (Map<String, Object>) choices.get(0).get("message");

        return message.get("content").toString();
    }
    public String generateImprovementSuggestions(
            String jobDescription,
            String resumeText) {

        String url = endpoint +
                "/openai/deployments/" + deployment +
                "/chat/completions?api-version=" + apiVersion;

        String prompt = """
    You are an HR assistant.
    Based on the job description and the resume, list 3–5 areas
    where the candidate could improve to become a strong match.
    Be constructive, factual, and avoid criticism.
    Use bullet points.

    Job Description:
    %s

    Resume:
    %s
    """.formatted(jobDescription, resumeText);

        Map<String, Object> requestBody = Map.of(
                "messages", List.of(
                        Map.of("role", "system", "content", "You are a professional HR assistant."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.3,
                "max_tokens", 200
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        Map<String, Object> response =
                restTemplate.postForObject(url, entity, Map.class);

        List<Map<String, Object>> choices =
                (List<Map<String, Object>>) response.get("choices");

        Map<String, Object> message =
                (Map<String, Object>) choices.get(0).get("message");

        return message.get("content").toString();
    }

}

