import { useState, useEffect, useRef } from 'react';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(targetNode)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return { isOpen, toggleDropdown, dropdownRef };
};
