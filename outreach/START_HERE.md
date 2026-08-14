# START HERE — do these steps in order

You do **not** install an app. You do **not** click a “send leads” button.

I wrote ready-made messages. You copy them into **your LinkedIn**.
That is the whole system.

Work from your **personal LinkedIn** (the one with your photo), not the
Saylware company page. Company pages cannot send connection notes.

---

## Step 1 — Open the messages file

On GitHub, open this file:

`outreach/leads/batch-01.md`

Keep that tab open. You will copy from it.

---

## Step 2 — Fix your LinkedIn profile (15 minutes, once)

1. Go to [linkedin.com](https://www.linkedin.com) and log in.
2. Click **Me** (top right) → **View Profile**.
3. Click the pencil next to your **headline**. Paste:

   `Saylware · managed cybersecurity and customer care for operators who are tired of noisy tools and forgotten tickets`

4. Scroll to **About**. Click the pencil. Paste the About text from
   `outreach/assets/linkedin-profile.md`.
5. Under **Experience**, add or edit **Saylware**:
   - Title: `Founder / Operator`
   - Company: `Saylware`
   - Description: the Experience paragraph in that same file.
6. On your profile, click **Open to** if it says you are looking for a
   job. Turn that **off**. You are selling a service, not asking for work.
7. Open the Saylware **company page** → **Admin** → **About**. Make sure
   the website is `https://saylware.com`.

You only do Step 2 once.

---

## Step 3 — Put a signature on your work email (10 minutes, once)

Do this even if you will not email anyone today.

**If you use Gmail (Google Workspace):**

1. Open [mail.google.com](https://mail.google.com) as `awaisu@saylware.com`.
2. Click the gear → **See all settings**.
3. Stay on **General**. Scroll to **Signature**.
4. Click **Create new**. Name it `Saylware`.
5. Open `outreach/assets/email-signature.html` on GitHub.
6. Copy only the table (the name, email, phone, links). Paste into the
   signature box.
7. Change `Awais` to your full name if you want.
8. Scroll down. Click **Save changes**.

**If you use Outlook:**

1. File → Options → Mail → **Signatures**.
2. New signature named `Saylware`.
3. Paste the same block. Save.

---

## Step 4 — Do not send cold email today

Skip DNS, skip Gmail blasts, skip Mailchimp.

Today you only use LinkedIn. That protects `saylware.com`.

---

## Step 5 — Send 5 LinkedIn connection notes (today only)

Send **these five people**, in this order. Stop after five.

| # | Search LinkedIn for | Copy the “Connection note” from |
| --- | --- | --- |
| 1 | `Shane Dorney Dorney Security El Paso` | Company 4 in `batch-01.md` |
| 2 | `Arturo Segura Resler Automotive El Paso` | Company 3 |
| 3 | `Ed Beard Hirby Pest Control El Paso` | Company 1 |
| 4 | `Expert HVAC El Paso` (owner or GM) | Company 5 |
| 5 | `Jimmy Villatoro RMJ Heating El Paso` | Company 6 |

For each person:

1. Paste their search into the LinkedIn search box. Press Enter.
2. Click **People**.
3. Open the profile that matches the company.
4. Click **Connect**.
5. Click **Add a note** (if you do not see that, click Connect anyway,
   then wait until they accept and use Step 6).
6. Delete LinkedIn’s default text.
7. Paste the **Connection note** for that company. Do not add a link.
8. Click **Send**.
9. Open `outreach/tracker.csv` in Google Sheets or Excel. In the
   `status` column for that row, type `requested`. In `last_touch`,
   type today’s date.

Then **close the laptop**. Do not send the other seven today.

If LinkedIn says you are out of notes, stop. You are done for the day.

---

## Step 6 — When someone accepts (same day or later)

LinkedIn will say they accepted. Then:

1. Open the new chat with them.
2. Wait a few hours if they just accepted. Do not pitch in the same
   minute.
3. Go back to that company in `batch-01.md`.
4. Copy the **DM after accept** block.
5. Paste it into the LinkedIn chat. Send.
6. In the tracker, change `status` to `messaged`.

Do **not** send a PDF, a calendar link, or saylware.com in that first DM
unless they ask.

---

## Step 7 — If they reply

**If they say yes / sure / tell me more**

Reply in your own words, short:

> Thanks. 15 minutes is enough. What day this week is easy for you?
> Phone or Google Meet is fine. I am Awais at Saylware,
> +1 915 340 2356.

Then talk. Do not send a brochure first.

**If they say not now / we are fine**

Reply:

> Understood. I will leave you in peace. If the desk ever gets loud,
> I am easy to find.

In the tracker, set `status` to `closed_no`. Never write them again.

**If they do not reply**

Wait 5–7 days. Send **only this**, once:

> Still thinking about [their company]. If a short call is useful I am
> around. If not, I will leave you in peace.

Then stop. Set `status` to `closed_no` if they still stay quiet.

---

## Step 8 — Tomorrow (Day 2)

Morning: send the next 5 connection notes from `batch-01.md`:

6. Rudy Quezada — AAA Pest Control  
7. Southwest Air Conditioning El Paso (owner)  
8. Levi McFarlane — Insight Pest  
9. Alex Killpack — Prime Pest and Lawn  
10. Wetarseel / Murtaza Hanif  

Also: anyone who accepted yesterday gets the **DM after accept**
(Step 6).

Day 3: last person (Hussam Naseer / Vendixs) plus DMs only. No new
companies.

---

## Step 9 — Email (only later, and only 1 to 1)

You may email **only if**:

- they already talked to you on LinkedIn, or
- their **website** shows a company email (like `office@dorneysecurity.com`)
  and LinkedIn went nowhere after a week.

Then:

1. Open Gmail as `awaisu@saylware.com`.
2. Click **Compose**.
3. To: that one address. Never BCC a list.
4. Subject: the **Email subject** line from that company in `batch-01.md`.
5. Body: the **Email** block for that company.
6. Send. One person. Stop.

Before you ever send a first cold email, send a test to your personal
Gmail. Open that message → three dots → **Show original**. You need
`SPF: PASS` and `DKIM: PASS`. If those say FAIL, do not prospect by
email. Stay on LinkedIn. Details are in `outreach/email-and-domain.md`.

---

## What you should never do

- Do not buy a “lead list.”
- Do not use Mailchimp, Instantly, or any bulk sender on `saylware.com`.
- Do not send all 12 notes in one hour.
- Do not write “following up on our call” if you never spoke.
- Do not attach files on the first note.

---

## If you get stuck

| Problem | What to do |
| --- | --- |
| Cannot find the person on LinkedIn | Skip them. Do not guess a random employee. |
| No “Add a note” button | Send Connect with no note. Use the DM after they accept. |
| LinkedIn blocks you | Stop for 48 hours. You sent too many. |
| Someone asks “is this spam?” | Answer honestly: you wrote them because of [the one fact from their site]. Offer to stop. |
| They want a meeting | Use your phone +1 915 340 2356 or a Meet link they choose. |

That is the whole product. Five notes today. Five tomorrow. Talk to
whoever answers.
