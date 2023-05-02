import { Route, Routes } from "react-router";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { ClaimBoard } from "./components/ClaimBoard";
import { FormPage } from "./components/FormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/claims" element={<ClaimBoard />} />
      </Routes>
    </div>
  );
}

export default App;
