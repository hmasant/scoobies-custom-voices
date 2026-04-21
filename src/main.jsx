import { App } from "./App";
import { createRoot } from "react-dom/client";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { paper: "#1a2847", default: "#0f172a" },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { background: "#0A043C" } } },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
