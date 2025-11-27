import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import DropdownOption from "./DropdownOption";

type DropDownProps<T> = {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
  className?: string;
};

export default function DropDown<T>(props: DropDownProps<T>) {
  // destructuring props
  const {
    options,
    labelKey,
    valueKey,
    placeholder,
    disabled,
    onChange,
    className,
  } = props;
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div
      className={`relative inline-block ${className || ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`px-4 py-2 bg-white rounded-xl border-2 border-blue-500 focus:outline-none min-w-xs text-left flex items-center justify-between ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-blue-600 cursor-pointer"
        }`}
      >
        <span
          className={`text-sm font-light ${
            selectedOption ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {(selectedOption?.[labelKey] as string) ||
            placeholder ||
            "Select an option"}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-2 py-1 text-gray-400 text-sm">
              No options available
            </div>
          ) : (
            options.map((option, index) => (
              <DropdownOption
                key={index}
                option={option[labelKey] as string}
                isSelected={selectedOption?.[valueKey] === option[valueKey]}
                onClick={() => handleSelect(option)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
