/**
 * La marca es una hoja de cachiyuyo sobre líneas de sonda. No un ícono de
 * ola genérico: Macrocystis tiene neumatocistos (las vejigas de flotación)
 * y eso es lo que se dibuja.
 */
export default function Logo({ tamaño = 30, claro = true }) {
  const tinta = claro ? 'var(--color-carta)' : 'var(--color-abismo)';
  return (
    <svg width={tamaño} height={tamaño} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3 21c3.2 0 3.2-3.1 6.4-3.1s3.2 3.1 6.4 3.1 3.2-3.1 6.4-3.1 3.2 3.1 6.4 3.1"
            stroke="var(--color-sonda)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M3 26c3.2 0 3.2-3.1 6.4-3.1s3.2 3.1 6.4 3.1 3.2-3.1 6.4-3.1 3.2 3.1 6.4 3.1"
            stroke="var(--color-sonda)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M16 24c-1.4-3.9-1.8-8-1.4-12.2.3-3 1.1-5.1 1.4-6.2.3 1.1 1.1 3.2 1.4 6.2.4 4.2 0 8.3-1.4 12.2Z"
            fill="var(--color-kelp)" />
      <circle cx="13.1" cy="13.4" r="1.9" fill={tinta} />
      <circle cx="18.9" cy="10.2" r="1.9" fill={tinta} />
    </svg>
  );
}

export function Marca({ claro = true, tamaño = 30 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Logo tamaño={tamaño} claro={claro} />
      <span className={`font-display text-lg font-600 tracking-tight ${claro ? 'text-carta' : 'text-abismo'}`}>
        OceanOS
      </span>
    </span>
  );
}
