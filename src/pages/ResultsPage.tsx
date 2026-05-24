import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/helpers';
import { StartLayout } from '@/components';
import { isDev, rootRoute } from '@/config';
import { Avatar, TInspectorMoodId } from '@/features/avatar';
import { clearChatData } from '@/features/chat/helpers';
import { TScenarioStats } from '@/features/scenario';

interface TProps {
  className?: string;
}

export function ResultsPage(props: TProps) {
  const { className } = props;

  const navigate = useNavigate();

  const chatStats = React.useMemo<TScenarioStats | undefined>(() => {
    const restoredStr = localStorage.getItem('chatStats');
    try {
      if (restoredStr) {
        const chatStats = JSON.parse(restoredStr);
        return chatStats;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[ResultsPage:Effect: Restore chat stats] Cannot parse saved data', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
    }
    return undefined;
  }, []);

  React.useEffect(() => {
    if (!chatStats) {
      navigate(rootRoute);
    }
  }, [chatStats, navigate]);

  const points = chatStats?.points || 0;
  const inspectorMood: TInspectorMoodId = !points ? 'happy' : points <= 12 ? 'neutral' : 'angry';

  return (
    <StartLayout
      className={cn(
        isDev && '__ResultsPage', // DEBUG
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__ResultsPage_Content', // DEBUG
          'flex flex-col items-stretch justify-center gap-6',
          'max-w-2xl',
        )}
      >
        <div
          className={cn(
            isDev && '__ResultsPage_Intro', // DEBUG
            'flex flex-col gap-4 text-center',
          )}
        >
          <Avatar
            className={cn(
              isDev && '__ResultsPage_InspectorImage', // DEBUG
              'mx-auto',
            )}
            inspector={inspectorMood}
            large
          />
          <h2 className="m-0">Результаты проверки</h2>
          <p className="m-0">
            <strong>Штрафные баллы:</strong> {points}.
          </p>
          {!points ? (
            <>
              <p className="m-0">
                <strong>Статус:</strong> ПРОВЕРКА ПРОЙДЕНА БЕЗ ЗАМЕЧАНИЙ.
              </p>
              <p className="m-0">
                <strong>Комментарий инспектора:</strong> Поздравляем! Ваша аптека полностью
                соответствует требованиям Росздравнадзора по хранению лекарственных средств.
              </p>
            </>
          ) : points <= 5 ? (
            <>
              <p className="m-0">
                <strong>Статус:</strong> ПРОВЕРКА ПРОЙДЕНА С ЗАМЕЧАНИЯМИ.
              </p>
              <p className="m-0">
                <strong>Комментарий инспектора:</strong> Аптека в целом готова, но требует доработки
                по отдельным пунктам. Выявленные нарушения не являются критическими, однако при
                повторной проверке могут стать основанием для предписания.
              </p>
              <p className="m-0">
                <strong>Совет:</strong> Изучите предыдущий урок курса заново, а затем пройдите
                проверку Петра Александровича еще раз.
              </p>
            </>
          ) : points <= 12 ? (
            <>
              <p className="m-0">
                <strong>Статус:</strong> ВЫЯВЛЕНЫ СУЩЕСТВЕННЫЕ НАРУШЕНИЯ.
              </p>
              <p className="m-0">
                <strong>Комментарий инспектора:</strong> В аптеке выявлены нарушения, которые
                указывают на недостаточный контроль системы хранения лекарственных препаратов. Часть
                процессов организована формально или не подтверждается документально. При реальной
                проверке такие нарушения могут привести к предписанию и внеплановому контролю.
              </p>
              <p className="m-0">
                <strong>Совет:</strong> Изучите предыдущий урок курса заново, а затем пройдите
                проверку Петра Александровича еще раз.
              </p>
            </>
          ) : (
            <>
              <p className="m-0">
                <strong>Статус:</strong> ПРОВЕРКА НЕ ПРОЙДЕНА.
              </p>
              <ul className="m-0 mx-auto text-left marker:text-red-500">
                <li className="">Аптека не соответствует требованиям Росздравнадзора.</li>
                <li className="">Будет составлен протокол об административном правонарушении.</li>
                <li className="">Размер штрафа может составить до 150 000 рублей.</li>
              </ul>
              <p className="m-0">
                <strong>Совет:</strong> Изучите предыдущий урок курса заново, а затем пройдите
                проверку Петра Александровича еще раз.
              </p>
            </>
          )}
        </div>
        <div
          className={cn(
            isDev && '__ResultsPage_Actions', // DEBUG
            'box-border flex flex-wrap items-center justify-center gap-8',
          )}
        >
          <div
            className={cn(
              isDev && '__ResultsPage_Action', // DEBUG
              'btn-base btn-large flex-1',
              'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
            )}
            onClick={() => {
              // Clear all possible previous data...
              clearChatData();
              // Navigate to the intor page...
              navigate(rootRoute);
            }}
          >
            <RefreshCw className="size-4 shrink-0" />
            <span className="truncate">Пройти проверку ещё раз</span>
          </div>
        </div>
      </div>
    </StartLayout>
  );
}
