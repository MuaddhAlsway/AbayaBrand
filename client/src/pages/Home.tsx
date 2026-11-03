import BrandExperience from "../components/home/BrandExperience";
import BrandStory from "../components/home/BrandStory";
import Craftsmanship from "../components/home/Craftsmanship";
import ExploreByStyle from "../components/home/ExploreByStyle";
import FeaturedCollection from "../components/home/FeaturedCollection";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollection />
      <BrandStory/>
      <ExploreByStyle />
      <Craftsmanship/>
      <BrandExperience/>
      <Newsletter/>
      <Footer/>
    </main>
  );
}
