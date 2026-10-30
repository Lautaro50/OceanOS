import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Check, Image as Galeria, Info, MapPin, Sparkles, TriangleAlert, X } from 'lucide-react';
import { analizarFoto, iaConfigurada } from '../../services/ia.js';
import { tomarFotoPendiente } from '../../services/fotoPendiente.js';
import { Boton, Selector } from '../ui/index.jsx';

const pct = (x) => `${Math.round(x * 100)}%`;

/** Versión chica de la foto (~40 KB) para adjuntarla al reporte cuando todavía no hay servicio de IA. */
async function miniatura(archivo) {
  try {
    const bmp = await createImageBitmap(archivo, { imageOrientation: 'from-image' });
    const k = Math.min(1, 560 / Math.max(bmp.width, bmp.height));
    const l = document.createElement('canvas'); l.width = Math.round(bmp.width * k); l.height = Math.round(bmp.height * k);
    l.getContext('2d').drawImage(bmp, 0, 0, l.width, l.height);
    return l.toDataURL('image/jpeg', 0.65);
  } catch { return null; }
}

/**
 * Foto -> la IA propone qué es, vos confirmás o corregís. Lo que confirmás es lo que aprende el modelo.
 * Nunca decide sola: la sugerencia es un punto de partida, no un dato verificado.
 */
