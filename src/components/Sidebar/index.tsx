import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = () => {
  const paths = ["/", "/collections/my"];

  const handleListItemIndex = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    window.location.href = paths[index];
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
      </List>
    </Box>
  );
};

export default Sidebar;
