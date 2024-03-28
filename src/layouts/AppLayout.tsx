import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
