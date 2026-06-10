import React, { useState } from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import BestSellers from "../components/BestSellers";
import FeaturedProduct from "../components/FeaturedProduct";
// import FeaturedArticle from "../components/FeaturedArticle";
// // import HeroVideo from "../components/HeroVideo";
// import Footer from "../components/Footer";
// import IconHovers from "../components/IconHovers";
// // import ChatSupport from "../components/ChatSupport";
// import UpcomingEvents from "../components/UpcomingEvents";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home">
        <Navbar />
        <HeroSection />
        <BestSellers />
        <FeaturedProduct />
        {/* <UpcomingEvents />
        <AboutHighlight />
        <IconHovers /> */}
      </div>
    </div>
  );
};

export default Home;
