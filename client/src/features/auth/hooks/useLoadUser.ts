import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { useEffect } from "react";
import { loadUser } from "@/features/auth/thunks/loadUser";

export const useLoadUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadUser());
    }
  }, []);
};
