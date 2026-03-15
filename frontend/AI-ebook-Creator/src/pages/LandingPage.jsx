import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import Testimonials from "../components/landing/Testimonials";
import Navbar from "../components/layout/Navbar";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
export default LandingPage;
