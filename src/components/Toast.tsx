'use client';
import toast from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export const showToast = ({ message, type }: ToastProps) => {
  const toastConfig = {
    duration: 3000,
    style: {
      background: '#171F38',
      color: '#fff',
      border: type === 'success' ? '1px solid #22c55e' : '1px solid #ef4444',
      padding: '16px',
      fontSize: '16px',
      maxWidth: '400px',
      textAlign: 'center' as const,
    },
    iconTheme: {
      primary: type === 'success' ? '#22c55e' : '#ef4444',
      secondary: '#fff',
    },
    position: 'top-center' as const,
  };

  if (type === 'success') {
    return toast.success(message, toastConfig);
  } else if (type === 'error') {
    return toast.error(message, toastConfig);
  }
};

// Export the Toaster configuration
export const toasterConfig = {
  containerStyle: {
    top: 50,
    left: 20,
    right: 20,
    bottom: 20,
  },
};
