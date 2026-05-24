import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/helpers';
import inspectorCharacterLqip from '@/assets/characters/inspector/inspector-character.png?lqip';
import { StartLayout } from '@/components';
import { isDev, startRoute } from '@/config';
import { clearChatData } from '@/features/chat/helpers';

interface TProps {
  className?: string;
}

export function IntroPage(props: TProps) {
  const { className } = props;

  const navigate = useNavigate();

  return (
    <StartLayout
      className={cn(
        isDev && '__IntroPage', // DEBUG
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__IntroPage_Content', // DEBUG
          // 'content-truncate',
          'flex flex-col items-stretch justify-center gap-6',
          'max-w-2xl',
        )}
      >
        <div
          className={cn(
            isDev && '__IntroPage_Intro', // DEBUG
            'flex flex-col gap-4 text-center',
          )}
        >
          <img
            className={cn(
              isDev && '__IntroPage_InspectorImage', // DEBUG
              'mx-auto size-36 object-cover',
              'rounded-full',
              'ring-6 ring-white',
              'transition',
              'pointer-events-none',
              'bg-cover',
            )}
            style={{ backgroundImage: `url(${inspectorCharacterLqip.lqip})` }}
            src={inspectorCharacterLqip.src}
          />
          <h2 className="m-0">
            Репетиция разговора с инспектором Росздравнадзора о хранении лекарств в вашей аптеке
          </h2>
          <p className="m-0">
            Петр Александрович – виртуальный аудитор Росздравнадзора. Он будет задавать вам
            каверзные вопросы о хранении лекарств в аптеке и оценивать ваши ответы. За каждое грубое
            нарушение правил хранения он запишет вам два штрафных балла, а за недочеты – один балл.
            Если вы наберете больше 13 баллов, то не пройдете проверку. Петр Александрович выпишет
            предписание и штраф. Постарайтесь этого не допустить.
          </p>
        </div>
        <div
          className={cn(
            isDev && '__IntroPage_Actions', // DEBUG
            'box-border flex flex-wrap items-center justify-center gap-8',
          )}
        >
          <div
            className={cn(
              isDev && '__IntroPage_Action', // DEBUG
              'btn-base btn-large flex-1',
              'bg-green-500 hover:bg-green-600 active:bg-green-700',
            )}
            onClick={() => {
              // Clear all possible previous data...
              clearChatData();
              // Navigate to the next page...
              navigate(startRoute);
            }}
          >
            <ChevronRight className="size-4 shrink-0" />
            <span className="truncate">Дальше</span>
          </div>
        </div>
      </div>
    </StartLayout>
  );
}
