# Email and domain reputation

`saylware.com` is the asset. Treat it like a production system.

Cold volume is how small domains get parked in spam for months. LinkedIn
carries the prospecting. Email carries the conversation once there is a
reason.

## Before any cold email

In GoDaddy DNS (or wherever `saylware.com` is hosted) confirm all three
exist. Google Workspace / Microsoft 365 admin will show the exact
records. Use theirs, not a guess.

1. **SPF** — one `v=spf1` TXT on the root. Include only the services that
   actually send (Google or Microsoft). Do not add Formspree, Vercel, or
   a “sales tool” here.
2. **DKIM** — enabled in the mailbox admin. TXT record as they specify.
3. **DMARC** — start with reporting only:

   ```
   v=DMARC1; p=none; rua=mailto:awaisu@saylware.com; fo=1
   ```

   After two quiet weeks of only mail you personally send, move to
   `p=quarantine`, then `p=reject`. Do not jump to reject on day one.

Check from a second mailbox (a personal Gmail): send yourself a note from
`awaisu@saylware.com` and look at “Show original.” You want `SPF: PASS`
and `DKIM: PASS`.

If those fail, **do not prospect over email**. LinkedIn only until they
pass.

## Warming (week 1–2)

Send real mail to people who already know you: teammates, vendors,
friends. Replies matter more than volume. Stay under 10/day. Then 15.
Never a list.

Formspree already sends *inbound* notifications to you. That is fine.
Do not use Formspree, Mailchimp, or Instantly to *outbound* prospect
from this domain.

## When email is allowed

Use email only if one of these is true:

- They replied on LinkedIn and you are moving the thread
- Their **company website** publishes a business email
  (`office@`, `info@`, `contact@`, a named `@company.com`)
- They emailed you first (form, reply, intro)

Still one thread. Still one person. Still the custom brief, not a
template with the name swapped.

## How the email should look

- **From:** `awaisu@saylware.com`
- **Subject:** specific, lowercase is fine, no “Re:” unless it is a
  real reply
- **Body:** 80–120 words, plain text or very light HTML (the signature)
- **Links:** at most `https://saylware.com`
- **Close:** your name, Saylware, phone, LinkedIn
- **Out:** “If this is a miss, say so and I will not follow up.”

No images besides a tiny signature logo if you want one. No “open
tracking.” Gmail’s own read receipts are enough, and even those feel
off in a first note.

## Subjects that do not look like spam

Good:

- `Hirby dispatch desk`
- `after-install calls at Dorney`
- `SB 2610 for a 35-year shop`

Bad (filters and humans both hate these):

- `Quick question`
- `Touching base`
- `Partnership opportunity!!!`
- `Your cybersecurity compliance`

## Follow-up email (once)

Wait a week. Same thread if they never replied? **No** — a second
brand-new message is cleaner than a fake “Re:”.

Keep it to four lines. Then stop.

## If you ever outgrow 1:1

Do not “just turn on a sequencer” on `saylware.com`. If you later need
volume, use a **separate** sending domain (`mail.saylware.com` or
similar), warm it for weeks, and keep the website domain for people who
already know you. That is a later project. It is not this week.
