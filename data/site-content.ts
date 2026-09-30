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
  { label: "Deezer", url: "https://www.deezer.com/us/artist/4732822" },
  { label: "YouTube", url: "https://www.youtube.com/@mattyjruys" },
];

export const featuredRelease = {
  title: "SAME SUN (feat. MATTHEW LITTLE)",
  releaseDate: "11 September 2026",
  coverImage: "/samesun.jpeg", // put an image in /public
  streamUrl:
    "https://distrokid.com/hyperfollow/mattyjruys/same-sun-feat-matthew-little-radio-edit-2?ref=release", // pre-save/smart-link service
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
  // HyperFollow link if the release has one, otherwise Spotify (or Apple Music
  // if it isn't on Spotify). Leave "" to hide the Listen link.
  listenUrl: string;
  onHomepage?: boolean; // show in the homepage "recent releases" list
};

// Every major release, any order — the pages sort by releaseDate.
// Remixes and radio edits are deliberately left out.
export const discography: ReleaseItem[] = [
  {
    title: "DEEPER",
    credit: "Matty J. Ruys",
    type: "Album",
    releaseDate: "1995",
    coverImage: "/deeper.jpeg",
    listenUrl: "https://open.spotify.com/album/3iVVSyrBnJsdsZqgFmgNdV",
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
    listenUrl: "https://distrokid.com/hyperfollow/mattyjruys/black-jesus?ref=release",
    onHomepage: true,
  },
  {
    title: "SOMETHING GOOD",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-05-15",
    coverImage: "/somethinggood.jpeg",
    listenUrl: "https://distrokid.com/hyperfollow/mattyjruys/something-good?ref=release",
    onHomepage: true,
  },
  {
    title: "IT'S OKAY, I'M NOT OKAY Part. 1 (feat. 7HOODIES)",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-07-10",
    coverImage: "/itsokayimnotokaypt1.jpeg",
    listenUrl:
      "https://distrokid.com/hyperfollow/mattyjruys/its-okay-im-not-okay-part-1-feat-7hoodies",
    onHomepage: true,
  },
  {
    title: "SAME SUN (feat. MATTHEW LITTLE)",
    credit: "Matty J. Ruys",
    type: "Single",
    releaseDate: "2026-09-11",
    coverImage: "/samesun.jpeg",
    listenUrl:
      "https://distrokid.com/hyperfollow/mattyjruys/same-sun-feat-matthew-little-radio-edit-2?ref=release",
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
  { title: "I Love Every Little Thing About You (feat. Lole Usoalii)", youtubeId: "qw00dzF-FEA" },
  { title: "Cruisin'", youtubeId: "hvJZTUhQQPg" },
  { title: "Again", youtubeId: "IGzVkcx01VU" },
  { title: "Mine", youtubeId: "Fb1vH-ZQKw0" },
  { title: "Mine — The Sequel (feat. Lole Usoalii)", youtubeId: "m3AQlcvP6MQ" },
  { title: "Colour B.L.I.N.D.", youtubeId: "YhMW3bWPdRg" },
  // Go Stop Go + features
  { title: "If You Want It", artist: "Go Stop Go", youtubeId: "LzCikEGobNA" },
  { title: "Breathe Under Water", artist: "Go Stop Go", youtubeId: "k24JDvDUWsw" },
  { title: "Home", artist: "Go Stop Go", youtubeId: "1SSm2tonvno" },
  { title: "This Love (Lyric Video)", artist: "Go Stop Go", youtubeId: "31-DMCXD2Q8" },
  { title: "Wash Away", artist: "Go Stop Go", youtubeId: "XZOSqXOoONg" },
  { title: "This City", artist: "Diamond Field feat. Matthew J. Ruys", youtubeId: "U8P5lDOzyV8" },
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
    name: "Beautiful Mess — Limited Edition Red Vinyl",
    price: "$60 AUD",
    details: "180 gram red vinyl · Released 6 November 2026",
    status: "Pre-order",
    image: "/vinyl.png",
    url: "https://happyvalleyshop.com/collections/vinyl-pre-orders/products/ruys-mattyj-beautiful-mess-red-vinyl",
    cta: "Pre-order",
  },
];

