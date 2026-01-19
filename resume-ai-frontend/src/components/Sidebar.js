import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: "Upload Resumes", icon: <UploadFileIcon />, path: "/" },
    { text: "Analyze Job", icon: <DescriptionIcon />, path: "/analyze" },
    { text: "Results", icon: <AssessmentIcon />, path: "/results" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          mt: "64px",
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
