import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import MiniCard from "../MiniCard";
import { COLLECTION_TYPE_IMAGES, collectionTypes } from "../../consts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../VisuallyHiddenComponent";
import { useState } from "react";
import { CustomFieldsType } from "../../entities/custom-field-type";
import CustomField from "../CustomField";
import { CustomFields } from "../../entities/custom-field";
import MDEditor from "@uiw/react-md-editor";

interface CollectionTypeImages {
  coins: string;
  postcards: string;
  banknotes: string;
  painting: string;
  stamps: string;
}

interface StepContentProps {
  stepIndex: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedCollectionType: string;
  collectionTitle: string;
  setCollectionTitle: React.Dispatch<React.SetStateAction<string>>;
  collectionDescription: string;
  setCollectionDescription: React.Dispatch<React.SetStateAction<string>>;
  imageInputRef: React.MutableRefObject<null>;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customFields: CustomFields;
  setCustomFields: React.Dispatch<React.SetStateAction<CustomFields>>;
  collectionTitleError?: string;
  collectionDescriptionError?: string;
}

interface CustomFieldsCount {
  datetime: number;
  logical: number;
  numeric: number;
  string: number;
  text: number;
}

const StepContent = (props: StepContentProps) => {
  const [customFieldsCount, setCustomFieldsCount] = useState<CustomFieldsCount>(
    {
      datetime: 0,
      logical: 0,
      numeric: 0,
      string: 0,
      text: 0,
    }
  );

  const [selectedCustomField, setSelectedCustomField] =
    useState<keyof CustomFieldsCount>("datetime");

  const addCustomField = () => {
    if (!selectedCustomField || customFieldsCount[selectedCustomField] > 3)
      return;
    ``;
    setCustomFieldsCount((prevFieldsCount) => {
      const updatedFieldsCount = {
        ...prevFieldsCount,
        [selectedCustomField]: prevFieldsCount[selectedCustomField] + 1,
      };

      if (updatedFieldsCount[selectedCustomField] >= 3) {
        const nextField = Object.keys(updatedFieldsCount).find(
          (key) => updatedFieldsCount[key as keyof CustomFieldsCount] < 3
        ) as keyof CustomFieldsCount;

        setSelectedCustomField(nextField || "");
      }

      return updatedFieldsCount;
    });

    props.setCustomFields((prev) => ({
      ...prev,
      [selectedCustomField]: [
        ...prev[selectedCustomField],
        { name: "", id: prev[selectedCustomField].length },
      ],
    }));
  };

  switch (props.stepIndex) {
    case 0:
      return (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 5 }}>
            {collectionTypes.map((type: string, index: number) => {
              return (
                <MiniCard
                  imageUrl={
                    COLLECTION_TYPE_IMAGES[
                      type.toLowerCase() as keyof CollectionTypeImages
                    ]
                  }
                  type={type}
                  key={type}
                  index={index}
                  selectedIndex={props.selectedIndex}
                  setSelectedIndex={props.setSelectedIndex}
                />
              );
            })}
          </Box>
        </>
      );
    case 1:
      return (
        <>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body2">
              Collection type: {props.selectedCollectionType}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
              Title:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter collection title here"
              fullWidth
              value={props.collectionTitle}
              onChange={(e) => props.setCollectionTitle(e.target.value)}
            />
            <FormHelperText error>
              {!props.collectionTitle && props.collectionTitleError}
            </FormHelperText>
            <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
              Description:
            </Typography>
            <MDEditor
              value={props.collectionDescription}
              onChange={(value) => props.setCollectionDescription(value ?? "")}
            />
            <FormHelperText error>
              {!props.collectionDescription && props.collectionDescriptionError}
            </FormHelperText>
            <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
              Image:
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                accept=".png,.jpg,.jpeg"
                ref={props.imageInputRef}
                onChange={props.handleImage}
              />
            </Button>
          </Box>
        </>
      );
    case 2:
      return (
        <>
          <Box sx={{ marginTop: 3 }}>
            {Object.entries(customFieldsCount).map(([key, value]) => {
              return Array.from({ length: value }, (_, index) => (
                <CustomField
                  id={index}
                  key={index}
                  type={key as CustomFieldsType}
                  customFields={props.customFields}
                  setCustomFields={props.setCustomFields}
                />
              ));
            })}

            <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
              New custom field:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Select
                value={selectedCustomField}
                sx={{ width: "70%" }}
                onChange={(e: SelectChangeEvent<keyof CustomFieldsCount>) =>
                  setSelectedCustomField(
                    e.target.value as keyof CustomFieldsCount
                  )
                }
              >
                <MenuItem
                  value={CustomFieldsType.DATETIME}
                  disabled={customFieldsCount.datetime >= 3}
                >
                  Date / Time
                </MenuItem>
                <MenuItem
                  value={CustomFieldsType.BOOLEAN}
                  disabled={customFieldsCount.logical >= 3}
                >
                  Logical
                </MenuItem>
                <MenuItem
                  value={CustomFieldsType.INT}
                  disabled={customFieldsCount.numeric >= 3}
                >
                  Numeric
                </MenuItem>
                <MenuItem
                  value={CustomFieldsType.STRING}
                  disabled={customFieldsCount.string >= 3}
                >
                  String
                </MenuItem>
                <MenuItem
                  value={CustomFieldsType.TEXT}
                  disabled={customFieldsCount.text >= 3}
                >
                  Text
                </MenuItem>
              </Select>
              <Button
                onClick={addCustomField}
                variant="contained"
                sx={{ width: "30%", height: "100%" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </>
      );
  }
};

export default StepContent;
