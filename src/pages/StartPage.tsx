import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/helpers';
import userAvatarFemale from '@/assets/characters/user/user-female.png?lqip';
import userAvatarMale from '@/assets/characters/user/user-male.png?lqip';
import { StartLayout } from '@/components';
import { chatRoute, isDev } from '@/config';
import { avatarTypeIds, avatarTypes, TAvatarTypeId } from '@/features/avatar';
import { clearChatData } from '@/features/chat/helpers';
import { LQIP } from '@/global';

interface TProps {
  className?: string;
}

const userAvatars: Record<TAvatarTypeId, LQIP> = {
  male: userAvatarMale,
  female: userAvatarFemale,
};

export function StartPage(props: TProps) {
  const { className } = props;

  const [selectedAvatarId, setSelectedAvatarId] = React.useState<TAvatarTypeId | undefined>(() => {
    const saved = localStorage.getItem('selectedAvatarId') as TAvatarTypeId | null;
    return saved || undefined;
  });
  const [animatingAvatar, setAnimatingAvatar] = React.useState<TAvatarTypeId | undefined>();

  const startAllowed = !!selectedAvatarId;

  const navigate = useNavigate();

  return (
    <StartLayout
      className={cn(
        isDev && '__StartPage', // DEBUG
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__StartPage_Content', // DEBUG
          // 'content-truncate',
          'flex flex-col items-stretch justify-center gap-8',
        )}
      >
        <h2 className="m-0 text-center">Выберите аватар:</h2>
        <div
          className={cn(
            isDev && '__StartPage_Avatars', // DEBUG
            // 'content-truncate',
            'flex flex-wrap items-center justify-center gap-8',
          )}
        >
          {avatarTypeIds.map((id) => (
            <div
              key={id}
              className={cn(
                isDev && '__StartPage_Avatar', // DEBUG
                'group/avatar',
                'content-truncate flex flex-col items-center justify-center gap-4',
                'border-4 border-dashed border-transparent',
                selectedAvatarId === id && 'border-white',
                'hover:scale-102',
                'bg-sky-800/20',
                'hover:bg-sky-800/50',
                'active:bg-sky-800/80',
                animatingAvatar === id && 'animate-scale-pulse',
                'rounded-2xl p-4',
                'transition-all',
                'cursor-pointer',
                'select-none',
              )}
              onClick={() => {
                setSelectedAvatarId(id);
                setAnimatingAvatar(id);
                // Store to the localStorage
                localStorage.setItem('selectedAvatarId', id);
              }}
            >
              <img
                className={cn(
                  isDev && '__StartPage_InspectorImage', // DEBUG
                  'size-40 object-cover',
                  'rounded-xl',
                  'transition',
                  'pointer-events-none',
                  'bg-cover',
                )}
                src={userAvatars[id].src}
                style={{ backgroundImage: `url(${userAvatars[id].lqip})` }}
                // Animate on event
                onClick={() => setAnimatingAvatar(id)}
                onAnimationEnd={() =>
                  setAnimatingAvatar((currId) => (currId === id ? undefined : currId))
                }
              />

              <div>{avatarTypes[id]}</div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            isDev && '__StartPage_Actions', // DEBUG
            'box-border flex flex-wrap items-center gap-4',
          )}
        >
          {/*
          <div
            className={cn(
              isDev && '__StartPage_Action_Back', // DEBUG
              'btn-base btn-large shrink-0',
              'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
            )}
            onClick={() => navigate(rootRoute)}
          >
            <ChevronLeft className="size-4 shrink-0" />
            <span className="truncate">Назад</span>
          </div>
          */}
          <div
            className={cn(
              isDev && '__StartPage_Action_Start', // DEBUG
              'btn-base btn-large flex-1',
              startAllowed && 'bg-green-500 hover:bg-green-600 active:bg-green-700',
              !startAllowed && 'disabled border border-white/50',
            )}
            onClick={() => {
              // Clear all possible previous data...
              clearChatData();
              // Navigate to the next page...
              navigate(chatRoute);
            }}
          >
            <Play className="size-4 shrink-0" />
            <span className="truncate">Начать</span>
          </div>
        </div>
      </div>
    </StartLayout>
  );
}
