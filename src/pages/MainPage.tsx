import React from 'react';

import { cn } from '@/lib/helpers';
import { ErrorLike } from '@/lib/types';
import { isDev } from '@/config';

interface TProps {
  className?: string;
}

export function MainPage(props: TProps) {
  const { className } = props;

  const [error, _setError] = React.useState<ErrorLike>();

  return (
    <div
      className={cn(
        isDev && '__MainPage', // DEBUG
        'flex w-full flex-col self-center',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__MainPage_Container', // DEBUG
          'content-truncate flex flex-col gap-4 p-6',
        )}
      >
        {!!error && (
          <div
            className={cn(
              isDev && '__MainPage_Error', // DEBUG
              'content-truncate rounded bg-red-500 p-3 text-sm text-white',
            )}
          >
            {String(error)}
          </div>
        )}
        <div>MainPage</div>
      </div>
      {/* <Actions /> */}
    </div>
  );
}
