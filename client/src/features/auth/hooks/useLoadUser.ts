import { useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";
import { loadUser } from "@/features/auth/thunks/loadUser";

export const useLoadUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
};
