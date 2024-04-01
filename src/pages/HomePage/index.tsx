import { Box, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import { useGetRecentlyAddedQuery } from "../../api/items";
import { useGetFiveBiggestCollectionsQuery } from "../../api/collections";
import CollectionCard from "../../components/CollectionCard";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { data: items, isLoading: isItemsLoading } =
    useGetRecentlyAddedQuery(null);
  const { data: collections, isLoading: isCollectionsLoading } =
    useGetFiveBiggestCollectionsQuery(null);
  const { t } = useTranslation();

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
        {t("home.part1.title")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 15,
          marginLeft: 30,
          gap: 3,
        }}
      >
        {items?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
        {!items?.length && !isItemsLoading && (
          <Typography>{t("home.part1.noItems")}</Typography>
        )}
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
        {t("home.part2.title")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 15,
          marginLeft: 30,
          gap: 3,
        }}
      >
        {collections?.map((collection) => (
          <CollectionCard {...collection} key={collection.id} />
        ))}

        {isCollectionsLoading && <Typography>{t("loader")}</Typography>}
      </Box>
    </>
  );
};

export default HomePage;
