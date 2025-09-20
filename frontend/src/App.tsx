import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Niveis from "./niveis/Niveis"
import NivelEditar from "./niveis/Editar";
import NivelNovo from "./niveis/Novo";
import Desenvolvedores from "./desenvolvedores/Desenvolvedores";
import EditarDesenvolvedores from "./desenvolvedores/Editar";
import NovoDesenvolvedores from "./desenvolvedores/Novo";

export default function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/nivel" element={<Niveis />} />
        <Route path="/nivel/editar/:id" element={<NivelEditar />} />
        <Route path="/nivel/novo/" element={<NivelNovo />} />
        <Route path="/desenvolvedores" element={<Desenvolvedores />} />
        <Route path="/desenvolvedores/editar/:id" element={<EditarDesenvolvedores />} />
        <Route path="/desenvolvedores/novo" element={<NovoDesenvolvedores />} />
      </Routes>
    </Router>
  );
}
