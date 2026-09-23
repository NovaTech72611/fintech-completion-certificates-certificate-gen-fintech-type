import assert from "node:assert/strict";
import { certificateStatus } from "../src/risk_decision.js";

assert.equal(certificateStatus({ participantId: "p1", name: "Ari", amountCents: 5000, currency: "USD", settled: true }), "issued");
assert.equal(certificateStatus({ participantId: "p2", name: "Bo", amountCents: 5000, currency: "USD", settled: false }), "held");
console.log("risk decision checks passed");
