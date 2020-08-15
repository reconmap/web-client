import Footer from "./Footer";
import Header from "./Header";
import React from "react";

const Home = () => {
  return (
    <div className=" container flex w-full h-screen p-3 mx-auto flex-col ">
      <Header />
      <main role="main" className="flex flex-1 flex-col ">
        <div className="flex flex-col justify-center h-full items-center text-center">
          <img src="logo.png" />
          <h1 className="text-6xl font-bold">ReconMap</h1>
          <h2 className="text-3xl max-w-xl">
            ReconMap is an open source security tool for InfoSec professionals
            that allows them to plan, execute and document reconnaissance
            projects for multiple targets.
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
