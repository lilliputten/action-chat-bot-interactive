import { TDateLike, TDateTicks } from '@/lib';

export const scenarioItemIds = [
  'START',
  'START2',
  'Q1',
  'Q1A',
  'Q1B',
  'Q2',
  'Q2A',
  'Q3',
  'Q3A',
  'Q4',
  'Q4A',
  'Q5',
  'Q5A',
  'Q6',
  'Q6A',
  'Q7',
  'Q7A',
  'Q8',
  'Q8A',
  'Q9',
  'Q10',
  'END',
] as const;
export type TScenarioItemId = (typeof scenarioItemIds)[number];
export const defaultScenarioItemId: TScenarioItemId = 'START'; // scenarioItemIds[0];
export type TScenarioGoToId = TScenarioItemId | 'RESULTS';

export interface TScenarioItem {
  /** Question/replica text, markdown */
  text: string;
  /** Possible user's answers */
  answers?: TScenarioAnswer[];
  /** Automatically go to the specified item (if no answers), with a delay */
  goTo?: TScenarioGoToId;
}

export interface TScenarioStats {
  started: TDateTicks;
  points: number;
}

export interface TScenarioAnswer {
  /** Answer text, markdown */
  text: string;
  /** Reaction text, markdown, displaying with a delay */
  reaction?: string;
  /** Jump to the following question id, with a delay */
  goTo: TScenarioGoToId;
  /** Penality points */
  points?: number;
}

export type TScenario = Record<TScenarioItemId, TScenarioItem>;
