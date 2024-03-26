import { TextField, Typography } from "@mui/material";
import { CustomFieldsType } from "../../entities/custom-field-type";
import { CustomFieldI } from "../../entities/custom-field";

const CustomField = (props: CustomFieldI) => {
  console.log(props.type);

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
      <TextField placeholder="Enter a name for field..." fullWidth />
    </>
  );
};

export default CustomField;
