import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';

const Root = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className='min-h-[calc(100vh-289px)]'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      
    </div>
  );
};

export default Root;