import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { BASE_URL } from "./consts";
import io from "socket.io-client";

export const socket = io(BASE_URL);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <MyApp />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);

function MyApp() {
  const { theme } = useTheme();
  const appliedTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <MUIThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MUIThemeProvider>
  );
}
