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
  deadline: Date | null;
  keyResults: KeyResult[];
}
