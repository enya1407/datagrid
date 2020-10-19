import {PersonType} from "../types";


const sortPersons = (currentDataPersons: Array<PersonType>, key: keyof PersonType, sortedBy: string) => {
  const newPersons = [...currentDataPersons];
  switch (sortedBy) {
    case 'ascent':
      newPersons.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a.gender > b.gender) {
          return 1;
        }
        return 0;
      });
      return newPersons
    case 'decent':
      newPersons.sort((a, b) => {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a.gender < b.gender) {
          return 1;
        }
        return 0;
      });
      return newPersons

  }
}
export default sortPersons