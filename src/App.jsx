import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial/PaginaInicial";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;