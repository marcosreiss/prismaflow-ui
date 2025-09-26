// src/design-system/utils/gradients.ts
import { useTheme } from "@mui/material/styles";

export const usePrismGradient = () => {
  const theme = useTheme() as any;
  return {
    prism: theme.palette.gradient.prism,
    prismHover: theme.palette.gradient.prismHover,
  } as { prism: string; prismHover: string };
};
