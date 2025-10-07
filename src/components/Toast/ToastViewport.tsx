import React from 'react';

export function ToastViewport({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden">
      {children}
    </div>
  );
}
