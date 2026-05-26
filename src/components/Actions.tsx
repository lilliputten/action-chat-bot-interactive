import React from 'react';
import { Maximize, Minimize, RefreshCw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import screenfull from 'screenfull';

import { chatRoute, isDev, resultsRoute, rootRoute } from '@/config';
import { clearChatData } from '@/features/chat/helpers';
import { cn } from '@/lib';

interface TActionsProps {
  className?: string;
}

export function Actions(props: TActionsProps) {
  const { className } = props;
  const [isFullscreen, setFullscreen] = React.useState(false);

  const { pathname } = useLocation();
  const isRoot = !pathname || pathname === rootRoute;
  const isResults = pathname === resultsRoute;
  const isChat = pathname === chatRoute;

  const showStasrtOverButton = !(isRoot || isResults);

  const navigate = useNavigate();

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  const FullScreenIcon = isFullscreen ? Minimize : Maximize;

  React.useEffect(() => {
    if (isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  }, [isFullscreen]);

  return (
    <div
      className={cn(
        isDev && '__Actions', // DEBUG
        'fixed',
        'select-none',
        'bottom-1',
        'h-[3.5em]',
        'flex items-stretch justify-center gap-2',
        'z-20',
        'left-[50%] -translate-x-1/2',
        isChat && 'sm:bottom-4 sm:left-4.5 sm:w-[20%] sm:min-w-40 sm:translate-none',
        className,
      )}
    >
      {showStasrtOverButton && (
        <NavIcon
          className={cn(
            isDev && '__Actions_Fullscreen', // DEBUG
          )}
          title="Начать заново"
          onClick={() => {
            // Clear all possible previous data...
            clearChatData();
            // Navigate to the intor page...
            navigate(rootRoute);
          }}
        >
          <RefreshCw />
        </NavIcon>
      )}
      <NavIcon
        className={cn(
          isDev && '__Actions_Fullscreen', // DEBUG
        )}
        title="Полноэкранный режим"
        onClick={toggleFullscreen}
      >
        <FullScreenIcon />
      </NavIcon>
    </div>
  );
}

interface TIconProps {
  onClick: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function NavIcon(props: TIconProps) {
  const { onClick, title, className, children, disabled } = props;
  return (
    <div
      className={cn(
        isDev && '__Actions_NavIcon', // DEBUG
        'flex items-center justify-center',
        'size-[2em]',
        'text-white',
        'rounded-full shadow-lg/30',
        'transition',
        'cursor-pointer',
        'opacity-70',
        'hover:scale-110 hover:opacity-100',
        'p-2',
        'bg-blue-700 active:bg-blue-800',
        disabled && 'disabled pointer-events-none opacity-25',
        className,
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
