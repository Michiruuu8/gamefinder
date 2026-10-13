// src/lib/shortDescription.js

// Largo objetivo del resumen. Se agregan oraciones completas mientras no se pase de aquí.
const MAX_CHARS = 400;

// Una línea corta que no termina en puntuación es casi seguro un subtítulo ("Location and plot")
const looksLikeHeading = line => line.length < 60 && !/[.!?"')\]]$/.test(line);

export function shortenDescription(html = "", maxChars = MAX_CHARS) {
  if (!html) return "";

  // Convierte los cortes de bloque en saltos de línea antes de quitar las etiquetas,
  // así los subtítulos quedan en su propia línea en vez de pegarse al texto.
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|ul|ol)>/gi, "\n");

  const doc = new DOMParser().parseFromString(withBreaks, "text/html");
  const lines = (doc.body.textContent ?? "")
    .split(/\n+/)
    .map(line => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  // Quita subtítulos (con "###" o sin él) y deja solo los párrafos
  const paragraphs = lines.filter(line => !line.startsWith("#") && !looksLikeHeading(line));
  const text = (paragraphs.length ? paragraphs : lines.map(line => line.replace(/^#+\s*/, ""))).join(" ");
  if (!text) return "";

  // Parte el texto en oraciones y junta las que quepan sin pasarse del límite
  const sentences = (text.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g) ?? [text])
    .map(sentence => sentence.trim())
    .filter(Boolean);

  let result = "";
  for (const sentence of sentences) {
    const next = result ? `${result} ${sentence}` : sentence;
    if (result && next.length > maxChars) break;
    result = next;
  }

  // Caso raro: una sola oración larguísima. Se corta en la última coma antes del límite.
  if (result.length > maxChars * 1.6) {
    const head = result.slice(0, maxChars);
    const cut = Math.max(head.lastIndexOf(","), head.lastIndexOf(";"), head.lastIndexOf(" "));
    return `${head.slice(0, cut > 0 ? cut : maxChars).trimEnd()}…`;
  }

  return result;
}
