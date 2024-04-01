import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material";
import { useSignOutMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const paths = ["/", "/collections/my", "/auth/sign-in"];
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

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

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage =
      currentLanguage === "ru" ? "kk" : currentLanguage === "kk" ? "en" : "ru";
    i18n.changeLanguage(nextLanguage);
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
          <ListItemText primary={t("sidebar.home")} />
        </ListItemButton>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[1]}
          onClick={(e) => handleListItemIndex(e, 1)}
        >
          <ListItemText primary={t("sidebar.myCollections")} />
        </ListItemButton>
        <ListItemButton onClick={(e) => handleListItemIndex(e, 2)}>
          {localStorage.getItem("token") && (
            <ListItemText
              primary={t("sidebar.signOut")}
              onClick={handleSignOut}
            />
          )}
          {!localStorage.getItem("token") && (
            <ListItemText
              primary={t("sidebar.signIn")}
              onClick={() => navigate("/auth/sign-in")}
            />
          )}
        </ListItemButton>
        <Box>
          <Button onClick={toggleTheme}>
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
          <Button onClick={toggleLanguage} startIcon={<LanguageIcon />}>
            {i18n.language.toUpperCase()}
          </Button>
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;
