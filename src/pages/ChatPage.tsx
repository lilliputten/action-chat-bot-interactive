import React from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/helpers';
import { ChatLayout, LeftSide } from '@/components';
import { initChatDelay, isDev, resultsRoute, tickDelay } from '@/config';
import { defaultInspectorMoodId, TInspectorMoodId } from '@/features/avatar';
import { ChatNode, LastChatNode, TChatItem } from '@/features/chat';
import {
  defaultScenarioItemId,
  scenario,
  TScenarioItemId,
  TScenarioStats,
} from '@/features/scenario';
import { TTimeoutHandler } from '@/lib';

interface TProps {
  className?: string;
}

interface TMemo {
  waitingTimeoutHandler?: TTimeoutHandler;
  tickTimeoutHandler?: TTimeoutHandler;
  inspectorMood?: TInspectorMoodId;
  lastChatItem?: TChatItem;
  // initTimeoutHandler?: TTimeoutHandler;
}

export function ChatPage(props: TProps) {
  const { className } = props;

  const memo = React.useMemo<TMemo>(() => ({}), []);

  const [chatStats, setChatStats] = React.useState<TScenarioStats>(() => ({
    points: 0,
    started: Date.now(),
  }));

  React.useEffect(() => {
    const restoredStr = localStorage.getItem('chatStats');
    try {
      if (restoredStr) {
        const chatStats = JSON.parse(restoredStr);
        setChatStats(chatStats);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[ChatPage:Effect: Restore chat stats] Cannot parse saved data', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem('chatStats', JSON.stringify(chatStats));
  }, [chatStats]);

  const navigate = useNavigate();

  const [tick, setTick] = React.useState<number>(() => Date.now());

  const [inited, setInited] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  const [scenarioId, setScenarioId] = React.useState<TScenarioItemId | undefined>();

  const [chatHistory, setChatHistory] = React.useState<TChatItem[]>([]);
  const lastChatItem: TChatItem | undefined = chatHistory?.[chatHistory?.length - 1];
  memo.lastChatItem = lastChatItem;
  const inspectorMood = lastChatItem?.inspector; // || defaultInspectorMoodId;
  memo.inspectorMood = inspectorMood;

  React.useEffect(() => {
    // No scenario id yet
    if (!scenarioId) {
      return;
    }
    const scenarioNode = scenario[scenarioId];
    // Not found scenario node
    if (!scenarioNode) {
      const message = `Cannot find scenario node for the id '${scenarioId}'`;
      const error = new Error(message);
      // eslint-disable-next-line no-console
      console.error('[LastChatNode]', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
      return;
    }
    // Add the history item for the current scenario node...
    const { text } = scenarioNode;
    const chatItem: TChatItem = {
      // className,
      scenarioId,
      content: text,
      when: Date.now(),
      // Inspector mood
      inspector: memo.inspectorMood || defaultInspectorMoodId,
      // Use 'follow' mode if the previous chat item was from inspector too
      follow: !!memo.lastChatItem && !memo.lastChatItem?.user,
      // user
    };
    setChatHistory((history) => {
      // Check for duplicate errors
      if (history.find(({ scenarioId: id }) => id === scenarioId)) {
        const message = `The history record fdor the scenario item '${scenarioId}' has been already added`;
        // eslint-disable-next-line no-console
        console.warn('[LastChatNode]', message, {
          history,
          scenarioId,
        });
        // debugger; // eslint-disable-line no-debugger
        return history;
      }
      return history.concat(chatItem);
    });
  }, [memo, scenarioId]);

  // Effect: Initialize & restore data
  React.useEffect(() => {
    const tickIntervalHandler = setInterval(() => {
      const tick = Date.now();
      console.log('tick', tick);
      setTick(tick);
    }, tickDelay);
    let initTimeoutHandler: TTimeoutHandler | undefined = setTimeout(() => {
      initTimeoutHandler = undefined;
      // Try to restore a chat history...
      const restoredId = (localStorage.getItem('scenarioId') ||
        defaultScenarioItemId) as TScenarioItemId;
      setScenarioId(restoredId);
      const restoredStr = localStorage.getItem('chatHistory');
      let restoredHistory: TChatItem[] | undefined;
      try {
        if (restoredStr) {
          restoredHistory = JSON.parse(restoredStr);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[ChatPage:Effect: Restore chat history] Cannot parse saved history', {
          error,
        });
        debugger; // eslint-disable-line no-debugger
      }
      if (restoredHistory) {
        setChatHistory(restoredHistory);
      }
      setInited(true);
    }, initChatDelay);
    return () => {
      clearInterval(tickIntervalHandler);
      if (initTimeoutHandler) {
        clearTimeout(initTimeoutHandler);
      }
    };
  }, [memo]);

  const leftContent = <LeftSide inspectorMood={inspectorMood} />;

  const goToResults = React.useCallback(() => {
    navigate(resultsRoute);
  }, [navigate]);

  const [scrollBottom, setScrollBottom] = React.useState<() => void | undefined>();
  const setScrollBottomCallback = React.useCallback(
    (f: () => void) => setScrollBottom(() => f),
    [],
  );
  React.useEffect(() => {
    console.log('[ChatPage:scroll?]', {
      scrollBottom,
      chatHistory,
    });
    if (scrollBottom && chatHistory?.length) {
      scrollBottom();
    }
  }, [chatHistory, isWaiting, scrollBottom]);

  React.useEffect(() => {
    if (scrollBottom) {
      window.addEventListener('resize', scrollBottom);
      return () => window.removeEventListener('resize', scrollBottom);
    }
  }, [scrollBottom]);

  return (
    <ChatLayout
      data-tick={tick}
      className={cn(
        isDev && '__ChatPage', // DEBUG
        className,
      )}
      leftContent={leftContent}
      setScrollBottom={setScrollBottomCallback}
    >
      <div
        className={cn(
          isDev && '__ChatPage_Content', // DEBUG
          'flex w-full flex-col',
          // 'pb-6',
        )}
      >
        {chatHistory?.map((item, idx) => (
          <ChatNode key={`chat-item-${idx}`} {...item} />
        ))}
        {!!scenarioId && (
          <LastChatNode
            className={cn(
              isDev && '__ChatPage_LastChatNode', // DEBUG
            )}
            scenarioId={scenarioId}
            setChatHistory={setChatHistory}
            setIsWaiting={setIsWaiting}
            setScenarioId={setScenarioId}
            setChatStats={setChatStats}
            goToResults={goToResults}
            scrollBottom={scrollBottom}
          />
        )}
        {(!inited || isWaiting) && (
          <div
            className={cn(
              isDev && '__ChatPage_WaitingDots', // DEBUG
              'mx-auto mt-6 flex items-center space-x-1.5',
            )}
          >
            <div className="size-1.5 animate-pulse rounded-full bg-white"></div>
            <div className="size-1.5 animate-pulse rounded-full bg-white [animation-delay:200ms]"></div>
            <div className="size-1.5 animate-pulse rounded-full bg-white [animation-delay:400ms]"></div>
          </div>
        )}
      </div>
    </ChatLayout>
  );
}
