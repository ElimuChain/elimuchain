import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
  };

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800'
  };

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 p-4 rounded-lg border ${backgrounds[type]} shadow-lg backdrop-blur-sm`}>
        {icons[type]}
        <p className="text-gray-900 dark:text-white">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Toast;