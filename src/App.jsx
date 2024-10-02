import { useState } from "react";
import DataCollection from "./components/dataCollection";
import Header from "./components/Header";
import DataListPrep from "./components/dataListGraph";
import "./App.css";
function App() {
  const [Data, setData] = useState([]);

  return (
    <>
      <div>
        <Header />
        <DataCollection setData={setData} />
        {/* <DataListPrep Data={Data} /> */}
      </div>
    </>
  );
}

export default App;
