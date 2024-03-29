import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { ChipData } from "../ChipsInput";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export interface ChipsArrayProps {
  chipData: ChipData[];
  setChipData: React.Dispatch<React.SetStateAction<ChipData[]>>;
}

export const ChipsArray = ({ chipData, setChipData }: ChipsArrayProps) => {
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <>
      {!!chipData.length && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "React" ? undefined : handleDelete(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      )}
    </>
  );
};

export default ChipsArray;
