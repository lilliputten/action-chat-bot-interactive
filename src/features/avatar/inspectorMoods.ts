export const inspectorMoods = {
  neutral: 'Нейтрален',
  angry: 'Расстроен',
  happy: 'Доволен',
} as const;
export type TInspectorMoodId = keyof typeof inspectorMoods;
export type TInspectorMoodName = (typeof inspectorMoods)[keyof typeof inspectorMoods];
export const inspectorMoodIds = Object.keys(inspectorMoods) as TInspectorMoodId[];
export const defaultInspectorMoodId = inspectorMoodIds[0];
