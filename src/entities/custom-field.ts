import { CustomFieldsType } from "./custom-field-type";

export interface CustomFieldI {
  id: number;
  type: CustomFieldsType;
  name: string;
}

export interface CustomFields {
  datetime: CustomFieldI[];
  logical: CustomFieldI[];
  numeric: CustomFieldI[];
  string: CustomFieldI[];
  text: CustomFieldI[];
}
