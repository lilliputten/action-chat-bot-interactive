import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

interface TProps {
  className?: string;
}

export function LeftSide(props: TProps) {
  const { className } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  React.useEffect(() => {
    // Animate on mount
    setIsAnimating(true);
  }, []);
  return (
    <div
      className={cn(
        isDev && '__LeftSide', // DEBUG
        className,
      )}
    >
      <img
        className={cn(
          isDev && '__LeftSide_InspectorImage', // DEBUG
          'size-48 object-cover',
          'rounded-full',
          'shadow-xl',
          isAnimating && 'animate-scale-pulse',
          'pointer-events-none',
        )}
        src="characters/inspector/inspector-face-neutral.png"
        // Animate on event
        onClick={() => setIsAnimating(true)}
        onAnimationEnd={() => setIsAnimating(false)}
      />
    </div>
  );
}
