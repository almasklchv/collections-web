import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={isMdUp ? { marginLeft: 31 } : {}}>
      <Typography
        sx={
          isMdUp
            ? {
                padding: 15,
                paddingTop: 5,
                paddingBottom: 0,
                marginBottom: -12,
              }
            : {
                padding: 5,
                paddingBottom: 0,
                marginBottom: -12,
              }
        }
        variant="h5"
      >
        {t("home.part1.title")}
      </Typography>
      <Box
        sx={
          isMdUp
            ? {
                display: "flex",
                flexWrap: "wrap",
                padding: 15,
                gap: 3,
              }
            : {
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                padding: 5,
                paddingTop: 15,
              }
        }
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
        sx={
          isMdUp
            ? {
                padding: 15,
                paddingBottom: 0,
                marginBottom: -12,
                paddingTop: 0,
                marginTop: -10,
              }
            : {
                padding: 5,
                paddingBottom: 0,
                marginBottom: -12,
                paddingTop: 10,
                marginTop: -10,
              }
        }
        variant="h5"
      >
        {t("home.part2.title")}
      </Typography>
      <Box
        sx={
          isMdUp
            ? {
                display: "flex",
                flexWrap: "wrap",
                padding: 15,
                gap: 3,
              }
            : {
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                padding: 5,
                paddingTop: 15,
              }
        }
      >
        {collections?.map((collection) => (
          <CollectionCard {...collection} key={collection.id} />
        ))}

        {isCollectionsLoading && <Typography>{t("loader")}</Typography>}
      </Box>
    </Box>
  );
};

export default HomePage;
