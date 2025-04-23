import { useEffect } from "react";
import { useAppSelector } from "@/shared/hooks";

export const useTheme = () => {
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);
};
