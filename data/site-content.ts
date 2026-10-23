// Edit everything in this file to update the site's content.
// No need to touch any component code for day-to-day updates.

import galleryList from "./gallery.json";

export const artist = {
  name: "Matty J. Ruys",
  location: "Melbourne, AU",
  email: "hiruys@me.com",
};

export const socials = [
  { label: "Instagram", url: "https://www.instagram.com/mattyjruys/" },
  {
    label: "Spotify",
    url: "https://open.spotify.com/artist/1sFQmEAQurCDEHqKV6aSnK?si=LANd-AyQQaCANdp9wmxsHw",
  },
  {
    label: "Apple Music",
    url: "https://music.apple.com/au/artist/matty-j-ruys/1737335151",
  },
  {
    label: "Amazon Music",
    url: "https://music.amazon.com.au/artists/B00CN47WM0/matty-j-ruys",
  },
  { label: "Deezer", url: "https://www.deezer.com/us/artist/4732822" },
  { label: "YouTube", url: "https://www.youtube.com/@mattyjruys" },
];

export const album = {
  title: "BEAUTIFUL MESS",
  // Pre-save link shown under the homepage countdown (hidden once the countdown ends).
  presaveUrl: "https://precise.fm/beautifulmess",
};

// Homepage hero (Music.tsx).
export const featuredRelease: {
  title: string;
  releaseDate: string; // shown above the title; leave "" to hide
  coverImage: string;
  streamUrl: string; // leave "" to show ctaLabel as plain text instead of a link
  ctaLabel?: string; // link text, defaults to "Listen Now"
} = {
  title: "FADED (feat. ICECOLDBISHOP)",
  releaseDate: "", // TODO: add once confirmed
  coverImage: "/faded.jpeg",
  // No link yet — add the FADED link here and change ctaLabel to
  // "Listen Now" (or delete it) once it's out.
  streamUrl: "",
  ctaLabel: "Coming November 6",
};

type Show = {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
};

type TourRegion = {
  region: string;
  shows: Show[];
};

export const tourDates: TourRegion[] = [
  { region: "US / Canada", shows: [] },
  { region: "UK / EU", shows: [] },
];

export type ReleaseItem = {
  title: string;
  credit: string; // artist name it was released under — shown on /discography when it isn't Matty J. Ruys
  type: "Album" | "EP" | "Single";
  releaseDate: string; // "YYYY-MM-DD", or just "YYYY" if the exact day isn't known
  coverImage: string;
  // Smart link for the release (DistroKid HyperFollow links were removed ahead of
  // a move to a new platform), otherwise Spotify (or Apple Music
  // if it isn't on Spotify). Leave "" to hide the Listen link.
  listenUrl: string;
  role?: string; // what Matty did, for releases by other artists, e.g. "Writer & Producer"
  onHomepage?: boolean; // show in the homepage "recent releases" list
};

