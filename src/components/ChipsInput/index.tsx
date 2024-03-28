import { TextField, TextFieldProps } from "@mui/material";
import ChipsArray, { ChipsArrayProps } from "../ChipsArray";
import { useState } from "react";

export interface ChipData {
  key: number;
  label: string;
}

const ChipsInput = ({
  chipData,
  setChipData,
  ...props
}: TextFieldProps & ChipsArrayProps) => {
  const [chip, setChip] = useState<string>("");

  const addTagToChipData = (tag: string) => {
    const tagObj: ChipData = {
      key: chipData.length,
      label: tag,
    };
    chipData.push(tagObj);
    setChip("");
  };
  return (
    <div>
      <TextField
        onKeyDown={(e) => {
          if (e.key === "Enter") addTagToChipData(chip);
        }}
        onChange={(e) => setChip(e.target.value)}
        value={chip}
        {...props}
      />
      <ChipsArray chipData={chipData} setChipData={setChipData} />
    </div>
  );
};

export default ChipsInput;
