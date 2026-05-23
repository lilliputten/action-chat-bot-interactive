import { cn } from '@/lib/helpers';
import { isDev } from '@/config';
import { Avatar, defaultInspectorMoodId, TInspectorMoodId } from '@/features/avatar';

interface TProps {
  className?: string;
  inspectorMood?: TInspectorMoodId;
}

export function LeftSide(props: TProps) {
  const { className, inspectorMood = defaultInspectorMoodId } = props;
  return (
    <div
      className={cn(
        isDev && '__LeftSide', // DEBUG
        className,
      )}
    >
      <Avatar
        className={cn(
          isDev && '__LeftSide_InspectorImage', // DEBUG
        )}
        inspector={inspectorMood}
        large
      />
    </div>
  );
}
