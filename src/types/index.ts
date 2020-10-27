export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female";
  shirt_size: "3xl" | "2xl" | "xl" | "l" | "m" | "s" | "xs";
  app_name: string;
  app_version: number;
}

export interface StateType {
  isLoading: boolean;
  initialDataPersons: Array<PersonType>;
  currentDataPersons: Array<PersonType>;
  sortedBy: Record<keyof PersonType, "ascent" | "decent" | undefined>;
  filterBy: Record<keyof PersonType, string>;
  visibilityColumns: Record<keyof PersonType, boolean>;
  visibilityRows: number;
}

