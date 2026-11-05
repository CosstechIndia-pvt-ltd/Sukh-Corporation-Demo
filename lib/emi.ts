export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalPayable: number;
};

/**
 * Standard reducing-balance EMI:
 *   EMI = P · r · (1 + r)^n / ((1 + r)^n − 1)
 * where r is the monthly rate and n the number of monthly instalments.
 */
export function calculateEmi(principal: number, annualRatePct: number, years: number): EmiResult {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return { emi: 0, totalInterest: 0, totalPayable: 0 };
  const r = annualRatePct / 12 / 100;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  return { emi, totalInterest: totalPayable - principal, totalPayable };
}
