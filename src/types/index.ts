export interface Gender {
  Male: string;
  Female: string;
}

export interface ShirtSize {
  "3XL": string;
  "2XL": string;
  "XL": string;
  "L": string;
  "M": string;
  "S": string;
  "XS": string;
}

export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female";
  shirt_size: "3XL" | "2XL" | "XL" | "L" | "M" | "S" | "XS";
  app_name: string;
  boolean: boolean;
}

export interface VisibilityBoolean {
  showTrue: boolean;
  showFalse: boolean;
}

export interface StateType {
  isLoading: boolean;
  initialDataPersons: Array<PersonType>;
  currentDataPersons: Array<PersonType>;
  sortedBy: Partial<Record<keyof PersonType, "ascent" | "decent">>;
  filterBy: Partial<Record<keyof PersonType, string>>;
  visibilityGender: Record<keyof Gender, boolean>;
  visibilityShirtSize: Record<keyof ShirtSize, boolean>;
  visibilityColumns: Record<keyof PersonType, boolean>;
  visibilityRows: number;
  visibilityBoolean: VisibilityBoolean;
  isAsync: boolean;
}