// Every major release, any order — the pages sort by releaseDate.
// Includes the remixes the artist supplied artwork for; other remixes/radio edits are left out.
export const discography: ReleaseItem[] = [
  // 90s singles only have a year, so entries sharing a year keep this array's
  // order (sort is stable): Can't Call That Home → Somewhere You're There → Mine
  // → DEEPER → Cruisin' (Cruisin' came after the album; the others before it),
  // then I Love Every Little Thing About You (1996).
  {
    title: "NEW URBAN POLYNESIAN",
    credit: "Fuemana",
    role: "Band member",
    type: "Album",
    releaseDate: "1994",
    coverImage: "/fuemana-newurbanpolynesian.jpeg",
    listenUrl: "https://open.spotify.com/album/3lfhG4qhTU0ibbY2PVFWOi",
  },
  {
    title: "CAN'T CALL THAT HOME",
    credit: "Matty J",
    type: "Single",
    releaseDate: "1994",
    coverImage: "/cantcallthathome.jpeg",
    listenUrl: "", // not on streaming
  },
  {
    title: "SOMEWHERE YOU'RE THERE (feat. THE MADD COCONUT)",
    credit: "Matty J",
    type: "Single",
    releaseDate: "1994",
    coverImage: "/somewhereyouarethere.jpeg",
    listenUrl: "https://open.spotify.com/track/6eVUQ9XYJHs5YVtAtnzMhP",
  },
  {
    title: "MINE",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "1995",
    coverImage: "/mine.jpeg",
    listenUrl: "https://open.spotify.com/track/23zAIsWD9C5vWeTcGMQD7U",
  },
  {
    title: "DEEPER",
    credit: "Matty J. Ruys",
    type: "Album",
    releaseDate: "1995",
    coverImage: "/deeper.jpeg",
    listenUrl: "https://open.spotify.com/album/3iVVSyrBnJsdsZqgFmgNdV",
  },
  {
    title: "CRUISIN'",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "1995",
    coverImage: "/cruisin.jpeg",
    listenUrl: "https://open.spotify.com/track/1thtctqUkKmV60CAqbK3Gn",
  },
  {
    title: "I LOVE EVERY LITTLE THING ABOUT YOU (feat. LOLÉ)",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "1996",
    coverImage: "/iloveeverylittlething.jpeg",
    listenUrl: "https://open.spotify.com/track/1OHlONc1D0TIge7RrfKOn4",
  },
  {
    title: "PEOPLE X PEOPLE (feat. SPEECH)",
    credit: "Matthew J. Ruys",
    type: "Single",
    releaseDate: "2018-11-30",
    coverImage: "/peoplexpeople.jpeg",
    listenUrl: "https://open.spotify.com/album/5qP0phTAe9cYSeDuhawJYK",
  },
  {
    title: "RAINBOWS",
    credit: "Matthew J. Ruys",
    type: "Single",
    releaseDate: "2019-08-24",
    coverImage: "/rainbows.jpeg",
    // Not on Spotify — Apple Music only.
    listenUrl: "https://music.apple.com/us/album/rainbows-single/1476093161",
  },
  {
    title: "PEOPLE X PEOPLE (feat. SPEECH) [UNDER THE GUN REMIX]",
    credit: "Matthew J. Ruys",
    type: "Single",
    releaseDate: "2019-06-14",
    coverImage: "/peoplexpeople-underthegun.jpeg",
    listenUrl:
      "https://music.apple.com/us/album/people-x-people-feat-speech-under-the-gun-remix-single/1467026203",
  },
  {
    title: "RAINBOWS (SAI REMIX)",
    credit: "Matthew J. Ruys",
    type: "Single",
    releaseDate: "2019-12-20",
    coverImage: "/rainbows-sai.jpeg",
    listenUrl:
      "https://music.apple.com/us/album/rainbows-sai-remix-single/1490309261",
  },
  {
    title: "K'LEE",
    credit: "K'Lee",
    role: "Writer & Producer",
    type: "Album",
    releaseDate: "2002",
    coverImage: "/klee.jpeg",
    listenUrl: "https://open.spotify.com/album/4qQsNgxMKH0i9jSsGu2B0S",
  },
  {
    title: "FIRST EDITION",
    credit: "Dei Hamo",
    role: "Executive Producer, Producer & Label Owner",
    type: "Album",
    releaseDate: "2004-07-12",
    coverImage: "/deihamo-firstedition.jpeg",
    listenUrl: "https://open.spotify.com/album/0bHUIeLMXflpMIGT8LJIJq",
  },
  {
    title: "ALBANY",
    credit: "Gabriel",
    role: "Producer & Arranger",
    type: "Album",
    releaseDate: "2007-09-25",
    coverImage: "/gabriel-albany.jpeg",
    // Not on Spotify
    listenUrl: "https://music.apple.com/us/album/albany/265110481",
  },
  {
    title: "GO STOP GO",
    credit: "Go Stop Go",
    type: "Album",
    releaseDate: "2012-09-28",
    coverImage: "/gostopgo-album.jpeg",
    listenUrl: "https://open.spotify.com/album/3eRkJtj6cAvRyUXWumeupv",
  },
  {
    title: "BLACK JESUS",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-04-03",
    coverImage: "/blackjesus.jpeg",
    listenUrl: "", // DistroKid link removed — add the new platform link here
    onHomepage: true,
  },
  {
    title: "SOMETHING GOOD",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-05-15",
    coverImage: "/somethinggood.jpeg",
    listenUrl: "", // DistroKid link removed — add the new platform link here
    onHomepage: true,
  },
  {
    title: "IT'S OKAY, I'M NOT OKAY Part. 1 (feat. 7HOODIES)",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-07-10",
    coverImage: "/itsokayimnotokaypt1.jpeg",
    listenUrl: "", // DistroKid link removed — add the new platform link here
    onHomepage: true,
  },
  {
    title: "SAME SUN (feat. MATTHEW LITTLE)",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-09-11",
    coverImage: "/samesun.jpeg",
    listenUrl: "", // DistroKid link removed — add the new platform link here

    onHomepage: true,
  },
];

