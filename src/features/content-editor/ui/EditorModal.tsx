import { useEffect, useRef, type ReactNode } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Button from '@shared/ui/Button';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
  title: string;
  children: ReactNode;
}

const EditorModal: React.FC<EditorModalProps> = ({ isOpen, onClose, onSave, onReset, title, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const handleTab = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const backdropTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 300, friction: 26 },
  });

  const panelTransitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    leave: { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
    config: { tension: 300, friction: 26 },
  });

  return (
    <>
      {backdropTransitions((styles, show) =>
        show ? (
          <animated.div
            style={styles}
            className="fixed inset-0 z-50 bg-surface-lowest/80 backdrop-blur-xl"
            onClick={onClose}
          />
        ) : null
      )}

      {panelTransitions((styles, show) =>
        show ? (
          <animated.div
            style={styles}
            className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Editar ${title}`}
              className="bg-surface-container/90 backdrop-blur-2xl border border-on-surface/5 w-full max-w-lg pointer-events-auto flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-on-surface/5 flex-shrink-0">
                <span className="font-label uppercase tracking-[0.3rem] text-xs text-on-surface-variant">
                  {title}
                </span>
                <button
                  onClick={onClose}
                  className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-on-surface/5 flex items-center justify-between flex-shrink-0">
                <button
                  onClick={onReset}
                  className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Restablecer
                </button>
                <Button variant="primary" size="sm" onClick={onSave}>
                  Guardar
                </Button>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </>
  );
};

export default EditorModal;
