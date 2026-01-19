import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import api from "../api/api";

function AnalyzePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setLoading(true);
    const response = await api.post("/analyze", { jobDescription });
    localStorage.setItem("results", JSON.stringify(response.data));
    setLoading(false);
    navigate("/results");
  };

  return (
    <Box>
      <PageHeader
        title="Job Description"
        subtitle="Paste the job description to find the best resumes"
      />

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Looking for a DevOps engineer with Linux, CI/CD, Azure..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button
              variant="contained"
              disabled={!jobDescription || loading}
              onClick={handleAnalyze}
            >
              {loading ? "Analyzing..." : "Analyze Resumes"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AnalyzePage;
