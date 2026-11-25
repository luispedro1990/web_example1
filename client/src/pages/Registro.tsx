import { ChangeEvent, SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearRegistro, DatosRegistro } from '../api/registros';

const campos: {
  nombre: keyof DatosRegistro;
  etiqueta: string;
  tipo: string;
  autoComplete: string;
  maximo: number;
}[] = [
  {
    nombre: 'nombre',
    etiqueta: 'Nombre',
    tipo: 'text',
    autoComplete: 'given-name',
    maximo: 50,
  },
  {
    nombre: 'primerApellido',
    etiqueta: 'Primer apellido',
    tipo: 'text',
    autoComplete: 'family-name',
    maximo: 50,
  },
  {
    nombre: 'segundoApellido',
    etiqueta: 'Segundo apellido',
    tipo: 'text',
    autoComplete: 'additional-name',
    maximo: 50,
  },
  {
    nombre: 'email',
    etiqueta: 'Email',
    tipo: 'email',
    autoComplete: 'email',
    maximo: 254,
  },
];

const vacio: DatosRegistro = {
  nombre: '',
  primerApellido: '',
  segundoApellido: '',
  email: '',
};

export default function Registro() {
  const [datos, setDatos] = useState(vacio);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();

  function cambiar(evento: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evento.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
  }

  async function enviar(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError('');
    setEnviando(true);
    try {
      const { nombre } = await crearRegistro(datos);
      navegar('/bienvenida', { state: { nombre } });
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'Error inesperado');
      setEnviando(false);
    }
  }

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={enviar}>
        {campos.map((campo) => (
          <label key={campo.nombre}>
            {campo.etiqueta}
            <input
              name={campo.nombre}
              type={campo.tipo}
              autoComplete={campo.autoComplete}
              maxLength={campo.maximo}
              value={datos[campo.nombre]}
              onChange={cambiar}
              required
            />
          </label>
        ))}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Registrarme'}
        </button>
      </form>
    </>
  );
}
