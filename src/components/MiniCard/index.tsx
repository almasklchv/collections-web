import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./mini-card.module.css";

const MiniCard = ({
  imageUrl,
  type,
  selectedIndex,
  setSelectedIndex,
  index,
}: {
  imageUrl: string;
  type: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
  return (
    <div onClick={() => setSelectedIndex(index)}>
      <Card
        sx={{ width: "180px", cursor: "pointer" }}
        className={selectedIndex === index ? styles.selected : ""}
      >
        <CardMedia
          image={imageUrl}
          sx={{
            width: "80px",
            height: "80px",
            margin: "0 auto",
            marginTop: 3,
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
            {type}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniCard;
