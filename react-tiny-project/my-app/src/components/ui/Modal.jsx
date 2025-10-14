import { useEffect, useRef } from 'react';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, onConfirm }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-6">{children}</div>
                <div className="flex justify-end space-x-4">
                    <Button variant="secondary" onClick={onClose}>
                        取消
                    </Button>
                    {onConfirm && (
                        <Button variant="primary" onClick={onConfirm}>
                            确认
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}