export const recentReleases: ReleaseItem[] = discography.filter(
  (release) => release.onHomepage,
);

type VideoItem = {
  title: string;
  artist?: string; // shown under the title when it isn't a Matty J. Ruys video
  youtubeId: string; // the part after "watch?v=" in the YouTube URL
};

// Order = display order: Matty's videos in the artist's chosen order,
// then Go Stop Go / features at the end.
export const videos: VideoItem[] = [
  { title: "Black Jesus", youtubeId: "pFPlvsiI7ZI" },
  { title: "Rainbows", youtubeId: "jFXqf33UuVE" },
  {
    title: "I Love Every Little Thing About You (feat. Lole Usoalii)",
    youtubeId: "qw00dzF-FEA",
  },
  { title: "Cruisin'", youtubeId: "hvJZTUhQQPg" },
  { title: "Again", youtubeId: "IGzVkcx01VU" },
  { title: "Mine", youtubeId: "Fb1vH-ZQKw0" },
  { title: "Mine — The Sequel (feat. Lole Usoalii)", youtubeId: "m3AQlcvP6MQ" },
  { title: "Colour B.L.I.N.D.", youtubeId: "YhMW3bWPdRg" },
  // Go Stop Go + features
  { title: "If You Want It", artist: "Go Stop Go", youtubeId: "LzCikEGobNA" },
  {
    title: "Breathe Under Water",
    artist: "Go Stop Go",
    youtubeId: "k24JDvDUWsw",
  },
  { title: "Home", artist: "Go Stop Go", youtubeId: "1SSm2tonvno" },
  {
    title: "This Love (Lyric Video)",
    artist: "Go Stop Go",
    youtubeId: "31-DMCXD2Q8",
  },
  { title: "Wash Away", artist: "Go Stop Go", youtubeId: "XZOSqXOoONg" },
  {
    title: "This City",
    artist: "Diamond Field feat. Matthew J. Ruys",
    youtubeId: "U8P5lDOzyV8",
  },
];

// Gallery order lives in data/gallery.json (updated by `npm run images`).
export const galleryImages: string[] = galleryList;

type MerchItem = {
  name: string;
  price?: string;
  details?: string; // short line under the name, e.g. format / release info
  status?: string; // small label above the name, e.g. "Pre-order"
  image: string; // transparent PNG looks best on the dark background
  url: string;
  cta?: string; // link text, defaults to "Buy"
};

export const merch: MerchItem[] = [
  {
    name: "BEAUTIFUL MESS — Limited Edition Red Vinyl",
    price: "$60 AUD",
    details: "180 gram red vinyl · Released 6 November 2026",
    status: "Happy Valley AU Pre-order",
    image: "/vinyl.png",
    url: "https://happyvalleyshop.com/collections/vinyl-pre-orders/products/ruys-mattyj-beautiful-mess-red-vinyl",
    cta: "Pre-order",
  },
];

