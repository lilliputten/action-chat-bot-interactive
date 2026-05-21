import React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/helpers';
import { StartLayout } from '@/components';
import { isDev } from '@/config';
import { avatarTypeIds, avatarTypes, TAvatarTypeId } from '@/features/avatar/types';

interface TProps {
  className?: string;
}

export function StartPage(props: TProps) {
  const { className } = props;

  const [selectedAvatarId, setSelectedAvatarId] = React.useState<TAvatarTypeId | undefined>();
  const [animatingAvatar, setAnimatingAvatar] = React.useState<TAvatarTypeId | undefined>();
  const [name, setName] = React.useState<string>('');

  const startAllowed = !!selectedAvatarId && !!name;

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
                // 'hover:opacity-85',
              )}
              onClick={() => {
                setSelectedAvatarId(id);
                setAnimatingAvatar(id);
              }}
            >
              <img
                className={cn(
                  isDev && '__LeftSide_InspectorImage', // DEBUG
                  'size-48 object-cover',
                  'rounded-xl',
                  // 'shadow-xl',
                  'transition',
                  'pointer-events-none',
                  // 'group-hover/avatar:scale-105',
                )}
                src={`characters/user/user-${id}.png`}
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
        <hr className="w-full border-white" />
        {/*
        <h2 className="text-center">Введите имя:</h2>
        */}
        <div
          className={cn(
            isDev && '__StartPage_Name', // DEBUG
            // 'content-truncate',
            'box-border flex flex-wrap items-center justify-center gap-8',
          )}
        >
          <input
            type="text"
            className={cn(
              isDev && '__StartPage_Actions', // DEBUG
              'input w-full rounded-md border border-sky-600 bg-white text-gray-900 placeholder-gray-400',
              'ring-2 ring-transparent',
              'focus:border-sky-300 focus:ring-4 focus:ring-sky-400 focus:outline-none',
              'hover:ring-sky-400',
              'transition',
              'py-0!',
              'text-center text-xl',
            )}
            placeholder="Введите ваше имя"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            // defaultValue="Аномим"
          />
        </div>
        <div
          className={cn(
            isDev && '__StartPage_Actions', // DEBUG
            'box-border flex flex-wrap items-center justify-center gap-8',
          )}
        >
          <div
            className={cn(
              isDev && '__StartPage_Action', // DEBUG
              'btn-base flex w-full items-center justify-center',
              'text-xl font-bold',
              'py-6',
              'cursor-pointer select-none',
              startAllowed && 'bg-green-500 hover:bg-green-600 active:bg-green-700',
              !startAllowed && 'disabled',
            )}
          >
            <Check className="size-6 shrink-0" />
            <span className="truncate">Начать</span>
          </div>
        </div>
      </div>
    </StartLayout>
  );
}
