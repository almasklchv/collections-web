import { Outlet, useNavigate } from "react-router-dom";
import styles from "./auth-layout.module.css";
import { useEffect } from "react";
import { useCheckQuery } from "../../api/auth";

const AuthLayout = () => {
  const { data } = useCheckQuery("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.authenticated) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
