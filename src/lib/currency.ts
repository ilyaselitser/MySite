export function formatPrice(priceBgn: number, priceEur: number, locale?: string): string {
  if (locale === "en" || locale === "ru") {
    return `${priceEur.toFixed(2)} EUR`;
  }
  return `${priceEur.toFixed(2)} EUR / ${priceBgn.toFixed(2)} BGN`;
}
