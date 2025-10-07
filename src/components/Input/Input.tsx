import React, { useId, useMemo, useState } from 'react';
import type {InputProps} from './Input.types';

export default function Input({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  clearable,
  disabled,
  label,
  id,
  error,
  className = '',
  onChange,
  onClear,
}: InputProps) {
  const inputId = useId();
  const htmlId = id ?? inputId;

  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string>(() =>
    defaultValue !== undefined ? String(defaultValue) : ''
  );
  const [showPwd, setShowPwd] = useState(false);

  const currentValue = isControlled ? String(value ?? '') : inner;

  const inputType = useMemo(() => {
    if (type !== 'password') return type;
    return showPwd ? 'text' : 'password';
  }, [type, showPwd]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) setInner(v);
    onChange?.(v);
  };

  const handleClear = () => {
    if (!isControlled) setInner('');
    onClear?.();
    onChange?.('');
  };

  return (
    <div className={`w-full ${disabled ? 'opacity-70' : ''}`}>
      {label && (
        <label
          htmlFor={htmlId}
          className="mb-1 block text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}

      <div
        className={[
          'relative flex items-center rounded-xl border',
          error ? 'border-red-400' : 'border-gray-300',
          'focus-within:ring-2 focus-within:ring-indigo-400',
          'bg-white',
        ].join(' ')}
      >
        <input
          id={htmlId}
          disabled={disabled}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={[
            'peer w-full rounded-xl bg-transparent px-3 py-2.5',
            'text-gray-900 placeholder:text-gray-400',
            'focus:outline-none',
            'pr-[84px]',
            className,
          ].join(' ')}
          inputMode={type === 'number' ? 'numeric' : undefined}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${htmlId}-error` : undefined}
        />

        {clearable && currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPwd ? (
              // Eye-off
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a18.22 18.22 0 014.09-5.49M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a18.5 18.5 0 01-2.87 4.11" />
                <path d="M1 1l22 22" />
              </svg>
            ) : (
              // Eye
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p id={`${htmlId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
