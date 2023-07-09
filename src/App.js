import "./App.css";
import { createContext, useState } from "react";
import FormInfo from "./components/Form";

export const Context = createContext();

function App() {
  const [data, setData] = useState([]);

  return (
    <Context.Provider value={[data, setData]}>
      <FormInfo />
    </Context.Provider>
  );
}

export default App;
