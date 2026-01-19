import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function Navbar() {
  return (
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        <BusinessCenterIcon sx={{ mr: 1 }} />
        <Typography variant="h6">
          AI Resume Screener
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2">
          Azure OpenAI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
