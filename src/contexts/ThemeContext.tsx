
// This file is kept but simplified to just provide a stub since it's referenced in other files
import { createContext, useContext, ReactNode } from "react";

interface ThemeContextType {
  theme: "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Simplified provider that only returns light theme
  const theme = "light";
  const toggleTheme = () => {
    // No-op function
    console.log("Dark mode has been disabled");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
