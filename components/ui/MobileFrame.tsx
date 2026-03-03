import React, { forwardRef } from 'react';

export const MobileFrame = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={`relative w-[260px] h-[540px] rounded-[2.5rem] border-4 border-neutral-200 dark:border-neutral-700 bg-neutral-900 shadow-2xl overflow-hidden flex items-center justify-center ${className}`}
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
    >
      {/* Top notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-800 rounded-b-2xl z-10 mt-1" />
      {/* Content (screen) */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {children}
      </div>
    </div>
  )
);

MobileFrame.displayName = 'MobileFrame';
