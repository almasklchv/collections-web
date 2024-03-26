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

const ItemCard = ({ title, tags, userId, collectionId }: Item) => {
  const [getUser, user] = useGetUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, width: "100%" }}>
      <CardContent>
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
      <CardActions>
        <Button onClick={() => navigate(`/collections/${collectionId}`)}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
