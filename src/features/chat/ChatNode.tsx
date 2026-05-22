import { cn } from '@/lib/helpers';
import { MarkdownText } from '@/components';
import { isDev } from '@/config';

import { Avatar, defaultInspectorMoodId } from '../avatar';
import { ChatBubble } from './ChatBubble';
import { TChatItem } from './TChatItem';

type TProps = TChatItem;

export function ChatNode(props: TProps) {
  const { className, content, when, inspector = defaultInspectorMoodId, user, follow } = props;
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
    >
      <Avatar
        className={cn(
          isDev && '__ChatNode_Avatar', // DEBUG
          'max-xs:hidden shrink-0',
          follow && 'pointer-events-none opacity-0 aria-hidden:hidden',
        )}
        inspectorMood={inspector}
        avatarType={user}
      />
      <ChatBubble
        className={cn(
          isDev && '__ChatNode_Bubble', // DEBUG
        )}
        user={user}
        when={when}
        follow={follow}
      >
        {typeof content === 'string' ? <MarkdownText>{content}</MarkdownText> : content}
      </ChatBubble>
    </div>
  );
}
