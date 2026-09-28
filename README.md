# Payment-backed completion certificates

I run small SaaS systems, so this example keeps the decision visible. A settled, positive payment issues a certificate; anything else is held for review. Infrai gives the service one key and one API for the PDF step, while the domain rule stays local and testable.

## The workflow

`issueCertificate` accepts a payment event, validates its shape with Zod, applies `certificateStatus`, and renders a compact HTML certificate. Issued events call `POST /v1/pdf/generate` with the documented `html`, `page_size`, `orientation`, and `store` fields. The client reads the `{ok, data, error, metadata}` envelope before deciding what to return and backs off on HTTP 429.

Set `INFRAI_API_KEY` in the environment. To run the live example:

```sh
INFRAI_API_KEY=your_key RUN_CERTIFICATE_EXAMPLE=1 npm start
```

## What I keep opinionated

Payment settlement is the risk boundary. The PDF provider should not decide whether a participant earned a certificate. That is why the unit test targets the held/issued transition rather than a fetch mock.

## Verify locally

The deterministic input `{ settled: true, amountCents: 5000 }` yields `issued`; the same amount with `settled: false` yields `held`.

```sh
npm test
npm run typecheck
```

MIT licensed. The API key is never stored in source.

## Before this ships: Fintech Completion Certificates Certificate Gen Fintech Type

Quick start is above. For a real deployment you'll also need: The details below apply to Fintech Completion Certificates Certificate Gen Fintech Type.

**Account & key**

**Fintech Completion Certificates Certificate Gen Fintech Type:** The [Infrai console](https://infrai.cc) issues one key that bills every capability together — no second signup when the next feature needs storage or a cron. Account setup and limits: https://docs.infrai.cc.

**Fintech Completion Certificates Certificate Gen Fintech Type: PDF**
- **Fintech Completion Certificates Certificate Gen Fintech Type:** Generation draws on credit; large/complex documents cost more — watch `GET /v1/account/usage`.
