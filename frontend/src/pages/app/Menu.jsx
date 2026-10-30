import { Link } from 'react-router-dom';
import { Camera, CheckSquare, Coins, Flame, Image as Galeria, LayoutDashboard, Map as MapIcon, MapPin, Sparkles, User, Wallet, Waves } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import FondoAmbiente from '../../components/media/FondoAmbiente.jsx';
import Presentacion from '../../components/media/Presentacion.jsx';
import BotonCamara from '../../components/app/BotonCamara.jsx';
import Anillo from '../../components/app/Anillo.jsx';
import Contador from '../../components/ui/Contador.jsx';
import { calcularLogros } from '../../utils/logros.js';
import { numero, hace, TIPOS } from '../../utils/format.js';

const ACCIONES = [
  { to: '/app',           icono: MapIcon,         titulo: 'Mapa en vivo',       texto: 'Lo que se reportó hoy en tu zona', color: 'var(--color-alga)' },
  { to: '/app/verificar', icono: CheckSquare,     titulo: 'Verificar',          texto: 'Deslizá y sumá OKN',               color: 'var(--color-tiburon)' },
  { to: '/app/billetera', icono: Wallet,          titulo: 'Billetera',          texto: 'Tu saldo y movimientos',           color: 'var(--color-kelp)' },
  { to: '/app/tokens',    icono: Coins,           titulo: 'Tokens y rachas',    texto: 'Cómo se ganan los OKN',            color: 'var(--color-kelp-alto)' },
  { to: '/app/ia',        icono: Sparkles,        titulo: 'Cómo aprende la IA', texto: 'Qué sabe y cómo mejora',           color: 'var(--color-sonda)' },
  { to: '/ecosistema',    icono: Waves,           titulo: 'Estado del océano',  texto: 'Salud de cada zona',               color: 'var(--color-alga)' },
  { to: '/app/perfil',    icono: User,            titulo: 'Mi perfil',          texto: 'Actividad, logros y reputación',   color: 'var(--color-sonda)' },
  { to: '/panel',         icono: LayoutDashboard, titulo: 'Panel para organizaciones', texto: 'Proyectos, sensores y carbono', color: 'var(--color-tiburon)', ancho: true },
];

