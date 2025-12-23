import Categories from "../home/Categories";
import CTA from "../home/CTA";
import Footer from "../home/Footer";
import Hero from "../home/Hero";
import HowItWorks from "../home/HowItWorks";
import Navbar from "../home/Navbar";
import Privacy from "../home/Privacy";
import Problem from "../home/Problem";
import Solution from "../home/Solution";
import TrackIssue from "./TrackIssue";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Offset for fixed navbar */}
      <div className="pt-16 bg-gray-50 text-gray-900">
        <Hero />
        
        <section id="track-issue" className="pt-24">
          <TrackIssue/>
        </section>

          <Problem />
          <Solution />
        <section id="how-it-works" className="pt-24">
          <HowItWorks />
        </section>

        <section id="categories" className="pt-24">
          <Categories />
        </section>

        <section id="privacy" className="pt-24">
          <Privacy />
        </section>
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Home;