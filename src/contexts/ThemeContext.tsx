// ThemeContext.js
import { PaletteMode } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";

const ThemeContext = createContext<{
  theme: PaletteMode;
  toggleTheme: () => void;
}>({
  theme: "light", // Provide a default theme
  toggleTheme: () => {}, // Provide a no-op function as the default
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
