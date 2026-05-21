import { isDev } from '@/config/env';
import { cn } from '@/lib/helpers';
import { TPropsWithChildrenAndClassName } from '@/lib/types';

export function MaxWidthWrapper(props: TPropsWithChildrenAndClassName) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        isDev && '__MaxWidthWrapper', // DEBUG
        className,
        'mx-auto max-w-4xl',
      )}
    >
      {children}
    </div>
  );
}
