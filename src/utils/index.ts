import { Initiative, KeyResult, Objective } from "../libs/types";

export const getCurrentObjective = (list: Array<Objective>, id: number) => {
  return list.find((objective) => objective.id === id);
};

export const getCurrentKeyResult = (list: Array<KeyResult>, id: number) => {
  return list.find((keyResult) => keyResult.id === id);
};

export const stringToDate = (date: any) => {
  const dateParts = date.split("/");
  const currentDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  return currentDate;
};

export const keyResultProgressList = (keyResults: KeyResult[], id: number) => {
  return keyResults.filter((keyResult) => keyResult.objectiveId === id);
};

export const findKeyResultProgress = (
  initiatives: Initiative[],
  id: number
) => {
  let filteredInitiatives = initiatives.filter(
    (initiative) => initiative.keyResultId === id
  );
  if (filteredInitiatives.length === 0) {
    return 0;
  } else {
    let countedTrue = filteredInitiatives.filter(
      (initiative) => initiative.hasDone === true
    ).length;

    return (countedTrue / filteredInitiatives.length) * 100;
  }
};
