import { TextField, Typography } from "@mui/material";
import { CustomFieldsType } from "../../entities/custom-field-type";
import { CustomFieldI, CustomFields } from "../../entities/custom-field";

interface CustomFieldProps {
  id: number;
  type: CustomFieldsType;
  customFields: CustomFields;
  setCustomFields: React.Dispatch<React.SetStateAction<CustomFields>>;
}

const CustomField = (props: CustomFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.customFields[props.type].map((field: CustomFieldI) => {
      if (props.id === field.id) {
        field.name = e.target.value;
      }
    });
    console.log(props.customFields);
  };

  return (
    <>
      {props.type === CustomFieldsType.DATETIME && (
        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
          Date / Time:
        </Typography>
      )}
      {props.type === CustomFieldsType.BOOLEAN && (
        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
          Logical:
        </Typography>
      )}
      {props.type === CustomFieldsType.INT && (
        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
          Numeric:
        </Typography>
      )}
      {props.type === CustomFieldsType.STRING && (
        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
          String:
        </Typography>
      )}
      {props.type === CustomFieldsType.TEXT && (
        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
          Text:
        </Typography>
      )}
      <TextField
        placeholder="Enter a name for field..."
        fullWidth
        onChange={handleChange}
      />
    </>
  );
};

export default CustomField;
