import { Link, NavLink } from 'react-router-dom';
import { Marca } from '../marca/Logo.jsx';
import { Boton } from '../ui/index.jsx';

const enlaces = [
  { to: '/ecosistema', label: 'Estado del océano' },
  { to: '/mercado',    label: 'Activos' },
];

// Ya no hay cara clara: la barra siempre va sobre agua, así que la tinta es
// clara. Y ya no hay login: el botón principal lleva a todas las funciones.
export default function NavPublica() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-6 px-5 py-4 text-carta lg:px-10">
      <Link to="/" aria-label="OceanOS, inicio">
        <Marca />
      </Link>

      <nav className="flex items-center gap-1 sm:gap-5">
        {enlaces.map((e) => (
          <NavLink key={e.to} to={e.to}
            className={({ isActive }) =>
              `hidden text-sm sm:block ${isActive ? 'underline underline-offset-8' : 'opacity-80 hover:opacity-100'}`}>
            {e.label}
          </NavLink>
        ))}
        <Link to="/funciones">
          <Boton variante="kelp" className="py-2">
            <span className="sm:hidden">Funciones</span>
            <span className="hidden sm:inline">Ver todas las funciones</span>
          </Boton>
        </Link>
      </nav>
    </header>
  );
}
