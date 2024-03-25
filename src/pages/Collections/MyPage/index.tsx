import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Modal,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  useCreateCollectionMutation,
  useGetCollectionsByUserIdQuery,
} from "../../../api/collections";
import CollectionCard from "../../../components/CollectionCard";
import { COLLECTION_TYPE_IMAGES, ME, collectionTypes } from "../../../consts";
import { useRef, useState } from "react";
import MiniCard from "../../../components/MiniCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { handleUpload } from "../../../utils/firebase";
import { CollectionType } from "../../../entities/collection-type";

interface CollectionTypeImages {
  coins: string;
  postcards: string;
  banknotes: string;
  painting: string;
  stamps: string;
}

const steps = ["Select collection type", "Describe the new collection"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

  const handleDone = async () => {
    setIsDisabled(true);
    const downloadUrl = await handleUpload(image);
    const collection = {
      title: collectionTitle,
      description: collectionDescription,
      theme:
        CollectionType[selectedCollectionType as keyof typeof CollectionType],
      imageUrl: downloadUrl,
    };
    await uploadCollection(collection);
    setIsOpen(false);
    refetch();
    setIsDisabled(false);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 5 }}
            >
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
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
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
                Collection type: {selectedCollectionType}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 2, marginBottom: 1 }}
              >
                Title:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter collection title here"
                fullWidth
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
              />
              <Typography
                variant="body2"
                sx={{ marginTop: 2, marginBottom: 1 }}
              >
                Description:
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={6}
                maxRows={6}
                placeholder="About collection ..."
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
              />
              <Typography
                variant="body2"
                sx={{ marginTop: 2, marginBottom: 1 }}
              >
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
                  ref={imageInputRef}
                  onChange={handleImage}
                />
              </Button>
            </Box>
          </>
        );
    }
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
          {getStepContent(activeStep)}
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
        {collections?.map((collection) => (
          <CollectionCard {...collection} key={collection.id} variant="me" />
        ))}
        {isLoading && <Typography>Loading...</Typography>}
      </Box>
    </Box>
  );
};

export default MyPage;
