import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import UploadPage from "./pages/UploadPage";
import AnalyzePage from "./pages/AnalyzePage";
import ResultsPage from "./pages/ResultsPage";

function App() {

  // ✅ Clear old results on app load (new session)
  useEffect(() => {
    localStorage.removeItem("results");
  }, []);

  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
