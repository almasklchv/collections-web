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
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { useGetItemByIdQuery } from "../../api/items";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";

import { ME } from "../../consts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Comment } from "../../entities/comment";
import { socket } from "../../main";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item } = useGetItemByIdQuery(id ?? "");
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    socket.on("likesUpdated", (data) => {
      setLikesCount(data.count);
    });

    socket.on("getLikesCount", (data) => {
      setLikesCount(data.count);
    });

    socket.on("getComments", (data) => {
      setComments(data);
    });

    socket.on("commentCreated", (data) => {
      setComments((prev) => [...prev, data]);
    });

    socket.on("commentsUpdated", (data) => {
      setComments(data);
    });

    socket.emit("getLikesCount", {
      itemId: id,
    });

    socket.emit("getComments", {
      itemId: id,
    });

    return () => {
      socket.off("likesUpdated");
      socket.off("getLikesCount");
      socket.off("getComments");
      socket.off("commentCreated");
      socket.off("commentsUpdated");
    };
  }, []);

  const sendLike = (itemId: string, userId: string) => {
    socket.emit("toggleLike", { itemId, userId });
  };

  const sendComment = (itemId: string, userId: string, text: string) => {
    socket.emit("createComment", { itemId, userId, text });
  };

  const deleteComment = (commentId: string, userId: string, itemId: string) => {
    socket.emit("deleteComment", { commentId, userId, itemId });
  };

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
          startIcon={<FavoriteIcon />}
          onClick={() => sendLike(item?.id ?? "", ME?.id)}
        >
          {likesCount}
        </Button>
        <Button
          startIcon={<CommentIcon />}
          onClick={() => navigate("#comment")}
        >
          {comments.length}
        </Button>
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
                key={key}
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
      <Box
        id={"comment"}
        sx={{
          marginTop: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          multiline
          maxRows={3}
          placeholder="Leave a comment"
          sx={{ width: "85%" }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          sx={{ width: "10%", marginRight: 2 }}
          variant="contained"
          onClick={() => sendComment(item?.id ?? "", ME?.id, commentText)}
          disabled={!commentText}
        >
          Add
        </Button>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        {comments.map((comment) => (
          <Paper
            sx={{ marginTop: 2, padding: 2.5, position: "relative" }}
            variant="outlined"
          >
            <Typography>{comment.user.name}</Typography>
            <Typography>{comment.text}</Typography>

            {(comment.userId === ME.id || ME.role === "ADMIN") && (
              <Button
                sx={{ position: "absolute", bottom: "25px", right: 0 }}
                onClick={() => deleteComment(comment.id, ME.id, item?.id ?? "")}
              >
                <DeleteIcon />
              </Button>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ItemPage;
