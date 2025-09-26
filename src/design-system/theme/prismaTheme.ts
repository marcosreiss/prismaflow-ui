// src/design-system/theme/prismaTheme.ts
import { createTheme, type Theme } from "@mui/material/styles";

export const prismaTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4BA3F2", contrastText: "#0B1220" },
    secondary: { main: "#8B5CF6", contrastText: "#ffffff" },
    success: { main: "#34D399" },
    text: { primary: "#1F2937", secondary: "rgba(31,41,55,0.7)" },
    background: { default: "#F5F5F5", paper: "#ffffff" },
    divider: "rgba(31,41,55,0.12)",
    gradient: {
      prism: "linear-gradient(90deg, #4BA3F2 0%, #8B5CF6 50%, #34D399 100%)",
      prismHover:
        "linear-gradient(90deg, #5BB0F4 0%, #9B6CFA 50%, #47D9A6 100%)",
    },
  },
  shape: { borderRadius: 4 },
  shadows: [
    "none",
    "0 8px 24px rgba(0,0,0,0.06)",
    "0 10px 30px rgba(0,0,0,0.08)",
    ...Array(22).fill("0 10px 30px rgba(0,0,0,0.08)"),
  ] as Theme["shadows"],
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontFamily: "Poppins, Inter, sans-serif", fontWeight: 600 },
    h2: { fontFamily: "Poppins, Inter, sans-serif", fontWeight: 600 },
    h3: { fontFamily: "Poppins, Inter, sans-serif", fontWeight: 600 },
    hero: {
      fontFamily: "Poppins, Inter, sans-serif",
      fontWeight: 600,
      fontSize: "clamp(28px, 4vw, 38px)",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "radial-gradient(1000px 800px at 10% -20%, rgba(75,163,242,0.12) 0%, rgba(0,0,0,0) 60%), radial-gradient(900px 700px at 100% 0%, rgba(139,92,246,0.12) 0%, rgba(0,0,0,0) 60%)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, paddingInline: 16, paddingBlock: 10 },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: { boxShadow: "0 8px 24px rgba(75,163,242,0.3)" },
        },
        {
          props: { variant: "outlined" },
          style: { borderWidth: 2 },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 8, border: "1px solid rgba(31,41,55,0.08)" },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
  },
});
