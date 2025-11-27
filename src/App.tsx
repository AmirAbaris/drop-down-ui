import "./App.css";
import DropDown from "./components/DropDown";

function App() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
    { label: "Option 6", value: "option6" },
  ];

  return (
    <div className="flex justify-center items-center min-h-dvh w-screen">
      <DropDown
        options={options}
        labelKey="label"
        valueKey="value"
        placeholder="Select an option"
      />
    </div>
  );
}

export default App;
