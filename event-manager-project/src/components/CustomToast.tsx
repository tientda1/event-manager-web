import React from 'react';
import { toast } from 'react-toastify';

interface CustomToastProps {
  type: 'error' | 'success';
  messages: string[];
}

const CustomToast: React.FC<CustomToastProps> = ({ type, messages }) => {
  return (
    <div className={`custom-toast custom-toast--${type}`}>
      <div className="custom-toast__icon">
        {type === 'error' ? '−' : '✓'}
      </div>
      <div className="custom-toast__content">
        {type === 'error' && (
          <div className="custom-toast__title">
            Error
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className="custom-toast__message">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export const showErrorToast = (messages: string[]) => {
  toast.error(<CustomToast type="error" messages={messages} />, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(<CustomToast type="success" messages={[message]} />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
