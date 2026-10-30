import { useRef, useState } from 'react';
import { vibrar } from '../../utils/dispositivo.js';

const UMBRAL = 96;

/**
 * Tarjeta que se decide con el dedo: a la derecha = sí, a la izquierda = no.
 * El scroll vertical sigue funcionando (touch-action: pan-y) y los botones de adentro siguen siendo
 * la vía accesible. `onDecidir(true|false)` puede devolver una promesa; si falla, la tarjeta vuelve.
 */
export default function Deslizable({ onDecidir, deshabilitado = false, children }) {
  const [dx, setDx] = useState(0);
  const [arrastrando, setArrastrando] = useState(false);
  const [salida, setSalida] = useState(0);
  const x0 = useRef(0);

  const abajo = (e) => {
    if (deshabilitado || salida || e.target.closest('button, a, input, select, textarea')) return;
    x0.current = e.clientX; setArrastrando(true); e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const mover = (e) => { if (arrastrando) setDx(e.clientX - x0.current); };
  const soltar = () => {
    if (!arrastrando) return;
    setArrastrando(false);
    if (Math.abs(dx) < UMBRAL) { setDx(0); return; }
    const lado = Math.sign(dx); setSalida(lado); vibrar(16);
    setTimeout(() => {
      Promise.resolve(onDecidir(lado > 0)).finally(() => { setSalida(0); setDx(0); });
    }, 230);
  };

  const x = salida ? salida * 460 : dx;
  const fuerza = Math.min(1, Math.abs(dx) / UMBRAL);
  return (
    <div className="relative select-none" style={{ touchAction: 'pan-y' }} onDragStart={(e) => e.preventDefault()}
         onPointerDown={abajo} onPointerMove={mover} onPointerUp={soltar} onPointerCancel={soltar}>
      <div style={{ transform: `translateX(${x}px) rotate(${x / 26}deg)`, opacity: salida ? 0 : 1,
                    transition: arrastrando ? 'none' : 'transform .38s cubic-bezier(.16,1,.3,1), opacity .3s' }}>
        {children}
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute top-5 left-5 -rotate-12 rounded-md border-2 border-alga px-3 py-1 text-sm font-700 tracking-widest text-alga uppercase"
            style={{ opacity: dx > 24 ? fuerza : 0 }}>Coincido</span>
      <span aria-hidden="true" className="pointer-events-none absolute top-5 right-5 rotate-12 rounded-md border-2 border-alerta px-3 py-1 text-sm font-700 tracking-widest text-alerta uppercase"
            style={{ opacity: dx < -24 ? fuerza : 0 }}>No es eso</span>
    </div>
  );
}
