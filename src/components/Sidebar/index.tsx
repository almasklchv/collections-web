import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material";
import { useSignOutMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Sidebar = () => {
  const paths = ["/", "/collections/my", "/auth/sign-in"];
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleListItemIndex = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    navigate(paths[index]);
  };

  const handleSignOut = () => {
    signOut(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Box
      sx={{ position: "absolute" }}
      width={"100%"}
      maxWidth={"300px"}
      height={"100vh"}
    >
      <List component={"nav"} sx={{ bgcolor: "background.paper" }}>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[0]}
          onClick={(e) => handleListItemIndex(e, 0)}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[1]}
          onClick={(e) => handleListItemIndex(e, 1)}
        >
          <ListItemText primary="My collections" />
        </ListItemButton>
        <ListItemButton onClick={(e) => handleListItemIndex(e, 2)}>
          {localStorage.getItem("token") && (
            <ListItemText primary="Sign Out" onClick={handleSignOut} />
          )}
          {!localStorage.getItem("token") && (
            <ListItemText
              primary="Sign In"
              onClick={() => navigate("/auth/sign-in")}
            />
          )}
        </ListItemButton>
        {theme === "light" ? (
          <Button onClick={toggleTheme}>
            <DarkModeIcon />
          </Button>
        ) : (
          <Button onClick={toggleTheme}>
            <LightModeIcon />
          </Button>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
