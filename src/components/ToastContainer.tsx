import React from 'react';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: Array<{
    id: number;
    type: 'success' | 'error' | 'info';
    message: string;
  }>;
  onRemove: (id: number) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}