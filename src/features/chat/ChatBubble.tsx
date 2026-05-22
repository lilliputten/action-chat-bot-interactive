import { cn } from '@/lib/helpers';
import { relativeDateFormat } from '@/lib/helpers/dates';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

import { TChatItem } from './TChatItem';

interface TProps extends Pick<TChatItem, 'user' | 'when' | 'follow'> {
  className?: string;
  children: TReactNode;
}

export function ChatBubble(props: TProps) {
  const { className, children, user, when, follow } = props;
  const isUser = !!user;
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
          isInspector ? 'pl-4' : 'pr-4',
        )}
      >
        <div
          className={cn(
            isDev && '__ChatBubble_Content', // DEBUG
            'content-truncate',
            'card-content',
            'rounded-xl px-5 py-2',
            !follow && (isInspector ? 'rounded-tl-lg' : 'rounded-tr-lg'),
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
        {!follow && (
          <div
            aria-hidden="true"
            className={[
              isDev && '__ChatBubble_Tip', // DEBUG
              'absolute top-0 h-4 w-8',
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
        )}
      </div>
    </div>
  );
}
