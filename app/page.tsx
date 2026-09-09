import Nav from "./components/Nav";
import FeaturedRelease from "./components/FeaturedRelease";
import Tour from "./components/Tour";
import Discography from "./components/Discography";
import Videos from "./components/Videos";
import Merch from "./components/Merch";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <FeaturedRelease />
      <Tour />
      <Discography />
      <Videos />
      <Merch />
      <Gallery />
      <Footer />
    </main>
  );
}
