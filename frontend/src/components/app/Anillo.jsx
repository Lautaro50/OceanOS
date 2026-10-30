import { useEffect, useState } from 'react';

/** Anillo de progreso que se llena al aparecer. valor: 0 a 1. */
export default function Anillo({ valor = 0, tamaño = 88, grosor = 8, children }) {
  const [v, setV] = useState(0);
  useEffect(() => { const id = requestAnimationFrame(() => setV(valor)); return () => cancelAnimationFrame(id); }, [valor]);
  const r = (tamaño - grosor) / 2; const c = 2 * Math.PI * r;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: tamaño, height: tamaño }}>
      <svg width={tamaño} height={tamaño} viewBox={`0 0 ${tamaño} ${tamaño}`} className="-rotate-90" aria-hidden="true">
        <circle cx={tamaño / 2} cy={tamaño / 2} r={r} fill="none" stroke="rgb(127 181 176 / .2)" strokeWidth={grosor} />
        <circle cx={tamaño / 2} cy={tamaño / 2} r={r} fill="none" stroke="var(--color-kelp-alto)" strokeWidth={grosor} strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)', filter: 'drop-shadow(0 0 6px rgb(229 164 69 / .55))' }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
