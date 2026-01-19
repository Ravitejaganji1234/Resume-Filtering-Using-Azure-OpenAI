import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import axios from "axios";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(
      "http://localhost:8000/api/resumes/upload",
      formData
    );

    alert("Resume uploaded successfully!");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Resume Upload
      </Typography>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload Resume
      </Button>
    </Container>
  );
}

export default ResumeUpload;
