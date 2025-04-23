import { useAppSelector } from "@/shared/hooks";
import { useEffect } from "react";

export const useTheme = () => {
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);
};
