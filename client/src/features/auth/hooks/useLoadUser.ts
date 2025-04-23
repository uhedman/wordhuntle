import { useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";
import { loadUser } from "@/features/auth/slices/userSlice";

export const useLoadUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
};
