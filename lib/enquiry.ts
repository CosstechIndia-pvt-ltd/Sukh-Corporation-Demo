import { z } from "zod";

export const INTENTS = ["Buy", "Rent", "Lease", "Invest", "Sell with us"] as const;
export const CONTACT_METHODS = ["Call", "WhatsApp", "Email"] as const;
export const BUDGETS = [
  "Under ₹50 L",
  "₹50 L – ₹1 Cr",
  "₹1 – 3 Cr",
  "₹3 – 7 Cr",
  "Above ₹7 Cr",
  "Rent under ₹50,000/mo",
  "Rent ₹50,000 – ₹1.5 L/mo",
  "Rent above ₹1.5 L/mo",
  "Not sure yet",
] as const;

export function todayISO(d = new Date()) {
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please tell us your full name.").max(80, "That name is a little long — 80 characters at most."),
  mobile: z
    .string()
    .transform((v) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.")),
  email: z.string().trim().email("That email doesn’t look right — please check it."),
  intent: z.enum(INTENTS, { message: "Let us know what you’d like to do." }),
  property: z.string().trim().max(200).optional(),
  budget: z.string().min(1, "Choose a budget range — “Not sure yet” is fine."),
  city: z.string().min(1, "Which city are you looking in?"),
  contactMethod: z.enum(CONTACT_METHODS, { message: "How should we reach you?" }),
  visitDate: z
    .string()
    .optional()
    .refine((v) => !v || v >= todayISO(), "Please pick today or a later date."),
  message: z.string().trim().max(1000, "Please keep it under 1,000 characters.").optional(),
  consent: z.boolean().refine((v) => v, "Please agree so an advisor can contact you."),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export function makeReference() {
  return `SUKH-2026-${String(Math.floor(10000 + Math.random() * 90000))}`;
}
