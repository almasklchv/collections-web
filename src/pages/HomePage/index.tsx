import { Box, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import { useGetRecentlyAddedQuery } from "../../api/items";
import { useGetFiveBiggestCollectionsQuery } from "../../api/collections";
import CollectionCard from "../../components/CollectionCard";

const HomePage = () => {
  const { data: items, isLoading: isItemsLoading } =
    useGetRecentlyAddedQuery(null);
  const { data: collections, isLoading: isCollectionsLoading } =
    useGetFiveBiggestCollectionsQuery(null);

  return (
    <>
      <Typography
        sx={{
          padding: 15,
          paddingTop: 5,
          paddingBottom: 0,
          marginBottom: -12,
          marginLeft: 31,
        }}
        variant="h5"
      >
        Recently added items
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 15,
          marginLeft: 30,
        }}
      >
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}

        {isItemsLoading && <Typography>Loading...</Typography>}
      </Box>
      <Typography
        sx={{
          padding: 15,
          paddingBottom: 0,
          marginBottom: -12,
          marginLeft: 31,
          paddingTop: 0,
          marginTop: -10,
        }}
        variant="h5"
      >
        Five biggest collections
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 15,
          marginLeft: 30,
        }}
      >
        {collections?.map((collection) => (
          <CollectionCard {...collection} key={collection.id} />
        ))}

        {isCollectionsLoading && <Typography>Loading...</Typography>}
      </Box>
    </>
  );
};

export default HomePage;
