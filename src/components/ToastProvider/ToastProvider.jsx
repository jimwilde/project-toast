import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = createContext();

export const useToasts = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEscapeKey(() => setToasts([]));

  const addToast = useCallback((toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  }, []);

  const removeToast = useCallback(
    (id) => {
      setToasts(toasts.filter(({ id: _id }) => id !== _id));
    },
    [toasts]
  );

  const value = useMemo(
    () => ({ toasts, addToast, removeToast, setToasts }),
    [addToast, removeToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
