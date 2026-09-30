import Nav from "./components/Nav";
import Countdown from "./components/Countdown";
import ListeningParty from "./components/ListeningParty";
import Music from "./components/Music";
import RecentReleases from "./components/RecentReleases";
import Tour from "./components/Tour";
import Videos from "./components/Videos";
import Merch from "./components/Merch";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Countdown />
      <ListeningParty />
      <Music />
      <Merch />
      <RecentReleases />
      <Tour />
      <Videos />
      <Gallery />
      <Footer />
    </main>
  );
}
