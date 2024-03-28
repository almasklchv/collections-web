import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { useGetItemByIdQuery } from "../../api/items";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLikedByYou, setIsLikedByYou] = useState(false);
  const { data: item } = useGetItemByIdQuery(id ?? "");
  console.log(item?.customFields);

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        <ReplyIcon />
      </Button>
      <Typography variant="h5" sx={{ marginTop: 5 }}>
        {item?.title}
      </Typography>
      <ButtonGroup variant="contained" sx={{ marginTop: 2 }}>
        <Button
          startIcon={isLikedByYou ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        >
          0
        </Button>
        <Button startIcon={<CommentIcon />}>0</Button>
      </ButtonGroup>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tags
              </TableCell>
              <TableCell>{item?.tags.join(", ")}</TableCell>
            </TableRow>
            {Object.keys(item?.customFields ?? "").map((key) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell>{item?.customFields[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemPage;
