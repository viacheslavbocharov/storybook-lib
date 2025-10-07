export type InputProps = {
  type?: 'text' | 'password' | 'number';
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  onChange?: (v: string) => void;
  onClear?: () => void;
  label?: string;
  id?: string;
  error?: string;
  className?: string;
};
