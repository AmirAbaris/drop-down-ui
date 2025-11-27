import "./App.css";
import DropDown from "./components/DropDown";
import { options } from "./data/options";

function App() {
  return (
    <div className="flex justify-center items-center min-h-dvh w-screen">
      <DropDown
        options={options}
        labelKey="label"
        valueKey="value"
        placeholder="Select a category"
        onChange={(option) => console.log(option)}
      />
    </div>
  );
}

export default App;
