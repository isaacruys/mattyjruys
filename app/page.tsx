import Nav from "./components/Nav";
import OutNow from "./components/OutNow";
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
      <OutNow />
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
