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
  
  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  const handleClick = () => {
    navigate(`/collections/${id}`);
  };
  return (
    <Card variant="outlined" sx={{ maxWidth: 345, width: "100%" }}>
      <CardMedia sx={{ height: 170 }} image={imageUrl ?? NO_IMAGE} />
      <CardContent>
        <Typography color={"text-secondary"} gutterBottom>
          {user.data && variant !== "me" && user.data.name}
          {variant === "me" && "You"}
          {user.isLoading && variant !== "me" && <Skeleton variant="text" />}
        </Typography>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="overline">{theme}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick}>Open Collection</Button>
        {(collection?.userId === ME?.id || ME?.role === "ADMIN") && (
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={async () => {
              await deleteCollection(collection?.id ?? "");
              refetch();
            }}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
