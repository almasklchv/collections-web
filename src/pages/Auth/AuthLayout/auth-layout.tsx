import { Outlet } from "react-router-dom";
import styles from './auth-layout.module.css'

const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
