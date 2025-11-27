import "./App.css";
import DropDown from "./components/DropDown";

function App() {
  const options = [
    { label: "Education 🎓", value: "education" },
    { label: "Yeeeah, science! 🌎", value: "science" },
    { label: "Art 🎨", value: "art" },
    { label: "Sport ⚽", value: "sport" },
    { label: "Games 🎮", value: "games" },
    { label: "Health 🏥", value: "health" },
  ];

  return (
    <div className="flex justify-center items-center min-h-dvh w-screen">
      <DropDown
        options={options}
        labelKey="label"
        valueKey="value"
        placeholder="Select an category"
        onChange={(option) => console.log(option)}
      />
    </div>
  );
}

export default App;
