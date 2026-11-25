import { Link, Navigate, useLocation } from 'react-router-dom';

export default function Bienvenida() {
  const nombre: unknown = useLocation().state?.nombre;

  // Si se abre la página sin haberse registrado, se vuelve al formulario.
  if (typeof nombre !== 'string') {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>Bienvenido, {nombre}</h1>
      <p>Tu registro se ha completado correctamente.</p>
      <Link to="/">Volver al formulario</Link>
    </>
  );
}
