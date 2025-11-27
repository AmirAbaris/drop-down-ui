import { Check } from "lucide-react";

type DropdownOptionProps = {
  option: string;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
};

export default function DropdownOption({
  option,
  isSelected,
  isHighlighted,
  onClick,
}: DropdownOptionProps) {
  return (
    <div className="px-2 py-1">
      <button
        type="button"
        onClick={onClick}
        className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors rounded-lg text-sm font-light hover:cursor-pointer ${
          isSelected
            ? "bg-blue-50 text-blue-600"
            : isHighlighted
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <span>{option}</span>
        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
      </button>
    </div>
  );
}
