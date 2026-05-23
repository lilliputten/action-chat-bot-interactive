import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

interface TProps {
  className?: string;
  sidePanelClassName?: string;
  children: TReactNode;
  leftContent?: TReactNode;
  rightContent?: TReactNode;
  setScrollBottom?: (f: () => void) => void;
}

export function ChatLayout(props: TProps) {
  const { className, sidePanelClassName, children, leftContent, rightContent, setScrollBottom } =
    props;

  const bottomRef = React.useRef<HTMLDivElement>(null);

  const scrollBottom = React.useCallback(() => {
    // setTimeout(() => {
    requestAnimationFrame(() => {
      console.log('[ChatLayout:scroll]');
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    // }, 3000);
  }, [bottomRef]);

  React.useEffect(() => {
    if (setScrollBottom) {
      setScrollBottom(scrollBottom);
    }
  }, [scrollBottom, setScrollBottom]);

  /** Left and right panel styles */
  const sideBarClassName = cn(
    isDev && '__ChatLayout_Sidebar', // DEBUG
    'flex flex-col items-center justify-center gap-4',
    'w-[23%]',
    'max-sm:hidden', // Don't show side panels on small screens
    'z-1',
    sidePanelClassName,
  );

  return (
    <div
      className={cn(
        isDev && '__ChatLayout', // DEBUG
        'flex h-full flex-1 flex-row',
        'overflow-hidden',
        'relative',
        'bg-linear-[135deg] from-sky-500/70 to-sky-800/70',
        'gap-6 p-6',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__ChatLayout_BackgroundImage', // DEBUG
          'absolute inset-0',
          'bg-[url(bg-image-03.jpg)] bg-cover bg-center',
          'opacity-10',
          'z-0',
        )}
      />
      {!!leftContent && (
        <div
          className={cn(
            isDev && '__ChatLayout_Left', // DEBUG
            sideBarClassName,
          )}
        >
          {leftContent}
        </div>
      )}
      <div
        className={cn(
          isDev && '__ChatLayout_Main', // DEBUG
          'overflow-hidden',
          'flex w-full flex-1 flex-col',
          'rounded-2xl',
          'z-1',
          'bg-sky-800/80',
          'border-1 border-sky-800',
          'shadow-xl',
        )}
      >
        <div
          className={cn(
            isDev && '__ChatLayout_ScrollContainer', // DEBUG
            'scrollbar-brand overflow-auto',
            'flex w-full flex-1 flex-col',
            'z-1',
          )}
        >
          <div
            className={cn(
              isDev && '__ChatLayout_ScrollHolder', // DEBUG
              'flex flex-1 flex-col items-center justify-center gap-4',
              'px-6',
            )}
          >
            {children}
            <div
              ref={bottomRef}
              className={cn(
                isDev && '__ChatLayout_ScrollBottom', // DEBUG
                'h-2 w-full',
              )}
            />
          </div>
        </div>
      </div>
      {!!rightContent && (
        <div
          className={cn(
            isDev && '__ChatLayout_Right', // DEBUG
            sideBarClassName,
          )}
        >
          {rightContent}
        </div>
      )}
    </div>
  );
}
