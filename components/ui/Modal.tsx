'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className={cn(
            'relative w-full max-w-4xl rounded-2xl bg-black shadow-2xl border border-white/10',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors rounded-full p-2 hover:bg-white/10 z-10"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
