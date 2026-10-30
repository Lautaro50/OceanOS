// La foto sacada con el botón de cámara viaja hasta la pantalla de Reportar por acá (no cabe en la URL).
let pendiente = null;
export const guardarFotoPendiente = (archivo) => { pendiente = archivo; };
export const tomarFotoPendiente = () => { const f = pendiente; pendiente = null; return f; };
