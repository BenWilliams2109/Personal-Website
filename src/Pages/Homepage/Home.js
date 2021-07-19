import React from "react";
import "./Home.css";

import Navbar from "../../Navbar";
import Footer from "../../Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="background">
        <div className="mainText">Welcome</div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
