import React from 'react';

import { cn } from '@/lib/helpers';
import inspectorAvatarAngry from '@/assets/characters/inspector/inspector-face-angry.png?lqip';
import inspectorAvatarHappy from '@/assets/characters/inspector/inspector-face-happy.png?lqip';
import inspectorAvatarNeutral from '@/assets/characters/inspector/inspector-face-neutral.png?lqip';
import userAvatarFemale from '@/assets/characters/user/user-face-female.png?lqip';
import userAvatarMale from '@/assets/characters/user/user-face-male.png?lqip';
import { isDev } from '@/config';
import type { LQIP } from '@/global';

import { defaultInspectorMoodId, TAvatarTypeId, TInspectorMoodId } from '../avatar';

interface TProps {
  className?: string;
  inspector?: TInspectorMoodId;
  avatarType?: TAvatarTypeId;
  hidden?: boolean;
  large?: boolean;
}

const userAvatars: Record<TAvatarTypeId, LQIP> = {
  male: userAvatarMale,
  female: userAvatarFemale,
};
const inspectorAvatars: Record<TInspectorMoodId, LQIP> = {
  none: inspectorAvatarNeutral,
  neutral: inspectorAvatarNeutral,
  angry: inspectorAvatarAngry,
  happy: inspectorAvatarHappy,
};

export function Avatar(props: TProps) {
  const { className, inspector = defaultInspectorMoodId, avatarType, large, hidden } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    setIsAnimating(true);
  }, [inspector, avatarType]);
  const imgLqip = avatarType ? userAvatars[avatarType] : inspectorAvatars[inspector];
  const sizeClass = large ? 'size-32' : 'size-16';
  const widthClass = large ? 'w-32' : 'w-16';
  const colorClass =
    inspector === 'angry'
      ? 'ring-red-500'
      : inspector === 'happy'
        ? 'ring-green-500'
        : inspector === 'neutral'
          ? 'ring-orange-500'
          : avatarType
            ? 'ring-blue-500'
            : 'ring-white';
  return (
    <div
      className={cn(
        isDev && '__Avatar', // DEBUG
        hidden && 'pointer-events-none opacity-0 aria-hidden:hidden',
        widthClass,
        className,
      )}
    >
      {!hidden && (
        <img
          className={cn(
            isDev && '__Avatar_AvatarImage', // DEBUG
            sizeClass,
            'rounded-full bg-cover object-cover shadow-xl',
            isAnimating && 'animate-scale-pulse',
            large ? 'ring-6' : 'ring-4',
            colorClass,
            'pointer-events-none',
          )}
          src={imgLqip.src}
          style={{ backgroundImage: `url(${imgLqip.lqip})` }}
          onClick={() => setIsAnimating(true)}
          onAnimationEnd={() => setIsAnimating(false)}
        />
      )}
    </div>
  );
}
