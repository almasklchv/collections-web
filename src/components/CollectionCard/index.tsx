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
import { NO_IMAGE } from "../../consts";
import { useEffect } from "react";

const CollectionCard = ({
  userId,
  title,
  description,
  imageUrl,
  theme,
  variant,
}: Collection) => {
  const [getUser, user] = useGetUserMutation();

  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, width: "100%" }}
    >
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
        <Button>Open Collection</Button>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
