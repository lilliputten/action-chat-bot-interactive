import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import { defaultInspectorMoodId, TAvatarTypeId, TInspectorMoodId } from '../avatar';

interface TProps {
  className?: string;
  inspector?: TInspectorMoodId;
  avatarType?: TAvatarTypeId;
  hidden?: boolean;
  large?: boolean;
}

export function Avatar(props: TProps) {
  const { className, inspector = defaultInspectorMoodId, avatarType, large, hidden } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    setIsAnimating(true);
  }, [inspector, avatarType]);
  const imgUrl = avatarType
    ? `characters/user/user-face-${avatarType}.png`
    : `characters/inspector/inspector-face-${inspector}.png`;
  const sizeClass = large ? 'size-32' : 'size-16';
  const widthClass = large ? 'w-32' : 'w-16';
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
            'object-cover',
            'rounded-full',
            'shadow-xl',
            isAnimating && 'animate-scale-pulse',
            large ? 'border-6' : 'border-4',
            inspector === 'angry'
              ? 'border-red-500'
              : inspector === 'happy'
                ? 'border-green-500'
                : avatarType
                  ? 'border-orange-500'
                  : 'border-white',
            'pointer-events-none',
          )}
          src={imgUrl}
          onClick={() => setIsAnimating(true)}
          onAnimationEnd={() => setIsAnimating(false)}
        />
      )}
    </div>
  );
}
