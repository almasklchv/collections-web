import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { useGetUserMutation } from "../../api/users";
import { Collection } from "../../entities/collection";
import { ME, NO_IMAGE } from "../../consts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCollectionMutation,
  useGetCollectionByIdQuery,
  useGetCollectionsByUserIdQuery,
} from "../../api/collections";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";

const CollectionCard = ({
  userId,
  title,
  description,
  imageUrl,
  theme,
  variant,
  id,
}: Collection) => {
  const [getUser, user] = useGetUserMutation();
  const { data: collection } = useGetCollectionByIdQuery(id ?? "");
  const [deleteCollection] = useDeleteCollectionMutation();
  const navigate = useNavigate();

  const { refetch } = useGetCollectionsByUserIdQuery(userId ?? "");

  const { t } = useTranslation();

  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  const handleClick = () => {
    navigate(`/collections/${id}`);
  };
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, width: "100%", position: "relative" }}
    >
      <CardMedia sx={{ height: 170 }} image={imageUrl ?? NO_IMAGE} />
      <CardContent sx={{ marginBottom: 4 }}>
        <Typography color={"text-secondary"} gutterBottom>
          {user.data && variant !== "me" && user.data.name}
          {variant === "me" && t("collectionCard.you")}
          {user.isLoading && variant !== "me" && <Skeleton variant="text" />}
        </Typography>
        <Typography variant="h5">{title}</Typography>
        <MDEditor.Markdown
          source={description}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <Typography variant="overline">{theme}</Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        <Button onClick={handleClick}>{t("collectionCard.open")}</Button>
        {(collection?.userId === ME?.id || ME?.role === "ADMIN") && (
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={async () => {
              await deleteCollection(collection?.id ?? "");
              refetch();
            }}
          >
            {t("collectionCard.delete")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
