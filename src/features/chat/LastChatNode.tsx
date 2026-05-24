import React from 'react';

import { cn } from '@/lib/helpers';
import { MarkdownText } from '@/components';
import { addAnswerDelay, autoGoToDelay, isDev } from '@/config';
import { defaultAvatarTypeId, TAvatarTypeId, TInspectorMoodId } from '@/features/avatar';
import { ChatNode, TChatItem } from '@/features/chat';
import {
  scenario,
  TScenarioAnswer,
  TScenarioGoToId,
  TScenarioItemId,
  TScenarioStats,
} from '@/features/scenario';
import { TTimeoutHandler } from '@/lib';

interface TProps {
  className?: string;
  scenarioId: TScenarioItemId;
  addChatItem: (chatItem: TChatItem) => void;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  setScenarioId: React.Dispatch<React.SetStateAction<TScenarioItemId | undefined>>;
  setChatStats: React.Dispatch<React.SetStateAction<TScenarioStats>>;
  goToResults: () => void;
  scrollBottom?: () => void;
}

interface TMemo {
  waitingTimeoutHandler?: TTimeoutHandler;
  answers?: TScenarioAnswer[];
  answerIdx?: number;
  scenarioId?: TScenarioItemId;
}

export function LastChatNode(props: TProps) {
  const {
    className,
    scenarioId,
    addChatItem,
    setIsWaiting,
    setScenarioId,
    setChatStats,
    goToResults,
    scrollBottom,
  } = props;

  const memo = React.useMemo<TMemo>(() => ({}), []);

  const selectedAvatarId = React.useMemo(() => {
    return (localStorage.getItem('selectedAvatarId') || defaultAvatarTypeId) as TAvatarTypeId;
  }, []);

  // const [createdDate, setCreatedDate] = React.useState<number>(() => Date.now());

  const [answers, setAnswers] = React.useState<TScenarioAnswer[] | undefined>();
  memo.answers = answers;
  const [answerIdx, setAnswerIdx] = React.useState<number | undefined>();
  memo.answerIdx = answerIdx;

  const goToTheNextItem = React.useCallback(
    (goTo: TScenarioGoToId) => {
      setIsWaiting(true);
      memo.waitingTimeoutHandler = setTimeout(() => {
        memo.waitingTimeoutHandler = undefined;
        if (goTo === 'RESULTS') {
          goToResults();
        } else {
          setScenarioId(goTo);
        }
      }, autoGoToDelay);
    },
    [goToResults, memo, setIsWaiting, setScenarioId],
  );

  // Effect: Initialize
  React.useEffect(() => {
    if (scenarioId && memo.scenarioId !== scenarioId) {
      memo.scenarioId = scenarioId;
      // memo.scenarioId = scenarioId;
      if (memo.waitingTimeoutHandler) {
        clearTimeout(memo.waitingTimeoutHandler);
        memo.waitingTimeoutHandler = undefined;
      }
      // Reset state...
      setAnswers(undefined);
      setAnswerIdx(undefined);
      // Try to find scenario node...
      const scenarioNode = scenarioId && scenario[scenarioId];
      if (!scenarioNode) {
        return;
      }
      // setCreatedDate(Date.now());
      const { answers, goTo } = scenarioNode;
      if (!answers && !goTo) {
        const msg = `Not specified any of answers and goTo for the scenarion node '${scenarioId}'`;
        const error = new Error(msg);
        // eslint-disable-next-line no-console
        console.error('[LastChatNode:Effect: Initialize scenario node]', msg, {
          error,
          scenarioId,
          scenarioNode,
        });
        debugger; // eslint-disable-line no-debugger
        return;
      }
      if (answers && goTo) {
        const msg = `Specified both answers and goTo for the scenarion node '${scenarioId}'`;
        const error = new Error(msg);
        // eslint-disable-next-line no-console
        console.error('[LastChatNode:Effect: Initialize scenario node]', msg, {
          error,
          scenarioId,
          scenarioNode,
        });
        debugger; // eslint-disable-line no-debugger
        return;
      }
      if (goTo) {
        goToTheNextItem(goTo);
      } else if (answers?.length) {
        setIsWaiting(true);
        let answerIdx = 0;
        setAnswers(undefined);
        const addAnswer = () => {
          const answer = answers[answerIdx++];
          setAnswers((answers) => (answers || []).concat(answer));
          if (answerIdx < answers.length) {
            memo.waitingTimeoutHandler = setTimeout(addAnswer, addAnswerDelay);
          } else {
            setIsWaiting(false);
          }
        };
        memo.waitingTimeoutHandler = setTimeout(addAnswer, autoGoToDelay);
      } else {
        setIsWaiting(false);
      }
    }
  }, [memo, scenarioId, setIsWaiting, goToTheNextItem]);

  React.useEffect(() => {
    if (scrollBottom && answers?.length) {
      scrollBottom();
    }
  }, [answers, scrollBottom]);

  if (answers && answerIdx == undefined) {
    return (
      <>
        {answers.map((answer, idx) => {
          const content = (
            <div
              className={cn(
                isDev && '__LastChatNode_Answer_Content', // DEBUG
                'group/answer',
                'flex items-center gap-4',
              )}
            >
              <div
                className={cn(
                  isDev && '__LastChatNode_Answer_Content_Circle', // DEBUG
                  'flex size-6 shrink-0 items-center justify-center',
                  'rounded-full border border-gray-500/50',
                  'transition',
                  'bg-white/80',
                  'group-hover/answer:border-blue-500',
                  'group-hover/answer:bg-white',
                )}
              >
                <div
                  className={cn(
                    isDev && '__LastChatNode_Answer_Content_Dot', // DEBUG
                    'flex size-4 shrink-0 items-center justify-center',
                    'rounded-full bg-blue-500',
                    'opacity-0 transition',
                    'group-hover/answer:opacity-100',
                  )}
                />
              </div>
              <MarkdownText>{answer.text}</MarkdownText>
            </div>
          );
          return (
            <ChatNode
              key={`${scenarioId}-answer-${idx}`}
              className={cn(
                isDev && '__LastChatNode_Answer', // DEBUG
                !idx && 'mt-3',
                'cursor-pointer transition',
                'hover:opacity-80',
                'active:opacity-50',
                className,
              )}
              bubbleContentClassName="bg-blue-300"
              content={content}
              follow
              onClick={() => {
                const { reaction, goTo, points } = answer;
                if (!goTo) {
                  const msg = `No goTo provided for the scenario node answer '${scenarioId}:${idx}'`;
                  const error = new Error(msg);
                  // eslint-disable-next-line no-console
                  console.error('[LastChatNode]', msg, {
                    error,
                    answer,
                    scenarioId,
                  });
                  debugger; // eslint-disable-line no-debugger
                }
                const inspectorMood: TInspectorMoodId = !points
                  ? 'happy'
                  : points === 1
                    ? 'neutral'
                    : 'angry';
                const chatItem: TChatItem = {
                  scenarioId: `${scenarioId}-answer`,
                  content: answer.text,
                  when: Date.now(),
                  inspector: inspectorMood,
                  user: selectedAvatarId,
                };
                setChatStats((stats) => ({ ...stats, points: stats.points + (points || 0) }));
                setAnswerIdx(idx);
                addChatItem(chatItem);
                if (reaction) {
                  setIsWaiting(true);
                  memo.waitingTimeoutHandler = setTimeout(() => {
                    const chatItem: TChatItem = {
                      scenarioId: `${scenarioId}-answer-reaction`,
                      content: reaction,
                      when: Date.now(),
                      inspector: inspectorMood,
                    };
                    addChatItem(chatItem);
                    goToTheNextItem(goTo);
                  }, autoGoToDelay);
                } else {
                  goToTheNextItem(goTo);
                }
              }}
            />
          );
        })}
      </>
    );
  }

  return null;
}