// Wrap names in **double asterisks** to make them bold on the About page.
export const bio = `
Award-winning, New Zealand Soul-R&B pioneer **Matty J Ruys** long-awaited return with new music that critics call "a masterwork", "a hell of a record" and "a smouldering classic", and it's easy to hear why. Collaborating with US multi platinum-certified Producer **NUMONICS** (**Marlon Craft**, **Freddie Gibbs**, **Blu**), and recorded in L.A., Texas & Melbourne, BEAUTIFUL MESS is both urgent and timeless in its execution and themes. Soulfully delivered with an indie hip hop aesthetic, guests include **Matthew "Honeybee" Little** (**Kendrick Lamar**, **J. Cole**, **Musiq Soulchild**, **Kali Uchis**, **Anderson .Paak**), **Fuego Hendrixxx A.K.A. 7Hoodies**, **Diana Wuli**, and Island Record's signee **Ben Swissa**.

Featuring the pre-release singles: BLACK JESUS, SOMETHING GOOD, IT'S OKAY, I'M NOT OKAY Part 1, and SAME SUN.

It may have been 3 decades since he last released a solo album, but there's been a lot of music made in-between. From a label deal with Universal Music that garnered 5 weeks at number one with its very first release (**Dei Hamo**), to breaking chart records in his homeland by writing and producing the first female artist to have 4 Top 20 hits from a debut album (**K'Lee**). He also discovered, developed, and signed **Brooke Fraser** to Sony Music; whose debut album achieved 7 x platinum in her native country.

Ruys' influence and musicality has shaped many a music career. As Universal Music A&R he worked on the careers of **Bleeders**, **Elemeno P**, and **Zed**. Ruys also produced American soul artist **Gabriel Powell**'s debut album 'Albany', which USA Today described as "tastefully supportive arrangements with Strings-drenched pop" and "a truly pleasant surprise". And he made albums with his award-nominated band **GO STOP GO**, and as a member of the seminal urban Pacific soul group **Fuemana**.

Ruys (pronounced “Rise”) has continued to perform as a recording artist, lending his voice and songwriting to many music projects. He spent The later part of the nineties in Atlanta Georgia writing and recording with **Gerald “G” Jackson** (**Isaac Hayes**’ Music Director) and **Allen “Grip” Smith** (**Keith Sweat**, **TLC**, **S.O.S. Band**, **SWV**, **Dru Hill**). He even performed with **Dungeon Family** & **Outkast**’s recording/touring band. You can also hear Matty’s work on legendary hip hop grammy-winners **Arrested Development**, New York based synth-wave outfit **Diamond Field**, downtempo darlings **Strawpeople**, Australian multigenre bass music purveyor **Drop Frame**, and Estonia’s celebrated indie electro-rock act **I Wear* Experiment**, to name a few.

Matty has also spent the last 12 years curating Asia's premiere Music Festival, Music Matters Live, as a part of the regions' biggest entertainment conference; All That Matters, bringing in emerging artists from all around the world to the gateway event. He also acts as Academy organiser.
`;

export const tracklist = [
  "Self Love",
  'Same Sun (feat. Matthew "Honeybee" Little)',
  "Black Jesus",
  "Faded",
  "Beautiful Mess",
  "Gotta Go",
  "Alright?",
  "It's Okay, I'm Not Okay Part 1 (feat. Fuego Hendrixxx A.K.A. 7Hoodies)",
  "It's Okay, I'm Not Okay Part 2 (feat. Diana Wuli)",
  "Something Good",
  "Be Love",
];

type SpecialProject = {
  year: string;
  artist: string;
  title: string; // song or album name
  role: string; // what Matty did on it
};

// Credits on other artists' records, sourced from Discogs / streaming credits.
// Sorted by year on /discography, so order here doesn't matter.
export const specialProjects: SpecialProject[] = [
  { year: "1991", artist: "Houseparty", title: "Dangerous Love", role: "Band member, writer" },
  { year: "1992", artist: "Strawpeople", title: "Worldservice", role: "Vocals on \"Cruelty\", backing vocals" },
  { year: "1994", artist: "Fuemana", title: "New Urban Polynesian", role: "Band member, lead vocals, rap, co-producer" },
  { year: "2001", artist: "K'Lee", title: "1+1+1 (It Ain't Two)", role: "Writer, producer, arranger, backing vocals" },
  { year: "2001", artist: "K'Lee", title: "Broken Wings", role: "Producer, arranger, backing vocals" },
  { year: "2002", artist: "K'Lee", title: "Can You Feel Me?", role: "Producer, arranger" },
  { year: "2002", artist: "K'Lee", title: "A Lifetime Left To Wait", role: "Writer, backing vocals" },
  { year: "2002", artist: "K'Lee", title: "K'Lee", role: "Producer, featured on \"The Honeymoon Suite\"" },
  { year: "2003", artist: "Brooke Fraser", title: "What To Do With Daylight", role: "Discovered & signed to Sony Music, backing vocals" },
  { year: "2003", artist: "Elemeno P", title: "Love & Disrespect", role: "Backing vocals" },
  { year: "2004", artist: "Dei Hamo", title: "We Gon Ride", role: "Executive producer, A&R, additional vocals" },
  { year: "2005", artist: "Dei Hamo", title: "To Tha Floor!", role: "Writer, executive producer, additional vocals" },
  { year: "2005", artist: "Dei Hamo", title: "This Is My Life", role: "Writer, remix producer" },
  { year: "2005", artist: "Elemeno P", title: "Burn", role: "Additional vocals" },
  { year: "2006", artist: "Elemeno P", title: "One Left Standing", role: "Additional vocals" },
  { year: "2009", artist: "Haylee Fisher", title: "High", role: "Co-writer" },
  { year: "2012", artist: "Greg Fleming And The Trains", title: "More Time", role: "Backing vocals" },
  { year: "2014", artist: "Drop Frame", title: "Gumby", role: "Featured vocals" },
  { year: "2015", artist: "Diamond Field", title: "This City", role: "Vocals, writer" },
  { year: "2021", artist: "Diamond Field", title: "Diamond Field", role: "Lead vocals & lyrics on \"Bring Back Love\" and \"Out Here For Love\"" },
  { year: "2022", artist: "I Wear* Experiment", title: "Discontent", role: "Vocals & lyrics on \"Utopia\", vocals on \"Tiptoe\", co-producer" },
  { year: "2023", artist: "Arrested Development", title: "Hard In The Paint", role: "Featured vocals" },
];
