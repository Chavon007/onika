import { serviceCard } from "@/constants/serviceCategories";

// "port harcourt" -> "Port Harcourt"
export const toTitleCase = (value?: string | null): string =>
  value ? value.replace(/(^|\s)\S/g, (c) => c.toUpperCase()) : "";

// "ac & appliances" -> "AC & Appliances" (uses the real label from your
// service list when there is a match, otherwise falls back to title case)
export const displayCategory = (value?: string | null): string => {
  if (!value) return "";
  const match = serviceCard.find(
    (s) => s.title.toLowerCase() === value.toLowerCase(),
  );
  return match ? match.title : toTitleCase(value);
};