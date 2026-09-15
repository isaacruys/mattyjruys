// Edit everything in this file to update the site's content.
// No need to touch any component code for day-to-day updates.

export const artist = {
  name: "Matty J. Ruys",
  location: "Melbourne, AU",
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
  price: string;
  image: string;
  url: string;
};

export const merch: MerchItem[] = [];
