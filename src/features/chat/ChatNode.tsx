import { cn } from '@/lib/helpers';
import { TDateLike } from '@/lib/helpers/dates';
import { isDev } from '@/config';
import { TReactNode } from '@/lib';

import {
  Avatar,
  defaultAvatarTypeId,
  defaultInspectorMoodId,
  TAvatarTypeId,
  TInspectorMoodId,
} from '../avatar';
import { ChatBubble } from './ChatBubble';

interface TProps {
  className?: string;
  children: TReactNode;
  isUser?: boolean;
  when?: TDateLike;
  inspectorMood?: TInspectorMoodId;
  avatarType?: TAvatarTypeId;
}

export function ChatNode(props: TProps) {
  const {
    className,
    children,
    isUser,
    when,
    inspectorMood = defaultInspectorMoodId,
    avatarType = defaultAvatarTypeId,
  } = props;
  return (
    <div
      className={cn(
        isDev && '__ChatNode', // DEBUG
        'flex items-start gap-2',
        isUser && 'flex-row-reverse',
        className,
      )}
    >
      <Avatar
        className={cn(
          isDev && '__ChatNode_Avatar', // DEBUG
          'shrink-0',
        )}
        inspectorMood={inspectorMood}
        avatarType={avatarType}
        isUser={isUser}
      />
      <ChatBubble
        className={cn(
          isDev && '__ChatNode_Bubble', // DEBUG
          // 'flex-1',
        )}
        isUser={isUser}
        when={when}
      >
        {children}
      </ChatBubble>
    </div>
  );
}
