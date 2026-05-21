export const avatarTypes = {
  male: 'Мужчина',
  female: 'Женщина',
} as const;
export type TAvatarTypeId = keyof typeof avatarTypes;
export type TAvatarTypeName = (typeof avatarTypes)[keyof typeof avatarTypes];
export const avatarTypeIds = Object.keys(avatarTypes) as TAvatarTypeId[];
