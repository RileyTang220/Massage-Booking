export function formatMoney(amount: number, currency = "AUD") {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency
  }).format(amount / 100);
}
