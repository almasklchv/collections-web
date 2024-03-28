import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  useCreateCollectionMutation,
  useGetCollectionsByUserIdQuery,
} from "../../../api/collections";
import CollectionCard from "../../../components/CollectionCard";
import { ME, collectionTypes } from "../../../consts";
import { useRef, useState } from "react";
import { handleUpload } from "../../../utils/firebase";
import { CollectionType } from "../../../entities/collection-type";
import StepContent from "../../../components/StepContent";
import { CustomFields } from "../../../entities/custom-field";
import { Collection } from "../../../entities/collection";

const steps = [
  "Select collection type",
  "Describe the new collection",
  "Add custom fields to items (optional)",
];

const MyPage = () => {
  const {
    data: collections,
    isLoading,
    refetch,
  } = useGetCollectionsByUserIdQuery(ME?.id);
  const imageInputRef = useRef(null);
  const [image, setImage] = useState<File>();
  const [uploadCollection] = useCreateCollectionMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const selectedCollectionType = collectionTypes[selectedIndex];
  const [collectionTitle, setCollectionTitle] = useState<string>("");
  const [collectionDescription, setCollectionDescription] =
    useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [customFields, setCustomFields] = useState<CustomFields>({
    datetime: [],
    logical: [],
    numeric: [],
    string: [],
    text: [],
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const stepContentProps = {
    stepIndex: activeStep,
    selectedIndex,
    setSelectedIndex,
    selectedCollectionType,
    collectionTitle,
    setCollectionTitle,
    collectionDescription,
    setCollectionDescription,
    imageInputRef,
    handleImage,
    customFields,
    setCustomFields,
  };

  const handleDone = async () => {
    setIsDisabled(true);
    const downloadUrl = await handleUpload(image);

    const customFieldsForDB = {
      custom_string1_state: customFields.string.length > 0,
      custom_string1_name: customFields.string[0]?.name || null,
      custom_string2_state: customFields.string.length > 1,
      custom_string2_name: customFields.string[1]?.name || null,
      custom_string3_state: customFields.string.length > 2,
      custom_string3_name: customFields.string[2]?.name || null,
      custom_int1_state: customFields.numeric.length > 0,
      custom_int1_name: customFields.numeric[0]?.name || null,
      custom_int2_state: customFields.numeric.length > 1,
      custom_int2_name: customFields.numeric[1]?.name || null,
      custom_int3_state: customFields.numeric.length > 2,
      custom_int3_name: customFields.numeric[2]?.name || null,
      custom_text1_state: customFields.text.length > 0,
      custom_text1_name: customFields.text[0]?.name || null,
      custom_text2_state: customFields.text.length > 1,
      custom_text2_name: customFields.text[1]?.name || null,
      custom_text3_state: customFields.text.length > 2,
      custom_text3_name: customFields.text[2]?.name || null,
      custom_boolean1_state: customFields.logical.length > 0,
      custom_boolean1_name: customFields.logical[0]?.name || null,
      custom_boolean2_state: customFields.logical.length > 1,
      custom_boolean2_name: customFields.logical[1]?.name || null,
      custom_boolean3_state: customFields.logical.length > 2,
      custom_boolean3_name: customFields.logical[2]?.name || null,
      custom_date1_state: customFields.datetime.length > 0,
      custom_date1_name: customFields.datetime[0]?.name || null,
      custom_date2_state: customFields.datetime.length > 1,
      custom_date2_name: customFields.datetime[1]?.name || null,
      custom_date3_state: customFields.datetime.length > 2,
      custom_date3_name: customFields.datetime[2]?.name || null,
    };

    const collection = {
      title: collectionTitle,
      description: collectionDescription,
      theme:
        CollectionType[selectedCollectionType as keyof typeof CollectionType],
      imageUrl: downloadUrl,
      ...customFieldsForDB,
    };
    await uploadCollection(collection);
    setIsOpen(false);
    refetch();
    setIsDisabled(false);
  };

  if (
    !localStorage.getItem("user") ||
    localStorage.getItem("user") === "undefined"
  ) {
    return (
      <>
        <Typography>You must be logged in to view your collections.</Typography>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/auth/sign-in")}
          sx={{ marginTop: 3 }}
        >
          Sign In
        </Button>
      </>
    );
  }

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ marginBottom: 3 }}
        onClick={() => setIsOpen(true)}
      >
        Add collection
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
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
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider sx={{ marginTop: 2 }} />
          <StepContent {...stepContentProps} />
          <Divider sx={{ marginTop: 5 }} />
          <ButtonGroup
            sx={{
              float: "right",
              marginTop: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {activeStep === 0 && (
              <Button variant="text" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            )}
            {activeStep > 0 && (
              <Button variant="text" onClick={handleBack}>
                Previous
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleDone}
                disabled={isDisabled}
              >
                Done
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Modal>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {collections?.map((collection: Collection) => (
          <CollectionCard {...collection} key={collection.id} variant="me" />
        ))}
        {isLoading && <Typography>Loading...</Typography>}
      </Box>
    </Box>
  );
};

export default MyPage;
