import React from 'react';
import Hero from './Hero';
import About from './About';
import Package from './Package';
import Features from './Features';
import Works from './Works';
import Faq from './Faq';
import Contact from './Contact';

const Home = () => {
  return (
    <div className="">
      <Hero></Hero>
      <div className='w-11/12 mx-auto'>
        <About></About>
        <Package></Package>
        <Features></Features>
        <Works></Works>
        <Faq></Faq>
      </div>
        <Contact></Contact>
    </div>
  );
};

export default Home;