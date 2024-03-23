import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { useGetUserQuery } from "../../api/users";
import { Collection } from "../../entities/collection";
import { NO_IMAGE } from "../../consts";

const CollectionCard = ({
  userId,
  title,
  description,
  imageUrl,
  theme,
}: Collection) => {
  const { data: user, isLoading } = useGetUserQuery(userId);
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, width: "100%", marginBottom: 5 }}
    >
      <CardMedia sx={{ height: 170 }} image={imageUrl ?? NO_IMAGE} />
      <CardContent>
        <Typography color={"text-secondary"} gutterBottom>
          {user?.name}
          {isLoading && <Skeleton variant="text" />}
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
