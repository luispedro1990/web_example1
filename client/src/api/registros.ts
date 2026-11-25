export interface DatosRegistro {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
}

export interface RegistroCreado {
  id: number;
  nombre: string;
}

export async function crearRegistro(
  datos: DatosRegistro,
): Promise<RegistroCreado> {
  let respuesta: Response;
  try {
    respuesta = await fetch('/api/registros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  const cuerpo = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // NestJS devuelve un texto o una lista de mensajes de validación.
    const mensaje: unknown = cuerpo?.message;
    if (respuesta.status < 500 && mensaje) {
      throw new Error(
        Array.isArray(mensaje) ? mensaje.join('. ') : String(mensaje),
      );
    }
    throw new Error('No se pudo completar el registro. Inténtalo de nuevo');
  }

  return cuerpo as RegistroCreado;
}
