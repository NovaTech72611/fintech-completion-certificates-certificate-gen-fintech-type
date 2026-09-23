export type PaymentEvent = { participantId: string; name: string; amountCents: number; currency: string; settled: boolean };

export function certificateStatus(event: PaymentEvent): "issued" | "held" {
  return event.settled && event.amountCents > 0 ? "issued" : "held";
}
