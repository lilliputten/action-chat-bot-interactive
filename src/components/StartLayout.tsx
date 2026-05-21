import { cn } from '@/lib/helpers';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

interface TProps {
  className?: string;
  children: TReactNode;
}

export function StartLayout(props: TProps) {
  const { className, children } = props;

  return (
    <div
      className={cn(
        isDev && '__StartLayout', // DEBUG
        'flex size-full flex-1 flex-row',
        'overflow-hidden',
        'relative',
        'bg-linear-[135deg] from-sky-500/70 to-sky-800/70',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__StartLayout_BackgroundImage', // DEBUG
          'absolute inset-0',
          'bg-[url(bg-image.jpg)] bg-cover bg-center',
          'opacity-40',
          'z-0',
        )}
      />
      <div
        className={cn(
          isDev && '__StartLayout_Main', // DEBUG
          'overflow-hidden',
          'flex w-full flex-1 flex-col',
          'rounded-md',
          'z-1',
          // 'bg-sky-800/80',
          // 'border-1 border-sky-800',
          // 'shadow-xl',
        )}
      >
        <div
          className={cn(
            isDev && '__StartLayout_ScrollContainer', // DEBUG
            'scrollbar-brand overflow-auto',
            'flex w-full flex-1 flex-col',
            'z-1',
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
