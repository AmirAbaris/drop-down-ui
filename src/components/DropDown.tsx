import { ChevronDownIcon } from "lucide-react";
import DropdownOption from "./DropdownOption";
import useDropdown from "./useDropdown";

type DropDownProps<T> = {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
  onCreateOption?: (inputValue: string) => T | void;
  className?: string;
};

export default function DropDown<T>(props: DropDownProps<T>) {
  const {
    options,
    labelKey,
    valueKey,
    placeholder = "Select an option",
    disabled,
    onChange,
    onCreateOption,
    className,
  } = props;

  const {
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
  } = useDropdown<T>({ options, labelKey, disabled, onChange, onCreateOption });

  return (
    <div
      className={`relative inline-block ${className || ""}`}
      ref={dropdownRef}
    >
      <div
        className={`px-4 py-2 bg-white rounded-xl border-2 border-blue-500 focus-within:border-blue-600 min-w-xs flex items-center justify-between ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={open}
          onClick={open}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 text-sm font-light bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed"
        />
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 cursor-pointer ${
            isOpen ? "rotate-180" : ""
          }`}
          onClick={toggle}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto py-1">
          {filteredOptions.length === 0 && !showCreateOption ? (
            <div className="px-4 py-2 text-gray-400 text-sm">
              No options found
            </div>
          ) : (
            <>
              {filteredOptions.map((item, index) => (
                <DropdownOption
                  key={index}
                  option={item[labelKey] as string}
                  isSelected={selectedOption?.[valueKey] === item[valueKey]}
                  isHighlighted={highlightedIndex === index}
                  onClick={() => handleSelect(item)}
                />
              ))}
              {showCreateOption && (
                <div
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 text-blue-600 border-t border-gray-100"
                  onClick={handleCreateOption}
                >
                  + Create "{inputValue.trim()}"
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
