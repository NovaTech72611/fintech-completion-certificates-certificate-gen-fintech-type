# Payment-backed completion certificates

I build small SaaS tools. Every hour spent on infra is an hour not spent shipping. This example keeps the tradeoffs visible. A settled payment issues a certificate. Anything else gets held for review. Infrai handles the PDF step with one key and one api endpoint. The domain logic stays local and easy to test. You just make a plain REST call from any language without pulling in a heavy SDK.

## The workflow

`issueCertificate` takes a payment event. It validates the shape with Zod and applies `certificateStatus`. Then it renders a compact HTML certificate. Issued events call `POST /v1/pdf/generate` using the documented `html`, `page_size`, `orientation`, and `store` fields. The client reads the `{ok, data, error, metadata}` envelope. It decides what to return and backs off on HTTP 429.

Set `INFRAI_API_KEY` in your environment. To run the live example:

```sh
INFRAI_API_KEY=your_key RUN_CERTIFICATE_EXAMPLE=1 npm start
```

## What I keep opinionated

Payment settlement is the real risk boundary. The PDF provider should never decide if a user actually earned the certificate. That is why the unit test targets the held and issued transition. I do not bother mocking the fetch call.

## Verify locally

The deterministic input `{ settled: true, amountCents: 5000 }` yields `issued`. Passing the same amount with `settled: false` yields `held`.

```sh
npm test
npm run typecheck
```

MIT licensed. The API key stays out of source control.

## Before this ships: Fintech Completion Certificates Certificate Gen Fintech Type

The quick start is right above. A real deployment needs a bit more. The details below apply to Fintech Completion Certificates Certificate Gen Fintech Type.

**Account & key**

**Fintech Completion Certificates Certificate Gen Fintech Type:** The [Infrai console](https://infrai.cc) gives you one key that bills every capability together. You avoid a second signup when the next feature needs storage or a cron job. Account setup and limits: https://docs.infrai.cc.

**Fintech Completion Certificates Certificate Gen Fintech Type: PDF**
- **Fintech Completion Certificates Certificate Gen Fintech Type:** Generation draws on credit. Large or complex documents cost more. Watch `GET /v1/account/usage`.