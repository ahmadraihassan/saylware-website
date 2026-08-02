# Saylware — Setup Guide


This is your website's code. Follow these steps in order. It'll take about
30–45 minutes the first time, start to finish, including your domain going live with HTTPS.

---

## Step 1 — Create a GitHub account (holds your code)

1. Go to https://github.com/signup and create a free account.
2. Once logged in, click the **+** icon (top right) → **New repository**.
3. Name it `saylware-website`. Keep it **Private** or **Public**, either works. Click **Create repository**.
4. Leave that tab open — you'll need the repository URL in Step 2.

## Step 2 — Push this code to GitHub

Open a terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Initial Saylware site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/saylware-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username. GitHub will prompt you to
log in the first time — follow its on-screen instructions.

*(If you're not comfortable with a terminal, GitHub also lets you drag-and-drop
all these files into the repository through the website — click "uploading an
existing file" on your new repo's page.)*

## Step 3 — Create a Vercel account and deploy

1. Go to https://vercel.com/signup and sign up **using your GitHub account**
   (this makes Step 4 automatic).
2. Click **Add New → Project**.
3. Select your `saylware-website` repo and click **Import**.
4. Leave all settings as default (Vercel auto-detects Next.js) and click **Deploy**.
5. In 1–2 minutes you'll get a live link like `saylware-website.vercel.app`.
   That confirms it works. Now let's put your real domain on it.

## Step 4 — Connect your GoDaddy domain (this is what fixes the "no SSL" issue)

1. In your Vercel project, go to **Settings → Domains**.
2. Type your domain (e.g. `saylware.com`) and click **Add**.
3. Vercel will show you DNS records to add — usually:
   - An **A record**: `@` → `76.76.21.21`
   - A **CNAME record**: `www` → `cname.vercel-dns.com`
   (Vercel shows the exact current values on this screen — always use what it shows you.)
4. Log into GoDaddy → **My Products** → your domain → **DNS** → **Manage DNS**.
5. Add/edit the records to match what Vercel showed you. Save.
6. Go back to Vercel — within a few minutes to a few hours it will show your
   domain as **Valid** with **SSL: Active**. That's it — your domain is now
   secured with a free auto-renewing SSL certificate. You never manage SSL
   manually with this setup.

## Step 5 — Set up your lead capture forms (Formspree)

Your site has three forms: **Cybersecurity inquiries**, **Customer Service
inquiries**, and a **general contact** box. Each needs its own Formspree form ID.

1. Go to https://formspree.io and create a free account.
2. Click **New Form**, name it "Saylware — Cybersecurity", set the email it
   should notify to your inbox. Copy the form ID it gives you (looks like `xzznpqjw`).
3. Repeat for "Saylware — Customer Service" and "Saylware — General".
4. Open `lib/content.ts` in this project and replace:
   - `REPLACE_WITH_SECURITY_FORM_ID` → your Cybersecurity form ID
   - `REPLACE_WITH_SUPPORT_FORM_ID` → your Customer Service form ID
   - `REPLACE_WITH_GENERAL_FORM_ID` → your General form ID
5. Save, then run:
   ```bash
   git add .
   git commit -m "Connect lead forms"
   git push
   ```
   Vercel automatically redeploys within a minute of every push — no extra step.

**Where your leads land:** every submission (1) emails you instantly and
(2) is saved in your Formspree dashboard at formspree.io/forms, where you
can view, search, and export everything to CSV/spreadsheet at any time.
Each submission is tagged with which funnel it came from (Cybersecurity,
Customer Service, or General), so they never get mixed up. Free plan covers
50 submissions/month — upgrade inside Formspree if you outgrow that.

## Step 6 — Editing content later

Everything you'll want to change — logo text, headline, service
descriptions, testimonials, contact email — lives in one file:

```
lib/content.ts
```

Bring me that file (or just tell me what to change) any time and I'll make
the edits and hand it back to you to paste in and push.

---

## What's in this project

```
app/               → page structure and global styles
components/         → the visual building blocks (header, hero, forms, etc.)
lib/content.ts      → ALL editable text and settings — start here
```

Design: two service tracks (Cybersecurity = teal, Customer Service = gold)
run through the whole site — the split line under the hero, the card
accents, and the button colors all reinforce which track a visitor is in,
so leads arrive at your inbox already pre-sorted.
