import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import UpcomingEvents from "./HomeComponents/UpcomingEvents";
import AICategorization from "./HomeComponents/AiCategorization";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <UpcomingEvents></UpcomingEvents>
      <AICategorization></AICategorization>
    </div>
  );
};

export default Home;
