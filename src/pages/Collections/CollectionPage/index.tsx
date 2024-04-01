import { useNavigate, useParams } from "react-router-dom";
import { useGetItemsByCollectionIdQuery } from "../../../api/items";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ItemCard from "../../../components/ItemCard";
import {
  useAddItemToCollectionMutation,
  useGetCollectionByIdQuery,
} from "../../../api/collections";
import { ME } from "../../../consts";
import { Item } from "../../../entities/item";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import ChipsInput, { ChipData } from "../../../components/ChipsInput";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTranslation } from "react-i18next";

const CollectionPage = () => {
  const { id } = useParams();
  const { data: collection } = useGetCollectionByIdQuery(id ?? "");
  const {
    data: items,
    isLoading,
    refetch,
  } = useGetItemsByCollectionIdQuery(id ?? "");
  const navigate = useNavigate();
  const [customFields, setCustomFields] = useState([]);
  const [title, setTitle] = useState("");
  const [customFieldsForDB, setCustomFieldsForDB] = useState({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [chipData, setChipData] = useState<ChipData[]>([]);

  const [addItemToColection] = useAddItemToCollectionMutation();

  const [titleError, setTittleError] = useState("");
  const [tagsError, setTagsError] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    for (const key in collection) {
      if (key.startsWith("custom") && key.endsWith("name")) {
        setCustomFields((prev) => ({ ...prev, [key]: collection[key] }));
      }
    }
  }, [collection]);

  const handleCustomFieldChange = (
    fieldKey: string,
    value: string | boolean | number | undefined
  ) => {
    setCustomFieldsForDB((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleDone = async () => {
    if (!title) {
      setTittleError("Enter title of item.");
    } else if (!chipData.length) {
      setTagsError("Enter tags.");
    } else {
      setIsDisabled(true);
      const item = {
        title,
        tags: chipData.map((chip) => chip.label),
        customFields: customFieldsForDB,
      };
      await addItemToColection({ id: collection?.id, item });
      setIsOpen(false);
      refetch();
      setIsDisabled(false);
    }
  };

  return (
    <Box>
      <ButtonGroup sx={{ marginBottom: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          <ReplyIcon />
        </Button>
        {(collection?.userId === ME?.id || ME?.role === "ADMIN") && ME && (
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            {t("collections.addItem")}
          </Button>
        )}
      </ButtonGroup>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {items?.map((item: Item) => (
          <ItemCard {...item} key={id} />
        ))}
      </Box>
      {isLoading && <Typography>Loading...</Typography>}
      {!items?.length && !isLoading && (
        <Typography>{t("collections.noItems")}</Typography>
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
            {t("addItem.title")}
          </Typography>
          <Divider sx={{ marginTop: 1 }}></Divider>
          <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
            {t("addItem.titleInput.title")}:
          </Typography>
          <TextField
            fullWidth
            placeholder={t("addItem.titleInput.placeholder")}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormHelperText error>{!title && titleError}</FormHelperText>
          <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
            {t("addItem.tagsInput.title")}:
          </Typography>
          <ChipsInput
            fullWidth
            placeholder={t("addItem.tagsInput.placeholder")}
            chipData={chipData}
            setChipData={setChipData}
          />
          <FormHelperText error>{!chipData.length && tagsError}</FormHelperText>
          {Object.keys(customFields).map((key) => {
            if (collection !== undefined) {
              const fieldKey = collection[key];
              return (
                <>
                  {!key.startsWith("custom_boolean") && (
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 2, marginBottom: 1 }}
                    >
                      {fieldKey}
                    </Typography>
                  )}
                  {key.startsWith("custom_string") && fieldKey && (
                    <TextField
                      fullWidth
                      placeholder={`Enter ${fieldKey.toLowerCase()}`}
                      onChange={(e) =>
                        handleCustomFieldChange(fieldKey, e.target.value)
                      }
                    />
                  )}
                  {key.startsWith("custom_int") && fieldKey && (
                    <TextField
                      fullWidth
                      placeholder={`Enter ${fieldKey.toLowerCase()}`}
                      type="number"
                      onChange={(e) =>
                        handleCustomFieldChange(fieldKey, +e.target.value)
                      }
                    />
                  )}
                  {key.startsWith("custom_text") && fieldKey && (
                    <TextField
                      multiline
                      fullWidth
                      minRows={6}
                      maxRows={6}
                      placeholder={`Enter ${fieldKey.toLowerCase()}`}
                      onChange={(e) =>
                        handleCustomFieldChange(fieldKey, e.target.value)
                      }
                    />
                  )}
                  {key.startsWith("custom_boolean") && fieldKey && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            handleCustomFieldChange(fieldKey, e.target.checked)
                          }
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                          {fieldKey}:
                        </Typography>
                      }
                      labelPlacement="start"
                      sx={{ marginLeft: 0 }}
                    />
                  )}
                  {key.startsWith("custom_date") && fieldKey && (
                    <DateTimePicker
                      onChange={(newValue) =>
                        handleCustomFieldChange(
                          fieldKey,
                          newValue?.toISOString()
                        )
                      }
                      sx={{ width: "100%" }}
                    />
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
            {t('addItem.cancel')}
          </Button>
          <Button
            variant="contained"
            sx={{ float: "right", marginTop: 1 }}
            onClick={handleDone}
            disabled={isDisabled}
          >
            {t('addItem.done')}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CollectionPage;
