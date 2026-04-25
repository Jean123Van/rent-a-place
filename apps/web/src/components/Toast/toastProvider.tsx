import { createContext, useEffect, useRef, useState } from 'react';

type ToastType = 'success' | 'error';

type Toast = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextType = {
    addToast: (message: string, type: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<Toast | undefined>();
    const [showToast, setShowToast] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const removeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const addToast = (message: string, type: ToastType) => {
        const id = Date.now();

        // clear timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (removeRef.current) clearTimeout(removeRef.current);

        // reset state
        setShowToast(false);
        setToast({ id, message, type }); // 👈 mount new toast
    };

    useEffect(() => {
        if (!toast) return;

        // 👇 trigger animation in next frame (important)
        requestAnimationFrame(() => {
            setShowToast(true);
        });

        timeoutRef.current = setTimeout(() => {
            setShowToast(false);
        }, 10000);

        removeRef.current = setTimeout(() => {
            setToast(undefined);
        }, 10300);
    }, [toast]);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div
                style={{
                    position: 'fixed',
                    top: '40px',
                    right: '50%',
                    transform: 'translateX(50%)',
                    zIndex: 9999,
                }}
            >
                {toast && (
                    <div
                        key={toast.id}
                        style={{
                            border:
                                toast.type === 'error'
                                    ? '2px solid red'
                                    : '2px solid green',
                            borderRadius: '15px',
                            padding: '6px 8px',
                            fontSize: '15px',
                            color: toast.type === 'error' ? 'red' : 'green',
                            textAlign: 'center',

                            opacity: showToast ? 1 : 0,
                            transform: showToast
                                ? 'translateY(0px)'
                                : 'translateY(-10px)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {toast.message}
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
};
