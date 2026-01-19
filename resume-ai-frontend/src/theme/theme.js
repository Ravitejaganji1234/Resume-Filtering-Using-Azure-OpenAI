import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // enterprise green
    },
    secondary: {
      main: "#81c784",
    },
    background: {
      default: "#f4f7f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
