import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

interface TProps {
  className?: string;
  isUser?: boolean;
  children: TReactNode;
  when?: Date;
}

export function ChatNode(props: TProps) {
  const { className, isUser } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    // Animate on mount
    setIsAnimating(true);
  }, []);
  return (
    <div
      className={cn(
        isDev && '__ChatNode', // DEBUG
        className,
      )}
    >
      <img
        className={cn(
          isDev && '__ChatNode_AvatarImage', // DEBUG
          'size-36 object-cover',
          'rounded-full',
          'shadow-xl',
          isAnimating && 'animate-scale-pulse',
          'border-6',
          'pointer-events-none',
        )}
        src={`characters/inspector/inspector-face-${inspectorMood}.png`}
        // Animate on event
        onClick={() => setIsAnimating(true)}
        onAnimationEnd={() => setIsAnimating(false)}
      />
    </div>
  );
}

