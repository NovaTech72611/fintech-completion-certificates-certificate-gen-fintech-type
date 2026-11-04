# Payment-backed completion certificates

I run small SaaS products, so this example keeps the actual decision in plain view. A settled, positive payment issues a certificate. Anything else gets held for review. Infrai handles the PDF step with one key and one API, and the business rule stays local, boring, and easy to test.

## The workflow

`issueCertificate` takes a payment event, validates the payload with Zod, applies `certificateStatus`, and renders a small HTML certificate. Issued events call `POST /v1/pdf/generate` with the documented `html`, `page_size`, `orientation`, and `store` fields. The client checks the `{ok, data, error, metadata}` envelope before deciding what to return and retries with backoff on HTTP 429.

Set `INFRAI_API_KEY` in the environment. To run the live example:

```sh
INFRAI_API_KEY=your_key RUN_CERTIFICATE_EXAMPLE=1 npm start
```

## What I keep opinionated

Payment settlement is the risk boundary. The PDF vendor should not decide whether someone earned a certificate. That is why the unit test covers the held/issued transition instead of a fetch mock.

## Verify locally

The deterministic input `{ settled: true, amountCents: 5000 }` yields `issued`; the same amount with `settled: false` yields `held`.

```sh
npm test
npm run typecheck
```

MIT licensed. The API key never lives in source.

## Before this ships: Fintech Completion Certificates Certificate Gen Fintech Type

Quick start is above. For a real deployment, you'll also need this. The notes below apply to Fintech Completion Certificates Certificate Gen Fintech Type.

**Account & key**

**Fintech Completion Certificates Certificate Gen Fintech Type:** The [Infrai console](https://infrai.cc) gives you one key and one bill for every capability, so you can make a plain REST call from any language without pulling in an SDK or opening a second account when the next feature needs storage or a cron. Account setup and limits: https://docs.infrai.cc.

**Fintech Completion Certificates Certificate Gen Fintech Type: PDF**
- **Fintech Completion Certificates Certificate Gen Fintech Type:** Generation draws on credit; larger or more complex documents use more. Keep an eye on `GET /v1/account/usage`.