import { Box, CircularProgress, Typography } from "@mui/material";

function Loader({ message }) {
  return (
    <Box
      sx={{
        mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
      <Typography sx={{ mt: 2 }}>
        {message || "Processing..."}
      </Typography>
    </Box>
  );
}

export default Loader;
