import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div className="my-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
