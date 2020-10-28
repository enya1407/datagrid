export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female";
  shirt_size: "3xl" | "2xl" | "xl" | "l" | "m" | "s" | "xs";
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
  visibilityColumns: Record<keyof PersonType, boolean>;
  visibilityRows: number;
  visibilityBoolean: VisibilityBoolean;
}

