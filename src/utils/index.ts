import { KeyResult, Objective } from "../libs/types";

export const getCurrentObjective = (id: number, list: Array<Objective>) => {
  return list.find((objective) => objective.id === id);
};

export const getCurrentKeyResult = (id: number, list: Array<KeyResult>) => {
  return list.find((keyResult) => keyResult.id === id);
};

export const stringToDate = (date: any) => {
  const dateParts = date.split("/");
  const currentDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  return currentDate;
};
