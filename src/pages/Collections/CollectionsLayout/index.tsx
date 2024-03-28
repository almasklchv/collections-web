import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const CollectionsLayout = () => {
  return (
    <>
      <Sidebar />
      <Box sx={{ padding: 15, marginLeft: 31, paddingTop: 5 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default CollectionsLayout;
