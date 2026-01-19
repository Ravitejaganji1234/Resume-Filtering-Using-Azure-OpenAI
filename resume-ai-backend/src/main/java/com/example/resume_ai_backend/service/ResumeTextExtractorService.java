package com.example.resume_ai_backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;


import java.io.InputStream;

@Service
public class ResumeTextExtractorService {

    public String extractText(MultipartFile file) {

        String fileName = file.getOriginalFilename().toLowerCase();

        try {
            if (fileName.endsWith(".pdf")) {
                return extractFromPdf(file.getInputStream());
            }
            else if (fileName.endsWith(".docx")) {
                return extractFromDocx(file.getInputStream());
            }
            else {
                throw new RuntimeException("Unsupported file format");
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract resume text", e);
        }
    }

    private String extractFromPdf(InputStream inputStream) throws Exception {
        PDDocument document = PDDocument.load(inputStream);
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(document);
        document.close();
        return text;
    }

    private String extractFromDocx(InputStream inputStream) throws Exception {
        XWPFDocument document = new XWPFDocument(inputStream);
        XWPFWordExtractor extractor = new XWPFWordExtractor(document);
        String text = extractor.getText();
        extractor.close();
        document.close();
        return text;
    }

}

