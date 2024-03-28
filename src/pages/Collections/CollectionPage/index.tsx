import { useNavigate, useParams } from "react-router-dom";
import { useGetItemsByCollectionIdQuery } from "../../../api/items";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ItemCard from "../../../components/ItemCard";
import { useGetCollectionByIdQuery } from "../../../api/collections";
import { ME } from "../../../consts";
import { Item } from "../../../entities/item";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import ChipsInput, { ChipData } from "../../../components/ChipsInput";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CollectionPage = () => {
  const { id } = useParams();
  const { data: collection } = useGetCollectionByIdQuery(id ?? "");
  const { data: items, isLoading } = useGetItemsByCollectionIdQuery(id ?? "");
  const navigate = useNavigate();
  const [customFields, setCustomFields] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chipData, setChipData] = useState<ChipData[]>([]);

  useEffect(() => {
    for (const key in collection) {
      if (key.startsWith("custom") && key.endsWith("name")) {
        setCustomFields((prev) => ({ ...prev, [key]: collection[key] }));
      }
    }
  }, [collection]);

  return (
    <Box>
      <ButtonGroup sx={{ marginBottom: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          <ReplyIcon />
        </Button>
        {(collection?.userId === ME?.id || ME?.role === "ADMIN") && ME && (
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Add Item
          </Button>
        )}
      </ButtonGroup>

      {items?.map((item: Item) => (
        <ItemCard {...item} key={id} />
      ))}
      {isLoading && <Typography>Loading...</Typography>}
      {!items?.length && !isLoading && (
        <Typography>This collection doesn't have items.</Typography>
      )}
      <Modal
        open={isOpen}
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={() => setIsOpen(false)}
      >
        <Box
          sx={{
            background: "#fff",
            width: "30%",
            padding: "20px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            Describe item
          </Typography>
          <Divider sx={{ marginTop: 1 }}></Divider>
          <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
            Title:
          </Typography>
          <TextField fullWidth placeholder="Title of item..." />
          <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
            Tags:
          </Typography>
          <ChipsInput
            fullWidth
            placeholder="Enter a tag and press Enter..."
            chipData={chipData}
            setChipData={setChipData}
          />
          {Object.keys(customFields).map((key) => {
            if (collection !== undefined) {
              return (
                <>
                  {!key.startsWith("custom_boolean") && (
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 2, marginBottom: 1 }}
                    >
                      {collection[key]}
                    </Typography>
                  )}
                  {key.startsWith("custom_string") && collection[key] && (
                    <TextField
                      fullWidth
                      placeholder={`Enter ${collection[key].toLowerCase()}`}
                    />
                  )}
                  {key.startsWith("custom_int") && collection[key] && (
                    <TextField
                      fullWidth
                      placeholder={`Enter ${collection[key].toLowerCase()}`}
                      type="number"
                    />
                  )}
                  {key.startsWith("custom_text") && collection[key] && (
                    <TextField
                      multiline
                      fullWidth
                      minRows={6}
                      maxRows={6}
                      placeholder={`Enter ${collection[key].toLowerCase()}`}
                    />
                  )}
                  {key.startsWith("custom_boolean") && collection[key] && (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                          {collection[key]}:
                        </Typography>
                      }
                      labelPlacement="start"
                      sx={{ marginLeft: 0 }}
                    />
                  )}
                  {key.startsWith("custom_date") && collection[key] && (
                    <DateTimePicker sx={{ width: "100%" }} />
                  )}
                </>
              );
            }
          })}
          <Divider sx={{ marginTop: 5 }} />
          <Button
            variant="text"
            sx={{ marginTop: 1 }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ float: "right", marginTop: 1 }}>
            Done
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CollectionPage;
