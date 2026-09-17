import { Link } from 'react-router-dom';
import { Marca } from '../marca/Logo.jsx';

export default function PiePagina() {
  return (
    <footer className="border-t border-columna bg-abismo px-5 py-10 text-carta lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Marca claro />
          <p className="mt-3 text-sm text-sonda">
            Restauramos ecosistemas y los convertimos en activos verificables.
          </p>
          <p className="mt-4 text-xs text-sonda/70">
            Los Sin Chamba · Puerto Madryn, Chubut, Argentina
          </p>
        </div>

        <nav className="flex gap-12 text-sm">
          <div>
            <p className="mb-2 font-500">Plataforma</p>
            <ul className="space-y-1.5 text-sonda">
              <li><Link to="/funciones" className="hover:text-carta">Todas las funciones</Link></li>
              <li><Link to="/ecosistema" className="hover:text-carta">Estado del océano</Link></li>
              <li><Link to="/mercado" className="hover:text-carta">Activos</Link></li>
              <li><Link to="/app" className="hover:text-carta">App ciudadana</Link></li>
              <li><Link to="/panel" className="hover:text-carta">Panel de organizaciones</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-500">Alianzas</p>
            <ul className="space-y-1.5 text-sonda">
              <li>CONICET · CENPAT</li>
              <li>Secretaría de Pesca</li>
              <li>Rewilding Argentina</li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
}
