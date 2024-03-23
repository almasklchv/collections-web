import { Box, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import { useGetRecentlyAddedQuery } from "../../api/items";

const HomePage = () => {
  const { data: items, isLoading } = useGetRecentlyAddedQuery(null);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 15,
          marginLeft: 30
        }}
      >
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
        {isLoading && <Typography>Loading...</Typography>}
      </Box>
    </>
  );
};

export default HomePage;
