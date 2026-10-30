import { useNavigate } from 'react-router-dom';
import { guardarFotoPendiente } from '../../services/fotoPendiente.js';
import { vibrar } from '../../utils/dispositivo.js';

/**
 * Abre la cámara del teléfono (o la galería, con `galeria`) y, con la foto elegida, salta a
 * Reportar con el análisis ya en marcha. Es un <label> sobre el input para que el toque
 * llegue directo al selector del sistema: los navegadores no dejan abrirlo "por código".
 */
export default function BotonCamara({ children, className = '', galeria = false, etiqueta }) {
  const ir = useNavigate();
  const alElegir = (e) => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    guardarFotoPendiente(f); vibrar(18); ir('/app/reportar');
  };
  return (
    <label aria-label={etiqueta} className={`${className} cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-kelp-alto`}>
      <input type="file" accept="image/*" {...(galeria ? {} : { capture: 'environment' })} onChange={alElegir} className="sr-only" />
      {children}
    </label>
  );
}
