import { cn } from '@/lib/helpers';
import { relativeDateFormat, TDateLike } from '@/lib/helpers/dates';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

interface TProps {
  className?: string;
  isUser?: boolean;
  children: TReactNode;
  when?: TDateLike;
}

export function ChatBubble(props: TProps) {
  const { className, children, isUser, when } = props;
  const isInspector = !isUser;
  const bgColor = isInspector ? 'bg-slate-100' : 'bg-blue-600';
  const fillColor = isInspector ? 'fill-slate-100' : 'fill-blue-600';
  const textColor = isInspector ? 'text-slate-900' : 'text-white';
  return (
    <div
      className={cn(
        isDev && '__ChatBubble', // DEBUG
        'content-truncate',
        isInspector ? 'justify-start' : 'justify-end',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__ChatBubble', // DEBUG
          'relative',
          'max-w-lg',
          isInspector ? 'pl-3' : 'pr-3',
        )}
      >
        <div
          className={cn(
            isDev && '__ChatBubble_Content', // DEBUG
            'content-truncate',
            'card-content',
            'rounded-xl px-5 py-2',
            isInspector ? 'rounded-tl-none' : 'rounded-tr-sm',
            bgColor,
            textColor,
          )}
        >
          {children}
          {!!when && (
            <p
              className={cn(
                isDev && '__ChatBubble_Content_Date', // DEBUG
                'text-right text-sm opacity-50',
              )}
            >
              {relativeDateFormat(when)}
            </p>
          )}
        </div>
        <div
          aria-hidden="true"
          className={[
            isDev && '__ChatBubble_Tip', // DEBUG
            'absolute top-0 h-3 w-6',
            isInspector ? '-left-0' : '-right-0',
          ].join(' ')}
        >
          <svg viewBox="0 0 100 50" className="absolute top-0 w-full">
            <path
              d="M50,50c0-27.6,22.4-50,50-50H0C27.6,0,50,22.4,50,50"
              fill="red"
              className={fillColor}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
