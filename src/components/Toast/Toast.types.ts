export type ToastType = 'success' | 'info' | 'warning' | 'error';

export type ToastProps = {
  open: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
};