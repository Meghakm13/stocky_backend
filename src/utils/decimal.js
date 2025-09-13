export const decimalToNumber = (d) => {
  if (d === null || d === undefined) return 0;
  // If already number
  if (typeof d === "number") return d;
  // If string
  if (typeof d === "string") return parseFloat(d);
  // Try toString() (Decimal from prisma)
  if (typeof d.toString === "function") {
    return parseFloat(d.toString());
  }
  return Number(d);
};

export const decimalToString = (d) => {
  if (d === null || d === undefined) return "0";
  if (typeof d === "string") return d;
  if (typeof d === "number") return d.toString();
  if (typeof d.toString === "function") return d.toString();
  return String(d);
};
