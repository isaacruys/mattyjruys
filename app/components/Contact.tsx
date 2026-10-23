"use client";

import { useEffect, useState } from "react";

const TOPICS = ["General", "Booking", "Press", "Collaboration"];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full bg-paper/50 backdrop-blur-sm border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-xs uppercase tracking-widest text-ink/60 mb-2";

export default function Contact() {
  // Rendered as the main content of /contact, so it owns the page h1.
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState(0);

  // Recorded on mount so the server can reject instant (bot) submissions.
  useEffect(() => setStartedAt(Date.now()), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="px-6 pt-32 pb-24 max-w-2xl mx-auto">
      <h1
        className="font-display text-3xl md:text-5xl mb-6 text-accent glitch-text"
        data-text="Contact"
      >
        Contact
      </h1>
      <p className="text-sm text-ink/70 mb-10">
        Booking, press, collaborations or just to say hello — send a message
        and it&apos;ll go straight to Matty.
      </p>

      {status === "sent" ? (
        <div className="border border-accent/60 px-6 py-8">
          <p className="text-sm uppercase tracking-widest text-accent mb-2">
            Message sent
          </p>
          <p className="text-sm text-ink/70">
            Thanks for reaching out. Matty will get back to you at the email you
            provided.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-xs uppercase tracking-widest text-ink/60 hover:text-accent transition-colors"
          >
            Send another →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-topic" className={labelClass}>
              Topic
            </label>
            <select
              id="contact-topic"
              name="topic"
              defaultValue="General"
              className={`${fieldClass} appearance-none`}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic} className="bg-paper">
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              maxLength={5000}
              className={`${fieldClass} resize-y`}
            />
          </div>

          {/* Honeypot: hidden from people, bots tend to fill it in */}
          <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative inline-flex items-center gap-3 border border-accent bg-paper/50 backdrop-blur-sm px-8 py-4 text-sm uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-ink disabled:opacity-60 disabled:hover:bg-paper/50 disabled:hover:text-accent transition-colors duration-300"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[3px] border border-accent/40 group-hover:border-ink/40 transition-colors duration-300"
            />
            {status === "sending" ? "Sending…" : "Send Message"}
            <span aria-hidden>→</span>
          </button>
        </form>
      )}
    </section>
  );
}
