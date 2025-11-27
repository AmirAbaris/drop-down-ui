type DropdownOptionProps = {
  option: string;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onClick: () => void;
};

export default function DropdownOption({
  option,
  isSelected,
  isFirst,
  isLast,
  onClick,
}: DropdownOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors ${
        isSelected ? "bg-gray-700" : ""
      } ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`}
    >
      {option}
    </button>
  );
}
