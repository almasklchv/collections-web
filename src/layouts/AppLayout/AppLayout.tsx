import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ME } from "../../consts";
import { useSignOutMutation } from "../../api/auth";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useTheme as useThemeContext } from "../../contexts/ThemeContext";

const AppLayout = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [signOut] = useSignOutMutation();

  const { theme: themeContext, toggleTheme } = useThemeContext();
  const { t, i18n } = useTranslation();

  const handleSignOut = () => {
    signOut(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/sign-in");
  };

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage =
      currentLanguage === "ru" ? "kk" : currentLanguage === "kk" ? "en" : "ru";
    i18n.changeLanguage(nextLanguage);
  };
  return (
    <>
      <div
        style={{ display: "flex", minHeight: "115vh", flexDirection: "column" }}
      >
        {!isMdUp && (
          <Box sx={{ marginTop: 4, marginLeft: 2, marginBottom: -3 }}>
            <Button onClick={toggleTheme}>
              {themeContext === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
            <Button onClick={toggleLanguage} startIcon={<LanguageIcon />}>
              {i18n.language.toUpperCase()}
            </Button>
          </Box>
        )}
        {isMdUp && <Sidebar />}
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        {!isMdUp && (
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
            }}
          >
            <BottomNavigationAction
              label={t("sidebar.home")}
              icon={<HomeIcon />}
              onClick={() => navigate("/")}
            />
            <BottomNavigationAction
              label={t("sidebar.myCollections")}
              icon={<FolderCopyIcon />}
              onClick={() => navigate("/collections/my")}
            />
            <BottomNavigationAction
              label={ME ? t("sidebar.signOut") : t("sidebar.signIn")}
              icon={<AccountCircleIcon />}
              onClick={() => {
                if (ME) {
                  handleSignOut();
                } else {
                  navigate("/auth/sign-in");
                }
              }}
            />
          </BottomNavigation>
        )}
      </div>
    </>
  );
};

export default AppLayout;
