import { tourDates } from "@/data/site-content";

export default function Tour() {
  const hasShows = tourDates.some((region) => region.shows.length > 0);

  return (
    <section id="tour" className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl mb-8 text-accent">
        Tour
      </h2>

      {!hasShows && (
        <p className="text-ink/60">No shows announced yet — check back soon.</p>
      )}

      {tourDates.map((region) =>
        region.shows.length > 0 ? (
          <div key={region.region} className="mb-10">
            <h3 className="text-sm uppercase tracking-wide text-ink/60 mb-4">
              {region.region}
            </h3>
            <ul className="divide-y divide-ink/10">
              {region.shows.map((show) => (
                <li
                  key={`${show.date}-${show.city}`}
                  className="flex flex-wrap items-center justify-between gap-2 py-3"
                >
                  <span className="text-sm text-ink/60 w-28">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex-1 min-w-[10rem]">{show.city}</span>
                  <span className="flex-1 min-w-[10rem] text-ink/60">
                    {show.venue}
                  </span>
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wide underline hover:text-accent"
                  >
                    Tickets
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      )}
    </section>
  );
}
