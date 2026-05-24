import { cn, TDateLike } from '@/lib/helpers';
import { MarkdownText } from '@/components';
import { isDev } from '@/config';

import { Avatar, defaultInspectorMoodId } from '../avatar';
import { ChatBubble } from './ChatBubble';
import { TChatItem } from './TChatItem';

interface TProps extends Omit<TChatItem, 'content' | 'when'> {
  onClick?: () => void;
  content: React.ReactNode | string;
  bubbleClassName?: string;
  bubbleContentClassName?: string;
  when?: TDateLike;
}

export function ChatNode(props: TProps) {
  const {
    className,
    bubbleClassName,
    bubbleContentClassName,
    content,
    when,
    inspector = defaultInspectorMoodId,
    user,
    follow,
    onClick,
  } = props;
  const isUser = !!user;
  return (
    <div
      className={cn(
        isDev && '__ChatNode', // DEBUG
        'flex items-start gap-2',
        'mt-6',
        follow && 'mt-1',
        isUser && 'flex-row-reverse',
        className,
      )}
      onClick={onClick}
    >
      <Avatar
        className={cn(
          isDev && '__ChatNode_Avatar', // DEBUG
          'max-xs:hidden shrink-0',
        )}
        inspector={inspector}
        avatarType={user}
        hidden={follow}
      />
      <ChatBubble
        className={cn(
          isDev && '__ChatNode_Bubble', // DEBUG
          bubbleClassName,
        )}
        bubbleContentClassName={bubbleContentClassName}
        inspector={inspector}
        user={user}
        when={when}
        follow={follow}
      >
        {typeof content === 'string' ? <MarkdownText>{content}</MarkdownText> : content}
      </ChatBubble>
    </div>
  );
}
