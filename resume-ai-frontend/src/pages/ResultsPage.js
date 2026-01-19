import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function ResultsPage() {
  const navigate = useNavigate();

  // ✅ Read results ONLY from previous analysis
  const results =
    JSON.parse(localStorage.getItem("results")) || [];

  if (results.length === 0) {
    return (
      <Box>
        <PageHeader
          title="No Results Available"
          subtitle="Please upload resumes and analyze a job description"
        />
        <Button
          variant="contained"
          onClick={() => navigate("/")}
        >
          Start New Analysis
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="AI Resume Shortlist"
        subtitle={`Showing top ${results.length} AI-recommended resumes`}
      />

      {results.map((res, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">
              {res.fileName}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Chip
                label={res.recommendation}
                color={
                  res.recommendation === "STRONG_MATCH"
                    ? "success"
                    : res.recommendation === "PARTIAL_MATCH"
                    ? "warning"
                    : "default"
                }
                sx={{ mr: 1 }}
              />
              <Chip label={`Match Score: ${res.score}%`} />
            </Box>

            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Why this resume was shortlisted
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography whiteSpace="pre-line">
                  {res.explanation}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {res.recommendation !== "STRONG_MATCH" && (
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color="warning.main">
                    What can be improved to become a strong match?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography whiteSpace="pre-line">
                    {res.improvementSuggestions}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        </Card>
      ))}

      <Button onClick={() => navigate("/analyze")}>
        Analyze Again
      </Button>
    </Box>
  );
}

export default ResultsPage;
