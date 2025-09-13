import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar estados de toggle
 * Elimina duplicación de lógica de estado booleano
 */
export function useToggle(initialValue: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setValue = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  return {
    isOpen,
    toggle,
    open,
    close,
    setValue,
  };
}
