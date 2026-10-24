// Converts an amount in kobo to a naira string like ₦10,000.00
export const formatNaira = (kobo: number | string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(kobo) / 100);