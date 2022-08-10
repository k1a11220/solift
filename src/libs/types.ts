export interface ROUTES {
  navigate: any;
  getCurrentRoute: any;
  Home: "Home";
  CreateObjective: "CreateObjective";
  CreateKeyResult: "CreateKeyResult";
  CreateInitiative: "CreateInitiative";
  EditInitiative: "EditInitiative";
}

export interface Initiative {
  id: number | null;
  name: string | null;
  deadline: string | null;
  hasDone: boolean;
  keyResultId: number | null;
}

export interface KeyResult {
  id: number | null;
  name: string | null;
  deadline: string | null;
  objectiveId: number | null;
  initiatives: Initiative[];
}

export interface Objective {
  id: number | null;
  name: string | null;
  deadline: string | null;
  keyResults: KeyResult[];
}
