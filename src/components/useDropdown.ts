import { useState, useRef, useEffect } from "react";

type UseDropdownProps<T> = {
  onChange?: (value: T) => void;
};

export default function useDropdown<T>(props?: UseDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
    props?.onChange?.(option);
  };

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    selectedOption,
    dropdownRef,
    handleSelect,
    toggle,
    close,
    open,
  };
}
