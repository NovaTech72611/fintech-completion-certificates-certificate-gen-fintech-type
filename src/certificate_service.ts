import { z } from "zod";
import { certificateStatus, type PaymentEvent } from "./risk_decision.js";
import { generatePdf } from "./infrai_pdf.js";

export const paymentSchema = z.object({ participantId: z.string().min(1), name: z.string().min(1), amountCents: z.number().int().nonnegative(), currency: z.string().length(3), settled: z.boolean() });

export async function issueCertificate(input: unknown): Promise<{ status: string; pdf: unknown }> {
  const event = paymentSchema.parse(input) as PaymentEvent;
  const status = certificateStatus(event);
  if (status === "held") return { status, pdf: null };
  const html = `<main><h1>Completion Certificate</h1><p>${event.name}</p><p>Participant: ${event.participantId}</p><p>Payment: ${(event.amountCents / 100).toFixed(2)} ${event.currency}</p><p>Status: ${status}</p></main>`;
  return { status, pdf: await generatePdf(html) };
}

if (process.env.RUN_CERTIFICATE_EXAMPLE === "1") {
  issueCertificate({ participantId: "fin-014", name: "Mina Chen", amountCents: 12500, currency: "USD", settled: true })
    .then((result) => console.log(JSON.stringify(result)))
    .catch((error: Error) => { console.error(error.message); process.exitCode = 1; });
}