// Wrap names in **double asterisks** to make them bold on the About page.
export const bio = `
Award-winning, New Zealand Soul-R&B pioneer **Matty J Ruys'** long-awaited return has critics calling his new music “a masterwork”, “a hell of a record” and “a smouldering classic”, and it’s easy to hear why. BEAUTIFUL MESS is Matty creatively expressing himself with absolute freedom, and without the restrictions of outside opinion or control.

Collaborating with US multi platinum-certified Producer **NUMONICS** (**Marlon Craft**, **Freddie Gibbs**, **Blu**), and recorded in L.A., Texas & Melbourne, the album is both urgent and timeless in its execution and themes. Soulfully delivered with an indie hip hop aesthetic, guests include **ICECOLDBISHOP**, **Matthew “Honeybee” Little** (**Kendrick Lamar**, **J. Cole**, **Musiq Soulchild**, **Kali Uchis**, **Anderson .Paak**), **Fuego Hendrixxx A.K.A. 7Hoodies**, **Diana Wuli**, and Island Record’s signee **Ben Swissa**.

Featuring the pre-release singles: BLACK JESUS, SOMETHING GOOD, IT'S OKAY, I'M NOT OKAY Part 1, and SAME SUN.

It may have been 3 decades since he last released a solo album, but there's been a lot of music made in-between. From a label deal with Universal Music that garnered 5 weeks at number one with its very first release (**Dei Hamo**), to breaking chart records in his homeland by writing and producing the first female artist to have 4 Top 20 hits from a debut album (**K'Lee**). He also discovered, developed, and signed **Brooke Fraser** to Sony Music; whose debut album achieved 7 x platinum in her native country.

Ruys' influence and musicality has shaped many a music career. As Universal Music A&R he worked on the careers of **Bleeders**, **Elemeno P**, and **Zed**. Ruys also produced American soul artist **Gabriel Powell**'s debut album 'Albany', which USA Today described as "tastefully supportive arrangements with Strings-drenched pop" and "a truly pleasant surprise". And he made albums with his award-nominated band **GO STOP GO**, and as a member of the seminal urban Pacific soul group **Fuemana**.

Ruys (pronounced “Rise”) has continued to perform as a recording artist, lending his voice and songwriting to many music projects. He spent the later part of the nineties in Atlanta Georgia writing and recording with **Gerald “G” Jackson** (**Isaac Hayes**’ Music Director) and **Allen “Grip” Smith** (**Keith Sweat**, **TLC**, **S.O.S. Band**, **SWV**, **Dru Hill**). He performed with **Dungeon Family** & **Outkast**’s recording/touring band. You can also hear Matty’s work on legendary hip hop grammy-winners **Arrested Development**, New York based synth-wave outfit **Diamond Field**, downtempo darlings **Strawpeople**, Australian multigenre bass music purveyor **Drop Frame**, and Estonia’s celebrated indie electro-rock act **I Wear* Experiment**, to name a few.

Matty has also spent the last 12 years curating Asia's premiere Music Festival, MUSIC MATTERS LIVE, as a part of the regions' biggest entertainment conference; All That Matters, bringing in emerging artists from all around the world to the gateway event. He also acts as Academy organiser.
`;

export const tracklist: string[] = [
  "SELF LOVE",
  'SAME SUN (feat. MATTHEW "HONEYBEE" LITTLE)',
  "BLACK JESUS",
  "FADED (feat. ICECOLDBISHOP)",
  "BEAUTIFUL MESS",
  "GOTTA GO",
  "ALRIGHT?",
  "IT'S OKAY, I'M NOT OKAY PART 1 (feat. FUEGO HENDRIXXX A.K.A. 7HOODIES)",
  "IT'S OKAY, I'M NOT OKAY PART 2 (feat. DIANA WULI)",
  "SOMETHING GOOD",
  "BE LOVE",
];

type SpecialProject = {
  year: string;
  artist: string;
  title: string; // song or album name
  role: string; // what Matty did on it
};

// Credits on other artists' records. Currently empty (section hidden) — the
// previous Discogs-sourced list had inaccuracies. Only add entries the artist
// has confirmed. Sorted by year on /discography, so order here doesn't matter.
export const specialProjects: SpecialProject[] = [];
