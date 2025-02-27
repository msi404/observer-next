import * as React from 'react';
import { cn } from '@/app/_lib/utils';
import { Button, ButtonProps } from '@/app/_components/ui/button';
import { useRouter } from 'next/navigation';
import { usePageTrackerStore } from 'react-page-tracker';
import { ChevronRight } from 'lucide-react';

export const BackButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { backLink?: string }
>(({ className, onClick, children, backLink = '/', ...props }, ref) => {
  const router = useRouter();
  const isFirstPage = usePageTrackerStore((state: any) => state.isFirstPage);
  return (
    <Button
      className={cn('rounded-full print:hidden', className)}
      variant="outline"
      size="icon"
      ref={ref}
      onClick={(e) => {
        if (isFirstPage) {
          router.push(backLink);
        } else {
          router.back();
        }
        onClick?.(e);
      }}
      {...props}
    >
      {children ?? <ChevronRight />}
    </Button>
  );
});
BackButton.displayName = 'BackButton';