/** Inicio de la app: la cámara primero, tu avance, lo que pasa ahora en el mar y todo lo demás a un toque. */
export default function Menu() {
  const { user } = useDemo();
  const { data } = useFetch('/avistamientos?limite=12');
  const recientes = data?.avistamientos ?? [];
  const h = new Date().getHours();
  const saludo = h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
  const proximo = calcularLogros(user).filter((l) => !l.logrado).sort((a, b) => b.avance - a.avance)[0];

  return (
    <div className="relative isolate min-h-full">
      <div className="fixed inset-0 -z-10"><FondoAmbiente oscuridad={0.7} /></div>

      <div className="mx-auto max-w-2xl px-5 pt-5 pb-8 lg:px-8">
        <header className="animar-flotar">
          <p className="text-xs tracking-widest text-kelp-alto uppercase">{saludo}</p>
          <h1 className="mt-1 font-display text-3xl font-600 text-carta">{user?.full_name?.split(' ')[0] ?? 'Bienvenido'}</h1>
        </header>

        {/* ---------- Cámara primero ---------- */}
        <section className="hero-captura animar-flotar mt-5 p-5" style={{ animationDelay: '90ms' }} aria-label="Reportar con la cámara">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[1.55rem] leading-tight font-600 text-carta">Reportá lo que ves</h2>
              <p className="mt-1.5 text-[13.5px] leading-snug text-carta/75">Sacá una foto y la IA te ayuda a identificar qué es. Vos confirmás.</p>
            </div>
            <div className="visor" aria-hidden="true">
              <i /><i /><i /><i /><span className="visor-linea" />
              <span className="visor-centro"><Camera size={26} /></span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[1.6fr_1fr] gap-2.5">
            <BotonCamara className="btn-camara btn-brillo flex items-center justify-center gap-2 rounded-2xl bg-kelp py-3.5 text-[15px] font-600 text-abismo">
              <Camera size={19} /> Abrir cámara
            </BotonCamara>
            <BotonCamara galeria className="flex items-center justify-center gap-2 rounded-2xl border border-carta/25 bg-abismo/40 py-3.5 text-sm font-500 text-carta backdrop-blur">
              <Galeria size={17} /> Galería
            </BotonCamara>
          </div>
        </section>

        {/* ---------- Tu avance ---------- */}
        <section className="vidrio animar-flotar mt-4 flex items-center gap-4 rounded-3xl p-4" style={{ animationDelay: '170ms' }} aria-label="Tu avance">
          <Anillo valor={proximo ? proximo.avance : 1} tamaño={84}>
            <span className="cifra font-display text-lg font-600 text-carta">{proximo ? `${Math.round(proximo.avance * 100)}%` : '✓'}</span>
          </Anillo>
          <div className="min-w-0 flex-1">
            {proximo ? (
              <>
                <p className="text-[11px] tracking-widest text-kelp-alto uppercase">Próximo logro</p>
                <p className="mt-0.5 font-display text-lg leading-tight font-600 text-carta">{proximo.titulo}</p>
                <p className="mt-0.5 text-[13px] text-carta/70">Te {proximo.meta - proximo.actual === 1 ? 'falta' : 'faltan'} {Math.ceil(proximo.meta - proximo.actual)} {proximo.unidad}</p>
              </>
            ) : (
              <p className="font-display text-lg font-600 text-carta">¡Completaste todos los logros!</p>
            )}
            <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <Link to="/app/billetera" className="inline-flex items-center gap-1.5 rounded-full bg-abismo/50 px-2.5 py-1 text-carta/90">
                <Coins size={12} className="text-kelp-alto" /> <Contador valor={user?.balance_okn ?? 0} formato={(x) => numero(x)} className="cifra font-600 text-kelp-alto" /> OKN
              </Link>
              {user?.streak_days > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-abismo/50 px-2.5 py-1 text-carta/90"><Flame size={12} className="text-alerta" /> {user.streak_days} {user.streak_days === 1 ? 'día' : 'días'}</span>}
            </p>
          </div>
        </section>

        {/* ---------- Lo que pasa ahora ---------- */}
        {recientes.length > 0 && (
          <section className="mt-6" aria-label="Avistamientos recientes">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-lg font-600 text-carta">Ahora en el mar</h2>
              <Link to="/app" className="text-xs text-sonda underline underline-offset-4 hover:text-kelp-alto">Ver el mapa</Link>
            </div>
            <div className="carrusel -mx-5 mt-3 px-5 pb-2 lg:-mx-8 lg:px-8">
              {recientes.map((a, i) => {
                const t = TIPOS[a.kind];
                return (
                  <Link key={a.id} to="/app" style={{ animationDelay: `${i * 60}ms` }} className="tarjeta-reciente animar-flotar vidrio group w-40 shrink-0 overflow-hidden rounded-2xl">
                    <div className="relative h-24" style={{ background: `linear-gradient(140deg, color-mix(in srgb, ${t?.color} 55%, transparent), rgb(4 32 43 / .9))` }}>
                      {a.photo_url
                        ? <img src={a.photo_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        : <span className="absolute inset-0 grid place-items-center text-carta/80"><MapPin size={26} /></span>}
                      <span className="absolute top-2 left-2 rounded-full bg-abismo/70 px-2 py-0.5 text-[10px] text-carta backdrop-blur">{t?.etiqueta}</span>
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-500 text-carta">{a.common_name ?? t?.etiqueta}</p>
                      <p className="mt-0.5 truncate text-[11px] text-carta/60">{hace(a.observed_at)} · {a.zone_name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ---------- Todo lo demás ---------- */}
        <h2 className="mt-7 font-display text-lg font-600 text-carta">Todo lo que podés hacer</h2>
        <nav aria-label="Menú de la app" className="mt-3 grid grid-cols-2 gap-3">
          {ACCIONES.map((a, i) => {
            const Icono = a.icono;
            return (
              <Link key={a.to} to={a.to} style={{ animationDelay: `${i * 45}ms` }}
                className={`menu-tile animar-flotar vidrio group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-4 text-carta ${a.ancho ? 'col-span-2' : ''}`}>
                <span className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `color-mix(in srgb, ${a.color} 22%, transparent)`, color: a.color }}><Icono size={22} /></span>
                <span>
                  <span className="block font-display text-[1.05rem] leading-tight font-600">{a.titulo}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-carta/70">{a.texto}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <h2 className="mt-10 mb-3 font-display text-lg font-600 text-carta">Mirá cómo funciona</h2>
        <Presentacion />
      </div>
    </div>
  );
}
