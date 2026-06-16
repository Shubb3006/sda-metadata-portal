import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import RegisterDataset from "./pages/RegisterDataset";
import DatasetList from "./pages/DatasetList";
import DatasetDetail from "./pages/DatasetDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<DatasetList />} />
        <Route path="/datasets/:id" element={<DatasetDetail />} />
        <Route path="/register" element={<RegisterDataset />} />
      </Routes>
    </div>
  );
}

export default App;
