import { useState, useRef, useEffect } from "react";

type UseDropdownProps<T> = {
  options: T[];
  labelKey: keyof T;
  disabled?: boolean;
  onChange?: (value: T) => void;
  onCreateOption?: (inputValue: string) => T | void;
};

export default function useDropdown<T>(props: UseDropdownProps<T>) {
  const { options, labelKey, disabled, onChange, onCreateOption } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    String(option[labelKey]).toLowerCase().includes(inputValue.toLowerCase())
  );

  const showCreateOption =
    !!onCreateOption &&
    !!inputValue.trim() &&
    !filteredOptions.some(
      (item) =>
        String(item[labelKey]).toLowerCase() === inputValue.trim().toLowerCase()
    );

  const displayValue = isOpen
    ? inputValue
    : selectedOption
    ? String(selectedOption[labelKey])
    : "";

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    setInputValue("");
    setIsOpen(false);
    onChange?.(option);
  };

  const handleCreateOption = () => {
    if (!inputValue.trim() || !onCreateOption) return;
    const newOption = onCreateOption(inputValue.trim());
    if (newOption) {
      handleSelect(newOption);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (inputValue.trim() && onCreateOption) {
          handleCreateOption();
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggle = () => !disabled && setIsOpen((prev) => !prev);
  const open = () => !disabled && setIsOpen(true);

  const handleInputChange = (value: string) => setInputValue(value);

  return {
    isOpen,
    selectedOption,
    highlightedIndex,
    displayValue,
    filteredOptions,
    showCreateOption,
    inputValue,

    dropdownRef,
    inputRef,

    handleSelect,
    handleCreateOption,
    handleInputChange,
    handleKeyDown,
    toggle,
    open,
  };
}
