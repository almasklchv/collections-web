import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const CollectionsLayout = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box
        sx={
          isMdUp
            ? { padding: 15, marginLeft: 31, paddingTop: 5 }
            : { maxWidth: '343px', marginLeft: 'auto', marginRight: 'auto', paddingTop: 5 }
        }
      >
        <Outlet />
      </Box>
    </>
  );
};

export default CollectionsLayout;
