import { useState, useRef, useEffect } from "react";

type UseDropdownProps<T> = {
  options: T[];
  onChange?: (value: T) => void;
};

export default function useDropdown<T>(props: UseDropdownProps<T>) {
  const { options, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const highlightedIndexRef = useRef(highlightedIndex);
  highlightedIndexRef.current = highlightedIndex;
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
    onChange?.(option);
  };

  useEffect(() => {
    if (!isOpen) return;

    // hilight no item untill keyboard navigation is used
    setHighlightedIndex(-1);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndexRef.current >= 0) {
            handleSelect(options[highlightedIndexRef.current]);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    const element = dropdownRef.current;
    element?.addEventListener("keydown", handleKeyDown);

    return () => {
      element?.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, options]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    selectedOption,
    highlightedIndex,
    setHighlightedIndex,
    dropdownRef,
    handleSelect,
    toggle,
    close,
    open,
  };
}
