import {
  ObjectiveState,
  SetExampleStringAction,
  SET_EXAMPLE_STRING,
} from "./first.type";

export const objectiveState: ObjectiveState = {
  name: "",
  deadline: "",
  keyResults: [],
};

export const setExampleString = (text: string): SetExampleStringAction => {
  return {
    type: SET_EXAMPLE_STRING,
    exampleStringState: text,
  };
};

export const firstReducer = (
  state = objectiveState,
  action
): ObjectiveState => {
  switch (action.type) {
    case SET_EXAMPLE_STRING:
      return { ...state, exampleStringState: action.exampleStringState };
    default:
      return state;
  }
};
