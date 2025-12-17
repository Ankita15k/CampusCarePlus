import Categories from "../home/Categories";
import CTA from "../home/CTA";
import Footer from "../home/Footer";
import Hero from "../home/Hero";
import HowItWorks from "../home/HowItWorks";
import Navbar from "../home/Navbar";
import Privacy from "../home/Privacy";
import Problem from "../home/Problem";
import Solution from "../home/Solution";

const Home = () => {
  return (
      <>
      <Navbar />

      {/* Offset for fixed navbar */}
      <div className="pt-16 bg-gray-50 text-gray-900">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Categories />
        <Privacy />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Home;
