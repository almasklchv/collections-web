import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useSignOutMutation } from "../../api/auth";

const Sidebar = () => {
  const paths = ["/", "/collections/my", "/auth/sign-in"];
  const [signOut] = useSignOutMutation();

  const handleListItemIndex = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    window.location.href = paths[index];
  };

  const handleSignOut = () => {
    signOut(null);
    localStorage.removeItem("token");
  };

  return (
    <Box
      sx={{ position: "absolute" }}
      width={"100%"}
      maxWidth={"300px"}
      height={"100vh"}
    >
      <List component={"nav"} sx={{ bgcolor: "background.paper" }}>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[0]}
          onClick={(e) => handleListItemIndex(e, 0)}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[1]}
          onClick={(e) => handleListItemIndex(e, 1)}
        >
          <ListItemText primary="My collections" />
        </ListItemButton>
        <ListItemButton
          selected={window.location.href.slice(21) === paths[2]}
          onClick={(e) => handleListItemIndex(e, 2)}
        >
          {localStorage.getItem("token") && (
            <ListItemText primary="Sign Out" onClick={handleSignOut} />
          )}
          {!localStorage.getItem("token") && (
            <ListItemText
              primary="Sign In"
              onClick={() => (window.location.href = "/auth/sign-in")}
            />
          )}
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
