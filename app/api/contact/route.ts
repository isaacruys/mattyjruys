import { NextResponse } from "next/server";

// Contact form → email via Resend (https://resend.com/docs/api-reference/emails/send-email).
// The destination address lives only in the CONTACT_TO_EMAIL env var on Vercel,
// so it never appears in the site's code or HTML.
//
// Required env vars (Vercel → Settings → Environment Variables, and .env.local for local dev):
//   RESEND_API_KEY    — Resend API key with "Sending access"
//   CONTACT_TO_EMAIL  — where messages are delivered
//
// Sender is Resend's shared test address, which can only deliver to the email that
// owns the Resend account. If the account owner changes, or you want messages to come
// from @mattyjruys.com, verify the domain in Resend and update FROM below.
const FROM = "Matty J. Ruys Website <onboarding@resend.dev>";

const TOPICS = ["General", "Booking", "Press", "Collaboration"] as const;

const MAX = { name: 100, email: 200, message: 5000 };

// Best-effort rate limit: per server instance, resets on cold start. Enough to
// stop someone hammering the form, not a substitute for a real limiter.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please try again later." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const topic = TOPICS.includes(body.topic as (typeof TOPICS)[number])
    ? (body.topic as string)
    : "General";
  const honeypot = String(body.company ?? "");
  const startedAt = Number(body.startedAt ?? 0);

  // Bots fill in the hidden "company" field or submit instantly. Pretend it worked
  // so they don't learn to adapt, but don't send anything.
  if (honeypot || (startedAt && Date.now() - startedAt < 3000)) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 },
    );
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages — please try again a bit later." },
      { status: 429 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email, // so hitting Reply goes straight to the sender
      subject: `[mattyjruys.com] ${topic} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n\n— Sent from the contact form on mattyjruys.com`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: "Sorry, your message couldn't be sent. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
