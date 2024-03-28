import { CollectionType } from "./collection-type";

export interface Collection {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  theme: CollectionType;
  variant?: string;
  imageUrl: string | null;
  custom_string1_name: string | null;
  custom_string2_name: string | null;
  custom_string3_name: string | null;
  custom_int1_name: string | null;
  custom_int2_name: string | null;
  custom_int3_name: string | null;
  custom_text1_name: string | null;
  custom_text2_name: string | null;
  custom_text3_name: string | null;
  custom_boolean1_name: string | null;
  custom_boolean2_name: string | null;
  custom_boolean3_name: string | null;
  custom_date1_name: string | null;
  custom_date2_name: string | null;
  custom_date3_name: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
