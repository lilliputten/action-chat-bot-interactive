import { TDateLike } from '@/lib';

import { TAvatarTypeId, TInspectorMoodId } from '../avatar';

export interface TChatItem {
  className?: string;
  scenarioId?: string; // TScenarioItemId;
  /** Markdown content */
  content: string;
  when?: TDateLike;
  inspector?: TInspectorMoodId;
  user?: TAvatarTypeId;
  follow?: boolean;
  // TODO: Item type, etc?
}
