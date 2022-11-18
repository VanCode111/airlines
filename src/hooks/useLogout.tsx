import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "store/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "store/authSlice";
import { useCallback } from "react";

export default function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth?.user);
  console.log(user);
  const [logout, { isLoading }] = useLogoutMutation();

  const onLogout = useCallback(async () => {
    try {
      await logout({ id: user.id }).unwrap();
      navigate("/");
      dispatch(removeCredentials(null));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return onLogout;
}
