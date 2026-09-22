// Edit everything in this file to update the site's content.
// No need to touch any component code for day-to-day updates.

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

export const tourDates = [
  { region: "US / Canada", shows: [] },
  { region: "UK / EU", shows: [] },
];

export const discography = [
  {
    title: "IT'S OKAY, I'M NOT OKAY Part. 1 (feat. 7HOODIES)",
    year: "2026",
    label: "",
    coverImage: "/itsokayimnotokaypt1.jpeg",
    hyperfollowUrl:
      "https://distrokid.com/hyperfollow/mattyjruys/its-okay-im-not-okay-part-1-feat-7hoodies", // e.g. Apple Music or Spotify embed URL
  },
  {
    title: "SOMETHING GOOD",
    year: "2026",
    label: "",
    coverImage: "/somethinggood.jpeg",
    hyperfollowUrl:
      "https://distrokid.com/hyperfollow/mattyjruys/something-good?ref=release", // e.g. Apple Music or Spotify embed URL
  },
  {
    title: "BLACK JESUS",
    year: "2026",
    label: "",
    coverImage: "/blackjesus.jpeg",
    hyperfollowUrl:
      "https://distrokid.com/hyperfollow/mattyjruys/black-jesus?ref=release", // e.g. Apple Music or Spotify embed URL
  },
  {
    title: "DEEPER",
    year: "1995",
    label: "",
    coverImage: "/deeper.jpeg",
    hyperfollowUrl: "", // e.g. Apple Music or Spotify embed URL
  },
];

export const videos = [
  {
    title: "BLACK JESUS",
    embedUrl: "https://www.youtube.com/embed/pFPlvsiI7ZI?si=hDECC3AZ6pGGP4Jq", // e.g. https://player.vimeo.com/video/XXXXXXX or YouTube embed URL
  },
  {
    title: "RAINBOWS",
    embedUrl: "https://www.youtube.com/embed/jFXqf33UuVE?si=CWhxOA-xPL5-8CRy", // e.g. https://player.vimeo.com/video/XXXXXXX or YouTube embed URL
  },
  {
    title: "I LOVE EVERYTHING LITTLE ABOUT YOU (FEAT. LOLE USOALII)",
    embedUrl: "https://www.youtube.com/embed/qw00dzF-FEA?si=iVEBhPDCUEtIGCJg", // e.g. https://player.vimeo.com/video/XXXXXXX or YouTube embed URL
  },
  {
    title: "CRUISIN'",
    embedUrl: "https://www.youtube.com/embed/hvJZTUhQQPg?si=D7Hi2zKKtdThcf_a", // e.g. https://player.vimeo.com/video/XXXXXXX or YouTube embed URL
  },
  {
    title: "COLOUR B.L.I.N.D.",
    embedUrl: "https://www.youtube.com/embed/YhMW3bWPdRg?si=JvZAdukAwUxGokjb", // e.g. https://player.vimeo.com/video/XXXXXXX or YouTube embed URL
  },
];

export const galleryImages = [
  "/gallery/MattyJMontage.jpeg",
  "/gallery/hand.jpeg",
  "/gallery/gostopgo.jpeg",
  "/gallery/group.jpeg",
  "/gallery/matty.jpeg",
  "/gallery/speech.jpeg",
  "/gallery/people.jpeg",
];

type MerchItem = {
  name: string;
  price?: string;
  image: string;
  url: string;
};

export const merch: MerchItem[] = [
  {
    name: "Beautiful Mess — Vinyl (Preorder)",
    image: "/vinyl.jpeg",
    url: "https://happyvalleyshop.com/collections/vinyl-pre-orders/products/ruys-mattyj-beautiful-mess-red-vinyl", // paste the real preorder link
  },
];

export const bio = `
Award-winning, New Zealand Soul-R&B pioneer Matty J Ruys long-awaited return with new music that critics call "a masterwork", "a hell of a record" and "a smouldering classic", and it's easy to hear why. Collaborating with US multi platinum-certified Producer NUMONICS (Marlon Craft, Freddie Gibbs, Blu), and recorded in L.A., Texas & Melbourne, BEAUTIFUL MESS is both urgent and timeless in its execution and themes. Soulfully delivered with an indie hip hop aesthetic, guests include Matthew "Honeybee" Little (Kendrick Lamar, J. Cole, Musiq Soulchild, Kali Uchis, Anderson .Paak), Fuego Hendrixxx A.K.A. 7Hoodies, Diana Wuli, and Island Record's signee Ben Swissa.

Featuring the pre-release singles: BLACK JESUS, SOMETHING GOOD, IT'S OKAY, I'M NOT OKAY Part 1, and SAME SUN.

It may have been 3 decades since he last released a solo album, but there's been a lot of music made in-between. From a label deal with Universal Music that garnered 5 weeks at number one with its very first release (Dei Hamo), to breaking chart records in his homeland by writing and producing the first female artist to have 4 Top 20 hits from a debut album (K'Lee). He also discovered, developed, and signed Brooke Fraser to Sony Music; whose debut album achieved 7 x platinum in her native country.

Ruys' influence and musicality has shaped many a music career. As Universal Music A&R he worked on the careers of Bleeders, Elemeno P, and Zed. Ruys also produced American soul artist Gabriel Powell's debut album 'Albany', which USA Today described as "tastefully supportive arrangements with Strings-drenched pop" and "a truly pleasant surprise". And he made albums with his award-nominated band GO STOP GO, and as a member of the seminal urban Pacific soul group Fuemana.

Ruys (pronounced “Rise”) has continued to perform as a recording artist, lending his voice and songwriting to many music projects. He spent The later part of the nineties in Atlanta Georgia writing and recording with Gerald “G” Jackson (Isaac Hayes’ Music Director) and Allen “Grip” Smith (Keith Sweat, TLC, S.O.S. Band, SWV, Dru Hill). He even performed with Dungeon Family & Outkast’s recording/touring band. You can also hear Matty’s work on legendary hip hop grammy-winners Arrested Development, New York based synth-wave outfit Diamond Field, downtempo darlings Strawpeople, Australian multigenre bass music purveyor Drop Frame, and Estonia’s celebrated indie electro-rock act I Wear* Experiment, to name a few.

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
