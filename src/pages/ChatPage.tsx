import { cn, generateArray } from '@/lib/helpers';
import { ChatLayout, LeftSide } from '@/components';
import { isDev } from '@/config';

interface TProps {
  className?: string;
}

export function ChatPage(props: TProps) {
  const { className } = props;

  const leftContent = <LeftSide inspectorMood="neutral" />;

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
        {generateArray(50).map((idx) => (
          <div key={idx}>{idx + 1}</div>
        ))}
      </div>
    </ChatLayout>
  );
}