export default function AnalisisFoto({ taxonomia, onChange, onUsarUbicacion }) {
  const camara = useRef(null);
  const galeria = useRef(null);
  const ia = iaConfigurada();
  const [archivoUrl, setArchivoUrl] = useState(null);
  const [fase, setFase] = useState('vacio');          // vacio | analizando | listo | local | error
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [elegida, setElegida] = useState(null);       // id de la especie confirmada ('ninguna' incluido)
  const [corrigiendo, setCorrigiendo] = useState(false);

  useEffect(() => () => archivoUrl && URL.revokeObjectURL(archivoUrl), [archivoUrl]);

  const emitir = (r, claseId) => {
    const t = (taxonomia ?? []).find((x) => x.id === claseId);
    const sug = r?.prediccion?.clase?.id ?? null;
    onChange?.(r && {
      fotoId: r.id, imagen: r.imagen, claseId: claseId && claseId !== 'ninguna' ? claseId : null, etiqueta: claseId ?? null,
      tipo: t?.tipo, cientifico: t?.cientifico, nombre: t?.nombre, sugeridaId: sug,
      puedeAuto: Boolean(r.puede_autoverificar && claseId && claseId === sug), confianza: r.prediccion?.confianza,
    });
  };

  const procesar = async (archivo) => {
    setArchivoUrl(URL.createObjectURL(archivo)); setError(null); setRes(null); setElegida(null); setCorrigiendo(false); onChange?.(null);
    if (!ia) {                                   // sin servicio de IA: la foto se adjunta tal cual, sin analizar
      setFase('local');
      const m = await miniatura(archivo); onChange?.(m ? { local: true, imagen: m } : null);
      return;
    }
    setFase('analizando');
    try {
      const r = await analizarFoto(archivo); setRes(r); setFase('listo'); emitir(r, null);
    } catch (err) { setError(err); setFase('error'); }
  };
  const elegirArchivo = (e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) procesar(f); };

  // Si la foto vino del botón de cámara (menú o barra inferior), se procesa sola al llegar.
  useEffect(() => { const f = tomarFotoPendiente(); if (f) procesar(f); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const quitar = () => { setArchivoUrl(null); setFase('vacio'); setRes(null); setElegida(null); setCorrigiendo(false); onChange?.(null); };
  const elegir = (id) => { setElegida(id); setCorrigiendo(false); emitir(res, id); };

  const p = res?.prediccion; const nombreDe = (id) => id === 'ninguna' ? 'Ninguna de estas' : (taxonomia ?? []).find((t) => t.id === id)?.nombre ?? id;
  const confirmada = elegida && elegida !== 'ninguna';

  return (
    <div>
      <span className="mb-2 flex items-center gap-1.5 text-sm font-500">
        <Sparkles size={14} className="text-kelp" /> Foto <span className="text-xs font-400 text-tinta/60">· opcional{ia ? ', la IA te ayuda a identificar' : ''}</span>
      </span>
      <input ref={camara} type="file" accept="image/*" capture="environment" onChange={elegirArchivo} className="hidden" aria-label="Sacar una foto" />
      <input ref={galeria} type="file" accept="image/*" onChange={elegirArchivo} className="hidden" aria-label="Elegir una foto de la galería" />

      {fase === 'vacio' && (
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => camara.current?.click()}
            className="group flex flex-col items-center gap-2 rounded-carta border border-kelp/50 bg-kelp/8 px-4 py-6 text-sm transition-all duration-300 hover:bg-kelp/15 active:scale-[.97]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-kelp text-abismo transition-transform duration-500 group-hover:scale-110"><Camera size={22} /></span>
            <span className="font-500">Sacar foto</span>
          </button>
          <button type="button" onClick={() => galeria.current?.click()}
            className="group flex flex-col items-center gap-2 rounded-carta border border-dashed border-sonda/60 px-4 py-6 text-sm transition-all duration-300 hover:border-kelp hover:bg-papel active:scale-[.97]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sonda/15 text-sonda transition-transform duration-500 group-hover:scale-110"><Galeria size={22} /></span>
            <span className="font-500">Galería</span>
          </button>
          <p className="col-span-2 text-center text-xs text-tinta/60">{ia ? 'La foto se guarda para ayudar a que el modelo aprenda. No incluye tu ubicación.' : 'La foto se adjunta a tu reporte.'}</p>
        </div>
      )}

      {fase !== 'vacio' && (
        <div className="overflow-hidden rounded-carta border border-trazo">
          <div className="relative">
            <img src={archivoUrl} alt="Tu foto" className="max-h-72 w-full object-cover" />
            {fase === 'analizando' && <div className="escaneo" aria-hidden="true" />}
            {fase === 'analizando' && <p className="absolute inset-x-0 bottom-0 bg-linear-to-t from-abismo/90 to-transparent px-4 pt-8 pb-3 text-sm text-carta">Analizando la foto…</p>}
            <button type="button" onClick={quitar} aria-label="Quitar foto"
              className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-abismo/70 text-carta backdrop-blur transition-colors hover:bg-abismo"><X size={16} /></button>
          </div>

          {fase === 'local' && (
            <p className="flex items-start gap-2 px-4 py-3 text-sm text-tinta/80"><Info size={16} className="mt-0.5 shrink-0" /> La foto se adjunta a tu reporte. El análisis con IA todavía no está conectado: elegí vos qué viste.</p>
          )}

          {fase === 'error' && (
            <p className="flex items-start gap-2 px-4 py-3 text-sm text-alerta"><TriangleAlert size={16} className="mt-0.5 shrink-0" /> {error?.message}</p>
          )}

          {fase === 'listo' && res && (
            <div className="resultado-ia space-y-3 px-4 py-4">
              {res.calidad.problemas.map((t) => (
                <p key={t} className="flex items-start gap-2 text-sm text-alerta"><TriangleAlert size={15} className="mt-0.5 shrink-0" /> {t}</p>
              ))}
              {res.duplicado && (
                <p className="flex items-start gap-2 text-sm text-alerta"><TriangleAlert size={15} className="mt-0.5 shrink-0" /> Parece una foto que ya se subió antes.</p>
              )}
              {res.exif?.lat != null && onUsarUbicacion && (
                <button type="button" onClick={() => onUsarUbicacion({ lat: res.exif.lat, lng: res.exif.lng })}
                  className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4 hover:text-kelp"><MapPin size={14} /> La foto trae ubicación: usarla en el mapa</button>
              )}

              {confirmada || elegida === 'ninguna' ? (
                <div className="flex items-center justify-between gap-3 rounded-carta bg-alga/10 px-3 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-2 text-alga"><Check size={16} /> {elegida === 'ninguna' ? 'Marcaste que no es ninguna de las especies' : <>Confirmaste: <b className="font-600">{nombreDe(elegida)}</b></>}</span>
                  <button type="button" className="text-xs underline underline-offset-4" onClick={() => { setElegida(null); setCorrigiendo(true); emitir(res, null); }}>Cambiar</button>
                </div>
              ) : (
                <>
                  {p.estado === 'sugerida' && (
                    <div>
                      <p className="text-xs tracking-wide text-tinta/60 uppercase">La IA sugiere</p>
                      <p className="mt-1 font-display text-xl font-600">{p.clase.nombre}</p>
                      {p.clase.cientifico && <p className="text-sm italic text-tinta/70">{p.clase.cientifico}</p>}
                      <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-tinta/70">
                        <span className="cifra rounded-full bg-kelp/15 px-2 py-0.5 font-600 text-kelp">{pct(p.confianza)}</span>
                        {!p.validada && <span title="Todavía no se pudo medir su precisión con fotos de distintos eventos">Modelo en aprendizaje: confirmalo vos</span>}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Boton type="button" variante="kelp" className="flex-1" onClick={() => elegir(p.clase.id)}><Check size={15} /> Es correcto</Boton>
                        <Boton type="button" variante="linea" className="flex-1" onClick={() => setCorrigiendo(true)}>No, es otra</Boton>
                      </div>
                    </div>
                  )}
                  {p.estado === 'incierta' && (
                    <div>
                      <p className="font-500">No estoy seguro. ¿Será alguna de estas?</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.alternativas.map((a) => (
                          <button key={a.id} type="button" onClick={() => elegir(a.id)}
                            className="rounded-full border border-trazo px-3 py-1.5 text-sm transition-colors hover:border-kelp hover:bg-kelp/10">{a.nombre} <span className="cifra text-xs text-tinta/60">{pct(a.confianza)}</span></button>
                        ))}
                      </div>
                    </div>
                  )}
                  {(p.estado === 'desconocida' || p.estado === 'sin_modelo') && (
                    <div>
                      <p className="font-500">Todavía no reconozco esto.</p>
                      {res.pista_general && <p className="mt-1 text-sm text-tinta/80">Pista general: parece un {res.pista_general.nombre}.</p>}
                      {p.sugerencia_base && (
                        <button type="button" onClick={() => elegir(p.sugerencia_base.clase.id)}
                          className="mt-2 rounded-full border border-trazo px-3 py-1.5 text-sm hover:border-kelp hover:bg-kelp/10">¿Será {p.sugerencia_base.clase.nombre.toLowerCase()}?</button>
                      )}
                      <p className="mt-2 text-xs text-tinta/60">Si me decís qué es, la IA aprende de tu foto.</p>
                    </div>
                  )}
                  {(corrigiendo || p.estado === 'desconocida' || p.estado === 'sin_modelo' || p.estado === 'incierta') && (
                    <Selector value="" onChange={(e) => e.target.value && elegir(e.target.value)} aria-label="Elegir la especie">
                      <option value="">{p.estado === 'incierta' ? 'Otra especie…' : '¿Qué es?'}</option>
                      {(taxonomia ?? []).map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                      <option value="ninguna">Ninguna de estas</option>
                    </Selector>
                  )}
                </>
              )}
              <Link to="/app/ia" className="inline-block text-xs text-sonda underline underline-offset-4 hover:text-kelp">Cómo aprende la IA</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
