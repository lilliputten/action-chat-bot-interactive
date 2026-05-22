export type TScenarioItemId =
  | 'START'
  | 'START2'
  | 'Q1'
  | 'Q1А'
  | 'Q1Б'
  | 'Q2'
  | 'Q2А'
  | 'Q3'
  | 'Q3А'
  | 'Q4'
  | 'Q4А'
  | 'Q5'
  | 'Q5А'
  | 'Q6'
  | 'Q6А'
  | 'Q7'
  | 'Q7А'
  | 'Q8'
  | 'Q8А'
  | 'Q9'
  | 'Q10'
  | 'END';
export type TGoToId = TScenarioItemId | 'RESULTS';

export interface TScenarioItem {
  /** Question/replica text, markdown */
  text: string;
  /** Possible user's answers */
  answers?: TScenarioAnswer[];
  /** Automatically go to the specified item (if no answers), with a delay */
  goTo?: TGoToId;
}

export interface TScenarioAnswer {
  /** Answer text, markdown */
  text: string;
  /** Reaction text, markdown, displaying with a delay */
  reaction?: string;
  /** Jump to the following question id, with a delay */
  goTo: TGoToId;
  /** Penality points */
  points?: number;
}

export type TScenario = Record<TScenarioItemId, TScenarioItem>;
