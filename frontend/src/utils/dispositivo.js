/** Vibración corta como respuesta al toque (si el teléfono la soporta). */
export const vibrar = (ms = 12) => { try { navigator.vibrate?.(ms); } catch { /* sin vibración */ } };
