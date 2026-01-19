import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import api from "../api/api";

function UploadPage() {

  // ✅ Hooks MUST be inside component
  useEffect(() => {
    localStorage.removeItem("results");
  }, []);

  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await api.post("/upload", formData);
    setUploadedFiles([...uploadedFiles, file.name]);
    setFile(null);
  };

  return (
    <Box>
      <PageHeader
        title="Upload Resumes"
        subtitle="Upload candidate resumes (PDF or DOCX)"
      />

      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload Resume
          </Typography>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              disabled={!file}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded Resumes</Typography>
          <List>
            {uploadedFiles.map((name, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default UploadPage;
