import { useAppSelector } from "@/shared/hooks";
import { useState, useEffect } from "react";
import { AuthView } from "@/features/auth/types";

export const useAuthView = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [authView, setAuthView] = useState<AuthView>("login");

  useEffect(() => {
    if (user) {
      setAuthView("authenticated");
    } else {
      setAuthView("login");
    }
  }, [user]);

  return { authView, setAuthView };
};
