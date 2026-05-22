import React from 'react';

import { cn } from '@/lib/helpers';
import { hoursAgo } from '@/lib/helpers/dates';
import { ChatLayout, LeftSide } from '@/components';
import { isDev } from '@/config';
import { defaultInspectorMoodId } from '@/features/avatar';
import { ChatNode, TChatItem } from '@/features/chat';

interface TProps {
  className?: string;
}

const __demoChat: TChatItem[] = [
  {
    content: [
      'Test content',
      'Test content. Extra long content text to test adaptive layout and text wrapping. Long_unwrapping_text_to_test_clipping_feature',
    ].join('\n\n'),
    when: hoursAgo(5),
    inspector: 'angry',
  },
  {
    content: ['Test content'].join('\n\n'),
    when: hoursAgo(2),
    user: 'female',
    inspector: 'angry',
  },
  {
    content: ['Test content with the previous'].join('\n\n'),
    when: hoursAgo(1),
    user: 'female',
    inspector: 'angry',
    follow: true,
  },
];

export function ChatPage(props: TProps) {
  const { className } = props;

  const [chatItems, setChatItems] = React.useState<TChatItem[]>(__demoChat);
  const lastChatItem = chatItems[chatItems.length - 1];
  const inspectorMood = lastChatItem.inspector || defaultInspectorMoodId;

  const leftContent = <LeftSide inspectorMood={inspectorMood} />;

  return (
    <ChatLayout
      className={cn(
        isDev && '__ChatPage', // DEBUG
        className,
      )}
      leftContent={leftContent}
    >
      <div
        className={cn(
          isDev && '__ChatPage_Content', // DEBUG
          'flex w-full flex-col',
          'pb-6',
        )}
      >
        {chatItems.map((item, idx) => (
          <ChatNode key={`chat-item-${idx}`} {...item} />
        ))}
        {/*generateArray(50).map((idx) => (
          <div key={idx}>{idx + 1}</div>
        ))*/}
      </div>
    </ChatLayout>
  );
}
