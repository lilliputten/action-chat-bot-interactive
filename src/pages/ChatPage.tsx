import React from 'react';

import { cn } from '@/lib/helpers';
import { hoursAgo } from '@/lib/helpers/dates';
import { ChatLayout, LeftSide } from '@/components';
import { isDev } from '@/config';
import { TInspectorMoodId } from '@/features/avatar';
import { ChatNode } from '@/features/chat';

interface TProps {
  className?: string;
}

export function ChatPage(props: TProps) {
  const { className } = props;

  const [inspectorMood, setInspectorMood] = React.useState<TInspectorMoodId>('angry');

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
          'content-truncate flex w-full flex-col gap-4',
        )}
      >
        <ChatNode
          inspectorMood={inspectorMood}
          when={hoursAgo(5)}
          content={`
Test content

Test content. Extra long contennt text to test adaptive layout and text wrapping.
Long_unwrapping_text_to_test_clipping_feature
          `}
        />
        <ChatNode
          isUser
          inspectorMood={inspectorMood}
          when={hoursAgo(2)}
          content={`
Test content
          `}
        />
        {/*generateArray(50).map((idx) => (
          <div key={idx}>{idx + 1}</div>
        ))*/}
      </div>
    </ChatLayout>
  );
}
