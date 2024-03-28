import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { Item } from "../../entities/item";
import { useGetUserMutation } from "../../api/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteItemMutation,
  useGetItemByIdQuery,
  useGetItemsByCollectionIdQuery,
} from "../../api/items";
import { ME } from "../../consts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ItemCard = ({ title, tags, userId, collectionId, id }: Item) => {
  const [getUser, user] = useGetUserMutation();
  const { data: item } = useGetItemByIdQuery(id ?? "");
  const [deleteItem] = useDeleteItemMutation();
  const { refetch } = useGetItemsByCollectionIdQuery(collectionId ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, width: "100%", position: "relative" }}
    >
      <CardContent sx={{ marginBottom: "30px" }}>
        <Typography color={"text-secondary"} gutterBottom>
          {user.data && user.data.name}
          {user.isLoading && <Skeleton variant="text" />}
        </Typography>
        <Typography variant="h5">{title}</Typography>
        {tags.map((tag) => (
          <Typography variant="body2">{tag}</Typography>
        ))}
        {!tags.length && (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            No tags
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ bottom: -5, position: "absolute" }}>
        <Button onClick={() => navigate(`/collections/${collectionId}`)}>
          Open
        </Button>
        {(item?.userId === ME?.id || ME?.role === "ADMIN") && (
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={async () => {
              await deleteItem(item?.id ?? "");
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

export default ItemCard;
