import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import {
  defaultAvatarTypeId,
  defaultInspectorMoodId,
  TAvatarTypeId,
  TInspectorMoodId,
} from '../avatar';

interface TProps {
  className?: string;
  isUser?: boolean;
  inspectorMood?: TInspectorMoodId;
  avatarType?: TAvatarTypeId;
  large?: boolean;
}

export function Avatar(props: TProps) {
  const {
    className,
    isUser,
    inspectorMood = defaultInspectorMoodId,
    avatarType = defaultAvatarTypeId,
    large,
  } = props;
  const isInspector = !isUser;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    setIsAnimating(true);
  }, [inspectorMood, avatarType]);
  const imgUrl = isInspector
    ? `characters/inspector/inspector-face-${inspectorMood}.png`
    : `characters/user/user-face-${avatarType}.png`;
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
          large ? 'size-36' : 'size-12',
          'object-cover',
          'rounded-full',
          'shadow-xl',
          isAnimating && 'animate-scale-pulse',
          large ? 'border-6' : 'border-4',
          isUser
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
