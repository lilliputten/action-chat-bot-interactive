import React from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/helpers';
import { ChatLayout, LeftSide } from '@/components';
import { initChatDelay, isDev, resultsRoute, tickDelay } from '@/config';
import { defaultInspectorMoodId, TInspectorMoodId } from '@/features/avatar';
import { chatDB, ChatNode, LastChatNode, TChatItem } from '@/features/chat';
import {
  defaultScenarioItemId,
  scenario,
  scenarioItemIds,
  TScenarioItemId,
  TScenarioStats,
} from '@/features/scenario';
import { TTimeoutHandler } from '@/lib';

interface TProps {
  className?: string;
}

interface TMemo {
  inited?: boolean;
  // tickTimeoutHandler?: TTimeoutHandler;
  inspectorMood?: TInspectorMoodId;
  lastChatItem?: TChatItem;
}

export function ChatPage(props: TProps) {
  const { className } = props;

  const memo = React.useMemo<TMemo>(() => ({}), []);

  const navigate = useNavigate();

  const [tick, setTick] = React.useState<number>(() => Date.now());

  const [inited, setInited] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  const [scenarioId, setScenarioId] = React.useState<TScenarioItemId | undefined>();

  // Effect: Restore scenarioId
  React.useEffect(() => {
    // Try to restore a chat history...
    let scenarioId = localStorage.getItem('scenarioId') as TScenarioItemId | undefined;
    if (!scenarioId || !scenarioItemIds.includes(scenarioId)) {
      scenarioId = defaultScenarioItemId;
    }
    setScenarioId(scenarioId);
  }, []);

  // State: Chat history
  const [chatHistory, setChatHistory] = React.useState<TChatItem[]>([]);
  const addChatItem = React.useCallback((chatItem: TChatItem) => {
    setChatHistory((chatHistory) => {
      // Check for duplicate errors
      const ids = new Set(chatHistory.map(({ scenarioId }) => scenarioId));
      if (chatItem.scenarioId && ids.has(chatItem.scenarioId)) {
        const message = `The chat history record for the scenario item '${chatItem.scenarioId}' has been already existed`;
        // eslint-disable-next-line no-console
        console.warn('[LastChatNode:addChatItem]', message, {
          chatHistory,
        });
        // debugger; // eslint-disable-line no-debugger
        return chatHistory;
      }
      /* // DEBUG
       * console.log('[ChatPage:addChatItem] Before add', {
       *   chatItem,
       *   ids,
       *   chatHistory,
       * });
       */
      chatDB
        .add(chatItem)
        /* // DEBUG
         * .then(() => {
         *   console.log('[ChatPage:addChatItem] Added', {
         *     chatItem,
         *     ids,
         *     chatHistory,
         *   });
         * })
         */
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('[ChatPage:addChatItem]', {
            error,
            chatItem,
            ids,
            chatHistory,
          });
          // debugger; // eslint-disable-line no-debugger
        });
      return chatHistory.concat(chatItem);
    });
  }, []);
  const lastChatItem: TChatItem | undefined = chatHistory?.[chatHistory?.length - 1];
  memo.lastChatItem = lastChatItem;
  const inspectorMood = lastChatItem?.inspector; // || defaultInspectorMoodId;
  memo.inspectorMood = inspectorMood;
  // Callback: Restore chatHistory...
  const fetchHistory = React.useCallback(async () => {
    try {
      const items = await chatDB.getAll();
      setChatHistory((chatHistory) => {
        const ids = new Set(chatHistory.map(({ scenarioId }) => scenarioId));
        return chatHistory.concat(
          ...items.filter(({ scenarioId }) => !scenarioId || !ids.has(scenarioId)),
        );
      });
      setInited(true);
      memo.inited = true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[ChatPage:Callback: Restore chatHistory]', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
    }
  }, [memo]);
  React.useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // State: Chat stats
  const [chatStats, setChatStats] = React.useState<TScenarioStats>(() => {
    const jsonStr = localStorage.getItem('chatStats');
    try {
      if (jsonStr) {
        const chatStats = JSON.parse(jsonStr);
        return chatStats;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[ChatPage:Effect: Restore chat stats] Cannot parse saved data', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
    }
    // Return initial stats
    return {
      points: 0,
      started: Date.now(),
    };
  });
  // Effect: Save chatStats...
  React.useEffect(() => {
    localStorage.setItem('chatStats', JSON.stringify(chatStats));
  }, [chatStats]);

  // Effect: Initialize tick timer
  React.useEffect(() => {
    const tickIntervalHandler = setInterval(() => {
      const tick = Date.now();
      setTick(tick);
    }, tickDelay);
    let initTimeoutHandler: TTimeoutHandler | undefined = setTimeout(() => {
      initTimeoutHandler = undefined;
      // XXX
      setInited(true);
      memo.inited = true;
    }, initChatDelay);
    return () => {
      clearInterval(tickIntervalHandler);
      if (initTimeoutHandler) {
        clearTimeout(initTimeoutHandler);
      }
    };
  }, [memo]);

  // Effect: Add a new scenario node to the chat history, save scenario id to localStorage
  React.useEffect(() => {
    // Is there a scenario id and is it initialized aleady?
    if (!scenarioId || !inited) {
      return;
    }
    localStorage.setItem('scenarioId', scenarioId);
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
    addChatItem(chatItem);
  }, [inited, memo, scenarioId, addChatItem]);

  const leftContent = <LeftSide inspectorMood={inspectorMood} penaltyPoints={chatStats.points} />;

  const goToResults = React.useCallback(() => {
    navigate(resultsRoute);
  }, [navigate]);

  const [scrollBottom, setScrollBottom] = React.useState<() => void | undefined>();
  const setScrollBottomCallback = React.useCallback(
    (f: () => void) => setScrollBottom(() => f),
    [],
  );
  React.useEffect(() => {
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
            addChatItem={addChatItem}
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
