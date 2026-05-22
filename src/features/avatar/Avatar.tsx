import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import { defaultInspectorMoodId, TAvatarTypeId, TInspectorMoodId } from '../avatar';

interface TProps {
  className?: string;
  inspectorMood?: TInspectorMoodId;
  avatarType?: TAvatarTypeId;
  large?: boolean;
}

export function Avatar(props: TProps) {
  const { className, inspectorMood = defaultInspectorMoodId, avatarType, large } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    setIsAnimating(true);
  }, [inspectorMood, avatarType]);
  const imgUrl = avatarType
    ? `characters/user/user-face-${avatarType}.png`
    : `characters/inspector/inspector-face-${inspectorMood}.png`;
  return (
    <div
      className={cn(
        isDev && '__Avatar', // DEBUG
        className,
      )}
    >
      <img
        className={cn(
          isDev && '__Avatar_AvatarImage', // DEBUG
          large ? 'size-32' : 'size-16',
          'object-cover',
          'rounded-full',
          'shadow-xl',
          isAnimating && 'animate-scale-pulse',
          large ? 'border-6' : 'border-4',
          avatarType
            ? 'border-blue-500'
            : inspectorMood === 'angry'
              ? 'border-red-500'
              : inspectorMood === 'happy'
                ? 'border-green-500'
                : 'border-white',
          'pointer-events-none',
        )}
        src={imgUrl}
        onClick={() => setIsAnimating(true)}
        onAnimationEnd={() => setIsAnimating(false)}
      />
    </div>
  );
}
