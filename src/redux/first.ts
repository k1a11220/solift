import {
  FirstState,
  SetExampleStringAction,
  SET_EXAMPLE_STRING,
} from "./first.type";

export const firstState: FirstState = {
  exampleStringState: null,
};

export const setExampleString = (text: string): SetExampleStringAction => {
  return {
    type: SET_EXAMPLE_STRING,
    exampleStringState: text,
  };
};

export const firstReducer = (state = firstState, action): FirstState => {
  switch (action.type) {
    case SET_EXAMPLE_STRING:
      return { ...state, exampleStringState: action.exampleStringState };
    default:
      return state;
  }
};
