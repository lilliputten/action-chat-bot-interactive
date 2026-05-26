import { cn } from '@/lib/helpers';
import { isDev } from '@/config';
import { Avatar, defaultInspectorMoodId, TInspectorMoodId } from '@/features/avatar';

interface TProps {
  className?: string;
  inspectorMood?: TInspectorMoodId;
  penaltyPoints?: number;
}

export function LeftSide(props: TProps) {
  const { className, inspectorMood = defaultInspectorMoodId, penaltyPoints } = props;
  return (
    <div
      className={cn(
        isDev && '__LeftSide', // DEBUG
        'flex flex-col items-center gap-6',
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
      <div
        className={cn(
          isDev && '__LeftSide_InspectorImage', // DEBUG
        )}
      >
        Штрафных баллов: {penaltyPoints || 0}
      </div>
    </div>
  );
}
