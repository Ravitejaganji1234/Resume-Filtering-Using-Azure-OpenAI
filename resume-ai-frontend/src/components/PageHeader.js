import { Box, Typography } from "@mui/material";

function PageHeader({ title, subtitle }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Typography color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;
