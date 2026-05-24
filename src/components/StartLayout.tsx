import { preload } from 'react-dom';

import { cn } from '@/lib/helpers';
import bgImg from '@/assets/bg/bg-image-03.jpg';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

interface TProps {
  className?: string;
  children: TReactNode;
}

export function StartLayout(props: TProps) {
  const { className, children } = props;

  preload(bgImg, { as: 'image' });

  return (
    <div
      className={cn(
        isDev && '__StartLayout', // DEBUG
        'flex size-full flex-1 flex-row',
        'overflow-hidden',
        'relative',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__StartLayout_BackgroundImage', // DEBUG
          'absolute inset-0',
          'bg-cover bg-center',
          'opacity-10',
          'z-0',
        )}
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div
        className={cn(
          isDev && '__StartLayout_Main', // DEBUG
          'overflow-hidden',
          'flex w-full flex-1 flex-col',
          'rounded-md',
          'z-1',
        )}
      >
        <div
          className={cn(
            isDev && '__StartLayout_ScrollContainer', // DEBUG
            'scrollbar-brand overflow-auto',
            'flex w-full flex-1 flex-col',
          )}
        >
          <div
            className={cn(
              isDev && '__StartLayout_ScrollHolder', // DEBUG
              'flex flex-1 flex-col items-center justify-center gap-4',
              'p-6',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
