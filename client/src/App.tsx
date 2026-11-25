import { Navigate, Route, Routes } from 'react-router-dom';
import Bienvenida from './pages/Bienvenida';
import Registro from './pages/Registro';

export default function App() {
  return (
    <main className="tarjeta">
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
