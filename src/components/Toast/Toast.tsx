import { useEffect, useRef } from 'react';
import type { ToastType, ToastProps } from './Toast.types';

const palette: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-300 text-emerald-900',
  info: 'bg-blue-50 border-blue-300 text-blue-900',
  warning: 'bg-amber-50 border-amber-300 text-amber-900',
  error: 'bg-red-50 border-red-300 text-red-900',
};

export default function Toast({
  open,
  message,
  type = 'info',
  duration = 3000,
  closable = true,
  onClose,
}: ToastProps) {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    if (duration > 0) {
      timerRef.current = window.setTimeout(() => onClose?.(), duration);
    }
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, duration, onClose]);

  return (
    <div
      className={[
        'pointer-events-auto mb-2 w-80 rounded-xl border p-3 shadow-lg transition-all',
        palette[type],
        open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-current/60" />
        <div className="text-sm">{message}</div>
        {closable && (
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1 text-current/70 hover:bg-black/5"
            aria-label="Close notification"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
