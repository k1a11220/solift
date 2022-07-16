export interface InitiativeState {
  name: string;
  deadline: string;
  hasDone: boolean;
}

export interface KeyResultState {
  name: string;
  deadline: string;
  initiatives: InitiativeState[];
}

export interface ObjectiveState {
  name: string;
  deadline: string;
  keyResults: KeyResultState[];
}

export const SET_EXAMPLE_STRING = "SET_EXAMPLE_STRING";

export interface SetExampleStringAction {
  type: typeof SET_EXAMPLE_STRING;
  exampleStringState: string | null;
}
