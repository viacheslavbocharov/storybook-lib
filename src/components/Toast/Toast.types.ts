export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastOptions = {
  id?: string;
  type?: ToastType;
  message: string;
  duration?: number;
  closable?: boolean;
};
