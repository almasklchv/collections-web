import { Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";
import { Item } from "../../entities/item";
import { useGetUserQuery } from "../../api/users";

const ItemCard = ({ title, tags, userId }: Item) => {
  const { data: user, isLoading } = useGetUserQuery(userId);
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, width: "100%", marginBottom: 5 }}
    >
      <CardContent>
        <Typography color={"text-secondary"} gutterBottom>
          {user?.name}
          {isLoading && <Skeleton variant="text" />}
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
        <Button>Open Collection</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
