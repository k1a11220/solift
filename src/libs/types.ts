export interface ROUTES {
  navigate: any;
  getCurrentRoute: any;
  Home: "Home";
  CreateObjective: "CreateObjective";
  CreateKeyResult: "CreateKeyResult";
  CreateInitiative: "CreateInitiative";
}

export interface Initiative {
  id: number;
  name: string;
  deadline: Date;
  hasDone: boolean;
  keyResultId: number;
}

export interface KeyResult {
  id: number;
  name: string;
  deadline: Date;
  objectiveId: number;
  initiatives: Initiative[];
}

export interface Objective {
  id: number | null;
  name: string | null;
  deadline: string | null;
  keyResults: KeyResult[];
}
