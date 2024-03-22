import { Box } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import { useGetRecentlyAddedQuery } from "../../api/items";

const HomePage = () => {
  const { data: items } = useGetRecentlyAddedQuery(null);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      {items?.map((item) => (
        <ItemCard {...item} key={item.id} />
      ))}
    </Box>
  );
};

export default HomePage;
