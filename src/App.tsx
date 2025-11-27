import { useState } from "react";
import "./App.css";
import DropDown from "./components/DropDown";
import { options as initialOptions } from "./data/options";
import type { Option } from "./types/option";

function App() {
  const [options, setOptions] = useState<Option[]>(() => initialOptions);

  // mutating our dummy data
  const handleCreateOption = (inputValue: string): Option => {
    const newOption = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
    };
    setOptions((prev) => [...prev, newOption]);
    return newOption;
  };

  return (
    <div className="flex justify-center items-center min-h-dvh w-screen">
      <DropDown
        options={options}
        labelKey="label"
        valueKey="value"
        placeholder="Select..."
        onChange={(option) => console.log(option)}
        onCreateOption={handleCreateOption}
      />
    </div>
  );
}

export default App;
