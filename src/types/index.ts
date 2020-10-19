export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  shirt_size: string;
  app_name: string;
  app_version: boolean;
}

export interface StateType {
  isLoading: boolean;
  initialDataPersons: Array<PersonType>;
  currentDataPersons: Array<PersonType>;
  sortedBy: Record<keyof PersonType, string | undefined>;
}
