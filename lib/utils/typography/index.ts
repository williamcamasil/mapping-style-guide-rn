/**
 * Calcula o lineHeight em DPI (pixels).
 * @param fontSize Tamanho da fonte em DPI (pixels)
 * @param multiplier Multiplicador do line height, exemplo: 1.2
 * @returns
 */
export function calcLineHeight(fontSize: number, multiplier: number): number | undefined {
  if (!multiplier) {
    return undefined;
  }
  return Math.round(fontSize * multiplier);
}
